import { FastifyInstance } from "fastify";
import { PERMISSIONS } from "../../infra/permissions";
import {
  assignRoleTouserHandler,
  createUserHandler,
  loginHandler,
} from "./controllers";
import {
  AssignRoleToUserBody,
  assignRoleTouserJsonSchema,
  createUserJsonSchema,
  loginJsonSchema,
} from "./schemas";

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createUserJsonSchema,
    },
    createUserHandler
  );

  app.post(
    "/login",
    {
      schema: loginJsonSchema,
    },
    loginHandler
  );

  app.post<{
    Body: AssignRoleToUserBody;
  }>(
    "/roles",
    {
      schema: assignRoleTouserJsonSchema,
      preHandler: [app.guard.scope(PERMISSIONS["users:roles:write"])],
    },
    assignRoleTouserHandler
  );
}
