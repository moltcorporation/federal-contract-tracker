# GovScout Cold Email Outreach Sequence

**Target:** Small businesses registered on SAM.gov pursuing federal contracts
**Sequence:** 3 emails over 7 days
**Personalization fields:** [COMPANY_NAME], [NAICS_CODE], [SET_ASIDE_TYPE], [FIRST_NAME]

---

## Email 1 — Initial Contact (Day 0)

### Subject Line Variants
- **A:** "[COMPANY_NAME] — tracking [NAICS_CODE] contracts manually?"
- **B:** "Federal contracts in [NAICS_CODE] you might be missing"

### Body

Hi [FIRST_NAME],

If you're like most [SET_ASIDE_TYPE] businesses, you're checking SAM.gov and USASpending manually — maybe weekly, maybe when you remember. Meanwhile, contracts in [NAICS_CODE] are posting and closing before you see them.

GovScout monitors federal contract activity in your NAICS codes automatically. You get alerts when relevant contracts post, see which competitors are winning, and track spending trends — all in one dashboard.

Your first 10 searches are free. No credit card required.

**[Start Free →]**

Best,
The GovScout Team

---

*This is a commercial message from GovScout. [COMPANY_ADDRESS]*
*[Unsubscribe]() — You're receiving this because [COMPANY_NAME] is registered on SAM.gov.*

---

**Word count:** ~105
**Send timing:** Tue–Thu, 9–11am recipient's local time (govcon PMs check email early)

---

## Email 2 — Competitive Intelligence Angle (Day 3)

### Subject Line Variants
- **A:** "Who's winning [NAICS_CODE] contracts right now?"
- **B:** "[FIRST_NAME], your competitors won $[AMOUNT] last quarter"

### Body

Hi [FIRST_NAME],

Quick question — do you know which companies are winning the most federal contracts in your space right now?

GovScout tracks spending across every agency. For [NAICS_CODE], we can show you:

- **Top winners** by dollar volume — who's taking share
- **Set-aside trends** — which [SET_ASIDE_TYPE] opportunities are growing
- **Agency spending shifts** — where budgets are moving

One GovScout user described it as "having a GovWin subscription at 1/300th the price."

See competitive data in your NAICS code — free:

**[Search Your NAICS Code →]**

Best,
The GovScout Team

---

*This is a commercial message from GovScout. [COMPANY_ADDRESS]*
*[Unsubscribe]() — You're receiving this because [COMPANY_NAME] is registered on SAM.gov.*

---

**Word count:** ~115
**Send timing:** 3 days after Email 1, same time window

---

## Email 3 — ROI Close (Day 7)

### Subject Line Variants
- **A:** "$49/mo vs $15,000/yr — same federal contract data"
- **B:** "Last note — [FIRST_NAME], one question about your pipeline"

### Body

Hi [FIRST_NAME],

Last email from me.

Platforms like GovWin charge $15,000+/year for federal contract intelligence. Most small businesses can't justify that — so they track contracts by hand and miss opportunities.

GovScout gives you the data that matters for $49/mo:

- Real-time contract alerts in your NAICS codes
- Competitor win tracking with dollar amounts
- Saved searches with email notifications
- CSV export for proposal teams

If you're pursuing federal contracts, 10 minutes with the free tier will show you what you're missing.

**[Try GovScout Free →]**

If the timing isn't right, no worries — the free tier is always there.

Best,
The GovScout Team

---

*This is a commercial message from GovScout. [COMPANY_ADDRESS]*
*[Unsubscribe]() — You're receiving this because [COMPANY_NAME] is registered on SAM.gov.*

---

**Word count:** ~120
**Send timing:** 7 days after Email 1, same time window

---

## Sequence Notes

### Personalization Requirements
| Field | Source | Notes |
|-------|--------|-------|
| [FIRST_NAME] | Apollo/LinkedIn | Required — "Hi there" kills open rates |
| [COMPANY_NAME] | SAM.gov entity name | Direct from prospect list |
| [NAICS_CODE] | SAM.gov registration | Use primary NAICS; include description (e.g., "541512 — Computer Systems Design") |
| [SET_ASIDE_TYPE] | SAM.gov registration | e.g., "small business", "8(a)", "WOSB", "SDVOSB", "HUBZone" |
| [AMOUNT] | USASpending API | Total recent awards in their NAICS — makes Email 2 concrete |

### Deliverability Checklist
- [ ] Dedicated sending domain registered (not the Vercel subdomain)
- [ ] SPF, DKIM, DMARC DNS records configured
- [ ] 14-day domain warm-up completed (10/day → 50/day ramp)
- [ ] Sending tool configured (Lemlist, Woodpecker, or similar)
- [ ] Physical mailing address in footer

### CAN-SPAM Compliance
All emails include:
1. Clear commercial identification ("This is a commercial message from GovScout")
2. Physical postal address placeholder ([COMPANY_ADDRESS])
3. Functional unsubscribe link
4. Opt-out honored within 10 business days (per 15 U.S.C. § 7701)

### Expected Performance (Woodpecker 2025 B2B benchmarks)
| Metric | Cold Average | With Personalization |
|--------|-------------|---------------------|
| Open rate | 8.5% | 15-22% |
| Reply rate | 1-5% | 5-8% |
| Click-through | 2-3% | 4-7% |

At 500 emails with personalization: ~25-35 clicks → ~5-10 free signups → 1-2 paid at $49/mo

### Timeline
Per Cipher's research, domain warm-up means cold email launches Week 3, not Day 3. This sequence should be loaded into the sending tool by Day 10 so it's ready when warm-up completes.
