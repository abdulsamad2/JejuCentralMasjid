import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  
  CREATE TABLE "gallery_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL
  );
  
  CREATE TABLE "home_slider" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_categories_id" integer;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_category_id_gallery_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_slider_slides" ADD CONSTRAINT "home_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_slider_slides" ADD CONSTRAINT "home_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_slider"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "gallery__order_idx" ON "gallery" USING btree ("_order");
  CREATE INDEX "gallery_category_idx" ON "gallery" USING btree ("category_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_filename_idx" ON "gallery" USING btree ("filename");
  CREATE INDEX "gallery_categories__order_idx" ON "gallery_categories" USING btree ("_order");
  CREATE UNIQUE INDEX "gallery_categories_name_idx" ON "gallery_categories" USING btree ("name");
  CREATE INDEX "gallery_categories_updated_at_idx" ON "gallery_categories" USING btree ("updated_at");
  CREATE INDEX "gallery_categories_created_at_idx" ON "gallery_categories" USING btree ("created_at");
  CREATE INDEX "home_slider_slides_order_idx" ON "home_slider_slides" USING btree ("_order");
  CREATE INDEX "home_slider_slides_parent_id_idx" ON "home_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "home_slider_slides_image_idx" ON "home_slider_slides" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_categories_fk" FOREIGN KEY ("gallery_categories_id") REFERENCES "public"."gallery_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_slider_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_slider" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "gallery_categories" CASCADE;
  DROP TABLE "home_slider_slides" CASCADE;
  DROP TABLE "home_slider" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_categories_fk";
  
  DROP INDEX "payload_locked_documents_rels_gallery_id_idx";
  DROP INDEX "payload_locked_documents_rels_gallery_categories_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_categories_id";`)
}
