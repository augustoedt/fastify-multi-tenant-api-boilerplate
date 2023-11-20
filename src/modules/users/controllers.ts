import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { logger } from "../../infra/utils/logger";
import { AssignRoleToUserBody, CreateUserBody, LoginBody } from "./schemas";
import { assignRoleTouser, createUser, getUserByEmail } from "./services";

export async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserBody;
  }>,
  reply: FastifyReply,
) {
  const { initialUser, ...data } = request.body;

  try {
    const hasUsers = await getUserByEmail({ email: data.email });

    if (hasUsers) {
      console.error("User already exists");
      return reply.code(400).send({
        message: "User already exists",
      });
    }

    const user = await createUser(data);

    //verifica se é o primeiro usuário a ser criado
    if (data.roleId && data.applicationId && initialUser == false) {
      await assignRoleTouser({
        userId: user.id,
        roleId: data.roleId,
        applicationId: data.applicationId,
      });
    }
    return reply.code(201).send({
      data: user,
    });
  } catch (e) {
    logger.error(e, `error creating user`);
    return reply.code(400).send({
      message: "Server error, could not create user.",
    });
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginBody;
  }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  const user = await getUserByEmail({
    email,
  });

  if (!user) {
    return reply.code(400).send({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email,
      // scopes: user.permissions,
    },
    "secret",
  ); // change this secret or signing method, or get fired

  return { token };
}

export async function assignRoleTouserHandler(
  request: FastifyRequest<{
    Body: AssignRoleToUserBody;
  }>,
  reply: FastifyReply,
) {
  const applicationId = request.user.applicationId;
  const { userId, roleId } = request.body;

  try {
    const result = await assignRoleTouser({
      userId,
      applicationId,
      roleId,
    });

    return result;
  } catch (e) {
    logger.error(e, `error assigning role to user`);
    return reply.code(400).send({
      message: "could not assign role to user",
    });
  }
}
