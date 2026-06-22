<script setup lang="ts">
import { ref } from 'vue'
import BackgroundSettings from './BackgroundSettings.vue'
import LanguageSettings from './LanguageSettings.vue'
import SearchSettings from './SearchSettings.vue'
import ThemeSettings from './ThemeSettings.vue'

const open = defineModel<boolean>('open', { default: false })
const activePanel = ref<'search' | 'theme' | 'language' | 'background'>('search')
const panels = [
  { id: 'search', label: 'settings.search' },
  { id: 'theme', label: 'settings.theme' },
  { id: 'language', label: 'settings.language' },
  { id: 'background', label: 'settings.background' },
] as const
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="settings-overlay" @click.self="open = false">
      <div class="settings-drawer" :style="{ background: 'var(--settingsModal-background, rgba(255,255,255,0.94))', backdropFilter: 'blur(var(--settingsModal-blur, 24px))' }">
        <div class="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h2 class="text-base font-semibold text-[var(--color-text)]">{{ $t('settings.title') }}</h2>
          <button class="settings-close-btn" @click="open = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <div class="flex flex-1 overflow-hidden">
          <nav class="settings-nav shrink-0 border-r border-[var(--color-border)] py-2">
            <button
              v-for="panel in panels"
              :key="panel.id"
              class="settings-nav-item"
              :class="{ 'settings-nav-item--active': activePanel === panel.id }"
              @click="activePanel = panel.id"
            >
              {{ $t(panel.label) }}
            </button>
          </nav>
          <section class="flex-1 overflow-y-auto p-5">
            <SearchSettings v-if="activePanel === 'search'" />
            <ThemeSettings v-if="activePanel === 'theme'" />
            <LanguageSettings v-if="activePanel === 'language'" />
            <BackgroundSettings v-if="activePanel === 'background'" />
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: flex-end;
}

.settings-drawer {
  width: min(58rem, 94vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
}

.settings-nav {
  width: 140px;
  display: flex;
  flex-direction: column;
}

.settings-nav-item {
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  font-size: 0.875rem;
  color: var(--color-textSecondary);
  transition: all 0.15s ease;
  border-left: 2px solid transparent;
}

.settings-nav-item:hover {
  color: var(--color-text);
  background: rgba(148, 163, 184, 0.12);
}

.settings-nav-item--active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  background: rgba(148, 163, 184, 0.2);
  font-weight: 500;
}

.settings-close-btn {
  display: flex;
  height: 1.75rem;
  width: 1.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: var(--color-textSecondary);
  transition: all 0.15s ease;
}

.settings-close-btn:hover {
  background: rgba(148, 163, 184, 0.15);
  color: var(--color-text);
}
</style>
