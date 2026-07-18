'use client'

import React from 'react'

/**
 * Replaces Payload's default (icon-only) logout control with a clearly
 * labeled button so committee admins can always find the way out.
 */
export function LogoutButton() {
  return (
    <a
      href="/admin/logout"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '12px 16px',
        borderRadius: '6px',
        border: 'none',
        background: '#dc2626',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '0.02em',
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
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Log out
    </a>
  )
}
