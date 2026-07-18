import React from 'react'
import type { Payload } from 'payload'

type Row = {
  path?: string | null
  day?: string | null
  source?: string | null
  country?: string | null
  device?: string | null
  visitor?: string | null
}

const DAYS = 30

const kstDay = (offset: number): string => {
  const d = new Date(Date.now() - offset * 24 * 60 * 60 * 1000)
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
}

const top = (rows: Row[], key: keyof Row, n: number): [string, number][] => {
  const counts = new Map<string, number>()
  for (const r of rows) {
    const v = (r[key] || '').toString().trim()
    if (!v || v === 'Internal') continue
    counts.set(v, (counts.get(v) || 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
}

const cellStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  fontSize: '13px',
  padding: '3px 0',
  color: 'var(--theme-elevation-700)',
}

function List({ title, items }: { title: string; items: [string, number][] }) {
  return (
    <div style={{ minWidth: '180px', flex: '1 1 180px' }}>
      <p style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--theme-elevation-500)' }}>
        {title}
      </p>
      {items.length === 0 ? (
        <p style={{ fontSize: '13px', color: 'var(--theme-elevation-450)' }}>No data yet</p>
      ) : (
        items.map(([label, count]) => (
          <div key={label} style={cellStyle}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
            <strong>{count.toLocaleString()}</strong>
          </div>
        ))
      )}
    </div>
  )
}

export async function VisitorAnalytics({ payload }: { payload: Payload }) {
  const since = kstDay(DAYS - 1)
  const { docs } = await payload.find({
    collection: 'pageviews',
    where: { day: { greater_than_equal: since } },
    limit: 0,
    pagination: false,
    depth: 0,
    select: { path: true, day: true, source: true, country: true, device: true, visitor: true },
  })
  const rows = docs as Row[]

  const views = rows.length
  const visitors = new Set(rows.map((r) => r.visitor).filter(Boolean)).size
  const mobile = rows.filter((r) => r.device === 'mobile').length

  const byDay = new Map<string, number>()
  for (let i = DAYS - 1; i >= 0; i--) byDay.set(kstDay(i), 0)
  for (const r of rows) if (r.day && byDay.has(r.day)) byDay.set(r.day, (byDay.get(r.day) || 0) + 1)
  const series = [...byDay.entries()]
  const max = Math.max(1, ...series.map(([, v]) => v))

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
        <strong>
          Visitors — last {DAYS} days{' '}
          <a href="/admin/analytics" style={{ color: '#0B8F4A', fontSize: '13px', fontWeight: 600, marginLeft: '8px' }}>
            Full analytics →
          </a>
        </strong>
        <span style={{ fontSize: '13px', color: 'var(--theme-elevation-600)' }}>
          {views.toLocaleString()} page views · {visitors.toLocaleString()} unique visitors ·{' '}
          {views > 0 ? Math.round((mobile / views) * 100) : 0}% mobile
        </span>
      </div>

      {/* Daily bar chart */}
      <div
        aria-hidden="true"
        style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '64px', marginTop: '14px' }}
      >
        {series.map(([day, count]) => (
          <div
            key={day}
            title={`${day}: ${count} views`}
            style={{
              flex: 1,
              height: `${Math.max(4, (count / max) * 100)}%`,
              borderRadius: '2px 2px 0 0',
              background: count > 0 ? '#0B8F4A' : 'var(--theme-elevation-150)',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--theme-elevation-450)', marginTop: '4px' }}>
        <span>{series[0]?.[0]}</span>
        <span>{series[series.length - 1]?.[0]}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '18px' }}>
        <List title="Traffic sources" items={top(rows, 'source', 6)} />
        <List title="Top pages" items={top(rows, 'path', 6)} />
        <List title="Countries" items={top(rows, 'country', 6)} />
      </div>

      <p style={{ margin: '14px 0 0', fontSize: '12px', color: 'var(--theme-elevation-450)' }}>
        First-party analytics — recorded anonymously (no cookies, no personal data stored).
        {process.env.NEXT_PUBLIC_UMAMI_SHARE_URL && (
          <>
            {' · '}
            <a
              href={process.env.NEXT_PUBLIC_UMAMI_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0B8F4A', fontWeight: 600 }}
            >
              Open full Umami dashboard →
            </a>
          </>
        )}
      </p>
    </div>
  )
}
