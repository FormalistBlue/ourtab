import { getDatabase } from '../../database/client'
import { deleteTab } from '../../repositories/tabs'
import { requireParam } from '../../utils/http'

export default defineEventHandler((event) => {
  const id = requireParam(event, 'id')
  deleteTab(getDatabase(), id)
  return { ok: true }
})
