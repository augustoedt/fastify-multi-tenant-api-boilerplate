import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from ".";

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdBy: uuid("createdby").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



export const applicationInfo = pgTable("applicationInfo", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applications.id),
  fantasyName: varchar("fantasy_name", { length: 256 }).notNull(),
});

export const usersToApplications = pgTable("usersToApplications", {
  applicationId: uuid("application_id").references(() => applications.id),
  userId: uuid("user_id").references(() => users.id),
})
