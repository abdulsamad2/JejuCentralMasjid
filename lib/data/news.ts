export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  date: string // ISO YYYY-MM-DD
  tag?: string
  image?: string
}

export function formatNewsDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
