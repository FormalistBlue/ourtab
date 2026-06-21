import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import SettingsModal from '~/components/settings/SettingsModal.vue'
import { useBackground } from '~/composables/useBackground'
import { useTheme } from '~/composables/useTheme'
import { defaultSettings } from '~/constants/defaults'
import { useSettingsStore } from '~/stores/settings'

describe('settings, theme, and background', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.removeAttribute('style')
  })

  it('applies theme variables to the document root', () => {
    useTheme().applyTheme('neon')
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#22d3ee')
    expect(document.documentElement.style.getPropertyValue('--tabItem-hoverEffect')).toBe('translateY(-4px) scale(1.02)')
  })

  it('applies gradient, image, and color backgrounds', () => {
    const settings = useSettingsStore()
    settings.settings = structuredClone(defaultSettings)
    const { applyBackground } = useBackground()
    applyBackground()
    expect(document.documentElement.style.getPropertyValue('--ourtab-background')).toContain('linear-gradient')
    settings.settings.background = { type: 'image', value: 'https://example.com/wallpaper.jpg' }
    applyBackground()
    expect(document.documentElement.style.getPropertyValue('--ourtab-background')).toBe('url("https://example.com/wallpaper.jpg") center / cover no-repeat')
    settings.settings.background = { type: 'color', value: '#ff0000' }
    applyBackground()
    expect(document.documentElement.style.getPropertyValue('--ourtab-background')).toBe('#ff0000')
  })

  it('renders settings panels when opened', () => {
    const translations: Record<string, string> = {
      'settings.title': 'Settings',
      'settings.search': 'Search',
      'settings.theme': 'Theme',
      'settings.language': 'Language',
      'settings.background': 'Background',
    }
    const wrapper = mount(SettingsModal, { props: { open: true }, global: { mocks: { $t: (key: string) => translations[key] ?? key } } })
    expect(wrapper.text()).toContain('Settings')
    expect(wrapper.text()).toContain('Search')
    expect(wrapper.text()).toContain('Theme')
    expect(wrapper.text()).toContain('Language')
    expect(wrapper.text()).toContain('Background')
  })
})
