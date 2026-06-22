<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSettingsStore } from '~/stores/settings'
import { buildSearchUrl } from '~/utils/search'

const settingsStore = useSettingsStore()
const query = ref('')
const selectedEngineId = ref(settingsStore.settings.search_engine)
const selectedEngine = computed(() => settingsStore.settings.search_engines.find((engine) => engine.id === selectedEngineId.value) || settingsStore.settings.search_engines[0])

function submitSearch() {
  if (!query.value.trim() || !selectedEngine.value) return
  window.open(buildSearchUrl(query.value, selectedEngine.value), '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <form
    class="flex h-[var(--searchBar-height)] w-[var(--searchBar-width)] items-center gap-3 px-4 backdrop-blur-xl transition-all duration-300"
    :style="{
      background: 'var(--searchBar-background)',
      borderRadius: 'var(--searchBar-borderRadius)',
      boxShadow: 'var(--searchBar-shadow)',
    }"
    @submit.prevent="submitSearch"
  >
    <n-select
      v-model:value="selectedEngineId"
      :options="settingsStore.settings.search_engines.map(e => ({ label: e.name, value: e.id }))"
      class="w-28 shrink-0"
      :style="{ minWidth: 0, maxWidth: '7rem' }"
      :bordered="false"
      size="small"
    />
    <n-input
      v-model:value="query"
      :placeholder="$t('search.placeholder')"
      class="flex-1"
      :bordered="false"
    />
    <button
      type="submit"
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-textSecondary)] transition-colors hover:text-[var(--color-primary)]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </button>
  </form>
</template>

<style scoped>
:deep(.n-select) {
  --n-color: transparent !important;
  --n-color-active: transparent !important;
  --n-color-disabled: transparent !important;
  --n-border: none !important;
  --n-border-active: none !important;
  --n-border-hover: none !important;
  --n-border-disabled: none !important;
  --n-box-shadow-active: none !important;
  --n-box-shadow-focus: none !important;
  --n-box-shadow-hover: none !important;
  --n-caret-color: var(--color-primary) !important;
  --n-placeholder-color: var(--color-textPlaceholder) !important;
  --n-text-color: var(--color-textPrimary) !important;
  --n-text-color-disabled: var(--color-textSecondary) !important;
  --n-peer-placeholder-color: var(--color-textPlaceholder) !important;
  min-width: 0 !important;
  max-width: 7rem !important;
}

:deep(.n-select .n-base-selection) {
  min-width: 0 !important;
}

:deep(.n-select .n-base-selection-label) {
  min-width: 0 !important;
}

:deep(.n-input) {
  --n-color: transparent !important;
  --n-color-focus: transparent !important;
  --n-color-disabled: transparent !important;
  --n-border: none !important;
  --n-border-focus: none !important;
  --n-border-hover: none !important;
  --n-border-disabled: none !important;
  --n-box-shadow-focus: none !important;
  --n-box-shadow-hover: none !important;
  --n-caret-color: var(--color-primary) !important;
  --n-placeholder-color: var(--color-textPlaceholder) !important;
  --n-text-color: var(--color-textPrimary) !important;
  --n-text-color-disabled: var(--color-textSecondary) !important;
}
</style>
