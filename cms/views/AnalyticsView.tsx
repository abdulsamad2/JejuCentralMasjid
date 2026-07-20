import React from 'react'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'

type Row = {
  path?: string | null
  day?: string | null
  source?: string | null
  campaign?: string | null
  country?: string | null
  device?: string | null
  visitor?: string | null
  referrer?: string | null
  createdAt?: string | null
}

const RANGES = [7, 30, 90] as const

const kstDay = (offset: number): string =>
  new Date(Date.now() - offset * 86400000).toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })

const flag = (cc: string): string =>
  /^[A-Z]{2}$/i.test(cc)
    ? cc.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    : ''

const countryName = (cc: string): string => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(cc.toUpperCase()) || cc
  } catch {
    return cc
  }
}

const top = (rows: Row[], key: keyof Row, n: number, skip: string[] = []): [string, number][] => {
  const counts = new Map<string, number>()
  for (const r of rows) {
    const v = (r[key] || '').toString().trim()
    if (!v || skip.includes(v)) continue
    counts.set(v, (counts.get(v) || 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
}

const pct = (n: number, of: number) => (of > 0 ? Math.round((n / of) * 100) : 0)

function Delta({ now, prev }: { now: number; prev: number }) {
  if (prev === 0) return <span className="jcm-delta jcm-muted">new</span>
  const change = Math.round(((now - prev) / prev) * 100)
  if (change === 0) return <span className="jcm-delta jcm-muted">— 0%</span>
  const up = change > 0
  return (
    <span className={`jcm-delta ${up ? 'jcm-up' : 'jcm-down'}`}>
      {up ? '▲' : '▼'} {Math.abs(change)}%
    </span>
  )
}

function Tile({
  label,
  value,
  sub,
}: {
  label: string
  value: React.ReactNode
  sub?: React.ReactNode
}) {
  return (
    <div className="jcm-tile">
      <p className="jcm-tile-label">{label}</p>
      <p className="jcm-tile-value">{value}</p>
      {sub && <p className="jcm-tile-sub">{sub}</p>}
    </div>
  )
}

function HBarList({
  title,
  items,
  total,
  render,
}: {
  title: string
  items: [string, number][]
  total: number
  render?: (label: string) => React.ReactNode
}) {
  const max = Math.max(1, ...items.map(([, v]) => v))
  return (
    <div className="jcm-panel">
      <p className="jcm-panel-title">{title}</p>
      {items.length === 0 ? (
        <p className="jcm-empty">No data yet</p>
      ) : (
        items.map(([label, count]) => (
          <div key={label} className="jcm-hrow" title={`${label}: ${count} views (${pct(count, total)}%)`}>
            <span className="jcm-hlabel">{render ? render(label) : label}</span>
            <span className="jcm-htrack">
              <span className="jcm-hbar" style={{ width: `${(count / max) * 100}%` }} />
            </span>
            <span className="jcm-hvalue">
              {count.toLocaleString()}
              <span className="jcm-hpct">{pct(count, total)}%</span>
            </span>
          </div>
        ))
      )}
    </div>
  )
}

export async function AnalyticsView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { permissions, req, visibleEntities, locale } = initPageResult
  const { payload, user, i18n } = req
  if (!user) redirect('/admin/login')

  const rangeParam = Number(
    (Array.isArray(searchParams?.range) ? searchParams?.range[0] : searchParams?.range) || 30,
  )
  const days = (RANGES as readonly number[]).includes(rangeParam) ? rangeParam : 30
  const since = kstDay(days - 1)
  const prevSince = kstDay(days * 2 - 1)

  const { docs } = await payload.find({
    collection: 'pageviews',
    where: { day: { greater_than_equal: prevSince } },
    limit: 0,
    pagination: false,
    depth: 0,
    sort: '-createdAt',
  })
  const all = docs as Row[]
  const rows = all.filter((r) => (r.day || '') >= since)
  const prevRows = all.filter((r) => (r.day || '') < since)

  const views = rows.length
  const visitors = new Set(rows.map((r) => r.visitor).filter(Boolean)).size
  const prevViews = prevRows.length
  const prevVisitors = new Set(prevRows.map((r) => r.visitor).filter(Boolean)).size
  const mobile = rows.filter((r) => r.device === 'mobile').length
  const desktop = views - mobile
  const today = kstDay(0)
  const todayViews = rows.filter((r) => r.day === today).length
  const perVisitor = visitors > 0 ? (views / visitors).toFixed(1) : '0'

  const byDay = new Map<string, number>()
  for (let i = days - 1; i >= 0; i--) byDay.set(kstDay(i), 0)
  for (const r of rows) if (r.day && byDay.has(r.day)) byDay.set(r.day, (byDay.get(r.day) || 0) + 1)
  const series = [...byDay.entries()]
  const peak = Math.max(1, ...series.map(([, v]) => v))

  const recent = rows.slice(0, 8)

  return (
    <DefaultTemplate
      i18n={i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        {/* Chart theme — accents validated for light (#0B8F4A) and dark (#2CAA6B) surfaces */}
        <style>{`
          :root { --jcm-accent:#0B8F4A; --jcm-accent-soft:rgba(11,143,74,.14); --jcm-pos:#0B8F4A; --jcm-neg:#C2410C; }
          html[data-theme='dark'] { --jcm-accent:#2CAA6B; --jcm-accent-soft:rgba(44,170,107,.2); --jcm-pos:#2CAA6B; --jcm-neg:#F97316; }
          .jcm-head { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin:8px 0 20px; }
          .jcm-title { margin:0; font-size:22px; font-weight:700; }
          .jcm-filters { display:flex; gap:6px; }
          .jcm-filter { padding:6px 14px; border-radius:99px; font-size:13px; font-weight:600; text-decoration:none;
            color:var(--theme-elevation-700); background:var(--theme-elevation-50); border:1px solid var(--theme-elevation-150); }
          .jcm-filter[data-active='true'] { color:#fff; background:var(--jcm-accent); border-color:var(--jcm-accent); }
          .jcm-tiles { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; }
          .jcm-tile { border:1px solid var(--theme-elevation-150); background:var(--theme-elevation-50); border-radius:8px; padding:14px 16px; }
          .jcm-tile-label { margin:0; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--theme-elevation-500); }
          .jcm-tile-value { margin:6px 0 0; font-size:26px; font-weight:700; font-variant-numeric:tabular-nums; }
          .jcm-tile-sub { margin:4px 0 0; font-size:12px; color:var(--theme-elevation-500); }
          .jcm-delta { font-size:12px; font-weight:700; }
          .jcm-up { color:var(--jcm-pos); } .jcm-down { color:var(--jcm-neg); } .jcm-muted { color:var(--theme-elevation-450); }
          .jcm-panel { border:1px solid var(--theme-elevation-150); background:var(--theme-elevation-50); border-radius:8px; padding:14px 16px; }
          .jcm-panel-title { margin:0 0 10px; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--theme-elevation-500); }
          .jcm-empty { font-size:13px; color:var(--theme-elevation-450); margin:0; }
          .jcm-chart { display:flex; align-items:flex-end; gap:2px; height:120px; margin-top:6px; }
          .jcm-bar { flex:1; min-width:2px; border-radius:4px 4px 0 0; background:var(--jcm-accent); }
          .jcm-bar[data-zero='true'] { background:var(--theme-elevation-150); }
          .jcm-axis { display:flex; justify-content:space-between; font-size:11px; color:var(--theme-elevation-450);
            border-top:1px solid var(--theme-elevation-200); padding-top:4px; margin-top:0; font-variant-numeric:tabular-nums; }
          .jcm-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:10px; margin-top:10px; }
          .jcm-hrow { display:grid; grid-template-columns:minmax(90px,38%) 1fr auto; align-items:center; gap:8px; padding:3px 0; font-size:13px; }
          .jcm-hlabel { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--theme-elevation-700); }
          .jcm-htrack { height:12px; border-radius:4px; background:var(--jcm-accent-soft); overflow:hidden; }
          .jcm-hbar { display:block; height:100%; border-radius:4px; background:var(--jcm-accent); min-width:3px; }
          .jcm-hvalue { font-variant-numeric:tabular-nums; font-weight:600; display:flex; gap:6px; align-items:baseline; }
          .jcm-hpct { font-size:11px; font-weight:400; color:var(--theme-elevation-450); min-width:32px; text-align:right; }
          .jcm-split { display:flex; height:16px; border-radius:4px; overflow:hidden; gap:2px; margin-top:8px; }
          .jcm-split > span { height:100%; }
          .jcm-recent { font-size:13px; }
          .jcm-recent-row { display:flex; justify-content:space-between; gap:10px; padding:4px 0; border-bottom:1px solid var(--theme-elevation-100); }
          .jcm-recent-row:last-child { border-bottom:none; }
          .jcm-footnote { margin-top:14px; font-size:12px; color:var(--theme-elevation-450); }
          .jcm-footnote a { color:var(--jcm-accent); font-weight:600; }
        `}</style>

        <div className="jcm-head">
          <h1 className="jcm-title">Visitor analytics</h1>
          <div className="jcm-filters">
            {RANGES.map((r) => (
              <a key={r} href={`/admin/analytics?range=${r}`} className="jcm-filter" data-active={r === days}>
                {r} days
              </a>
            ))}
          </div>
        </div>

        <div className="jcm-tiles">
          <Tile label="Page views" value={views.toLocaleString()} sub={<Delta now={views} prev={prevViews} />} />
          <Tile label="Unique visitors" value={visitors.toLocaleString()} sub={<Delta now={visitors} prev={prevVisitors} />} />
          <Tile label="Views / visitor" value={perVisitor} />
          <Tile label="Mobile share" value={`${pct(mobile, views)}%`} sub={`${desktop.toLocaleString()} desktop views`} />
          <Tile label="Today" value={todayViews.toLocaleString()} sub={today} />
        </div>

        <div className="jcm-panel" style={{ marginTop: '10px' }}>
          <p className="jcm-panel-title">Daily page views · peak {peak.toLocaleString()}</p>
          <div className="jcm-chart">
            {series.map(([day, count]) => (
              <div
                key={day}
                className="jcm-bar"
                data-zero={count === 0}
                title={`${day}: ${count.toLocaleString()} views`}
                style={{ height: `${Math.max(3, (count / peak) * 100)}%` }}
              />
            ))}
          </div>
          <div className="jcm-axis">
            <span>{series[0]?.[0]}</span>
            <span>{series[series.length - 1]?.[0]}</span>
          </div>
        </div>

        <div className="jcm-grid">
          <HBarList title="Traffic sources" items={top(rows, 'source', 8, ['Internal'])} total={views} />
          <HBarList title="Top pages" items={top(rows, 'path', 8)} total={views} />
          <HBarList
            title="Countries"
            items={top(rows, 'country', 8)}
            total={views}
            render={(cc) => `${flag(cc)} ${countryName(cc)}`.trim()}
          />
          <div className="jcm-panel">
            <p className="jcm-panel-title">Devices</p>
            {views === 0 ? (
              <p className="jcm-empty">No data yet</p>
            ) : (
              <>
                <div className="jcm-hvalue" style={{ justifyContent: 'space-between', display: 'flex' }}>
                  <span>📱 Mobile {pct(mobile, views)}%</span>
                  <span>🖥 Desktop {pct(desktop, views)}%</span>
                </div>
                <div className="jcm-split" title={`Mobile ${mobile} · Desktop ${desktop}`}>
                  <span style={{ width: `${pct(mobile, views)}%`, background: 'var(--jcm-accent)' }} />
                  <span style={{ width: `${pct(desktop, views)}%`, background: 'var(--theme-elevation-300)' }} />
                </div>
              </>
            )}
            <p className="jcm-panel-title" style={{ marginTop: '16px' }}>Campaigns (UTM)</p>
            {top(rows, 'campaign', 5).length === 0 ? (
              <p className="jcm-empty">
                None yet — share links like jejucentralmasjid.kr/?utm_source=kakao_group to measure them.
              </p>
            ) : (
              top(rows, 'campaign', 5).map(([label, count]) => (
                <div key={label} className="jcm-recent-row">
                  <span className="jcm-hlabel">{label}</span>
                  <strong>{count.toLocaleString()}</strong>
                </div>
              ))
            )}
          </div>
          <div className="jcm-panel jcm-recent">
            <p className="jcm-panel-title">Recent activity</p>
            {recent.length === 0 ? (
              <p className="jcm-empty">No visits recorded yet</p>
            ) : (
              recent.map((r, i) => (
                <div key={i} className="jcm-recent-row">
                  <span className="jcm-hlabel">{r.path}</span>
                  <span style={{ color: 'var(--theme-elevation-500)', whiteSpace: 'nowrap' }}>
                    {r.source}
                    {r.country ? ` · ${flag(r.country)}` : ''} ·{' '}
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleTimeString('en-GB', {
                          timeZone: 'Asia/Seoul',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="jcm-footnote">
          First-party, cookie-free analytics (anonymous daily visitor hashes; no personal data).
          Raw data: <a href="/admin/collections/pageviews">page views table</a>
          {process.env.NEXT_PUBLIC_UMAMI_SHARE_URL && (
            <>
              {' · '}
              <a href={process.env.NEXT_PUBLIC_UMAMI_SHARE_URL} target="_blank" rel="noopener noreferrer">
                Umami dashboard →
              </a>
            </>
          )}
        </p>
      </Gutter>
    </DefaultTemplate>
  )
}
