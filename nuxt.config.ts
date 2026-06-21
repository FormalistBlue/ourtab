export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'app',
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt'],
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
