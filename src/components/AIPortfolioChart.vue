<script setup lang="ts">
import * as pdfjs from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'
import { nextTick, onMounted, ref } from 'vue'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker
const pdfCMapUrl = 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/'

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
]

async function parsePdf(url: string) {
  const task = pdfjs.getDocument({ url, cMapUrl: pdfCMapUrl, cMapPacked: true })
  const pdf = await task.promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += `${content.items.map((it: any) => it.str || '').join(' ')}\n`
  }
  return text
}

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
      txt = await parsePdf(f.url)
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

onMounted(async () => {
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
  targetMsg.isTyping = false
}

async function handleSend() {
  const input = userInput.value.trim()
  if (!input || sending.value)
    return
  messages.value.push({ role: 'user', content: input })
  userInput.value = ''
  sending.value = true

  const assistantMsg: Message = { role: 'assistant', content: '', isThinking: true, isTyping: false }
  messages.value.push(assistantMsg)
  await nextTick()
  messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })

  const chunks = retrieveChunks(input)
  const context = chunks.map(c => `[${c.source}] ${c.text}`).join('\n\n')
  const systemPrompt = `你是 Joel 智能助手。
你具备广泛知识和智能推理能力，可以回答各种问题。
当用户的问题涉及 Joel 的个人信息或文档内容时，请基于以下文档回答：
${context}

规则：
- 对于涉及 Joel 的问题，请以文档为核心依据，同时可以进行合理分析、总结和推理，使回答更完整、更有洞察力。
- 对于非 Joel 相关问题，可以自由回答，保持智能和友好。
- 不使用 Markdown / HTML 格式。
- 默认使用英文回答，除非用户明确要求中文。
- 如果文档未提及某个信息，请回答“文档未提及”。`

  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input },
        ],
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
    await nextTick()
    messageList.value?.scrollTo({ top: messageList.value.scrollHeight, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="blog-ai-agent">
    <aside class="agent-sidebar">
      <div class="avatar">
        <img src="https://picsum.photos/200/200?random=1" alt="AI Assistant Avatar">
      </div>
      <div class="sidebar-info">
        <h1>Joel AI Assistant</h1>
        <p>Answer professional questions about Joel based on documents</p>
        <div v-if="loadedFiles.length" class="loaded-files">
          <span>Loaded Documents: </span>
          <span v-for="(file, i) in loadedFiles" :key="i">
            {{ file }}<span v-if="i < loadedFiles.length - 1">, </span>
          </span>
        </div>
        <div class="load-status">
          {{ loadStatus }}
        </div>
      </div>
    </aside>

    <main class="chat-container">
      <div ref="messageList" class="message-list">
        <div class="message-wrapper assistant-wrapper">
          <div class="message assistant-message">
            <div class="message-content">
              Hello! I can answer questions about Joel's resume details, project experience, tech stack, etc. Feel free to ask~
            </div>
          </div>
        </div>

        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          class="message-wrapper" :class="[msg.role === 'user' ? 'user-wrapper' : 'assistant-wrapper']"
        >
          <div class="message" :class="[msg.role === 'user' ? 'user-message' : 'assistant-message']">
            <div class="message-content">
              <span>{{ msg.content }}</span>
              <span v-if="msg.isThinking">Retrieving and organizing answer...</span>
              <span v-if="msg.isTyping" class="cursor" />
            </div>
          </div>
        </div>
      </div>

      <div class="input-area">
        <input
          v-model="userInput"
          type="text"
          placeholder="e.g., What tech stack does Joel excel in? What are his core projects?"
          :disabled="sending"
          @keydown.enter="handleSend"
        >
        <button :disabled="!userInput.trim() || sending" @click="handleSend">
          Send Query
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.blog-ai-agent {
  display: flex;
  height: 76vh;
  max-width: 1200px;
  margin: 20px auto;
  font-family: sans-serif;
  background: #121212;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.agent-sidebar {
  width: 260px;
  min-width: 260px;
  background: #1e1e1e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #2d2d2d;
}
.agent-sidebar .avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #333;
  margin-bottom: 15px;
}
.sidebar-info h1 {
  color: #fff;
  font-size: 1.3rem;
  margin: 0 0 5px;
  text-align: center;
}
.sidebar-info p {
  color: #ccc;
  font-size: 0.9rem;
  margin: 0 0 10px;
  text-align: center;
}
.loaded-files {
  color: #aaa;
  font-size: 0.8rem;
  margin-bottom: 5px;
  text-align: center;
}
.load-status {
  color: #888;
  font-size: 0.8rem;
  text-align: center;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #121212;
}

.message-list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  color: #fff;
}
.message-list::-webkit-scrollbar {
  width: 6px;
}
.message-list::-webkit-scrollbar-track {
  background: #1e1e1e;
}
.message-list::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

.message-wrapper {
  display: inline-block;
  width: 100%;
  margin-bottom: 15px;
}
.user-wrapper {
  text-align: right;
}
.assistant-wrapper {
  text-align: left;
}
.message {
  display: inline-block;
  max-width: 80%;
  animation: fadeIn 0.3s ease-out;
}
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
.message-content {
  padding: 14px 20px;
  border-radius: 18px;
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 0.95rem;
}
.user-message .message-content {
  background: #0057b7;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 87, 183, 0.3);
  border-top-right-radius: 4px;
}
.assistant-message .message-content {
  background: #1e1e1e;
  border: 1px solid #333;
  color: #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 4px;
}

.cursor {
  display: inline-block;
  width: 6px;
  background: #0057b7;
  margin-left: 3px;
  animation: blink 0.9s infinite;
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

.input-area {
  display: flex;
  padding: 15px 20px;
  border-top: 1px solid #2d2d2d;
  background: #1e1e1e;
}
.input-area input {
  flex: 1;
  padding: 14px 20px;
  border: 1px solid #333;
  border-radius: 24px;
  outline: none;
  margin-right: 10px;
  background: #2d2d2d;
  color: #fff;
  font-size: 0.95rem;
}
.input-area input::placeholder {
  color: #aaa;
}
.input-area input:focus {
  border-color: #0057b7;
  box-shadow: 0 0 0 2px rgba(0, 87, 183, 0.2);
}
.input-area button {
  padding: 14px 28px;
  background: #0057b7;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}
.input-area button:hover {
  background: #0068d9;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 87, 183, 0.4);
}
.input-area button:active {
  transform: translateY(0);
  box-shadow: none;
}
.input-area button:disabled {
  background: #333;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
