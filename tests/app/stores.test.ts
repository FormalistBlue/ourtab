import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defaultSettings } from '~/constants/defaults'
import { useGroupsStore } from '~/stores/groups'
import { useSettingsStore } from '~/stores/settings'
import { useTabsStore } from '~/stores/tabs'

const fetchMock = vi.fn()
vi.stubGlobal('$fetch', fetchMock)

describe('Pinia stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetchMock.mockReset()
  })

  it('fetches groups and selects the first group by default', async () => {
    fetchMock.mockResolvedValueOnce([{ id: 'g1', name: 'Work', icon: null, sortOrder: 0, createdAt: 'now', updatedAt: 'now' }])
    const groups = useGroupsStore()
    await groups.fetchGroups()
    expect(fetchMock).toHaveBeenCalledWith('/api/groups')
    expect(groups.currentGroupId).toBe('g1')
    expect(groups.groups[0].name).toBe('Work')
  })

  it('derives current root tabs from the selected group', async () => {
    const groups = useGroupsStore()
    groups.currentGroupId = 'g1'
    fetchMock.mockResolvedValueOnce([
      { id: 't1', groupId: 'g1', name: 'GitHub', url: 'https://github.com', icon: null, iconType: 'auto', isFolder: false, folderId: null, sortOrder: 0, createdAt: 'now', updatedAt: 'now' },
      { id: 't2', groupId: 'g2', name: 'Other', url: 'https://example.com', icon: null, iconType: 'auto', isFolder: false, folderId: null, sortOrder: 0, createdAt: 'now', updatedAt: 'now' },
    ])
    const tabs = useTabsStore()
    await tabs.fetchTabs()
    expect(tabs.currentRootTabs.map((tab) => tab.name)).toEqual(['GitHub'])
  })

  it('updates settings through keyed API calls', async () => {
    fetchMock.mockResolvedValueOnce(defaultSettings)
    fetchMock.mockResolvedValueOnce('en-US')
    const settings = useSettingsStore()
    await settings.fetchSettings()
    await settings.updateSetting('language', 'en-US')
    expect(fetchMock).toHaveBeenLastCalledWith('/api/settings/language', { method: 'PUT', body: { key: 'language', value: 'en-US' } })
    expect(settings.settings.language).toBe('en-US')
  })
})
