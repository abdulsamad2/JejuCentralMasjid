'use client'

import { useEffect, useState } from 'react'

// Assembled at runtime so the address never appears in the served HTML,
// which is what email-harvesting bots scrape.
const USER = 'info'
const DOMAIN = 'jejucentralmasjid'
const TLD = 'kr'

export default function EmailLink({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [href, setHref] = useState<string | null>(null)
  const address = `${USER}@${DOMAIN}.${TLD}`

  useEffect(() => {
    setHref(`mailto:${address}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!href) {
    return <span className={className}>{children ?? `${USER} [at] ${DOMAIN}.${TLD}`}</span>
  }
  return (
    <a href={href} className={className}>
      {children ?? address}
    </a>
  )
}
