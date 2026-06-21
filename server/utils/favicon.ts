export function resolveFavicon(url: string): string {
  const domain = new URL(url).hostname
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}
