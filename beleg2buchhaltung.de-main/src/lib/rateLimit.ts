// src/lib/rateLimit.ts
import { kv } from '@vercel/kv'

export type Usage = {
  count: number
  limit: number
  remaining: number
  allowed: boolean
  resetAt: number
}

const FREE_LIMIT = 3
const FREE_WINDOW_MS = 24 * 60 * 60 * 1000 // 24 timmar

const PRO_LIMIT = 500
const PRO_WINDOW_MS = 30 * 24 * 60 * 60 * 1000 // 30 dagar (månadscykel)

/**
 * Kontrollerar och registrerar förbrukning i Upstash KV.
 * @param userId Användarens unika ID eller IP-hash
 * @param isPro Anger om användaren har aktiv Pro-prenumeration (19 €/mån)
 */
export async function checkRateLimit(userId: string, isPro: boolean = false): Promise<Usage> {
  if (!userId) {
    throw new Error('userId krävs för rate limit')
  }

  const limit = isPro ? PRO_LIMIT : FREE_LIMIT
  const windowMs = isPro ? PRO_WINDOW_MS : FREE_WINDOW_MS
  const key = isPro ? `b2d:pro:upload:${userId}` : `b2d:upload:${userId}`
  const now = Date.now()

  const entry = await kv.get<{ count: number; resetAt: number }>(key)

  // Ingen tidigare post finns eller fönstret har löpt ut -> starta ny period
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs
    await kv.set(key, { count: 1, resetAt }, { px: windowMs })
    return {
      count: 1,
      limit,
      remaining: limit - 1,
      allowed: true,
      resetAt,
    }
  }

  // Gränsen är nådd -> spärra åtkomst
  if (entry.count >= limit) {
    return {
      count: entry.count,
      limit,
      remaining: 0,
      allowed: false,
      resetAt: entry.resetAt,
    }
  }

  // Öka räknaren och behåll ursprunglig utgångstid (TTL)
  const newCount = entry.count + 1
  const remainingTtlMs = Math.max(1, entry.resetAt - now)
  await kv.set(key, { count: newCount, resetAt: entry.resetAt }, { px: remainingTtlMs })

  return {
    count: newCount,
    limit,
    remaining: limit - newCount,
    allowed: true,
    resetAt: entry.resetAt,
  }
}

/**
 * Nollställer räknaren i Upstash för admin- eller teständamål.
 */
export async function resetRateLimitForUser(userId: string, isPro: boolean = false): Promise<void> {
  const key = isPro ? `b2d:pro:upload:${userId}` : `b2d:upload:${userId}`
  await kv.del(key)
}
