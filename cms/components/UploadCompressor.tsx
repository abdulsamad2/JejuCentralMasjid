'use client'

import React, { useEffect } from 'react'

import { compressFileList, needsCompression } from '@/lib/compressImage'

/**
 * Shrinks photos in the browser before the admin uploads them, so large phone
 * photos stay under Vercel's 4.5MB request limit (see lib/compressImage).
 *
 * Payload's upload field takes files from an <input type="file"> change and
 * from drop / paste events on its dropzone. Those events are caught here in
 * the capture phase, before Payload sees them; the images are compressed and
 * the event is re-sent with the smaller files.
 */
export function UploadCompressor({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    // Events this component re-sends itself, so they pass straight through.
    const resent = new WeakSet<Event>()

    const hasLargeImage = (files?: FileList | null) => !!files && Array.from(files).some(needsCompression)

    const process = async (files: FileList, resend: (smaller: FileList) => void) => {
      document.documentElement.style.cursor = 'progress'
      try {
        resend((await compressFileList(files)) ?? files)
      } finally {
        document.documentElement.style.cursor = ''
      }
    }

    const onChange = (e: Event) => {
      const input = e.target
      if (resent.has(e) || !(input instanceof HTMLInputElement) || input.type !== 'file') return
      if (!hasLargeImage(input.files)) return
      e.stopImmediatePropagation()
      void process(input.files!, (smaller) => {
        input.files = smaller
        const next = new Event('change', { bubbles: true })
        resent.add(next)
        input.dispatchEvent(next)
      })
    }

    const onDrop = (e: DragEvent) => {
      if (resent.has(e) || !hasLargeImage(e.dataTransfer?.files)) return
      e.preventDefault()
      e.stopImmediatePropagation()
      const target = e.target as Node
      void process(e.dataTransfer!.files, (smaller) => {
        const dt = new DataTransfer()
        for (const f of Array.from(smaller)) dt.items.add(f)
        const next = new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: dt })
        resent.add(next)
        target.dispatchEvent(next)
      })
    }

    const onPaste = (e: ClipboardEvent) => {
      if (resent.has(e) || !hasLargeImage(e.clipboardData?.files)) return
      e.preventDefault()
      e.stopImmediatePropagation()
      const target = e.target as Node
      void process(e.clipboardData!.files, (smaller) => {
        const dt = new DataTransfer()
        for (const f of Array.from(smaller)) dt.items.add(f)
        const next = new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: dt })
        resent.add(next)
        target.dispatchEvent(next)
      })
    }

    window.addEventListener('change', onChange, true)
    window.addEventListener('drop', onDrop, true)
    window.addEventListener('paste', onPaste, true)
    return () => {
      window.removeEventListener('change', onChange, true)
      window.removeEventListener('drop', onDrop, true)
      window.removeEventListener('paste', onPaste, true)
    }
  }, [])

  return <>{children}</>
}
