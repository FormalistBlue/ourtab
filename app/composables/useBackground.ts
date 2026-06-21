import { computed } from 'vue'
import { useSettingsStore } from '~/stores/settings'

export function useBackground() {
  const settingsStore = useSettingsStore()
  const background = computed(() => settingsStore.settings.background)

  function applyBackground() {
    const setting = background.value
    const value = setting.type === 'image' ? `url("${setting.value}") center / cover no-repeat` : setting.value
    document.documentElement.style.setProperty('--ourtab-background', value)
  }

  async function setBackground(type: 'gradient' | 'image' | 'color', value: string) {
    await settingsStore.updateSetting('background', { type, value })
    applyBackground()
  }

  return { background, applyBackground, setBackground }
}
