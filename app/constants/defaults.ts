import type { AppSettings, ThemeConfig } from '~/types/ourtab'

export const defaultSettings: AppSettings = {
  search_engine: 'google',
  search_engines: [
    { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
    { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  ],
  theme: 'default',
  language: 'zh-CN',
  background: { type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  sidebar_collapsed: false,
}

function makeTheme(name: string, label: string, primary: string, background: string, surface: string): ThemeConfig {
  return {
    name,
    label,
    colors: { primary, secondary: '#0f172a', accent: '#14b8a6', background, surface, text: '#0f172a', textSecondary: '#64748b', border: 'rgba(148, 163, 184, 0.35)', success: '#16a34a', warning: '#f59e0b', error: '#dc2626' },
    components: {
      sidebar: { width: '5rem', background: 'rgba(15, 23, 42, 0.42)', blur: '18px', borderRadius: '1.5rem' },
      searchBar: { width: 'min(42rem, 90vw)', height: '3.5rem', background: 'rgba(255, 255, 255, 0.82)', borderRadius: '999px', shadow: '0 24px 80px rgba(15, 23, 42, 0.18)' },
      tabItem: { width: '6rem', height: '6.5rem', background: 'rgba(255, 255, 255, 0.72)', borderRadius: '1.35rem', shadow: '0 18px 45px rgba(15, 23, 42, 0.16)', hoverEffect: 'translateY(-4px) scale(1.02)' },
      folderModal: { background: 'rgba(255, 255, 255, 0.9)', blur: '24px', borderRadius: '1.75rem' },
      settingsModal: { width: 'min(58rem, 94vw)', background: 'rgba(255, 255, 255, 0.94)', blur: '24px' },
    },
    animations: { tabHover: 'power2.out', tabClick: 'back.out(1.8)', modalEnter: 'power3.out', modalLeave: 'power2.in', sidebarToggle: 'power2.inOut' },
  }
}

export const themes: Record<string, ThemeConfig> = {
  default: makeTheme('default', 'Default', '#4f46e5', '#f8fafc', 'rgba(255, 255, 255, 0.78)'),
  dark: makeTheme('dark', 'Dark', '#38bdf8', '#020617', 'rgba(15, 23, 42, 0.78)'),
  minimal: makeTheme('minimal', 'Minimal', '#111827', '#f7f3ea', 'rgba(255, 255, 255, 0.88)'),
  glass: makeTheme('glass', 'Glass', '#0ea5e9', '#e0f2fe', 'rgba(255, 255, 255, 0.52)'),
  neon: makeTheme('neon', 'Neon', '#22d3ee', '#111827', 'rgba(17, 24, 39, 0.72)'),
}
