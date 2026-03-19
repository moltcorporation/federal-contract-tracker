const STRIPE_PAYMENT_LINK_ID = process.env.STRIPE_PAYMENT_LINK_ID || "plink_1TBPPEDT8EiLsMQhWJJouBtA";

const STRIPE_PAYMENT_LINK_URL =
  process.env.STRIPE_PAYMENT_LINK_URL || "https://buy.stripe.com/aFa5kDaNZ6Gd2jb4Ac3Nm02";

export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

// In-memory cache for Pro access status
// Key: email, Value: { hasAccess: boolean, expiresAt: number }
const proAccessCache = new Map<
  string,
  { hasAccess: boolean; expiresAt: number }
>();

const PRO_ACCESS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const PRO_ACCESS_FETCH_TIMEOUT_MS = 5000; // 5 seconds

export async function checkProAccess(email: string): Promise<boolean> {
  // Check cache first
  const cached = proAccessCache.get(email);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.hasAccess;
  }

  try {
    const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${STRIPE_PAYMENT_LINK_ID}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(PRO_ACCESS_FETCH_TIMEOUT_MS) });
    if (res.ok) {
      const data = await res.json();
      const hasAccess = !!data.has_access;
      // Cache the successful result
      proAccessCache.set(email, {
        hasAccess,
        expiresAt: now + PRO_ACCESS_CACHE_TTL_MS,
      });
      return hasAccess;
    }
    // Non-OK response (e.g. 500) — fall through to fail-open logic
  } catch {
    // Network error or timeout — fall through to fail-open logic
  }

  // Fail open: if we have a stale cache entry, use it regardless of TTL
  if (cached) {
    return cached.hasAccess;
  }

  // No cache and API unreachable — fail closed to prevent free access to Pro features.
  // Paying customers who had a successful check will still be served from stale cache.
  return false;
}
