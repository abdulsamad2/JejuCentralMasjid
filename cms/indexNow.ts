const HOST = 'jejucentralmasjid.kr'
/** Must match public/<key>.txt, which proves ownership to the search engines. */
const KEY = '6c5ee218ba6534578fce55e9c7dfc90d'

// api.indexnow.org fans out to Bing, Yandex and Seznam; Naver is pinged
// directly because it is the engine that matters most in Korea.
const ENDPOINTS = ['https://api.indexnow.org/indexnow', 'https://searchadvisor.naver.com/indexnow']

/** Tell Naver/Bing a page changed so it is re-crawled in minutes, not weeks. Never throws. */
export async function pingIndexNow(paths: string[]): Promise<void> {
  // Preview and local builds must not announce URLs to search engines.
  if (process.env.VERCEL_ENV !== 'production' || paths.length === 0) return
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: paths.map((p) => `https://${HOST}${p}`),
  })
  await Promise.allSettled(
    ENDPOINTS.map((url) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
        signal: AbortSignal.timeout(5000),
      }),
    ),
  )
}
