import React from 'react'
import Image from 'next/image'

/*
 * Jeju Central Masjid branding for the admin panel. Styling lives in
 * app/(payload)/custom.scss under the `jcm-` class prefix.
 */

/** Full trilingual logo — login, forgot-password and other sign-in pages. */
export function Logo() {
  return (
    <Image
      className="jcm-logo"
      src="/assets/jeju-masjid-logo.png"
      alt="Jeju Central Masjid"
      width={346}
      height={406}
      priority
    />
  )
}

/** Small mark — breadcrumbs in the top bar. */
export function Icon() {
  return (
    <Image
      className="jcm-icon"
      src="/assets/jeju-masjid-logo-icon.png"
      alt="Admin Panel home"
      width={311}
      height={227}
    />
  )
}

/** Top of the sidebar. */
export function NavBrand() {
  return (
    <a href="/admin" className="jcm-nav-brand">
      <span className="jcm-nav-brand__tile">
        <Image src="/assets/jeju-masjid-logo-icon.png" alt="" width={311} height={227} />
      </span>
      <span className="jcm-nav-brand__text">
        <span className="jcm-nav-brand__name">Admin Panel</span>
        <span className="jcm-nav-brand__sub">Manage the website</span>
      </span>
    </a>
  )
}

/** Shown above the sign-in form. */
export function LoginIntro() {
  return (
    <div className="jcm-login-intro">
      <p className="jcm-login-intro__greeting">Assalamu alaikum</p>
      <p className="jcm-login-intro__text">Sign in to the admin panel.</p>
    </div>
  )
}

/** Shown below the sign-in form. */
export function LoginFooter() {
  return (
    <p className="jcm-login-footer">
      <a href="/">Back to the website</a>
    </p>
  )
}

const today = (calendar?: string): string =>
  new Intl.DateTimeFormat(calendar ? `en-GB-u-ca-${calendar}` : 'en-GB', {
    weekday: calendar ? undefined : 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Seoul',
  }).format(new Date())

/** Dashboard greeting, in the style of the homepage hero. */
export function Welcome({ user }: { user?: { name?: string | null } | null }) {
  const firstName = user?.name?.trim().split(/\s+/)[0]
  let hijri = ''
  try {
    hijri = today('islamic-umalqura')
  } catch {
    // Runtime without the Islamic calendar — show the Gregorian date only.
  }
  return (
    <section className="jcm-welcome">
      <Image
        className="jcm-welcome__photo"
        src="/assets/mosque-1.jpg"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        priority
      />
      <div className="jcm-welcome__body">
        <h2 className="jcm-welcome__greeting">Assalamu alaikum{firstName ? `, ${firstName}` : ''}</h2>
        <p className="jcm-welcome__date">
          <span>{today()}</span>
          {hijri && <span>{hijri}</span>}
        </p>
        <div className="jcm-welcome__actions">
          <a className="jcm-button jcm-button--gold" href="/" target="_blank" rel="noreferrer">
            Open the website
          </a>
          <a className="jcm-button jcm-button--ghost" href="/admin/globals/home-slider">
            Change the homepage slider
          </a>
        </div>
      </div>
    </section>
  )
}
