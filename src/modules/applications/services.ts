import { InferInsertModel } from "drizzle-orm";
import { db } from "../../db";
import { applications } from "../../db/schemas";

export async function createApplication(
  data: InferInsertModel<typeof applications>
) {
  const result = await db.insert(applications).values(data).returning();

  return result[0];
}

export async function getApplications() {
  const result = await db
    .select({
      id: applications.id,
      name: applications.name,
      createdAt: applications.createdAt,
    })
    .from(applications);
  return result;
}
