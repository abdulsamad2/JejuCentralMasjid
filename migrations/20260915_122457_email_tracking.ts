import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_visit_requests_emails_acknowledgement" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_visit_requests_emails_confirmation" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_visit_requests_emails_committee" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_contact_submissions_emails_acknowledgement" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_contact_submissions_emails_committee" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_receipt_requests_emails_acknowledgement" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_receipt_requests_emails_receipt" AS ENUM('sent', 'failed', 'off', 'manual');
  CREATE TYPE "public"."enum_receipt_requests_emails_committee" AS ENUM('sent', 'failed', 'off', 'manual');
  ALTER TABLE "visit_requests" ADD COLUMN "emails_acknowledgement" "enum_visit_requests_emails_acknowledgement";
  ALTER TABLE "visit_requests" ADD COLUMN "emails_confirmation" "enum_visit_requests_emails_confirmation";
  ALTER TABLE "visit_requests" ADD COLUMN "emails_committee" "enum_visit_requests_emails_committee";
  ALTER TABLE "visit_requests" ADD COLUMN "emails_last_error" varchar;
  ALTER TABLE "contact_submissions" ADD COLUMN "emails_acknowledgement" "enum_contact_submissions_emails_acknowledgement";
  ALTER TABLE "contact_submissions" ADD COLUMN "emails_committee" "enum_contact_submissions_emails_committee";
  ALTER TABLE "contact_submissions" ADD COLUMN "emails_last_error" varchar;
  ALTER TABLE "receipt_requests" ADD COLUMN "emails_acknowledgement" "enum_receipt_requests_emails_acknowledgement";
  ALTER TABLE "receipt_requests" ADD COLUMN "emails_receipt" "enum_receipt_requests_emails_receipt";
  ALTER TABLE "receipt_requests" ADD COLUMN "emails_committee" "enum_receipt_requests_emails_committee";
  ALTER TABLE "receipt_requests" ADD COLUMN "emails_last_error" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "visit_requests" DROP COLUMN "emails_acknowledgement";
  ALTER TABLE "visit_requests" DROP COLUMN "emails_confirmation";
  ALTER TABLE "visit_requests" DROP COLUMN "emails_committee";
  ALTER TABLE "visit_requests" DROP COLUMN "emails_last_error";
  ALTER TABLE "contact_submissions" DROP COLUMN "emails_acknowledgement";
  ALTER TABLE "contact_submissions" DROP COLUMN "emails_committee";
  ALTER TABLE "contact_submissions" DROP COLUMN "emails_last_error";
  ALTER TABLE "receipt_requests" DROP COLUMN "emails_acknowledgement";
  ALTER TABLE "receipt_requests" DROP COLUMN "emails_receipt";
  ALTER TABLE "receipt_requests" DROP COLUMN "emails_committee";
  ALTER TABLE "receipt_requests" DROP COLUMN "emails_last_error";
  DROP TYPE "public"."enum_visit_requests_emails_acknowledgement";
  DROP TYPE "public"."enum_visit_requests_emails_confirmation";
  DROP TYPE "public"."enum_visit_requests_emails_committee";
  DROP TYPE "public"."enum_contact_submissions_emails_acknowledgement";
  DROP TYPE "public"."enum_contact_submissions_emails_committee";
  DROP TYPE "public"."enum_receipt_requests_emails_acknowledgement";
  DROP TYPE "public"."enum_receipt_requests_emails_receipt";
  DROP TYPE "public"."enum_receipt_requests_emails_committee";`)
}
