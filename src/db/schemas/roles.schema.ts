import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { applications } from "./application.schema";

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("applicationId").references(() => applications.id),
    read: text("read").$type<Record<string, boolean>>(),
    delete: text("delete").$type<Record<string, boolean>>(),
    create: text("create").$type<Record<string, boolean>>(),
    update: text("update").$type<Record<string, boolean>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (roles) => ({
    pk: primaryKey({ columns: [roles.id, roles.applicationId] }),
    idIndex: uniqueIndex("roles_id_index").on(roles.id),
  })
);
