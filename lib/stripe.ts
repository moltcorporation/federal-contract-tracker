export const STRIPE_PAYMENT_LINK_ID = "plink_1TAXrRDhkmzF1LbvGIWYs8we";

export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/test_dRm14n7ud3btgSHayo2ZO0f";

export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

export async function checkProAccess(email: string): Promise<boolean> {
  try {
    const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${STRIPE_PAYMENT_LINK_ID}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return !!data.has_access;
    }
  } catch {
    // Default to free tier on errors
  }
  return false;
}
