import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('API route files', () => {
  it('defines group CRUD and reorder routes', () => {
    expect(readFileSync('server/api/groups/index.get.ts', 'utf8')).toContain('listGroups(getDatabase())')
    expect(readFileSync('server/api/groups/index.post.ts', 'utf8')).toContain('createGroup(getDatabase(), input)')
    expect(readFileSync('server/api/groups/[id].get.ts', 'utf8')).toContain('getGroup(getDatabase(), id)')
    expect(readFileSync('server/api/groups/[id].put.ts', 'utf8')).toContain('updateGroup(getDatabase(), id, input)')
    expect(readFileSync('server/api/groups/[id].delete.ts', 'utf8')).toContain('deleteGroup(getDatabase(), id)')
    expect(readFileSync('server/api/groups/reorder.put.ts', 'utf8')).toContain('reorderGroups(getDatabase(), input.items)')
  })

  it('defines tab CRUD and reorder routes with favicon resolution', () => {
    expect(readFileSync('server/api/tabs/index.get.ts', 'utf8')).toContain('listTabs(getDatabase())')
    expect(readFileSync('server/api/tabs/index.post.ts', 'utf8')).toContain('resolveFavicon(input.url)')
    expect(readFileSync('server/api/tabs/[id].get.ts', 'utf8')).toContain('getTab(getDatabase(), id)')
    expect(readFileSync('server/api/tabs/[id].put.ts', 'utf8')).toContain('updateTab(getDatabase(), id, input)')
    expect(readFileSync('server/api/tabs/[id].delete.ts', 'utf8')).toContain('deleteTab(getDatabase(), id)')
    expect(readFileSync('server/api/tabs/reorder.put.ts', 'utf8')).toContain('reorderTabs(getDatabase(), input.items)')
  })

  it('defines settings routes with keyed updates', () => {
    expect(readFileSync('server/api/settings/index.get.ts', 'utf8')).toContain('getSettings(getDatabase())')
    expect(readFileSync('server/api/settings/[key].put.ts', 'utf8')).toContain('updateSetting(getDatabase(), parsed.key, parsed.value)')
  })
})
