/**
 * BreadcrumbList structured data.
 *
 * Google uses this to render the ">" trail in place of a bare URL in search
 * results, and aggregators use it to understand site hierarchy. "Home" is
 * prepended automatically, so a page only declares its own trail.
 */

export const SITE_URL = 'https://jejucentralmasjid.kr'

export type Crumb = { name: string; path: string }

export function breadcrumbJsonLd(trail: Crumb[]) {
  const full: Crumb[] = [{ name: 'Home', path: '/' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  }
}
