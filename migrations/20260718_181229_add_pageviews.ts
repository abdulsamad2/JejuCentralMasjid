import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pageviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL,
  	"day" varchar NOT NULL,
  	"source" varchar,
  	"referrer" varchar,
  	"country" varchar,
  	"device" varchar,
  	"visitor" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pageviews_id" integer;
  CREATE INDEX "pageviews_path_idx" ON "pageviews" USING btree ("path");
  CREATE INDEX "pageviews_day_idx" ON "pageviews" USING btree ("day");
  CREATE INDEX "pageviews_visitor_idx" ON "pageviews" USING btree ("visitor");
  CREATE INDEX "pageviews_updated_at_idx" ON "pageviews" USING btree ("updated_at");
  CREATE INDEX "pageviews_created_at_idx" ON "pageviews" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pageviews_fk" FOREIGN KEY ("pageviews_id") REFERENCES "public"."pageviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pageviews_id_idx" ON "payload_locked_documents_rels" USING btree ("pageviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pageviews" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pageviews" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pageviews_fk";
  
  DROP INDEX "payload_locked_documents_rels_pageviews_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pageviews_id";`)
}
