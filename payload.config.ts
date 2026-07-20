import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'

import { Users } from './cms/collections/Users'
import { Media } from './cms/collections/Media'
import { News } from './cms/collections/News'
import { Events } from './cms/collections/Events'
import { ContactSubmissions } from './cms/collections/ContactSubmissions'
import { PageViews } from './cms/collections/PageViews'
import { ReceiptRequests } from './cms/collections/ReceiptRequests'
import { ReceiptScreenshots } from './cms/collections/ReceiptScreenshots'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Neon Postgres (Vercel Marketplace) — POSTGRES_URL is injected by Vercel in
// production; for local dev run `vercel env pull` or copy it into .env.local.
// push is disabled because dev and prod share one database: schema changes go
// through migrations only (npm run payload migrate:create, then migrate).
const db = vercelPostgresAdapter({
  pool: { connectionString: process.env.POSTGRES_URL || '' },
  push: false,
})

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Jeju Central Masjid' },
    importMap: { baseDir: dirname },
    components: {
      beforeDashboard: [
        '/cms/components/VisitorAnalytics#VisitorAnalytics',
        '/cms/components/StorageUsage#StorageUsage',
      ],
      afterNavLinks: ['/cms/components/AnalyticsNavLink#AnalyticsNavLink'],
      logout: { Button: '/cms/components/LogoutButton#LogoutButton' },
      views: {
        analytics: {
          Component: '/cms/views/AnalyticsView#AnalyticsView',
          path: '/analytics',
        },
      },
    },
  },
  collections: [
    News,
    Events,
    ContactSubmissions,
    ReceiptRequests,
    ReceiptScreenshots,
    Media,
    Users,
    PageViews,
  ],
  // All outbound email (receipts, notifications, password resets) sends as
  // info@jejucentralmasjid.kr via Resend; without the key it logs to console.
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          defaultFromAddress: 'info@jejucentralmasjid.kr',
          defaultFromName: 'Jeju Central Masjid',
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'jcm-dev-only-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'cms/payload-types.ts'),
  },
  db,
  sharp,
  plugins: [
    // News image uploads persist to Vercel Blob in production (serverless
    // filesystems are ephemeral); locally they land in ./media.
    // Uploads go through the server so sharp can compress them (clientUploads
    // would bypass compression entirely). Vercel caps request bodies at 4.5MB,
    // so originals must be under ~4MB — compression stores them far smaller.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true, 'receipt-screenshots': true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
