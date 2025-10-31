import type { Message, ModelKeySource, TextChunk } from './types'
import { computed, nextTick, reactive, ref } from 'vue'
import { callAIModel, getAPIKey } from './apiClient'
import { loadAllFiles, STATIC_FILES } from './documentLoader'
import {
  getModelKeys,
  getModelNames,
  loadMessages,
  loadSelectedModel,
  resetModelName,
  saveMessages,
  saveModelKey,
  saveModelName,
  saveSelectedModel,
} from './messageStorage'
import { AI_MODELS } from './models'
import { buildContext, retrieveChunks, SYSTEM_PROMPT_TEMPLATE } from './retriever'

export function useAIChat() {
  const userInput = ref('')
  const messages = ref<Message[]>(loadMessages())
  const sending = ref(false)
  const messageList = ref<HTMLDivElement | null>(null)
  const loadedFiles = ref<string[]>([])
  const loadStatus = ref('Initializing...')
  const textChunks = ref<TextChunk[]>([])
  const selectedModelName = ref<string>(loadSelectedModel() || AI_MODELS[0].name)
  const modelKeys = ref<Record<string, string>>(getModelKeys())
  const modelNames = ref<Record<string, string>>(getModelNames())
  const keyInputVisible = ref(false)
  const keyInputValue = ref('')
  const keyInputModelName = ref<string | null>(null)
  const modelInputVisible = ref(false)
  const modelInputValue = ref('')
  const modelInputModelName = ref<string | null>(null)

  const selectedModel = computed(() => {
    const baseModel = AI_MODELS.find(m => m.name === selectedModelName.value) || AI_MODELS[0]
    const customModelName = modelNames.value[selectedModelName.value]
    return {
      ...baseModel,
      model: customModelName || baseModel.model,
    }
  })

  // Dynamic free detection based on model name
  const isModelFree = computed(() => {
    const modelId = selectedModel.value.model.toLowerCase()
    // Check for free indicators in model name
    const freeIndicators = [':free', '-free', 'free', 'turbo', 'flash']
    return freeIndicators.some(indicator => modelId.includes(indicator))
  })

  const currentKeySource = computed<ModelKeySource>(() => {
    const userKey = modelKeys.value[selectedModelName.value]
    return userKey ? 'user' : 'default'
  })

  const currentAPIKey = computed(() => {
    try {
      const { key } = getAPIKey(selectedModel.value, modelKeys.value)
      return key
    }
    catch {
      return ''
    }
  })

  async function initialize() {
    loadMessages()
    const chunks = await loadAllFiles()
    textChunks.value = chunks
    loadedFiles.value = STATIC_FILES.map(f => f.name)
    loadStatus.value = `Documents loaded, parsed ${chunks.length} core sections`
  }

  async function typeWriterAppend(targetMsg: Message, text: string, delay = 25) {
    targetMsg.isThinking = false
    targetMsg.isTyping = true
    for (let i = 0; i < text.length; i++) {
      targetMsg.content += text[i]
      await nextTick()
      messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })
      await new Promise(r => setTimeout(r, delay))
    }
  }

  async function handleSend() {
    const input = userInput.value.trim()
    if (!input || sending.value)
      return

    const config = selectedModel.value
    if (!config)
      return

    let apiKey: string
    try {
      const result = getAPIKey(config, modelKeys.value)
      apiKey = result.key
    }
    catch {
      // Show error message to user - using console.error for now, can be replaced with a toast/notification system
      console.error(`No API key available for ${config.label}. Please set a key first.`)
      // Set a user-visible error message in the assistant message
      const errorMsg: Message = reactive({
        role: 'assistant',
        content: `⚠️ No API key available for ${config.label}. Please set a key first using the "Set API Key" button.`,
        isThinking: false,
        isTyping: false,
      })
      messages.value.push(errorMsg)
      sending.value = false
      return
    }

    messages.value.push({ role: 'user', content: input })
    userInput.value = ''
    sending.value = true

    const assistantMsg: Message = reactive({ role: 'assistant', content: '', isThinking: true, isTyping: false })
    messages.value.push(assistantMsg)
    await nextTick()
    messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })

    const chunks = retrieveChunks(input, textChunks.value)
    const context = buildContext(chunks)
    const systemPrompt = SYSTEM_PROMPT_TEMPLATE(context)

    try {
      // Use custom model name if available
      const modelConfig = {
        ...config,
        model: modelNames.value[selectedModelName.value] || config.model,
      }
      await callAIModel(
        modelConfig,
        apiKey,
        messages.value.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
        systemPrompt,
        async (piece: string) => {
          await typeWriterAppend(assistantMsg, piece)
        },
      )
    }
    catch (err) {
      assistantMsg.content = `Service error: ${(err as Error).message}`
    }
    finally {
      assistantMsg.isTyping = false
      assistantMsg.isThinking = false
      sending.value = false
      saveMessages(messages.value)
      await nextTick()
      messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })
    }
  }

  function switchModel(modelName: string) {
    selectedModelName.value = modelName
    saveSelectedModel(modelName)
  }

  function openKeyInput(modelName: string) {
    keyInputModelName.value = modelName
    keyInputValue.value = modelKeys.value[modelName] || ''
    keyInputVisible.value = true
  }

  function saveKeyInput() {
    if (keyInputModelName.value && keyInputValue.value.trim()) {
      modelKeys.value[keyInputModelName.value] = keyInputValue.value.trim()
      saveModelKey(keyInputModelName.value, keyInputValue.value.trim())
      keyInputVisible.value = false
      keyInputValue.value = ''
      keyInputModelName.value = null
    }
  }

  function cancelKeyInput() {
    keyInputVisible.value = false
    keyInputValue.value = ''
    keyInputModelName.value = null
  }

  function openModelInput(modelName: string) {
    modelInputModelName.value = modelName
    const baseModel = AI_MODELS.find(m => m.name === modelName)
    modelInputValue.value = modelNames.value[modelName] || baseModel?.model || ''
    modelInputVisible.value = true
  }

  function saveModelInput() {
    if (modelInputModelName.value && modelInputValue.value.trim()) {
      modelNames.value[modelInputModelName.value] = modelInputValue.value.trim()
      saveModelName(modelInputModelName.value, modelInputValue.value.trim())
      modelInputVisible.value = false
      modelInputValue.value = ''
      modelInputModelName.value = null
    }
  }

  function cancelModelInput() {
    modelInputVisible.value = false
    modelInputValue.value = ''
    modelInputModelName.value = null
  }

  function resetModelInput(modelName: string) {
    modelNames.value[modelName] = ''
    resetModelName(modelName)
  }

  function getDisplayKey(modelName: string): string {
    const userKey = modelKeys.value[modelName]
    if (userKey) {
      // Don't display user's key, show masked version
      return '••••••••••••'
    }
    const model = AI_MODELS.find(m => m.name === modelName)
    if (model?.defaultKey) {
      // Don't display default key either
      return '••••••••••••'
    }
    return 'Not set'
  }

  return {
    userInput,
    messages,
    sending,
    messageList,
    loadedFiles,
    loadStatus,
    selectedModelName,
    selectedModel,
    modelKeys,
    modelNames,
    keyInputVisible,
    keyInputValue,
    keyInputModelName,
    modelInputVisible,
    modelInputValue,
    modelInputModelName,
    currentKeySource,
    currentAPIKey,
    isModelFree,
    initialize,
    handleSend,
    switchModel,
    openKeyInput,
    saveKeyInput,
    cancelKeyInput,
    openModelInput,
    saveModelInput,
    cancelModelInput,
    resetModelInput,
    getDisplayKey,
  }
}
