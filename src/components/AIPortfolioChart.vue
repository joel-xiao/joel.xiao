<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isThinking?: boolean
  isTyping?: boolean
}
interface StaticFile { name: string, url: string, type: 'pdf' | 'txt' | 'md' }
interface TextChunk { text: string, source: string }

const userInput = ref('')
const messages = ref<Message[]>([])
const sending = ref(false)
const messageList = ref<HTMLDivElement | null>(null)
const loadedFiles = ref<string[]>([])
const loadStatus = ref('Initializing...')
const textChunks = ref<TextChunk[]>([])

const STATIC_FILES: StaticFile[] = [
  { name: 'Resume.pdf', url: '/resume/JoelXiao_FullStackFrontend_Resume.pdf', type: 'pdf' },
  { name: 'PMP.pdf', url: '/resume/PMP-肖文龙.pdf', type: 'pdf' },
  { name: 'Frontend-5years.txt', url: '/resume/前端开发-5年-肖文龙.txt', type: 'txt' },
  { name: 'Fullstack-6years.md', url: '/resume/全栈前端工程师-肖文龙-6年.md', type: 'md' },
  { name: 'curriculum-vitae-1.txt', url: '/resume/gpt-optimize/curriculum-vitae-1.txt', type: 'txt' },
  { name: 'curriculum-vitae-2.txt', url: '/resume/gpt-optimize/curriculum-vitae-2.txt', type: 'txt' },
  { name: 'curriculum-vitae-3.txt', url: '/resume/gpt-optimize/curriculum-vitae-3.txt', type: 'txt' },
  { name: 'deepseek-curriculum-vitae-1.txt', url: '/resume/gpt-optimize/deepseek-curriculum-vitae-1.txt', type: 'md' },
  { name: 'deepseek-curriculum-vitae-2.txt', url: '/resume/gpt-optimize//resume/gpt-optimize/deepseek-curriculum-vitae-2.txt', type: 'txt' },
]

function cleanText(text: string, type: string) {
  let t = text
  if (type === 'md')
    t = t.replace(/[#>*_`~\-]/g, '')
  return t.replace(/<[^>]+>/g, '').replace(/\n{2,}/g, '\n').trim()
}

async function loadFile(f: StaticFile) {
  try {
    let txt = ''
    if (f.type === 'pdf') {
      // txt = await parsePdf(f.url)
    }
    else {
      const r = await fetch(f.url)
      txt = await r.text()
    }
    if (txt.trim()) {
      textChunks.value.push({ text: cleanText(txt, f.type), source: f.name })
      loadedFiles.value.push(f.name)
    }
  }
  catch (e) {
    console.warn('Load failed', f.name, e)
  }
}

function saveMessages() {
  localStorage.setItem('joel_chat_messages', JSON.stringify(messages.value))
}

function loadMessages() {
  const raw = localStorage.getItem('joel_chat_messages')
  if (raw) {
    try {
      messages.value = JSON.parse(raw)
    }
    catch {
      console.warn('Failed to parse messages cache')
    }
  }
}

onMounted(async () => {
  loadMessages()
  for (const f of STATIC_FILES) await loadFile(f)
  loadStatus.value = `Documents loaded, parsed ${textChunks.value.length} core sections`
})

function retrieveChunks(q: string, k = 3) {
  const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 1)
  if (!words.length)
    return textChunks.value.slice(0, k)
  return textChunks.value
    .map(c => ({ ...c, score: words.filter(w => c.text.toLowerCase().includes(w)).length }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, k)
}

const API_KEY = 'ca882504-ddb0-4649-a541-39dbe480da4d'
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
const MODEL = 'doubao-1-5-thinking-pro-250415'

async function typeWriterAppend(targetMsg: Message, text: string, delay = 25) {
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
  messages.value.push({ role: 'user', content: input })
  userInput.value = ''
  sending.value = true

  const assistantMsg: Message = reactive({ role: 'assistant', content: '', isThinking: true, isTyping: false })
  messages.value.push(assistantMsg)
  await nextTick()
  messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })

  const chunks = retrieveChunks(input)
  const context = chunks.map(c => `[${c.source}] ${c.text}`).join('\n\n')
  const systemPrompt = `你是 Joel 智能助手。
默认必须使用英文回答。若用户的问题使用中文，自动切换为中文回复；若用户的问题使用其他语言，保持英文回复。仅当用户明确要求“用中文回答”时，无论其提问语言是什么，均强制使用中文回复。
你具备广泛知识和智能推理能力，可以回答各种问题。
当用户的问题涉及 Joel 的个人信息或文档内容时，请基于以下文档回答：
${context}

规则：
- 对于涉及 Joel 的问题，请以文档为核心依据，同时可以进行合理分析、总结和推理，使回答更完整、更有洞察力。
- 对于非 Joel 相关问题，可以自由回答。
- 不准使用 Markdown / HTML 格式返回。
- 如果文档未提及某个信息，请回答“文档未提及”。`

  try {
    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.value.slice(-1).map(m => ({ role: m.role, content: m.content })),
    ]

    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: allMessages,
        stream: true,
        temperature: 0.1,
      }),
    })
    if (!resp.body)
      throw new Error('No stream response')

    const reader = resp.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    let gotFirstPiece = false

    while (true) {
      const { value, done } = await reader.read()
      if (done)
        break
      buffer += decoder.decode(value, { stream: true })
      const parts = buffer.split('\n\n')
      buffer = parts.pop() || ''
      for (const p of parts) {
        const line = p.trim()
        if (!line.startsWith('data:'))
          continue
        const dataStr = line.replace(/^data:\s*/, '')
        if (dataStr === '[DONE]')
          continue
        try {
          const json = JSON.parse(dataStr)
          const delta = json.choices?.[0]?.delta
          const piece = delta?.content ?? delta?.reasoning_content ?? ''
          if (!piece)
            continue
          if (!gotFirstPiece) {
            gotFirstPiece = true
            assistantMsg.isThinking = false
          }
          await typeWriterAppend(assistantMsg, piece)
        }
        catch (e) {
          console.warn('Stream parse failed', e)
        }
      }
    }
  }
  catch (err) {
    assistantMsg.content = `❌ Service error: ${(err as Error).message}`
    assistantMsg.isTyping = false
    assistantMsg.isThinking = false
  }
  finally {
    assistantMsg.isTyping = false
    assistantMsg.isThinking = false
    sending.value = false
    saveMessages()
    await nextTick()
    messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="flex h-[calc(100vh-17rem)] max-w-[1200px] mx-auto my-5 font-sans rounded-xl shadow-lg bg-card relative">
    <div class="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] -z-10" />
    <aside class="w-[260px] min-w-[260px] p-5 flex flex-col items-center border-r border-border">
      <div class="w-[100px] h-[100px] mb-3.5 rounded-full border-2 border-border overflow-hidden">
        <img src="https://picsum.photos/200/200?random=1" alt="AI Assistant Avatar" class="w-full h-full object-cover">
      </div>
      <div class="text-center">
        <h1 class="text-[1.3rem] mb-1.5 text-primary">
          Joel AI Assistant
        </h1>
        <p class="text-sm mb-2.5 text-secondary">
          Answer professional questions about Joel based on documents
        </p>
        <div v-if="loadedFiles.length" class="text-xs mb-1 text-tertiary">
          <span>Loaded Documents: </span>
          <span v-for="(file, i) in loadedFiles" :key="i">{{ file }}<span v-if="i < loadedFiles.length - 1">, </span></span>
        </div>
        <div class="text-xs text-tertiary-light">
          {{ loadStatus }}
        </div>
      </div>
    </aside>

    <main class="flex flex-col flex-1 bg-card">
      <div ref="messageList" class="flex-1 p-5 overflow-y-auto text-primary">
        <div class="w-full mb-3.5 text-left">
          <div class="inline-block max-w-[80%] animate-fadeIn bg-card-soft border border-border text-secondary shadow-md p-3.5 whitespace-pre-wrap leading-6 text-sm rounded-[18px] rounded-tl-[4px]">
            Hello! I can answer questions about Joel's resume details, project experience, tech stack, etc. Feel free to ask~
          </div>
        </div>

        <div v-for="(msg, idx) in messages" :key="idx" class="w-full mb-3.5" :class="msg.role === 'user' ? 'text-right' : 'text-left'">
          <div
            class="inline-block max-w-[80%] animate-fadeIn whitespace-pre-wrap leading-6 text-sm p-3.5 shadow-md"
            :class="msg.role === 'user'
              ? 'bg-primary text-white rounded-[18px] rounded-tr-[4px]'
              : 'bg-card-soft border border-border text-secondary rounded-[18px] rounded-tl-[4px]'"
          >
            <span v-html="msg.content" />
            <span v-if="msg.isThinking" class="block text-xs text-tertiary mt-1">Retrieving and organizing answer...</span>
            <span v-if="msg.isTyping" class="inline-block w-1.5 bg-primary ml-1 animate-blink" />
          </div>
        </div>
      </div>

      <div class="flex p-3.5 border-t border-border bg-card-soft">
        <input
          v-model="userInput"
          type="text"
          placeholder="e.g., What tech stack does Joel excel in? What are his core projects?"
          :disabled="sending"
          class="flex-1 p-3.5 border border-border rounded-[24px] mr-2.5 text-sm outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] bg-card text-primary placeholder:text-tertiary"
          @keydown.enter="handleSend"
        >
        <button
          :disabled="!userInput.trim() || sending"
          class="px-7 py-3 rounded-[24px] text-sm font-medium text-white disabled:bg-border disabled:cursor-not-allowed transition-all hover:bg-primary/90 active:translate-y-0.5 active:shadow-none bg-primary dark:bg-[#3b82f6] dark:hover:bg-[#2563eb]"
          @click="handleSend"
        >
          Send
        </button>
      </div>
    </main>
  </div>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
.animate-blink {
  animation: blink 0.9s infinite;
}

:root {
  --color-primary: #000000;
  --color-secondary: #333333;
  --color-tertiary: #666666;
  --color-tertiary-light: #999999;
  --color-border: #e0e0e0;
  --color-card: #ffffff;
  --color-card-soft: #f5f5f5;
}
.dark {
  --color-primary: #ffffff;
  --color-secondary: #cccccc;
  --color-tertiary: #999999;
  --color-tertiary-light: #666666;
  --color-border: #333333;
  --color-card: #121212;
  --color-card-soft: #1e1e1e;
  --color-user-bg-dark: #3b82f6;
}

.bg-primary {
  background-color: var(--color-primary);
}
.text-primary {
  color: var(--color-primary);
}
.text-secondary {
  color: var(--color-secondary);
}
.text-tertiary {
  color: var(--color-tertiary);
}
.text-tertiary-light {
  color: var(--color-tertiary-light);
}
.border-border {
  border-color: var(--color-border);
}
.bg-card {
  background-color: var(--color-card);
}
.bg-card-soft {
  background-color: var(--color-card-soft);
}

.dark .bg-primary {
  background-color: var(--color-user-bg-dark);
}
</style>
