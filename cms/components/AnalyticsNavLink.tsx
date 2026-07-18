'use client'

import React from 'react'

/** Sidebar link to the full analytics dashboard. */
export function AnalyticsNavLink() {
  return (
    <a
      href="/admin/analytics"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 0',
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--theme-elevation-800)',
        textDecoration: 'none',
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <line x1="4" y1="20" x2="4" y2="12" />
        <line x1="10" y1="20" x2="10" y2="6" />
        <line x1="16" y1="20" x2="16" y2="10" />
        <line x1="22" y1="20" x2="22" y2="14" />
      </svg>
      Analytics
    </a>
  )
}
