<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
async function setEngine(event: Event) {
  await settingsStore.updateSetting('search_engine', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <label class="flex flex-col gap-2 text-sm font-medium">
    {{ $t('settings.searchEngine') }}
    <select :value="settingsStore.settings.search_engine" class="rounded-xl border border-slate-200 bg-white px-3 py-2" @change="setEngine">
      <option v-for="engine in settingsStore.settings.search_engines" :key="engine.id" :value="engine.id">{{ engine.name }}</option>
    </select>
  </label>
</template>
