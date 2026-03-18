import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const searchLogs = pgTable("search_logs", {
  id: serial("id").primaryKey(),
  ipHash: text("ip_hash").notNull(),
  searchedAt: timestamp("searched_at").defaultNow(),
});

export const savedSearches = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  naics: text("naics"),
  agency: text("agency"),
  recipient: text("recipient"),
  setAside: text("set_aside"),
  psc: text("psc"),
  minAmount: text("min_amount"),
  maxAmount: text("max_amount"),
  year: text("year"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  email: text("email"),
  category: text("category").notNull().default("general"),
  intent: text("intent"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  savedSearchId: integer("saved_search_id").notNull(),
  lastCheckedAt: timestamp("last_checked_at").defaultNow(),
  matchCount: integer("match_count").default(0),
});
