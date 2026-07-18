import React from 'react'
import type { Payload } from 'payload'

// Vercel Blob free (Hobby) tier includes 1 GB of storage. Override with
// BLOB_STORAGE_LIMIT_MB if the plan changes.
const LIMIT_BYTES = Number(process.env.BLOB_STORAGE_LIMIT_MB || 1024) * 1024 * 1024

const fmt = (bytes: number): string => {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export async function StorageUsage({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'media',
    limit: 0,
    pagination: false,
    depth: 0,
    select: { filesize: true },
  })

  const used = docs.reduce((sum, d) => sum + (((d as { filesize?: number | null }).filesize) || 0), 0)
  const pct = Math.min(100, (used / LIMIT_BYTES) * 100)
  const remaining = Math.max(0, LIMIT_BYTES - used)
  const barColor = pct > 90 ? '#dc2626' : pct > 70 ? '#d97706' : '#0B8F4A'

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
        borderRadius: '8px',
        padding: '16px 20px',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <strong>Image storage</strong>
        <span style={{ fontSize: '13px', color: 'var(--theme-elevation-600)' }}>
          {docs.length} image{docs.length === 1 ? '' : 's'} · {fmt(used)} used of {fmt(LIMIT_BYTES)} ·{' '}
          {fmt(remaining)} remaining
        </span>
      </div>
      <div
        style={{
          marginTop: '10px',
          height: '8px',
          borderRadius: '4px',
          background: 'var(--theme-elevation-150)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.max(pct, 0.5)}%`,
            height: '100%',
            borderRadius: '4px',
            background: barColor,
          }}
        />
      </div>
      <p style={{ marginTop: '8px', marginBottom: 0, fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
        Uploads are auto-compressed (max 1600px, WebP) — a typical photo uses ~150 KB, so there is
        room for roughly {Math.floor(remaining / (150 * 1024)).toLocaleString()} more photos.
      </p>
    </div>
  )
}
