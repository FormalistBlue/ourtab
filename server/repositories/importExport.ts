import { defaultSettings } from '../../app/constants/defaults'
import type { ExportPayload } from '../../app/types/ourtab'
import type { OurTabDatabase } from '../database/client'
import { groups, settings, tabs } from '../database/schema'
import { listGroups } from './groups'
import { getSettings } from './settings'
import { listTabs } from './tabs'

export function exportAllData(db: OurTabDatabase): ExportPayload {
  return { version: '1.0', exportedAt: new Date().toISOString(), groups: listGroups(db), tabs: listTabs(db), settings: getSettings(db) }
}

export function replaceAllData(db: OurTabDatabase, payload: ExportPayload): ExportPayload {
  db.transaction((tx) => {
    tx.delete(settings).run()
    tx.delete(tabs).run()
    tx.delete(groups).run()
    for (const group of payload.groups) tx.insert(groups).values(group).run()
    for (const tab of payload.tabs) tx.insert(tabs).values(tab).run()
    const mergedSettings = Object.assign(structuredClone(defaultSettings), payload.settings)
    for (const [key, value] of Object.entries(mergedSettings)) tx.insert(settings).values({ key, value: JSON.stringify(value), updatedAt: new Date().toISOString() }).run()
  })
  return exportAllData(db)
}
