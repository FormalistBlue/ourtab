import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreateGroupInput, Group, ReorderItem, UpdateGroupInput } from '~/types/ourtab'

export const useGroupsStore = defineStore('groups', () => {
  const groups = ref<Group[]>([])
  const currentGroupId = ref('')
  const loading = ref(false)

  async function fetchGroups() {
    loading.value = true
    try {
      groups.value = await $fetch<Group[]>('/api/groups')
      if (!currentGroupId.value && groups.value[0]) currentGroupId.value = groups.value[0].id
    } finally {
      loading.value = false
    }
  }

  async function createGroup(input: CreateGroupInput) {
    const group = await $fetch<Group>('/api/groups', { method: 'POST', body: input })
    groups.value.push(group)
    if (!currentGroupId.value) currentGroupId.value = group.id
    return group
  }

  async function updateGroup(id: string, input: UpdateGroupInput) {
    const group = await $fetch<Group>(`/api/groups/${id}`, { method: 'PUT', body: input })
    groups.value = groups.value.map((item) => item.id === id ? group : item)
    return group
  }

  async function deleteGroup(id: string) {
    await $fetch(`/api/groups/${id}`, { method: 'DELETE' })
    groups.value = groups.value.filter((group) => group.id !== id)
    if (currentGroupId.value === id) currentGroupId.value = groups.value[0]?.id || ''
  }

  async function reorderGroups(items: ReorderItem[]) {
    await $fetch('/api/groups/reorder', { method: 'PUT', body: { items } })
    groups.value = groups.value.map((group) => {
      const item = items.find((candidate) => candidate.id === group.id)
      return item ? Object.assign({}, group, { sortOrder: item.sortOrder }) : group
    }).sort((a, b) => a.sortOrder - b.sortOrder)
  }

  return { groups, currentGroupId, loading, fetchGroups, createGroup, updateGroup, deleteGroup, reorderGroups }
})
