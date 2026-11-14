import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Deleted posts that Google still lists: send visitors and link value to
      // the news page instead of a 404. Add a line here whenever a post is removed.
      ...['ramadan-2026-prayer-iftar-schedule', 'eid-al-fitr-2026-announcement', 'community-iftar-open-to-all'].map(
        (slug) => ({ source: `/news/${slug}`, destination: '/news', permanent: true }),
      ),
      { source: '/favicon.ico', destination: '/icon.png', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Stops other sites framing the admin login (clickjacking).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
