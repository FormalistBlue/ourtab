<script setup lang="ts">
import { ref } from 'vue'
import BackgroundSettings from './BackgroundSettings.vue'
import LanguageSettings from './LanguageSettings.vue'
import SearchSettings from './SearchSettings.vue'
import ThemeSettings from './ThemeSettings.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [open: boolean] }>()
const activePanel = ref<'search' | 'theme' | 'language' | 'background'>('search')
const panels = [{ id: 'search', label: 'settings.search' }, { id: 'theme', label: 'settings.theme' }, { id: 'language', label: 'settings.language' }, { id: 'background', label: 'settings.background' }] as const
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="emit('update:open', false)">
    <section class="grid w-[var(--settingsModal-width)] gap-5 rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur-2xl md:grid-cols-[13rem_1fr]">
      <aside class="flex flex-row gap-2 md:flex-col">
        <h2>{{ $t('settings.title') }}</h2>
        <button v-for="panel in panels" :key="panel.id" class="rounded-2xl px-4 py-3 text-left text-sm" :class="activePanel === panel.id ? 'bg-slate-950 text-white' : 'bg-white text-slate-700'" type="button" @click="activePanel = panel.id">{{ $t(panel.label) }}</button>
      </aside>
      <section class="rounded-2xl bg-white/70 p-5">
        <SearchSettings v-if="activePanel === 'search'" />
        <ThemeSettings v-if="activePanel === 'theme'" />
        <LanguageSettings v-if="activePanel === 'language'" />
        <BackgroundSettings v-if="activePanel === 'background'" />
      </section>
    </section>
  </div>
</template>
