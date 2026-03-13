import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const searchLogs = pgTable("search_logs", {
  id: serial("id").primaryKey(),
  ipHash: text("ip_hash").notNull(),
  searchedAt: timestamp("searched_at").defaultNow(),
});
