<script setup lang="ts">
import ContextMenu from '@imengyu/vue3-context-menu'
import type { Tab } from '~/types/ourtab'

const props = defineProps<{ tab: Tab }>()
const emit = defineEmits<{ edit: [tab: Tab]; delete: [tab: Tab] }>()

function openTab() {
  window.open(props.tab.url, '_blank', 'noopener,noreferrer')
}

function openMenu(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  ContextMenu.showContextMenu({
    x: event.clientX,
    y: event.clientY,
    items: [
      { label: '编辑', onClick: () => emit('edit', props.tab) },
      { label: '删除', onClick: () => emit('delete', props.tab) },
    ],
  })
}
</script>

<template>
  <button class="flex h-[var(--tabItem-height)] w-[var(--tabItem-width)] flex-col items-center justify-center gap-2 rounded-3xl border border-white/40 bg-white/70 p-3 shadow-xl backdrop-blur-xl transition hover:-translate-y-1" type="button" @click="openTab" @contextmenu="openMenu">
    <span class="flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-white/70">
      <img v-if="tab.icon && tab.icon.startsWith('http')" :src="tab.icon" :alt="tab.name" class="size-8 object-contain" @error="($event.target as HTMLImageElement).style.display='none'">
      <span v-else class="text-lg font-bold text-[var(--color-primary)]">{{ tab.icon || tab.name.slice(0, 1) }}</span>
    </span>
    <span class="max-w-full truncate text-sm font-medium">{{ tab.name }}</span>
  </button>
</template>
