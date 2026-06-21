import { getDatabase } from '../../database/client'
import { listGroups } from '../../repositories/groups'

export default defineEventHandler(() => listGroups(getDatabase()))
