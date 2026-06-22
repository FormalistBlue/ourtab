<script setup lang="ts">
import ImportExportModal from '~/components/import-export/ImportExportModal.vue'
import MainContent from '~/components/layout/MainContent.vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import SettingsModal from '~/components/settings/SettingsModal.vue'
import { useBackground } from '~/composables/useBackground'
import { useTheme } from '~/composables/useTheme'
import { useGroupsStore } from '~/stores/groups'
import { useSettingsStore } from '~/stores/settings'
import { useTabsStore } from '~/stores/tabs'

const groupsStore = useGroupsStore()
const tabsStore = useTabsStore()
const settingsStore = useSettingsStore()
const settingsOpen = ref(false)
const importExportOpen = ref(false)
const { applyTheme } = useTheme()
const { applyBackground } = useBackground()
const { setLocale } = useI18n()

onMounted(async () => {
  await Promise.all([groupsStore.fetchGroups(), tabsStore.fetchTabs(), settingsStore.fetchSettings()])
  applyTheme()
  applyBackground()
  if (settingsStore.settings.language) {
    setLocale(settingsStore.settings.language)
  }
})
</script>

<template>
    <div class="ourtab-shell flex min-h-screen gap-6 pr-4 pt-4 pb-4 md:pr-6 md:pt-6 md:pb-6">
    <Sidebar />
    <MainContent @open-settings="settingsOpen = true" @open-import-export="importExportOpen = true" />
    <SettingsModal v-model:open="settingsOpen" />
    <ImportExportModal v-model:open="importExportOpen" />
  </div>
</template>
