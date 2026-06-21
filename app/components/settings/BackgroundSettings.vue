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
    <label class="flex flex-col gap-2 text-sm font-medium">
      {{ $t('settings.backgroundType') }}
      <select v-model="localType" class="rounded-xl border border-slate-200 bg-white px-3 py-2">
        <option value="gradient">gradient</option>
        <option value="image">image</option>
        <option value="color">color</option>
      </select>
    </label>
    <label class="flex flex-col gap-2 text-sm font-medium">Value<input v-model="localValue" class="rounded-xl border border-slate-200 bg-white px-3 py-2" /></label>
    <button class="rounded-xl bg-slate-950 px-4 py-2 text-white" type="button" @click="saveBackground">{{ $t('common.save') }}</button>
  </section>
</template>
