import type { UploadConfig } from 'payload'

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
