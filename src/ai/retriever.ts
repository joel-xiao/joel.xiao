import type { TextChunk } from './types'

export function retrieveChunks(query: string, chunks: TextChunk[], k = 3): TextChunk[] {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1)
  if (!words.length)
    return chunks.slice(0, k)
  return chunks
    .map(c => ({ ...c, score: words.filter(w => c.text.toLowerCase().includes(w)).length }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, k)
}

export function buildContext(chunks: TextChunk[]): string {
  return chunks.map(c => `[${c.source}] ${c.text}`).join('\n\n')
}

export function SYSTEM_PROMPT_TEMPLATE(context: string): string {
  return `你是 Joel 智能助手。
默认必须使用英文回答。若用户的问题使用中文，自动切换为中文回复；若用户的问题使用其他语言，保持英文回复。仅当用户明确要求"用中文回答"时，无论其提问语言是什么，均强制使用中文回复。
你具备广泛知识和智能推理能力，可以回答各种问题。
当用户的问题涉及 Joel Xiao 或者 肖文龙 的个人信息或文档内容时，请基于以下文档回答：
${context}

规则：
- 对于涉及 Joel 的问题，请以文档为核心依据，同时可以进行合理分析、总结和推理，使回答更完整、更有洞察力，但不要说废话。
- 对于非 Joel 相关问题，可以自由回答。
- 如果文档未提及某个信息，请回答"文档未提及"。`
}
