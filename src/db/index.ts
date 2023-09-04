import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../infra/env";

const pool = new Pool({
  connectionString: env.DATABASE_CONNECTION,
  ssl: false,
});

export const db = drizzle(pool);
