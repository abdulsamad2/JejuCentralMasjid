import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_visit_requests_status" AS ENUM('new', 'confirmed', 'declined', 'visited');
  CREATE TYPE "public"."enum_visit_requests_visitor_type" AS ENUM('local', 'overseas-muslim', 'group', 'other');
  CREATE TYPE "public"."enum_visit_requests_language" AS ENUM('en', 'ko', 'other');
  CREATE TABLE "visit_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_visit_requests_status" DEFAULT 'new' NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"visitor_type" "enum_visit_requests_visitor_type",
  	"date" timestamp(3) with time zone NOT NULL,
  	"time" varchar,
  	"alt_date" timestamp(3) with time zone,
  	"group_size" numeric NOT NULL,
  	"language" "enum_visit_requests_language",
  	"message" varchar,
  	"confirmed_date" timestamp(3) with time zone,
  	"confirmed_time" varchar,
  	"host" varchar,
  	"visitor_note" varchar,
  	"admin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "visit_requests_id" integer;
  CREATE INDEX "visit_requests_updated_at_idx" ON "visit_requests" USING btree ("updated_at");
  CREATE INDEX "visit_requests_created_at_idx" ON "visit_requests" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_visit_requests_fk" FOREIGN KEY ("visit_requests_id") REFERENCES "public"."visit_requests"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_visit_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("visit_requests_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visit_requests" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "visit_requests" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_visit_requests_fk";
  
  DROP INDEX "payload_locked_documents_rels_visit_requests_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "visit_requests_id";
  DROP TYPE "public"."enum_visit_requests_status";
  DROP TYPE "public"."enum_visit_requests_visitor_type";
  DROP TYPE "public"."enum_visit_requests_language";`)
}
