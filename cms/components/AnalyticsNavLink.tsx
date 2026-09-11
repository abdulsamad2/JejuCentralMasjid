'use client'

import React from 'react'

/** Sidebar links below the collections: full analytics, and the public site. */
export function AnalyticsNavLink() {
  return (
    <div className="jcm-nav-extras">
      <a href="/admin/analytics" className="jcm-nav-extra">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <line x1="4" y1="20" x2="4" y2="12" />
          <line x1="10" y1="20" x2="10" y2="6" />
          <line x1="16" y1="20" x2="16" y2="10" />
          <line x1="22" y1="20" x2="22" y2="14" />
        </svg>
        Analytics
      </a>
      <a href="/" target="_blank" rel="noreferrer" className="jcm-nav-extra">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        View website
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  )
}
