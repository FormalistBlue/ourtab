<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { currentTheme, themes, setTheme } = useTheme()
</script>

<template>
  <section class="flex flex-col gap-3">
    <h3 class="font-semibold">{{ $t('settings.currentTheme') }}</h3>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <n-button
        v-for="theme in Object.values(themes)"
        :key="theme.name"
        :type="theme.name === currentTheme ? 'primary' : 'default'"
        class="h-auto justify-start p-4 text-left"
        @click="setTheme(theme.name)"
      >
        {{ theme.label }}
      </n-button>
    </div>
  </section>
</template>
