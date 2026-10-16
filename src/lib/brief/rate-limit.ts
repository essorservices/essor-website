import "server-only";

/**
 * Best-effort, in-memory rate limit: at most LIMIT briefs per IP address per WINDOW.
 *
 * Caveat: memory is per server instance. On serverless platforms (Vercel) each
 * instance has its own Map and instances are recycled, so this only slows down
 * a burst from one client; it is not a guarantee. For a hard limit, move this to
 * a shared store (e.g. Upstash Redis / Vercel KV) keyed the same way.
 */

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

/** Records an attempt for `key` and tells whether it is still within the limit. */
export function allowBrief(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  // Re-insert so the Map stays ordered from least to most recently seen.
  hits.delete(key);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded: drop the least recently seen keys first.
  if (hits.size > MAX_KEYS) {
    for (const k of hits.keys()) {
      hits.delete(k);
      if (hits.size <= MAX_KEYS) break;
    }
  }
  return true;
}

/** Client IP from the proxy headers (Vercel sets x-forwarded-for), or "unknown". */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
