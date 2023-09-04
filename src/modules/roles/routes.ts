import { FastifyInstance } from "fastify";
import { PERMISSIONS } from "../../infra/permissions";
import { createRoleHandler } from "./controllers";
import { CreateRoleBody, createRoleJsonSchema } from "./schemas";

export async function roleRoutes(app: FastifyInstance) {
  app.post<{
    Body: CreateRoleBody;
  }>(
    "/",
    {
      schema: createRoleJsonSchema,
      preHandler: [app.guard.scope([PERMISSIONS["roles:write"]])],
    },
    createRoleHandler
  );
}
