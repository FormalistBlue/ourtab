import { getDatabase } from '../../database/client'
import { getGroup } from '../../repositories/groups'
import { notFound, requireParam } from '../../utils/http'

export default defineEventHandler((event) => {
  const id = requireParam(event, 'id')
  const group = getGroup(getDatabase(), id)
  if (!group) notFound('Group not found')
  return group
})
