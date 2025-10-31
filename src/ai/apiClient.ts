import type { AIModelConfig, Message, ModelKeySource } from './types'

async function handleOpenAIStyleStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk: (text: string) => Promise<void>,
): Promise<void> {
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

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
        if (piece)
          await onChunk(piece)
      }
      catch (e) {
        console.warn('Stream parse failed', e)
      }
    }
  }
}

async function handleGeminiStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk: (text: string) => Promise<void>,
): Promise<void> {
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done)
      break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.startsWith('data:'))
        continue
      const dataStr = line.replace(/^data:\s*/, '')
      try {
        const json = JSON.parse(dataStr)
        const candidates = json.candidates
        if (candidates && candidates[0]?.content?.parts) {
          for (const part of candidates[0].content.parts) {
            if (part.text)
              await onChunk(part.text)
          }
        }
      }
      catch (e) {
        console.warn('Gemini stream parse failed', e)
      }
    }
  }
}

async function handleClaudeStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk: (text: string) => Promise<void>,
): Promise<void> {
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done)
      break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (line.startsWith('event:') || line.startsWith('data:')) {
        if (line.startsWith('data:')) {
          const dataStr = line.replace(/^data:\s*/, '')
          try {
            const json = JSON.parse(dataStr)
            if (json.type === 'content_block_delta' && json.delta?.text) {
              await onChunk(json.delta.text)
            }
          }
          catch (e) {
            console.warn('Claude stream parse failed', e)
          }
        }
      }
    }
  }
}

export async function callAIModel(
  config: AIModelConfig,
  apiKey: string,
  messages: Message[],
  systemPrompt: string,
  onChunk: (text: string) => Promise<void>,
): Promise<void> {
  const modelName = config.name

  const maxMessages = config.maxMessages ?? 2
  const limitedMessages = messages.slice(-maxMessages)

  if (modelName === 'gemini') {
    // Gemini uses a different API format
    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      ...limitedMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    ]

    const resp = await fetch(`${config.endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.5,
        },
      }),
    })

    if (!resp.ok) {
      const error = await resp.text()
      throw new Error(`Gemini API error: ${error}`)
    }

    if (!resp.body)
      throw new Error('No stream response')

    await handleGeminiStream(resp.body.getReader(), onChunk)
  }
  else if (modelName === 'claude') {
    // Claude uses a different API format
    const conversationMessages = limitedMessages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }))

    const resp = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 4096,
        system: systemPrompt,
        messages: conversationMessages,
        stream: true,
      }),
    })

    if (!resp.ok) {
      const error = await resp.text()
      throw new Error(`Claude API error: ${error}`)
    }

    if (!resp.body)
      throw new Error('No stream response')

    await handleClaudeStream(resp.body.getReader(), onChunk)
  }
  else {
    // OpenAI-style API (doubao, deepseek, chatgpt, etc.)
    const allMessages = [
      { role: 'system', content: systemPrompt },
      ...limitedMessages.map(m => ({ role: m.role, content: m.content })),
    ]

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Different models use different auth headers
    if (modelName === 'doubao') {
      headers.Authorization = `Bearer ${apiKey}`
    }
    else if (modelName === 'qwen' || modelName === 'modelscope') {
      headers.Authorization = `Bearer ${apiKey}`
    }
    else if (modelName === 'openrouter') {
      headers.Authorization = `Bearer ${apiKey}`
      // OpenRouter recommended headers
      headers['HTTP-Referer'] = typeof window !== 'undefined' ? window.location.origin : 'https://joel.xiao'
      headers['X-Title'] = 'Joel AI Assistant'
    }
    else if (modelName === 'bigmodel') {
      headers.Authorization = `Bearer ${apiKey}`
    }
    else {
      headers.Authorization = `Bearer ${apiKey}`
    }

    const body: Record<string, any> = {
      model: config.model,
      messages: allMessages,
      stream: true,
      temperature: 0.5,
    }

    // Doubao specific params
    if (modelName === 'doubao') {
      body.enable_reasoning = false
      body.reasoning_type = 'none'
    }

    const resp = await fetch(config.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!resp.ok) {
      const error = await resp.text()
      throw new Error(`API error: ${error}`)
    }

    if (!resp.body)
      throw new Error('No stream response')

    await handleOpenAIStyleStream(resp.body.getReader(), onChunk)
  }
}

export function getAPIKey(
  config: AIModelConfig,
  userKeys: Record<string, string>,
): { key: string, source: ModelKeySource } {
  const userKey = userKeys[config.name]
  if (userKey) {
    return { key: userKey, source: 'user' }
  }
  if (config.defaultKey) {
    return { key: config.defaultKey, source: 'default' }
  }
  throw new Error(`No API key available for model ${config.name}`)
}
