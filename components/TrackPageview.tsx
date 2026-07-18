'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Fires one beacon per page view for the first-party analytics in /admin. */
export default function TrackPageview() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    const body = JSON.stringify({
      path: pathname,
      referrer: document.referrer,
      search: window.location.search,
    })
    try {
      const blob = new Blob([body], { type: 'application/json' })
      if (!navigator.sendBeacon?.('/api/track', blob)) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      /* never break the page for analytics */
    }
  }, [pathname])

  return null
}
