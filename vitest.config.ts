import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const appDir = fileURLToPath(new URL('./app', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': appDir,
      '@': appDir,
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    clearMocks: true,
    restoreMocks: true,
  },
})
