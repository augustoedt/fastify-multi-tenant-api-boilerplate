import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const createRoleBodySchema = z.object({
  name: z.string(),
  // permissions: z.array(z.enum(ALL_PERMISSIONS)),
  applicationId: z.string().uuid(),
  canRead: z.record(z.string(), z.boolean()),
  canDelete: z.record(z.string(), z.boolean()),
  canCreate: z.record(z.string(), z.boolean()),
  canUpdate: z.record(z.string(), z.boolean()),
});

export type CreateRoleBody = z.infer<typeof createRoleBodySchema>;

export const createRoleJsonSchema = {
  body: zodToJsonSchema(createRoleBodySchema, "createRoleBodySchema"),
};
