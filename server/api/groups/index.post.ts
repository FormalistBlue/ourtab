import { createGroupSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { createGroup } from '../../repositories/groups'
import { readValidatedBody } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const input = await readValidatedBody(event, createGroupSchema)
  return createGroup(getDatabase(), input)
})
