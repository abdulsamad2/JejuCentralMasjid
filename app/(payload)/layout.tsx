/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { Amiri, Inter } from 'next/font/google'

import { importMap } from './admin/importMap.js'
import './custom.scss'

// Same typefaces as the public site, self-hosted by next/font. custom.scss
// points Payload's --font-body at Inter; Amiri is used for greetings.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const amiri = Amiri({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-amiri', display: 'swap' })

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    htmlProps={{ className: `${inter.variable} ${amiri.variable}` }}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
)

export default Layout
