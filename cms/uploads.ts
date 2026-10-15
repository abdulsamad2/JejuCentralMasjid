import type { CollectionBeforeChangeHook, UploadConfig } from 'payload'
import sharp from 'sharp'

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

/** Hard cap on every stored image; the browser aims for it too (lib/compressImage). */
export const MAX_IMAGE_BYTES = 200 * 1024

/**
 * Makes sure an upload is at most 200KB before it goes to Vercel Blob.
 *
 * By this point Payload has already resized the image to 1600px and converted
 * it to WebP. If it is still too big, it is re-encoded at lower quality, then
 * smaller dimensions, until it fits.
 *
 * Every buffer is also copied into an ordinary Buffer: sharp returns
 * externally-allocated memory, which the fetch client inside @vercel/blob
 * (undici) rejects with "ArrayBuffer: SharedArrayBuffer is not allowed". The
 * Blob upload runs in the storage plugin's afterChange hook, after this one.
 */
export const enforceImageLimit: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file
  if (file?.data) {
    let buffer = Buffer.from(file.data)
    if (buffer.length > MAX_IMAGE_BYTES && file.mimetype?.startsWith('image/') && file.mimetype !== 'image/gif') {
      const meta = await sharp(buffer).metadata()
      let width = Math.min(meta.width ?? 1600, 1600)
      let quality = 60
      for (let attempt = 0; attempt < 12 && buffer.length > MAX_IMAGE_BYTES; attempt++) {
        const { data: out, info } = await sharp(file.data)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toBuffer({ resolveWithObject: true })
        buffer = Buffer.from(out)
        data.width = info.width
        data.height = info.height
        // Lower the quality first, then the dimensions.
        if (quality > 40) quality -= 10
        else width = Math.round(width * 0.8)
      }
      data.mimeType = 'image/webp'
      if (typeof data.filename === 'string') data.filename = data.filename.replace(/\.[^.]+$/, '.webp')
      file.mimetype = 'image/webp'
    }
    file.data = buffer
    file.size = buffer.length
    data.filesize = buffer.length
  }
  const sizes = req.payloadUploadSizes
  if (sizes) {
    for (const key of Object.keys(sizes)) sizes[key] = Buffer.from(sizes[key])
  }
  return data
}
