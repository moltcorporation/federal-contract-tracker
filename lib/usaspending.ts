/**
 * Server-side USASpending API data fetching for programmatic SEO pages.
 * These functions are designed for use in Next.js server components with ISR caching.
 */

const API_BASE = "https://api.usaspending.gov/api/v2";

const CURRENT_FY_START = `${new Date().getFullYear() - 1}-10-01`;
const CURRENT_FY_END = `${new Date().getFullYear()}-09-30`;

function defaultTimePeriod() {
  return [{ start_date: CURRENT_FY_START, end_date: CURRENT_FY_END }];
}

async function fetchUSA<T>(endpoint: string, payload: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    next: { revalidate: 86400 }, // ISR: revalidate daily
  });
  if (!res.ok) throw new Error(`USASpending ${endpoint} returned ${res.status}`);
  return res.json();
}

// --- Types ---

export interface AgencySummary {
  name: string;
  amount: number;
  code: string;
  id: number;
}

export interface RecipientSummary {
  name: string;
  amount: number;
}

export interface AwardSummary {
  id: string;
  recipientName: string;
  description: string;
  amount: number;
  awardingAgency: string;
  startDate: string;
  internalId: string;
}

export interface NaicsSummary {
  name: string;
  code: string;
  amount: number;
}

export interface SpendingByTime {
  amount: number;
  fiscalYear: string;
  quarter: string;
}

// --- Agency functions ---

export async function getTopAgencies(limit = 50): Promise<AgencySummary[]> {
  const data = await fetchUSA<{ results: Array<{ name: string; amount: number; code: string; id: number }> }>(
    "/search/spending_by_category/awarding_agency/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        time_period: defaultTimePeriod(),
      },
      category: "awarding_agency",
      limit,
      page: 1,
    }
  );
  return (data.results || []).map((r) => ({
    name: r.name,
    amount: r.amount,
    code: r.code,
    id: r.id,
  }));
}

export async function getAgencyContracts(agencyName: string, limit = 10): Promise<AwardSummary[]> {
  const data = await fetchUSA<{ results: Array<Record<string, unknown>> }>(
    "/search/spending_by_award/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        agencies: [{ type: "awarding", tier: "toptier", name: agencyName }],
        time_period: defaultTimePeriod(),
      },
      fields: [
        "Award ID",
        "Recipient Name",
        "Description",
        "Award Amount",
        "Awarding Agency",
        "Start Date",
        "internal_id",
      ],
      page: 1,
      limit,
      sort: "Award Amount",
      order: "desc",
      subawards: false,
    }
  );
  return (data.results || []).map((r) => ({
    id: String(r["Award ID"] || ""),
    recipientName: String(r["Recipient Name"] || ""),
    description: String(r["Description"] || ""),
    amount: Number(r["Award Amount"] || 0),
    awardingAgency: String(r["Awarding Agency"] || ""),
    startDate: String(r["Start Date"] || ""),
    internalId: String(r["internal_id"] || ""),
  }));
}

export async function getAgencyTopContractors(agencyName: string, limit = 10): Promise<RecipientSummary[]> {
  const data = await fetchUSA<{ results: Array<{ name: string; amount: number }> }>(
    "/search/spending_by_category/recipient/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        agencies: [{ type: "awarding", tier: "toptier", name: agencyName }],
        time_period: defaultTimePeriod(),
      },
      category: "recipient",
      limit,
      page: 1,
    }
  );
  return (data.results || []).map((r) => ({ name: r.name, amount: r.amount }));
}

export async function getAgencySpendingOverTime(agencyName: string): Promise<SpendingByTime[]> {
  const endYear = new Date().getFullYear();
  const startYear = endYear - 3;
  const data = await fetchUSA<{ results: Array<{ aggregated_amount: number; time_period: { fiscal_year: string; quarter: string } }> }>(
    "/search/spending_over_time/",
    {
      group: "quarter",
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        agencies: [{ type: "awarding", tier: "toptier", name: agencyName }],
        time_period: [{ start_date: `${startYear}-10-01`, end_date: `${endYear}-09-30` }],
      },
    }
  );
  return (data.results || []).map((r) => ({
    amount: r.aggregated_amount,
    fiscalYear: r.time_period.fiscal_year,
    quarter: r.time_period.quarter,
  }));
}

export async function getAgencyTopNaics(agencyName: string, limit = 10): Promise<NaicsSummary[]> {
  const data = await fetchUSA<{ results: Array<{ name: string; code: string; amount: number }> }>(
    "/search/spending_by_category/naics/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        agencies: [{ type: "awarding", tier: "toptier", name: agencyName }],
        time_period: defaultTimePeriod(),
      },
      category: "naics",
      limit,
      page: 1,
    }
  );
  return (data.results || []).map((r) => ({ name: r.name, code: r.code, amount: r.amount }));
}

// --- NAICS functions ---

export async function getTopNaicsCodes(limit = 50): Promise<NaicsSummary[]> {
  const data = await fetchUSA<{ results: Array<{ name: string; code: string; amount: number }> }>(
    "/search/spending_by_category/naics/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        time_period: defaultTimePeriod(),
      },
      category: "naics",
      limit,
      page: 1,
    }
  );
  return (data.results || []).map((r) => ({ name: r.name, code: r.code, amount: r.amount }));
}

export async function getNaicsContracts(naicsCode: string, limit = 10): Promise<AwardSummary[]> {
  const data = await fetchUSA<{ results: Array<Record<string, unknown>> }>(
    "/search/spending_by_award/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        naics_codes: { require: [naicsCode] },
        time_period: defaultTimePeriod(),
      },
      fields: [
        "Award ID",
        "Recipient Name",
        "Description",
        "Award Amount",
        "Awarding Agency",
        "Start Date",
        "internal_id",
      ],
      page: 1,
      limit,
      sort: "Award Amount",
      order: "desc",
      subawards: false,
    }
  );
  return (data.results || []).map((r) => ({
    id: String(r["Award ID"] || ""),
    recipientName: String(r["Recipient Name"] || ""),
    description: String(r["Description"] || ""),
    amount: Number(r["Award Amount"] || 0),
    awardingAgency: String(r["Awarding Agency"] || ""),
    startDate: String(r["Start Date"] || ""),
    internalId: String(r["internal_id"] || ""),
  }));
}

export async function getNaicsTopAgencies(naicsCode: string, limit = 10): Promise<AgencySummary[]> {
  const data = await fetchUSA<{ results: Array<{ name: string; amount: number; code: string; id: number }> }>(
    "/search/spending_by_category/awarding_agency/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        naics_codes: { require: [naicsCode] },
        time_period: defaultTimePeriod(),
      },
      category: "awarding_agency",
      limit,
      page: 1,
    }
  );
  return (data.results || []).map((r) => ({
    name: r.name,
    amount: r.amount,
    code: r.code,
    id: r.id,
  }));
}

export async function getNaicsTopContractors(naicsCode: string, limit = 10): Promise<RecipientSummary[]> {
  const data = await fetchUSA<{ results: Array<{ name: string; amount: number }> }>(
    "/search/spending_by_category/recipient/",
    {
      filters: {
        award_type_codes: ["A", "B", "C", "D"],
        naics_codes: { require: [naicsCode] },
        time_period: defaultTimePeriod(),
      },
      category: "recipient",
      limit,
      page: 1,
    }
  );
  return (data.results || []).map((r) => ({ name: r.name, amount: r.amount }));
}

// --- Utility ---

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDollars(amount: number): string {
  if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
  if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `$${(amount / 1e3).toFixed(0)}K`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFullDollars(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
