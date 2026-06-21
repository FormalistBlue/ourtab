import { getDatabase } from '../../database/client'
import { getTab } from '../../repositories/tabs'
import { notFound, requireParam } from '../../utils/http'

export default defineEventHandler((event) => {
  const id = requireParam(event, 'id')
  const tab = getTab(getDatabase(), id)
  if (!tab) notFound('Tab not found')
  return tab
})
