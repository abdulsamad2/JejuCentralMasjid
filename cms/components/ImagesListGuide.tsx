'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { ImagesGuide } from './AdminGuides'

// Payload renders a collection's Description on its edit pages too; the full
// guide belongs on the list only (edit forms have the compact Photo tips).
export function ImagesListGuide() {
  const pathname = usePathname() ?? ''
  return pathname.replace(/\/$/, '').endsWith('/collections/media') ? <ImagesGuide /> : null
}
