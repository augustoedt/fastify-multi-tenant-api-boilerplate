import { FastifyReply, FastifyRequest } from "fastify";
import { CreateRoleBody } from "./schemas";
import { createRole } from "./services";

export async function createRoleHandler(
  request: FastifyRequest<{
    Body: CreateRoleBody;
  }>,
  reply: FastifyReply,
) {
  const user = request.user;
  const applicationId = user.applicationId;
  const { name, canRead, canDelete, canUpdate, canCreate } = request.body;

  const role = await createRole({
    name,
    canRead,
    canDelete,
    canUpdate,
    canCreate,
    applicationId,
  });

  return role;
}
