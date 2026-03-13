import {
  pgTable,
  text,
  timestamp,
  numeric,
  integer,
  jsonb,
  index,
  serial,
  boolean,
} from "drizzle-orm/pg-core";

// Cached contract awards from USASpending API
export const contractAwards = pgTable(
  "contract_awards",
  {
    id: serial("id").primaryKey(),
    awardId: text("award_id").notNull().unique(),
    piid: text("piid"), // Procurement Instrument Identifier
    recipientName: text("recipient_name"),
    recipientUei: text("recipient_uei"),
    recipientState: text("recipient_state"),
    awardingAgency: text("awarding_agency"),
    awardingSubAgency: text("awarding_sub_agency"),
    naicsCode: text("naics_code"),
    naicsDescription: text("naics_description"),
    pscCode: text("psc_code"), // Product/Service code
    awardDescription: text("award_description"),
    totalObligation: numeric("total_obligation"),
    startDate: text("start_date"),
    endDate: text("end_date"),
    awardType: text("award_type"),
    placeOfPerformanceState: text("place_of_performance_state"),
    placeOfPerformanceCity: text("place_of_performance_city"),
    setAsideType: text("set_aside_type"),
    rawData: jsonb("raw_data"),
    cachedAt: timestamp("cached_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_awards_naics").on(table.naicsCode),
    index("idx_awards_agency").on(table.awardingAgency),
    index("idx_awards_recipient").on(table.recipientName),
    index("idx_awards_state").on(table.placeOfPerformanceState),
    index("idx_awards_cached").on(table.cachedAt),
  ]
);

// Spending trends aggregated by agency/NAICS
export const spendingTrends = pgTable("spending_trends", {
  id: serial("id").primaryKey(),
  groupBy: text("group_by").notNull(), // 'agency' | 'naics' | 'recipient'
  groupValue: text("group_value").notNull(),
  fiscalYear: integer("fiscal_year").notNull(),
  fiscalQuarter: integer("fiscal_quarter"),
  totalObligation: numeric("total_obligation").notNull(),
  awardCount: integer("award_count").notNull(),
  cachedAt: timestamp("cached_at").defaultNow().notNull(),
});

// User saved searches (premium feature)
export const savedSearches = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  name: text("name").notNull(),
  filters: jsonb("filters").notNull(), // { naics, agency, state, minAmount, maxAmount, dateRange }
  alertEnabled: boolean("alert_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Search analytics - track popular searches for product insights
export const searchLog = pgTable("search_log", {
  id: serial("id").primaryKey(),
  filters: jsonb("filters").notNull(),
  resultCount: integer("result_count"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Rate limiting - track searches per IP for free tier limits
export const searches = pgTable(
  "searches",
  {
    id: serial("id").primaryKey(),
    keywords: text("keywords"),
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("idx_searches_ip_hash").on(table.ipHash)]
);
