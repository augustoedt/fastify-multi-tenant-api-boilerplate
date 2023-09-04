import { FastifyInstance } from "fastify";
import { createApplicationJsonSchema } from "./schemas";
import {
  createApplicationHandler,
  getApplicationshandler,
} from "./controllers";

export async function applicationRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createApplicationJsonSchema,
    },
    createApplicationHandler
  );

  app.get("/", getApplicationshandler);
}
