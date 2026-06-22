<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
async function setEngine(value: string) {
  await settingsStore.updateSetting('search_engine', value)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="text-sm font-medium">{{ $t('settings.searchEngine') }}</span>
    <n-select :value="settingsStore.settings.search_engine" :options="settingsStore.settings.search_engines.map(e => ({ label: e.name, value: e.id }))" @update:value="setEngine" />
  </div>
</template>
