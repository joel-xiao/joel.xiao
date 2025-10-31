import type { StaticFile, TextChunk } from './types'

export const STATIC_FILES: StaticFile[] = [
  { name: 'Resume.pdf', url: '/resume/JoelXiao_FullStackFrontend_Resume.pdf', type: 'pdf' },
  { name: 'PMP.pdf', url: '/resume/PMP-肖文龙.pdf', type: 'pdf' },
  { name: 'Frontend-5years.txt', url: '/resume/前端开发-5年-肖文龙.txt', type: 'txt' },
  { name: 'Fullstack-6years.md', url: '/resume/全栈前端工程师-肖文龙-6年.md', type: 'md' },
]

export function cleanText(text: string, type: string): string {
  let t = text
  if (type === 'md')
    t = t.replace(/[#>*_`~\-]/g, '')
  return t.replace(/<[^>]+>/g, '').replace(/\n{2,}/g, '\n').trim()
}

export async function loadFile(f: StaticFile): Promise<TextChunk | null> {
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
      return { text: cleanText(txt, f.type), source: f.name }
    }
  }
  catch (e) {
    console.warn('Load failed', f.name, e)
  }
  return null
}

export async function loadAllFiles(): Promise<TextChunk[]> {
  const chunks: TextChunk[] = []
  for (const f of STATIC_FILES) {
    const chunk = await loadFile(f)
    if (chunk)
      chunks.push(chunk)
  }
  return chunks
}
