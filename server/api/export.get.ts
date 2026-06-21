import { getDatabase } from '../database/client'
import { exportAllData } from '../repositories/importExport'

export default defineEventHandler(() => exportAllData(getDatabase()))
