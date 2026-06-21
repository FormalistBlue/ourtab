import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('project scaffold', () => {
  it('uses Nuxt with required modules and scripts', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
    const nuxtConfig = readFileSync('nuxt.config.ts', 'utf8')

    expect(packageJson.scripts).toMatchObject({
      dev: 'nuxt dev',
      build: 'nuxt build',
      preview: 'nuxt preview',
      test: 'vitest run',
    })
    expect(packageJson.dependencies.nuxt).toContain('3')
    expect(nuxtConfig).toContain("srcDir: 'app'")
    expect(nuxtConfig).toContain("'@pinia/nuxt'")
    expect(nuxtConfig).toContain("'@nuxtjs/i18n'")
    expect(nuxtConfig).toContain("'@vueuse/nuxt'")
    expect(nuxtConfig).toContain('databasePath')
  })

  it('has app shell, CSS entry, shadcn config, and both locale files', () => {
    expect(readFileSync('app/app.vue', 'utf8')).toContain('<NuxtLayout>')
    expect(readFileSync('app/layouts/default.vue', 'utf8')).toContain('<slot />')
    expect(readFileSync('app/assets/css/main.css', 'utf8')).toContain('--ourtab-background')
    expect(readFileSync('app/i18n/locales/zh-CN.json', 'utf8')).toContain('settings')
    expect(readFileSync('app/i18n/locales/en-US.json', 'utf8')).toContain('settings')
    expect(existsSync('components.json')).toBe(true)
  })
})
