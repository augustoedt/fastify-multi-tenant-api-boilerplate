import argon2 from "argon2";
import { InferInsertModel, and, eq } from "drizzle-orm";
import { db } from "../../db";
import { users, usersToApplications, usersToRoles } from "../../db/schemas";

export async function createUser(data: InferInsertModel<typeof users>) {
  const hashedPassword = await argon2.hash(data.password);

  const result = await db
    .insert(users)
    .values({
      ...data,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
    });

  return result[0];
}

export async function getUsersByApplication(applicationId: string) {
  const result = await db
    .select()
    .from(users)
    .innerJoin(usersToApplications, eq(usersToApplications.userId, users.id))
    .where(eq(usersToApplications.applicationId, applicationId));

  return result;
}

export async function assignRoleTouser(
  data: InferInsertModel<typeof usersToRoles>,
) {
  const result = await db.insert(usersToRoles).values(data).returning();

  return result[0];
}

export async function getUserByEmail({ email }: { email: string }) {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(and(eq(users.email, email)));
  // LEFT JOIN
  // FROM usersToRoles
  // ON usersToRoles.userId = users.id
  // AND usersToRoles.applicationId = users.application
  // .leftJoin(usersToRoles, and(eq(usersToRoles.userId, users.id)))
  // LEFT JOIN
  // FROM roles
  // ON roles.id = usersToRoles.roleId
  // .leftJoin(roles, eq(roles.id, usersToRoles.roleId));

  if (!result.length) {
    return null;
  }

  return result[0];

  // const user = result.reduce(
  //   (acc, curr) => {
  //     if (!acc.id) {
  //       return {
  //         ...curr,
  //         permissions: new Set(curr.permissions),
  //       };
  //     }

  //     if (!curr.permissions) {
  //       return acc;
  //     }

  //     for (const permission of curr.permissions) {
  //       acc.permissions.add(permission);
  //     }

  //     return acc;
  //   },
  //   {} as Omit<(typeof result)[number], "permissions"> & {
  //     permissions: Set<string>;
  //   },
  // );

  // return {
  //   ...user,
  //   // permissions: Array.from(user.permissions),
  // };
}
