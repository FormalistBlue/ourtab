import { updateTabSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { updateTab } from '../../repositories/tabs'
import { notFound, readValidatedBody, requireParam } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const id = requireParam(event, 'id')
  const input = await readValidatedBody(event, updateTabSchema)
  const tab = updateTab(getDatabase(), id, input)
  if (!tab) notFound('Tab not found')
  return tab
})
