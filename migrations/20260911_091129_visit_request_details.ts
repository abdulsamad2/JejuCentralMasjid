import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visit_requests" ADD COLUMN "organisation" varchar;
  ALTER TABLE "visit_requests" ADD COLUMN "accessibility" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visit_requests" DROP COLUMN "organisation";
  ALTER TABLE "visit_requests" DROP COLUMN "accessibility";`)
}
