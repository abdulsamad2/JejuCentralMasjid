/**
 * Browser-side image shrinking, run before a file is sent to the server.
 *
 * Every stored image must be at most 200KB, and Vercel rejects request bodies
 * over 4.5MB ("Request Entity Too Large") before sharp on the server ever sees
 * them. So images are scaled down and re-encoded here first; the server checks
 * the 200KB limit again (cms/uploads.ts). Formats canvas cannot redraw (GIF,
 * SVG, HEIC on most browsers) are returned unchanged.
 */

const COMPRESSIBLE = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
export const MAX_IMAGE_BYTES = 200 * 1024
// Matches the server's 1600px resize, so it has nothing left to scale.
const MAX_EDGE = 1600
const MIN_QUALITY = 0.5

export function needsCompression(file: File): boolean {
  return COMPRESSIBLE.includes(file.type) && file.size > MAX_IMAGE_BYTES
}

function encode(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}

export async function compressImage(file: File): Promise<File> {
  if (!needsCompression(file)) return file

  let bitmap: ImageBitmap
  try {
    // from-image applies the EXIF rotation, so portrait phone photos stay upright.
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return file
  }

  try {
    let edge = MAX_EDGE
    let quality = 0.8
    for (let attempt = 0; attempt < 12; attempt++) {
      const scale = Math.min(1, edge / Math.max(bitmap.width, bitmap.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(bitmap.width * scale)
      canvas.height = Math.round(bitmap.height * scale)
      canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

      // Safari cannot encode WebP and silently falls back to PNG; use JPEG there.
      let blob = await encode(canvas, 'image/webp', quality)
      if (!blob || blob.type !== 'image/webp') blob = await encode(canvas, 'image/jpeg', quality)
      if (!blob) return file

      if (blob.size <= MAX_IMAGE_BYTES || attempt === 11) {
        if (blob.size >= file.size) return file
        const ext = blob.type === 'image/webp' ? 'webp' : 'jpg'
        const name = file.name.replace(/\.[^.]+$/, '') + '.' + ext
        return new File([blob], name, { type: blob.type, lastModified: file.lastModified })
      }
      // Lower the quality first, then the dimensions.
      if (quality > MIN_QUALITY) quality = Math.round((quality - 0.1) * 10) / 10
      else edge = Math.round(edge * 0.8)
    }
    return file
  } finally {
    bitmap.close()
  }
}

/** Compresses every image in a FileList; returns null when nothing changed. */
export async function compressFileList(files: FileList): Promise<FileList | null> {
  const list = Array.from(files)
  if (!list.some(needsCompression)) return null
  const out = new DataTransfer()
  for (const f of await Promise.all(list.map(compressImage))) out.items.add(f)
  return out.files
}
