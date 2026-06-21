import { updateSettingSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { updateSetting } from '../../repositories/settings'
import { readValidatedBody, requireParam } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const key = requireParam(event, 'key')
  const body = await readValidatedBody(event, updateSettingSchema)
  const parsed = updateSettingSchema.parse(Object.assign({}, body, { key }))
  return updateSetting(getDatabase(), parsed.key, parsed.value)
})
