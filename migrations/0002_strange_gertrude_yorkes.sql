CREATE TABLE IF NOT EXISTS "application_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid,
	"fantasy_name" varchar(256) NOT NULL
);

ALTER TABLE "applications" DROP CONSTRAINT "applications_name_unique";
DO $$ BEGIN
 ALTER TABLE "application_info" ADD CONSTRAINT "application_info_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
