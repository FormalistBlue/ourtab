import type { SearchEngine } from '~/types/ourtab'

export function buildSearchUrl(query: string, engine: SearchEngine): string {
  return `${engine.url}${encodeURIComponent(query.trim())}`
}
