import { existsSync } from 'node:fs'
import path from 'node:path'

const EXTS = ['png', 'svg', 'webp', 'jpg', 'jpeg'] as const

/**
 * Server-only. Procura uma imagem em web/public/corporations/{key}.{ext}
 * e retorna o path web (`/corporations/...`) se achar, ou null.
 */
export function findCorpLogo(key: string): string | null {
  const base = key.toLowerCase()
  for (const ext of EXTS) {
    const fsPath = path.join(process.cwd(), 'public', 'corporations', `${base}.${ext}`)
    if (existsSync(fsPath)) return `/corporations/${base}.${ext}`
  }
  return null
}
