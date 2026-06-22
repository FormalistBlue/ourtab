<script setup lang="ts">
import { computed } from 'vue'
import type { Tab } from '~/types/ourtab'
import { useTabsStore } from '~/stores/tabs'
import TabItem from './TabItem.vue'

const props = defineProps<{ folder?: Tab }>()
const open = defineModel<boolean>('open', { default: false })
const tabsStore = useTabsStore()
const children = computed(() => props.folder ? tabsStore.folderTabs(props.folder.id) : [])

function close() { open.value = false }
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open && folder" class="ourtab-modal-overlay" @click.self="close">
        <n-card :title="folder.name" closable segmented style="max-width: 42rem; width: 100%" @close="close">
          <div v-if="children.length" class="grid grid-cols-3 gap-4 sm:grid-cols-5">
            <TabItem v-for="tab in children" :key="tab.id" :tab="tab" />
          </div>
          <p v-else class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">{{ $t('folder.empty') }}</p>
        </n-card>
      </div>
    </Transition>
  </Teleport>
</template>
