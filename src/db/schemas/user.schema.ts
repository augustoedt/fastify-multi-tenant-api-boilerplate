import {
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { applications } from "./application.schema";
import { roles } from "./roles.schema";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersToRoles = pgTable(
  "usersToRoles",
  {
    applicationId: uuid("applicationId")
      .references(() => applications.id)
      .notNull(),

    roleId: uuid("roledId")
      .references(() => roles.id)
      .notNull(),

    userId: uuid("userId")
      .references(() => users.id)
      .notNull(),
  },
  (usersToRoles) => ({
    pk: primaryKey({
      columns: [
        usersToRoles.applicationId,
        usersToRoles.roleId,
        usersToRoles.userId,
      ],
    }),
  }),
);
