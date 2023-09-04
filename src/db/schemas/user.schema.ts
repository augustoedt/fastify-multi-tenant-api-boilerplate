import {
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { applications } from "./application.schema";
import { roles } from "./roles.schema";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => applications.id),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => ({
    pk: primaryKey(users.id, users.applicationId),
    idIndex: uniqueIndex("users_id_index").on(users.id),
  })
);

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
    pk: primaryKey(
      usersToRoles.applicationId,
      usersToRoles.roleId,
      usersToRoles.userId
    ),
  })
);
