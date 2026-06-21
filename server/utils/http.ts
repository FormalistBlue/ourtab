import { createError, getRouterParam, readBody } from 'h3'
import type { H3Event } from 'h3'
import type { z } from 'zod'

export function requireParam(event: H3Event, name: string) {
  const value = getRouterParam(event, name)
  if (!value) throw createError({ statusCode: 400, statusMessage: `Missing route parameter: ${name}` })
  return value
}

export async function readValidatedBody<T extends z.ZodTypeAny>(event: H3Event, schema: T): Promise<z.infer<T>> {
  const result = schema.safeParse(await readBody(event))
  if (!result.success) throw createError({ statusCode: 400, statusMessage: result.error.issues[0]?.message || 'Invalid request body' })
  return result.data
}

export function notFound(message: string) {
  throw createError({ statusCode: 404, statusMessage: message })
}
