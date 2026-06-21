import { createTabSchema } from '../../../app/utils/validators'
import { getDatabase } from '../../database/client'
import { createTab } from '../../repositories/tabs'
import { resolveFavicon } from '../../utils/favicon'
import { readValidatedBody } from '../../utils/http'

export default defineEventHandler(async (event) => {
  const input = await readValidatedBody(event, createTabSchema)
  const icon = input.iconType === 'auto' ? resolveFavicon(input.url) : input.icon ?? null
  return createTab(getDatabase(), Object.assign({}, input, { icon }))
})
