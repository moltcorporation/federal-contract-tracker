/**
 * In-memory LRU cache with TTL for USASpending API responses.
 * Each serverless instance gets its own cache — sufficient for our traffic level.
 */

const DEFAULT_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_ENTRIES = 500;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  lastAccessed: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function evictLRU() {
  if (cache.size < MAX_ENTRIES) return;

  let oldestKey: string | null = null;
  let oldestAccess = Infinity;

  for (const [key, entry] of cache) {
    if (entry.lastAccessed < oldestAccess) {
      oldestAccess = entry.lastAccessed;
      oldestKey = key;
    }
  }

  if (oldestKey) cache.delete(oldestKey);
}

function makeKey(input: unknown): string {
  return JSON.stringify(input);
}

/**
 * Wrap an async fetch function with caching.
 * `keyData` is any serializable value used to generate the cache key.
 * Returns cached data if fresh, otherwise calls `fetcher` and caches the result.
 */
export async function cachedFetch<T>(
  keyData: unknown,
  fetcher: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<T> {
  const key = makeKey(keyData);
  const now = Date.now();

  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) {
    cached.lastAccessed = now;
    return cached.data as T;
  }

  const data = await fetcher();

  evictLRU();
  cache.set(key, { data, expiresAt: now + ttlMs, lastAccessed: now });

  return data;
}
