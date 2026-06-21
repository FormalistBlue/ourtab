import { describe, expect, it } from 'vitest'
import { defaultSettings, themes } from '~/constants/defaults'
import { buildSearchUrl } from '~/utils/search'
import { createGroupSchema, createTabSchema, updateSettingSchema } from '~/utils/validators'

describe('ourTab shared contracts', () => {
  it('defines default settings from the design spec', () => {
    expect(defaultSettings.search_engine).toBe('google')
    expect(defaultSettings.search_engines.map((engine) => engine.id)).toEqual(['google', 'bing', 'duckduckgo'])
    expect(defaultSettings.theme).toBe('default')
    expect(defaultSettings.language).toBe('zh-CN')
    expect(defaultSettings.background).toEqual({ type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' })
    expect(defaultSettings.sidebar_collapsed).toBe(false)
  })

  it('ships the five theme names from the design spec', () => {
    expect(Object.keys(themes)).toEqual(['default', 'dark', 'minimal', 'glass', 'neon'])
  })

  it('validates group, tab, and setting input', () => {
    expect(createGroupSchema.parse({ name: 'Work', icon: 'briefcase' }).name).toBe('Work')
    expect(() => createGroupSchema.parse({ name: '' })).toThrow()
    expect(createTabSchema.parse({ groupId: 'g1', name: 'GitHub', url: 'https://github.com', iconType: 'auto', isFolder: false, folderId: null }).iconType).toBe('auto')
    expect(() => createTabSchema.parse({ groupId: 'g1', name: 'Bad', url: 'not-a-url' })).toThrow()
    expect(updateSettingSchema.parse({ key: 'language', value: 'en-US' })).toEqual({ key: 'language', value: 'en-US' })
    expect(() => updateSettingSchema.parse({ key: 'language', value: 'fr-FR' })).toThrow()
  })

  it('builds encoded search URLs', () => {
    expect(buildSearchUrl('nuxt drizzle orm', defaultSettings.search_engines[0])).toBe('https://www.google.com/search?q=nuxt%20drizzle%20orm')
  })
})
