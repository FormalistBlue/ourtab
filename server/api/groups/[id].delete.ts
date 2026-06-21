import { getDatabase } from '../../database/client'
import { deleteGroup } from '../../repositories/groups'
import { requireParam } from '../../utils/http'

export default defineEventHandler((event) => {
  const id = requireParam(event, 'id')
  deleteGroup(getDatabase(), id)
  return { ok: true }
})
