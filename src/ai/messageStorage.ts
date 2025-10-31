import type { Message } from './types'

const STORAGE_KEY = 'joel_chat_messages'

export function saveMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }
  catch (e) {
    console.warn('Failed to save messages', e)
  }
}

export function loadMessages(): Message[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    }
    catch {
      console.warn('Failed to parse messages cache')
    }
  }
  return []
}

const MODEL_STORAGE_KEY = 'joel_chat_selected_model'
const MODEL_KEY_STORAGE_KEY = 'joel_chat_model_keys'

export function saveSelectedModel(modelName: string): void {
  try {
    localStorage.setItem(MODEL_STORAGE_KEY, modelName)
  }
  catch (e) {
    console.warn('Failed to save selected model', e)
  }
}

export function loadSelectedModel(): string | null {
  try {
    return localStorage.getItem(MODEL_STORAGE_KEY)
  }
  catch {
    return null
  }
}

export function saveModelKey(modelName: string, key: string): void {
  try {
    const keys = getModelKeys()
    keys[modelName] = key
    localStorage.setItem(MODEL_KEY_STORAGE_KEY, JSON.stringify(keys))
  }
  catch (e) {
    console.warn('Failed to save model key', e)
  }
}

export function getModelKeys(): Record<string, string> {
  try {
    const raw = localStorage.getItem(MODEL_KEY_STORAGE_KEY)
    if (raw)
      return JSON.parse(raw)
  }
  catch {
    console.warn('Failed to parse model keys')
  }
  return {}
}

export function getModelKey(modelName: string): string | null {
  const keys = getModelKeys()
  return keys[modelName] || null
}

const MODEL_NAME_STORAGE_KEY = 'joel_chat_model_names'

export function saveModelName(modelName: string, modelId: string): void {
  try {
    const names = getModelNames()
    names[modelName] = modelId
    localStorage.setItem(MODEL_NAME_STORAGE_KEY, JSON.stringify(names))
  }
  catch (e) {
    console.warn('Failed to save model name', e)
  }
}

export function getModelNames(): Record<string, string> {
  try {
    const raw = localStorage.getItem(MODEL_NAME_STORAGE_KEY)
    if (raw)
      return JSON.parse(raw)
  }
  catch {
    console.warn('Failed to parse model names')
  }
  return {}
}

export function getModelName(modelName: string): string | null {
  const names = getModelNames()
  return names[modelName] || null
}

export function resetModelName(modelName: string): void {
  try {
    const names = getModelNames()
    delete names[modelName]
    localStorage.setItem(MODEL_NAME_STORAGE_KEY, JSON.stringify(names))
  }
  catch (e) {
    console.warn('Failed to reset model name', e)
  }
}
