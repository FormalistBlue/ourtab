import { describe, expect, it } from 'vitest'
import { createDatabase } from '../../server/database/client'
import { exportAllData, replaceAllData } from '../../server/repositories/importExport'
import { createGroup } from '../../server/repositories/groups'
import { updateSetting } from '../../server/repositories/settings'
import { createTab } from '../../server/repositories/tabs'

describe('import and export repository', () => {
  it('exports groups, tabs, settings, and version metadata', () => {
    const db = createDatabase(':memory:').db
    const group = createGroup(db, { name: 'Work' })
    createTab(db, { groupId: group.id, name: 'GitHub', url: 'https://github.com', iconType: 'auto', icon: null, isFolder: false, folderId: null })
    updateSetting(db, 'language', 'en-US')

    const payload = exportAllData(db)

    expect(payload.version).toBe('1.0')
    expect(payload.groups.map((item) => item.name)).toEqual(['Work'])
    expect(payload.tabs.map((item) => item.name)).toEqual(['GitHub'])
    expect(payload.settings.language).toBe('en-US')
    expect(payload.exportedAt).toMatch(/T/)
  })

  it('replaces all database rows from an import payload', () => {
    const sourceDb = createDatabase(':memory:').db
    const targetDb = createDatabase(':memory:').db
    const group = createGroup(sourceDb, { name: 'Imported' })
    createTab(sourceDb, { groupId: group.id, name: 'Nuxt', url: 'https://nuxt.com', iconType: 'auto', icon: null, isFolder: false, folderId: null })

    const imported = replaceAllData(targetDb, exportAllData(sourceDb))

    expect(imported.groups.map((item) => item.name)).toEqual(['Imported'])
    expect(imported.tabs.map((item) => item.name)).toEqual(['Nuxt'])
  })
})
