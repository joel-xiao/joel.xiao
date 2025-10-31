export interface Message {
  role: 'user' | 'assistant'
  content: string
  isThinking?: boolean
  isTyping?: boolean
}

export interface StaticFile {
  name: string
  url: string
  type: 'pdf' | 'txt' | 'md'
}

export interface TextChunk {
  text: string
  source: string
  score?: number
}

export interface AIModelConfig {
  name: string
  label: string
  endpoint: string
  model: string
  defaultKey?: string
  free?: boolean
}

export type ModelKeySource = 'default' | 'user'
