import { getDatabase } from '../../database/client'
import { getSettings } from '../../repositories/settings'

export default defineEventHandler(() => getSettings(getDatabase()))
