<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
async function setLanguage(event: Event) {
  await settingsStore.updateSetting('language', (event.target as HTMLSelectElement).value as 'zh-CN' | 'en-US')
}
</script>

<template>
  <label class="flex flex-col gap-2 text-sm font-medium">
    {{ $t('settings.currentLanguage') }}
    <select :value="settingsStore.settings.language" class="rounded-xl border border-slate-200 bg-white px-3 py-2" @change="setLanguage">
      <option value="zh-CN">简体中文</option>
      <option value="en-US">English</option>
    </select>
  </label>
</template>
