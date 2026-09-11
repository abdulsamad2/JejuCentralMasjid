# Managing Photos, the Homepage Slider and Gallery

Both are edited in the admin panel at `/admin` — no code changes needed.
The dashboard has a **Website photos** box with shortcuts to everything
below, and each page shows a plain-language guide at the top.
Changes appear on the website as soon as you click **Save**.

## Photo size — how it works

- **Any file size is fine.** On upload the website resizes every photo to
  1600 pixels wide and saves it as WebP. A 5 MB phone photo usually becomes
  ~100–200 KB. The dashboard shows how much storage is used.
- **Accepted:** JPG, PNG, WebP. iPhones convert their HEIC photos to JPEG
  automatically when uploading. On a Mac, a HEIC file is refused: open it in
  Preview → File → Export → JPEG.

## Homepage slider (`Content` → Homepage slider)

- Each slide: **Photo**, **Heading** (≤ 60 letters), **Text** (≤ 260
  letters), **Button text** and **Button link** (`/donate` for a page on this
  site, or a full `https://` link).
- 1–8 slides. Drag to reorder; **⋯ → Remove** to delete.
- **Show on website** — untick to hide a slide without deleting it. At least
  one slide must stay visible.
- Photos must be **landscape** and **at least 1200 px wide**; the admin
  explains the problem if not.
- Cropping: computers show a wide strip (top/bottom trimmed, left side
  darkened for text); phones show it almost square (sides trimmed). Set the
  photo's focal point to keep the subject in view: ✎ pencil on the photo →
  **Edit Image** → drag the circle → **Apply Changes** → **Save**.
- Slide photos live in **Images**; one can't be deleted while a slide uses it.

## Images — the one photo library (`Images` group)

Every photo on the site lives in **Images**. Upload once, use anywhere.

- **Add:** *Create New* (one photo) or *Bulk Upload* (many). Give each a
  short caption, e.g. "Eid prayer 2026" — shown in the gallery and read
  aloud to blind visitors.
- **Gallery:** a photo appears on the Gallery page when it has a
  **Gallery category** (right-hand column). Clear it to take the photo off
  the gallery; the photo stays in Images. The gallery follows the order of
  the Images list — drag rows by the grip to reorder.
- **Gallery categories** are the filter buttons on the Gallery page. Drag to
  reorder; a category can only be deleted once no photo uses it.
- **Crop:** set a photo's focal point (*Edit Image*) and every place that
  uses it keeps that spot in view.
- **Deleting** removes the photo everywhere. If the slider or a news post
  still uses it, the admin says so and asks you to choose another first.

## Page photos (`Images` → Page photos)

A slot for each fixed photo on the site: the six "Moments from the masjid"
cards and the photo strip under them, Weekly circles, the Qur'an teacher,
Support the masjid, Visit us, the About page (main photo and library
photos) and the Permanent masjid page. Each slot says where it appears and
its shape. **An empty slot keeps the section's current photo.**

## For developers

- Upload rules/compression: `cms/uploads.ts`. Slider rules:
  `cms/globals/HomeSlider.ts`. Admin guide text: `cms/components/AdminGuides.tsx`.
- Instant updates: `cms/revalidate.ts` hooks call `revalidatePath` on save;
  pages also revalidate every 120 s as a backstop.
- The original photos remain in `public/assets`. They were imported once with
  `npm run import:images` (`cms/import-images.ts`, idempotent), from
  `lib/data/gallery.ts` and `lib/data/heroSlides.ts`. `heroSlides.ts` is also
  the fallback if the CMS is unreachable. Don't run the import with a local
  `./media` folder present — Payload would rename every upload (the script
  refuses to start in that case).
- Page photos slots and their built-in fallbacks: `cms/globals/PagePhotos.ts`,
  `pickPhoto`/`pickPhotos` in `lib/cms.ts`.
