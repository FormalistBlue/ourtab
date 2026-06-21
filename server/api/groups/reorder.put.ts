import { reorderSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { reorderGroups } from '../../repositories/groups'
import { readValidatedBody } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const input = await readValidatedBody(event, reorderSchema)
  reorderGroups(getDatabase(), input.items)
  return { ok: true }
})
