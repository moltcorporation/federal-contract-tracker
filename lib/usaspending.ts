const BASE_URL = "https://api.usaspending.gov/api/v2";

export interface SearchFilters {
  naicsCode?: string;
  agency?: string;
  recipientName?: string;
  state?: string;
  minAmount?: number;
  maxAmount?: number;
  dateRange?: { startDate: string; endDate: string };
  setAsideType?: string;
  page?: number;
  limit?: number;
}

export interface AwardResult {
  internal_id: string;
  Award_ID: string;
  recipient_name: string;
  Recipient_UEI: string;
  Award_Amount: number;
  Total_Outlays: number;
  Description: string;
  Start_Date: string;
  End_Date: string;
  Awarding_Agency: string;
  Awarding_Sub_Agency: string;
  Award_Type: string;
  contract_award_unique_key: string;
  recipient_id: string;
  Place_of_Performance_State_Code: string;
  Place_of_Performance_Country_Code: string;
  generated_internal_id: string;
}

export interface SpendingByAwardResponse {
  limit: number;
  results: AwardResult[];
  page_metadata: {
    page: number;
    hasNext: boolean;
    last_record_unique_id: number | null;
    last_record_sort_value: string | null;
  };
  messages?: string[];
}

function buildFilters(filters: SearchFilters) {
  const apiFilters: Record<string, unknown> = {
    award_type_codes: ["A", "B", "C", "D"], // Contracts only
  };

  if (filters.naicsCode) {
    apiFilters.naics_codes = [{ naics_code: filters.naicsCode }];
  }

  if (filters.agency) {
    apiFilters.agencies = [
      {
        type: "awarding",
        tier: "toptier",
        name: filters.agency,
      },
    ];
  }

  if (filters.recipientName) {
    apiFilters.recipient_search_text = [filters.recipientName];
  }

  if (filters.state) {
    apiFilters.place_of_performance_locations = [
      { country: "USA", state: filters.state },
    ];
  }

  if (filters.minAmount || filters.maxAmount) {
    apiFilters.award_amounts = [
      {
        lower_bound: filters.minAmount || 0,
        upper_bound: filters.maxAmount || undefined,
      },
    ];
  }

  if (filters.dateRange) {
    apiFilters.time_period = [
      {
        start_date: filters.dateRange.startDate,
        end_date: filters.dateRange.endDate,
        date_type: "action_date",
      },
    ];
  }

  if (filters.setAsideType) {
    apiFilters.set_aside_type_codes = [filters.setAsideType];
  }

  return apiFilters;
}

export async function searchAwards(
  filters: SearchFilters
): Promise<SpendingByAwardResponse> {
  const res = await fetch(`${BASE_URL}/search/spending_by_award/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filters: buildFilters(filters),
      fields: [
        "Award_ID",
        "Recipient_Name",
        "Recipient_UEI",
        "Award_Amount",
        "Total_Outlays",
        "Description",
        "Start_Date",
        "End_Date",
        "Awarding_Agency",
        "Awarding_Sub_Agency",
        "Award_Type",
        "Place_of_Performance_State_Code",
        "Place_of_Performance_Country_Code",
        "contract_award_unique_key",
      ],
      page: filters.page || 1,
      limit: filters.limit || 25,
      sort: "Award_Amount",
      order: "desc",
      subawards: false,
      award_type: "contracts",
    }),
  });

  if (!res.ok) {
    throw new Error(`USASpending API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export interface SpendingOverTimeResult {
  aggregated_amount: number;
  time_period: {
    fiscal_year: string;
    quarter?: string;
    month?: string;
  };
}

export async function getSpendingOverTime(
  filters: SearchFilters,
  group: "fiscal_year" | "quarter" | "month" = "quarter"
): Promise<{ results: SpendingOverTimeResult[] }> {
  const res = await fetch(`${BASE_URL}/search/spending_over_time/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      group,
      filters: buildFilters(filters),
      subawards: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`USASpending API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export interface AgencyResult {
  agency_id: number;
  toptier_code: string;
  agency_name: string;
  active_fy: string;
  active_fq: string;
  outlay_amount: number;
  obligated_amount: number;
  budget_authority_amount: number;
  congressional_justification_url: string | null;
}

export async function getAgencies(): Promise<{ results: AgencyResult[] }> {
  const res = await fetch(`${BASE_URL}/references/toptier_agencies/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`USASpending API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export interface SpendingByCategoryResult {
  amount: number;
  code: string;
  id: number | null;
  name: string;
}

export async function getTopRecipients(
  filters: SearchFilters,
  limit = 10
): Promise<{ results: SpendingByCategoryResult[] }> {
  const res = await fetch(`${BASE_URL}/search/spending_by_category/recipient/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filters: buildFilters(filters),
      limit,
      page: 1,
      subawards: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`USASpending API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getTopAgencies(
  filters: SearchFilters,
  limit = 10
): Promise<{ results: SpendingByCategoryResult[] }> {
  const res = await fetch(
    `${BASE_URL}/search/spending_by_category/awarding_agency/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filters: buildFilters(filters),
        limit,
        page: 1,
        subawards: false,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`USASpending API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// US states for filter dropdown
export const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" },
] as const;

// Common set-aside types
export const SET_ASIDE_TYPES = [
  { code: "SBA", name: "Small Business Set-Aside" },
  { code: "8A", name: "8(a) Program" },
  { code: "8AN", name: "8(a) Sole Source" },
  { code: "HZC", name: "HUBZone Set-Aside" },
  { code: "HZS", name: "HUBZone Sole Source" },
  { code: "SDVOSBC", name: "Service-Disabled Veteran-Owned SB Set-Aside" },
  { code: "SDVOSBS", name: "Service-Disabled Veteran-Owned SB Sole Source" },
  { code: "WOSB", name: "Women-Owned SB Set-Aside" },
  { code: "EDWOSB", name: "Economically Disadvantaged WOSB" },
  { code: "VSA", name: "Veteran-Owned Small Business Set-Aside" },
] as const;
