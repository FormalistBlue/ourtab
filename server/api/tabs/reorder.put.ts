import { reorderSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { reorderTabs } from '../../repositories/tabs'
import { readValidatedBody } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const input = await readValidatedBody(event, reorderSchema)
  reorderTabs(getDatabase(), input.items)
  return { ok: true }
})
