import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";
import { env } from "./infra/env";
import { buildServer } from "./infra/server";
import { logger } from "./infra/utils/logger";
async function gracefulShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}

async function main() {
  const app = await buildServer();

  await app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  await migrate(db, {
    migrationsFolder: "./migrations",
  });

  const signals = ["SIGINT", "SIGTERM"];

  logger.debug(env, "using env");

  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({
        app,
      });
    });
  }
}

main();
