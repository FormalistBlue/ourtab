import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateTabInput, ReorderItem, Tab, UpdateTabInput } from '~/types/ourtab'
import { useGroupsStore } from './groups'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<Tab[]>([])
  const loading = ref(false)
  const groupsStore = useGroupsStore()
  const currentTabs = computed(() => tabs.value.filter((tab) => tab.groupId === groupsStore.currentGroupId))
  const currentRootTabs = computed(() => currentTabs.value.filter((tab) => !tab.folderId).sort((a, b) => a.sortOrder - b.sortOrder))

  function folderTabs(folderId: string) {
    return tabs.value.filter((tab) => tab.folderId === folderId).sort((a, b) => a.sortOrder - b.sortOrder)
  }

  async function fetchTabs() {
    loading.value = true
    try {
      tabs.value = await $fetch<Tab[]>('/api/tabs')
    } finally {
      loading.value = false
    }
  }

  async function createTab(input: CreateTabInput) {
    const tab = await $fetch<Tab>('/api/tabs', { method: 'POST', body: input })
    tabs.value.push(tab)
    return tab
  }

  async function updateTab(id: string, input: UpdateTabInput) {
    const tab = await $fetch<Tab>(`/api/tabs/${id}`, { method: 'PUT', body: input })
    tabs.value = tabs.value.map((item) => item.id === id ? tab : item)
    return tab
  }

  async function deleteTab(id: string) {
    await $fetch(`/api/tabs/${id}`, { method: 'DELETE' })
    tabs.value = tabs.value.filter((tab) => tab.id !== id && tab.folderId !== id)
  }

  async function reorderTabs(items: ReorderItem[]) {
    await $fetch('/api/tabs/reorder', { method: 'PUT', body: { items } })
    tabs.value = tabs.value.map((tab) => {
      const item = items.find((candidate) => candidate.id === tab.id)
      return item ? Object.assign({}, tab, { sortOrder: item.sortOrder }) : tab
    })
  }

  return { tabs, loading, currentTabs, currentRootTabs, folderTabs, fetchTabs, createTab, updateTab, deleteTab, reorderTabs }
})
