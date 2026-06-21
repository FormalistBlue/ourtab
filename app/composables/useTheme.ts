import { computed } from 'vue'
import { themes } from '~/constants/defaults'
import { useSettingsStore } from '~/stores/settings'

export function useTheme() {
  const settingsStore = useSettingsStore()
  const currentTheme = computed(() => settingsStore.settings.theme || 'default')

  function applyTheme(themeName = currentTheme.value) {
    const theme = themes[themeName] || themes.default
    const root = document.documentElement
    for (const [key, value] of Object.entries(theme.colors)) root.style.setProperty(`--color-${key}`, value)
    for (const [component, styles] of Object.entries(theme.components)) {
      for (const [key, value] of Object.entries(styles)) root.style.setProperty(`--${component}-${key}`, value)
    }
  }

  async function setTheme(themeName: string) {
    if (!themes[themeName]) return
    await settingsStore.updateSetting('theme', themeName)
    applyTheme(themeName)
  }

  return { currentTheme, themes, applyTheme, setTheme }
}
