import { ref } from 'vue'
import { defineStore } from 'pinia'
import { defaultSettings } from '~/constants/defaults'
import type { AppSettings } from '~/types/ourtab'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AppSettings>(structuredClone(defaultSettings))
  const loading = ref(false)

  async function fetchSettings() {
    loading.value = true
    try {
      settings.value = await $fetch<AppSettings>('/api/settings')
    } finally {
      loading.value = false
    }
  }

  async function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    const updated = await $fetch<AppSettings[K]>(`/api/settings/${String(key)}`, { method: 'PUT', body: { key, value } })
    settings.value = Object.assign({}, settings.value, { [key]: updated })
    return updated
  }

  return { settings, loading, fetchSettings, updateSetting }
})
