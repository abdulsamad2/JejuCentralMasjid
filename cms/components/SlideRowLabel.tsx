'use client'

import { useRowLabel } from '@payloadcms/ui'

// Shows each slide's heading in the collapsed array rows instead of
// "Slide 01", and flags slides that are switched off.
export function SlideRowLabel() {
  const { data, rowNumber } = useRowLabel<{ title?: string; visible?: boolean }>()
  const label = data?.title || `Slide ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`
  return (
    <span>
      {label}
      {data?.visible === false && <em style={{ opacity: 0.6 }}> — hidden</em>}
    </span>
  )
}
