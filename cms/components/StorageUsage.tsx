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
  // Every public photo lives in Images (media).
  const { docs } = await payload.find({
    collection: 'media',
    limit: 0,
    pagination: false,
    depth: 0,
    select: { filesize: true },
  })

  const used = docs.reduce((sum, d) => sum + (d.filesize || 0), 0)
  const pct = Math.min(100, (used / LIMIT_BYTES) * 100)
  const remaining = Math.max(0, LIMIT_BYTES - used)
  const barColor = pct > 90 ? '#dc2626' : pct > 70 ? '#d97706' : 'var(--jcm-green)'

  return (
    <section className="jcm-panel">
      <div className="jcm-panel__head jcm-panel__head--row">
        <h3>Image storage</h3>
        <p>
          {fmt(used)} of {fmt(LIMIT_BYTES)} used, {fmt(remaining)} left
        </p>
      </div>
      <div
        className="jcm-meter"
        role="meter"
        aria-label="Image storage used"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className="jcm-meter__fill" style={{ width: `${Math.max(pct, 0.5)}%`, background: barColor }} />
      </div>
      <p className="jcm-panel__note">
        {docs.length} photos stored. Uploads are compressed automatically (a typical photo uses about 150 KB), so
        there is room for roughly {Math.floor(remaining / (150 * 1024)).toLocaleString()} more.
      </p>
    </section>
  )
}
