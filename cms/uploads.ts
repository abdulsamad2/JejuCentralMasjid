import type { CollectionBeforeChangeHook, UploadConfig } from 'payload'

/**
 * Shared settings for public photo uploads (Images, Gallery photos).
 *
 * Only formats sharp can compress are accepted. Anything else — notably
 * iPhone HEIC — would otherwise be stored uncompressed and cannot be shown
 * by the Next image optimiser. Payload checks the file contents, not just
 * the extension. iPhones convert HEIC to JPEG automatically when a site
 * only accepts these types.
 */
export const photoUpload: Pick<UploadConfig, 'mimeTypes' | 'resizeOptions' | 'formatOptions'> = {
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  // Cap at 1600px wide and convert to WebP (a typical photo lands at ~100–150 KB).
  resizeOptions: { width: 1600, withoutEnlargement: true },
  formatOptions: { format: 'webp', options: { quality: 65 } },
}

/**
 * Copies the compressed upload into ordinary Buffers before Vercel Blob gets it.
 *
 * sharp returns its output as externally-allocated memory, which the fetch
 * client inside @vercel/blob (undici) rejects with "ArrayBuffer:
 * SharedArrayBuffer is not allowed", so every compressed upload failed. The
 * Blob upload runs in the storage plugin's afterChange hook, after this one.
 */
export const copyUploadBuffers: CollectionBeforeChangeHook = ({ data, req }) => {
  if (req.file?.data) req.file.data = Buffer.from(req.file.data)
  const sizes = req.payloadUploadSizes
  if (sizes) {
    for (const key of Object.keys(sizes)) sizes[key] = Buffer.from(sizes[key])
  }
  return data
}
