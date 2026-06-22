<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
const { setLocale } = useI18n()
async function setLanguage(value: string) {
  const locale = value as 'zh-CN' | 'en-US'
  await settingsStore.updateSetting('language', locale)
  setLocale(locale)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-sm font-medium">{{ $t('settings.currentLanguage') }}</span>
    <n-select :value="settingsStore.settings.language" :options="[{ label: '简体中文', value: 'zh-CN' }, { label: 'English', value: 'en-US' }]" @update:value="setLanguage" />
  </div>
</template>
