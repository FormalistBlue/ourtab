import { getDatabase } from '../../database/client'
import { listTabs } from '../../repositories/tabs'

export default defineEventHandler(() => listTabs(getDatabase()))
