import { updateGroupSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { updateGroup } from '../../repositories/groups'
import { notFound, readValidatedBody, requireParam } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const id = requireParam(event, 'id')
  const input = await readValidatedBody(event, updateGroupSchema)
  const group = updateGroup(getDatabase(), id, input)
  if (!group) notFound('Group not found')
  return group
})
