import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app',
  serverDir: 'server',
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxtjs-naive-ui'],
  vite: {
    plugins: [
      tailwindcss(),
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  runtimeConfig: {
    databasePath: process.env.DATABASE_PATH || './data/ourtab.db',
    public: {
      appName: 'ourTab',
    },
  },
  i18n: {
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
    restructureDir: false,
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    langDir: 'i18n/locales',
  },
  typescript: {
    strict: true,
  },
})
