<script setup lang="ts">
import { computed, h } from 'vue'
import { useGroupsStore } from '~/stores/groups'
import { useSettingsStore } from '~/stores/settings'

const groupsStore = useGroupsStore()
const settingsStore = useSettingsStore()

const menuOptions = computed(() =>
  groupsStore.groups.map(group => ({
    label: group.name,
    key: group.id,
    icon: group.icon ? () => h('span', { class: 'text-lg' }, group.icon) : undefined,
  })),
)

function handleSelect(key: string) {
  groupsStore.currentGroupId = key
}

function wheelSwitch(event: WheelEvent) {
  if (groupsStore.groups.length < 2) return
  const currentIndex = groupsStore.groups.findIndex((group) => group.id === groupsStore.currentGroupId)
  const direction = event.deltaY > 0 ? 1 : -1
  const nextIndex = (currentIndex + direction + groupsStore.groups.length) % groupsStore.groups.length
  groupsStore.currentGroupId = groupsStore.groups[nextIndex].id
}
</script>

<template>
  <aside
    class="sidebar-root flex shrink-0 flex-col backdrop-blur-xl"
    :style="{
      width: 'var(--sidebar-width)',
      background: 'var(--sidebar-background)',
      borderRadius: 'var(--sidebar-borderRadius)',
    }"
    @wheel.prevent="wheelSwitch"
  >
    <div class="px-3 pt-3 pb-2">
      <strong class="text-xs tracking-[0.25em] text-white">ourTab</strong>
    </div>
    <n-menu
      :value="groupsStore.currentGroupId"
      :options="menuOptions"
      :collapsed="settingsStore.settings.sidebar_collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      @update:value="handleSelect"
    />
  </aside>
</template>

<style scoped>
.sidebar-root {
  --sidebar-menu-bg: transparent;
  --sidebar-menu-bg-hover: rgba(255, 255, 255, 0.1);
  --sidebar-menu-bg-active: rgba(255, 255, 255, 0.18);
  --sidebar-menu-text: rgba(255, 255, 255, 0.78);
  --sidebar-menu-text-hover: #ffffff;
  --sidebar-menu-text-active: #ffffff;
  --sidebar-menu-icon: rgba(255, 255, 255, 0.78);
  --sidebar-menu-icon-hover: #ffffff;
  --sidebar-menu-icon-active: #ffffff;
  --sidebar-menu-arrow: rgba(255, 255, 255, 0.5);
  --sidebar-menu-arrow-hover: #ffffff;
  --sidebar-menu-arrow-active: #ffffff;
}

:deep(.n-menu) {
  --n-color: var(--sidebar-menu-bg) !important;
  --n-item-text-color: var(--sidebar-menu-text) !important;
  --n-item-text-color-hover: var(--sidebar-menu-text-hover) !important;
  --n-item-text-color-active: var(--sidebar-menu-text-active) !important;
  --n-item-icon-color: var(--sidebar-menu-icon) !important;
  --n-item-icon-color-hover: var(--sidebar-menu-icon-hover) !important;
  --n-item-icon-color-active: var(--sidebar-menu-icon-active) !important;
  --n-item-color-active: var(--sidebar-menu-bg-active) !important;
  --n-item-color-hover: var(--sidebar-menu-bg-hover) !important;
  --n-arrow-color: var(--sidebar-menu-arrow) !important;
  --n-arrow-color-hover: var(--sidebar-menu-arrow-hover) !important;
  --n-arrow-color-active: var(--sidebar-menu-arrow-active) !important;
  --n-item-text-color-child-active: var(--sidebar-menu-text-active) !important;
  --n-item-icon-color-child-active: var(--sidebar-menu-icon-active) !important;
}
</style>
