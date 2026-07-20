import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_receipt_requests_designation" AS ENUM('Sadaqah', 'Masjid', 'Zakat');
  CREATE TYPE "public"."enum_receipt_requests_status" AS ENUM('pending', 'issued', 'rejected');
  CREATE TABLE "receipt_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"amount" numeric NOT NULL,
  	"transfer_date" timestamp(3) with time zone NOT NULL,
  	"designation" "enum_receipt_requests_designation" DEFAULT 'Sadaqah',
  	"screenshot_id" integer,
  	"note" varchar,
  	"status" "enum_receipt_requests_status" DEFAULT 'pending' NOT NULL,
  	"receipt_number" varchar,
  	"issued_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "receipt_screenshots" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "receipt_requests_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "receipt_screenshots_id" integer;
  ALTER TABLE "receipt_requests" ADD CONSTRAINT "receipt_requests_screenshot_id_receipt_screenshots_id_fk" FOREIGN KEY ("screenshot_id") REFERENCES "public"."receipt_screenshots"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "receipt_requests_screenshot_idx" ON "receipt_requests" USING btree ("screenshot_id");
  CREATE UNIQUE INDEX "receipt_requests_receipt_number_idx" ON "receipt_requests" USING btree ("receipt_number");
  CREATE INDEX "receipt_requests_updated_at_idx" ON "receipt_requests" USING btree ("updated_at");
  CREATE INDEX "receipt_requests_created_at_idx" ON "receipt_requests" USING btree ("created_at");
  CREATE INDEX "receipt_screenshots_updated_at_idx" ON "receipt_screenshots" USING btree ("updated_at");
  CREATE INDEX "receipt_screenshots_created_at_idx" ON "receipt_screenshots" USING btree ("created_at");
  CREATE UNIQUE INDEX "receipt_screenshots_filename_idx" ON "receipt_screenshots" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_receipt_requests_fk" FOREIGN KEY ("receipt_requests_id") REFERENCES "public"."receipt_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_receipt_screenshots_fk" FOREIGN KEY ("receipt_screenshots_id") REFERENCES "public"."receipt_screenshots"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_receipt_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("receipt_requests_id");
  CREATE INDEX "payload_locked_documents_rels_receipt_screenshots_id_idx" ON "payload_locked_documents_rels" USING btree ("receipt_screenshots_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "receipt_requests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "receipt_screenshots" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "receipt_requests" CASCADE;
  DROP TABLE "receipt_screenshots" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_receipt_requests_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_receipt_screenshots_fk";
  
  DROP INDEX "payload_locked_documents_rels_receipt_requests_id_idx";
  DROP INDEX "payload_locked_documents_rels_receipt_screenshots_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "receipt_requests_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "receipt_screenshots_id";
  DROP TYPE "public"."enum_receipt_requests_designation";
  DROP TYPE "public"."enum_receipt_requests_status";`)
}
