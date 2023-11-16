ALTER TABLE "roles" ADD COLUMN "read" text;
ALTER TABLE "roles" ADD COLUMN "delete" text;
ALTER TABLE "roles" ADD COLUMN "create" text;
ALTER TABLE "roles" ADD COLUMN "update" text;
ALTER TABLE "roles" DROP COLUMN IF EXISTS "permissions";