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

  it('applies gradient and image backgrounds', () => {
    const settings = useSettingsStore()
    settings.settings = structuredClone(defaultSettings)
    const { applyBackground } = useBackground()
    applyBackground()
    expect(document.documentElement.style.getPropertyValue('--ourtab-background')).toContain('linear-gradient')
    settings.settings.background = { type: 'image', value: 'https://example.com/wallpaper.jpg' }
    applyBackground()
    expect(document.documentElement.style.getPropertyValue('--ourtab-background')).toBe('url("https://example.com/wallpaper.jpg") center / cover no-repeat')
  })

  it('renders settings panels when opened', () => {
    const wrapper = mount(SettingsModal, { props: { open: true }, global: { mocks: { $t: (key: string) => key } } })
    expect(wrapper.text()).toContain('settings.title')
    expect(wrapper.text()).toContain('settings.search')
    expect(wrapper.text()).toContain('settings.theme')
    expect(wrapper.text()).toContain('settings.language')
    expect(wrapper.text()).toContain('settings.background')
  })
})
