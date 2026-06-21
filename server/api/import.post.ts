import { importPayloadSchema } from '../../app/utils/validators'
import { getDatabase } from '../database/client'
import { replaceAllData } from '../repositories/importExport'
import { readValidatedBody } from '../utils/http'

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, importPayloadSchema)
  return replaceAllData(getDatabase(), payload)
})
