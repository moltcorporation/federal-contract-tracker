import { buildCheckoutUrl } from "@/lib/stripe";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://federal-contract-tracker-moltcorporation.vercel.app";

interface DripEmail {
  subject: string;
  html: (params: { name: string | null; email: string; userId: number }) => string;
}

function layout(title: string, body: string, userId: number): string {
  const unsubUrl = `${BASE_URL}/api/drip/unsubscribe?uid=${userId}`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #e4e4e7">
    <div style="margin-bottom:24px">
      <span style="font-size:20px;font-weight:700;color:#18181b">GovScout</span>
    </div>
    <h1 style="font-size:18px;color:#18181b;margin:0 0 16px">${title}</h1>
    ${body}
  </div>
  <div style="text-align:center;padding:16px;font-size:12px;color:#71717a">
    <p>GovScout — Federal contract intelligence for small businesses</p>
    <p><a href="${unsubUrl}" style="color:#71717a;text-decoration:underline">Unsubscribe from these emails</a></p>
  </div>
</div>
</body>
</html>`;
}

function cta(text: string, href: string): string {
  return `<div style="margin:24px 0;text-align:center">
  <a href="${href}" style="display:inline-block;background:#18181b;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">${text}</a>
</div>`;
}

export const DRIP_EMAILS: DripEmail[] = [
  // Step 0 — Day 0: Welcome + first search prompt
  {
    subject: "Welcome to GovScout — find your first contract",
    html: ({ name, userId }) => layout(
      `Welcome${name ? `, ${name}` : ""}!`,
      `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        You just joined GovScout — the fastest way to find federal contracts matched to your business.
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        The federal government awards <strong>$700B+ in contracts every year</strong>, and most small businesses never see the opportunities that match their NAICS codes.
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        <strong>Your first step:</strong> Run a search for your NAICS code or industry keywords. You'll see active contracts, award amounts, and which agencies are buying.
      </p>
      ${cta("Search Contracts Now", `${BASE_URL}/search`)}
      <p style="color:#71717a;font-size:13px;margin:16px 0 0">
        Over the next two weeks, we'll show you how to get the most out of GovScout — from saved searches to competitive intelligence.
      </p>`,
      userId,
    ),
  },

  // Step 1 — Day 2: Saved search + email alerts (Pro feature)
  {
    subject: "Never miss a contract — set up alerts",
    html: ({ userId }) => layout(
      "Stop manually checking for contracts",
      `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        The best contracts move fast. By the time you manually search, the proposal deadline may have passed.
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        <strong>Saved Searches</strong> let you store your exact filter criteria — NAICS code, agency, set-aside type, dollar range — and get email alerts when new matching contracts appear.
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        Here's how:
      </p>
      <ol style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
        <li>Run a search with your filters</li>
        <li>Click <strong>"Save Search"</strong></li>
        <li>Get notified when new contracts match</li>
      </ol>
      ${cta("Set Up Your First Alert", `${BASE_URL}/saved-searches`)}
      <p style="color:#71717a;font-size:13px;margin:16px 0 0">
        Pro users get unlimited saved searches with daily email alerts. Free users can save up to 3 searches.
      </p>`,
      userId,
    ),
  },

  // Step 2 — Day 5: Competitive intel
  {
    subject: "Who's winning contracts in your NAICS?",
    html: ({ userId }) => layout(
      "Know your competition before you bid",
      `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        Before you spend weeks on a proposal, you should know: who's already winning these contracts? How much are they winning? And which agencies keep coming back to the same vendors?
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        GovScout's <strong>Spending Trends</strong> show you:
      </p>
      <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
        <li>Top recipients by award amount in any NAICS code</li>
        <li>Agency spending patterns over time</li>
        <li>Set-aside utilization rates (8(a), HUBZone, WOSB, SDVOSB)</li>
      </ul>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        Use this data to <strong>pick battles you can win</strong> — target agencies that rotate vendors or set-asides where competition is thin.
      </p>
      ${cta("View Spending Trends", `${BASE_URL}/trends`)}`,
      userId,
    ),
  },

  // Step 3 — Day 7: CSV export + spending trends (Pro-only)
  {
    subject: "Export contract data for your proposals",
    html: ({ email, userId }) => layout(
      "Turn GovScout data into winning proposals",
      `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        The best proposals cite real data: past contract values, incumbent performance, and agency spending patterns. GovScout Pro gives you the tools to build evidence-backed bids.
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        <strong>Pro features that win contracts:</strong>
      </p>
      <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
        <li><strong>CSV Export</strong> — Download search results and spending data for your proposal research</li>
        <li><strong>Unlimited Saved Searches</strong> — Track every NAICS code and agency relevant to your pipeline</li>
        <li><strong>Daily Email Alerts</strong> — Never miss a new opportunity in your target areas</li>
      </ul>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        At <strong>$49/month</strong>, one contract win pays for years of GovScout Pro.
      </p>
      ${cta("Upgrade to Pro", buildCheckoutUrl(email))}`,
      userId,
    ),
  },

  // Step 4 — Day 14: ROI closer
  {
    subject: "GovScout Pro vs $15K/yr alternatives",
    html: ({ email, userId }) => layout(
      "The ROI math on contract intelligence",
      `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        Enterprise tools like GovWin (Deltek) charge <strong>$15,000+/year</strong> for federal contract intelligence. Bloomberg Government runs <strong>$6,000+/year</strong>. They're built for large contractors with dedicated BD teams.
      </p>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        If you're a small business, you don't need all that. You need:
      </p>
      <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
        <li>Fast contract search with set-aside filters ✓</li>
        <li>Alerts when new opportunities match your NAICS ✓</li>
        <li>Competitive intel on who's winning ✓</li>
        <li>Data exports for proposals ✓</li>
      </ul>
      <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
        GovScout Pro gives you all of this for <strong>$49/month</strong> — that's <strong>$588/year vs $15,000+</strong>. One small contract win covers your subscription for a decade.
      </p>
      ${cta("Start Pro — $49/mo", buildCheckoutUrl(email))}
      <p style="color:#71717a;font-size:13px;margin:16px 0 0">
        No long-term commitment. Cancel anytime. Your data stays yours.
      </p>`,
      userId,
    ),
  },
];
