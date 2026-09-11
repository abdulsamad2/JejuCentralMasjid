'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'

/** Account button in the top bar: the admin's initials instead of a grey silhouette. */
export function Avatar() {
  const { user } = useAuth<{ name?: string | null; email?: string }>()
  const source = user?.name?.trim() || user?.email || ''
  const initials =
    source
      .split(/[\s@._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || '?'
  return (
    <span className="jcm-avatar" aria-hidden="true">
      {initials}
    </span>
  )
}
