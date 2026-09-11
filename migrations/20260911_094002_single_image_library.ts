import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"moments_dawah_id" integer,
  	"moments_eid_id" integer,
  	"moments_iftar_id" integer,
  	"moments_children_id" integer,
  	"moments_jummah_id" integer,
  	"moments_gathering_id" integer,
  	"weekly_circles_id" integer,
  	"quran_teacher_id" integer,
  	"support_appeal_id" integer,
  	"visit_us_id" integer,
  	"about_main_id" integer,
  	"permanent_masjid_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_photos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "gallery" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gallery" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gallery_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_gallery_id_idx";
  ALTER TABLE "media" ADD COLUMN "_order" varchar;
  ALTER TABLE "media" ADD COLUMN "gallery_category_id" integer;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_moments_dawah_id_media_id_fk" FOREIGN KEY ("moments_dawah_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_moments_eid_id_media_id_fk" FOREIGN KEY ("moments_eid_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_moments_iftar_id_media_id_fk" FOREIGN KEY ("moments_iftar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_moments_children_id_media_id_fk" FOREIGN KEY ("moments_children_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_moments_jummah_id_media_id_fk" FOREIGN KEY ("moments_jummah_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_moments_gathering_id_media_id_fk" FOREIGN KEY ("moments_gathering_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_weekly_circles_id_media_id_fk" FOREIGN KEY ("weekly_circles_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_quran_teacher_id_media_id_fk" FOREIGN KEY ("quran_teacher_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_support_appeal_id_media_id_fk" FOREIGN KEY ("support_appeal_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_visit_us_id_media_id_fk" FOREIGN KEY ("visit_us_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_about_main_id_media_id_fk" FOREIGN KEY ("about_main_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos" ADD CONSTRAINT "page_photos_permanent_masjid_id_media_id_fk" FOREIGN KEY ("permanent_masjid_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_photos_rels" ADD CONSTRAINT "page_photos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_photos_rels" ADD CONSTRAINT "page_photos_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_photos_moments_moments_dawah_idx" ON "page_photos" USING btree ("moments_dawah_id");
  CREATE INDEX "page_photos_moments_moments_eid_idx" ON "page_photos" USING btree ("moments_eid_id");
  CREATE INDEX "page_photos_moments_moments_iftar_idx" ON "page_photos" USING btree ("moments_iftar_id");
  CREATE INDEX "page_photos_moments_moments_children_idx" ON "page_photos" USING btree ("moments_children_id");
  CREATE INDEX "page_photos_moments_moments_jummah_idx" ON "page_photos" USING btree ("moments_jummah_id");
  CREATE INDEX "page_photos_moments_moments_gathering_idx" ON "page_photos" USING btree ("moments_gathering_id");
  CREATE INDEX "page_photos_weekly_circles_idx" ON "page_photos" USING btree ("weekly_circles_id");
  CREATE INDEX "page_photos_quran_teacher_idx" ON "page_photos" USING btree ("quran_teacher_id");
  CREATE INDEX "page_photos_support_appeal_idx" ON "page_photos" USING btree ("support_appeal_id");
  CREATE INDEX "page_photos_visit_us_idx" ON "page_photos" USING btree ("visit_us_id");
  CREATE INDEX "page_photos_about_main_idx" ON "page_photos" USING btree ("about_main_id");
  CREATE INDEX "page_photos_permanent_masjid_idx" ON "page_photos" USING btree ("permanent_masjid_id");
  CREATE INDEX "page_photos_rels_order_idx" ON "page_photos_rels" USING btree ("order");
  CREATE INDEX "page_photos_rels_parent_idx" ON "page_photos_rels" USING btree ("parent_id");
  CREATE INDEX "page_photos_rels_path_idx" ON "page_photos_rels" USING btree ("path");
  CREATE INDEX "page_photos_rels_media_id_idx" ON "page_photos_rels" USING btree ("media_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_gallery_category_id_gallery_categories_id_fk" FOREIGN KEY ("gallery_category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media__order_idx" ON "media" USING btree ("_order");
  CREATE INDEX "media_gallery_category_idx" ON "media" USING btree ("gallery_category_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"category_id" integer NOT NULL,
  	"prefix" varchar DEFAULT 'gallery',
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
  
  ALTER TABLE "page_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_photos_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_photos" CASCADE;
  DROP TABLE "page_photos_rels" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_gallery_category_id_gallery_categories_id_fk";
  
  DROP INDEX "media__order_idx";
  DROP INDEX "media_gallery_category_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_id" integer;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_category_id_gallery_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "gallery__order_idx" ON "gallery" USING btree ("_order");
  CREATE INDEX "gallery_category_idx" ON "gallery" USING btree ("category_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_filename_idx" ON "gallery" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  ALTER TABLE "media" DROP COLUMN "_order";
  ALTER TABLE "media" DROP COLUMN "gallery_category_id";`)
}
