<script setup lang="ts">
import { ref } from 'vue'
import { useBackground } from '~/composables/useBackground'

const { background, setBackground } = useBackground()
const localType = ref(background.value.type)
const localValue = ref(background.value.value)
async function saveBackground() {
  await setBackground(localType.value, localValue.value)
}
</script>

<template>
  <section class="flex flex-col gap-3">
    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium">{{ $t('settings.backgroundType') }}</span>
      <n-select v-model:value="localType" :options="[{ label: 'gradient', value: 'gradient' }, { label: 'image', value: 'image' }, { label: 'color', value: 'color' }]" />
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-sm font-medium">Value</span>
      <n-input v-model:value="localValue" />
    </div>
    <n-button type="primary" @click="saveBackground">{{ $t('common.save') }}</n-button>
  </section>
</template>
