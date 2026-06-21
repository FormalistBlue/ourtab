<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { currentTheme, themes, setTheme } = useTheme()
</script>

<template>
  <section class="flex flex-col gap-3">
    <h3 class="font-semibold">{{ $t('settings.currentTheme') }}</h3>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <button v-for="theme in Object.values(themes)" :key="theme.name" class="rounded-2xl border p-4 text-left" :class="theme.name === currentTheme ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white'" type="button" @click="setTheme(theme.name)">
        {{ theme.label }}
      </button>
    </div>
  </section>
</template>
