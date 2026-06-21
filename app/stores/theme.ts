import { computed } from 'vue'
import { defineStore } from 'pinia'
import { themes } from '~/constants/defaults'
import { useSettingsStore } from './settings'

export const useThemeStore = defineStore('theme', () => {
  const settingsStore = useSettingsStore()
  const availableThemes = computed(() => Object.values(themes))
  const currentTheme = computed(() => settingsStore.settings.theme || 'default')

  async function setTheme(themeName: string) {
    if (!themes[themeName]) return currentTheme.value
    await settingsStore.updateSetting('theme', themeName)
    return themeName
  }

  return { availableThemes, currentTheme, setTheme }
})
