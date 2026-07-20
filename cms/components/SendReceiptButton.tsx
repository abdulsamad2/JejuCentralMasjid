'use client'

import React, { useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

/**
 * One-click issue button on a receipt request: sets status to "issued",
 * which numbers the receipt and emails it to the donor automatically.
 */
export function SendReceiptButton() {
  const { id } = useDocumentInfo()
  const status = useFormFields(([fields]) => fields?.status?.value as string | undefined)
  const receiptNumber = useFormFields(
    ([fields]) => fields?.receiptNumber?.value as string | undefined,
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!id) return null

  if (status === 'issued') {
    return (
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '6px',
          background: 'rgba(11,143,74,.12)',
          color: '#0B8F4A',
          fontSize: '13px',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        ✓ Receipt {receiptNumber || ''} sent to the donor
      </div>
    )
  }

  const send = async () => {
    if (busy) return
    if (!window.confirm('Confirm you verified this transfer in the bank app?\nThe receipt will be numbered and emailed to the donor.')) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/receipt-requests/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'issued' }),
      })
      if (!res.ok) throw new Error(String(res.status))
      window.location.reload()
    } catch {
      setError('Could not send — check you are logged in and try again.')
      setBusy(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={send}
        disabled={busy}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '6px',
          border: 'none',
          background: busy ? '#9ca3af' : '#0B8F4A',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 700,
          cursor: busy ? 'default' : 'pointer',
        }}
      >
        {busy ? 'Sending…' : '✉️ Verify & send receipt'}
      </button>
      {error && (
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#dc2626' }}>{error}</p>
      )}
    </div>
  )
}
