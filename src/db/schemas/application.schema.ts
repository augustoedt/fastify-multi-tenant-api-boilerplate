import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const applicationInfo = pgTable("application_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applications.id),
  fantasyName: varchar("fantasy_name", { length: 256 }).notNull(),
});
