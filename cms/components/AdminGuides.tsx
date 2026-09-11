import React from 'react'

/*
 * Plain-language help shown inside the admin panel, written for committee
 * members rather than developers. Keep the wording in sync with the real
 * behaviour: compression lives in cms/uploads.ts, slider photo rules in
 * cms/globals/HomeSlider.ts, crops in components/Hero.tsx and GalleryGrid.tsx.
 * Styling: `.jcm-guide*` in app/(payload)/custom.scss.
 */

type Fact = { title: string; text: React.ReactNode }

/** A one-line intro and up to three key facts, with the full guide folded away. */
function Guide({ lead, facts, children }: { lead: React.ReactNode; facts: Fact[]; children: React.ReactNode }) {
  return (
    <div className="jcm-guide">
      <p className="jcm-guide__lead">{lead}</p>
      <ul className="jcm-guide__facts">
        {facts.map((f) => (
          <li key={f.title}>
            <strong>{f.title}</strong>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
      <details className="jcm-guide__more">
        <summary>Read the full guide</summary>
        <div className="jcm-guide__body">{children}</div>
      </details>
    </div>
  )
}

/** What happens to a photo on upload — shared by every guide. */
function PhotoSize() {
  return (
    <ul>
      <li>
        <strong>Any file size is fine — you never need to shrink a photo yourself.</strong> When you upload, the
        website automatically resizes it to 1600 pixels wide and saves it in a lighter format (WebP). A 5 MB
        phone photo usually ends up around 100–200 KB, so pages load fast and storage lasts.
      </li>
      <li>
        Accepted files: <strong>JPG, PNG, WebP</strong>. Uploading from an iPhone works automatically. On a Mac,
        if a photo is refused it is in Apple&apos;s HEIC format: open it in Preview, choose File, then Export, pick
        JPEG, and upload that.
      </li>
    </ul>
  )
}

const compressed: Fact = {
  title: 'Any file size is fine',
  text: 'Photos are shrunk and compressed automatically when you upload them.',
}

export function SliderGuide() {
  return (
    <Guide
      lead={
        <>
          The big banner at the top of the homepage. Each slide has a photo, a heading, a short sentence and a
          button, and the slides change every 7 seconds.
        </>
      }
      facts={[
        { title: 'Use a wide photo', text: 'Landscape (wider than tall), at least 1200 pixels wide.' },
        compressed,
        { title: 'Save to publish', text: 'The website updates as soon as you click Save.' },
      ]}
    >
      <h4>Changing slides</h4>
      <ul>
        <li>
          <strong>Edit a slide:</strong> click it below to open it, change anything, then <strong>Save</strong>.
        </li>
        <li>
          <strong>Add a slide:</strong> click <strong>Add Slide</strong> at the bottom (up to 8 slides).
        </li>
        <li>
          <strong>Change the order:</strong> drag a slide by the grip on its left.
        </li>
        <li>
          <strong>Hide a slide for now</strong> (for example a Ramadan slide after Ramadan): untick{' '}
          <strong>Show on website</strong>. Nothing is deleted, so you can switch it back on later.
        </li>
        <li>
          <strong>Delete a slide:</strong> click the <strong>⋯</strong> on the right of the slide, then{' '}
          <strong>Remove</strong>.
        </li>
        <li>
          <strong>Change the photo:</strong> click the <strong>✕</strong> on the current photo, then{' '}
          <strong>Create New</strong> to upload a new one, or <strong>Choose from existing</strong> to reuse one you
          uploaded before.
        </li>
      </ul>

      <h4>Which photo should I use?</h4>
      <ul>
        <li>
          A <strong>wide (landscape) photo</strong>: taken with the phone held sideways, so it is wider than it is
          tall. Upright (portrait) photos are not accepted, because they get cut down to a thin strip on computers.
        </li>
        <li>
          <strong>At least 1200 pixels wide.</strong> Photos from any phone camera are much bigger than this, and
          photos saved from WhatsApp (usually 1600 wide) are fine too. Screenshots and small images saved from social
          media may be too small; the website will tell you if so.
        </li>
      </ul>
      <PhotoSize />

      <h4>How the photo is cut to fit</h4>
      <ul>
        <li>
          <strong>On computers</strong> the photo is shown as a wide strip, so the top and bottom are trimmed. The
          left side is darkened so the text is readable.
        </li>
        <li>
          <strong>On phones</strong> the photo is shown almost square, so the left and right sides are trimmed and
          the text sits at the bottom.
        </li>
        <li>
          So keep the important part near the <strong>middle</strong> of the photo. To choose exactly which part
          always stays visible, set the photo&apos;s <strong>focal point</strong>: click the photo&apos;s{' '}
          <strong>✎ pencil</strong>, then <strong>Edit Image</strong>, drag the circle onto the most important part
          (a face, the imam, the building), click <strong>Apply Changes</strong> and then <strong>Save</strong>.
        </li>
      </ul>

      <h4>Writing the text</h4>
      <ul>
        <li>
          <strong>Heading:</strong> 2–5 words (up to 60 letters).
        </li>
        <li>
          <strong>Text:</strong> one or two sentences (up to 260 letters).
        </li>
        <li>
          <strong>Button link:</strong> a page on this website, written starting with / (for example /donate,
          /contact, /services, /about, /events, /gallery), or a full web address starting with https://.
        </li>
      </ul>
    </Guide>
  )
}

export function ImagesGuide() {
  return (
    <Guide
      lead={
        <>
          Every photo on the website lives here, in one place. Upload a photo once, then use it anywhere: in the
          gallery, the homepage slider, a news post or a page section.
        </>
      }
      facts={[
        { title: 'Show it in the gallery', text: 'Give the photo a Gallery category. Leave it empty to keep it out.' },
        { title: 'Add many at once', text: 'Use Bulk Upload, and choose a category for each photo as you go.' },
        compressed,
      ]}
    >
      <h4>Adding photos</h4>
      <ul>
        <li>
          <strong>One photo:</strong> click <strong>Create New</strong>, drop the photo in, add a short caption (for
          example &quot;Eid prayer 2026&quot;), then <strong>Save</strong>.
        </li>
        <li>
          <strong>Many photos at once:</strong> click <strong>Bulk Upload</strong>, drop all the photos in, add a
          caption and category for each one, then save them all together.
        </li>
        <li>
          You can also upload straight from the place you need it: the slider, a news post and{' '}
          <strong>Page photos</strong> all have <strong>Create New</strong> next to <strong>Choose from existing</strong>.
          Either way the photo ends up here.
        </li>
      </ul>

      <h4>The Gallery page</h4>
      <ul>
        <li>
          A photo appears on the Gallery page when it has a <strong>Gallery category</strong> (in the right-hand
          column of the photo). Clear the category to take it off the gallery; the photo itself stays here.
        </li>
        <li>
          The gallery follows the order of this list. Drag a row by the grip on its left to move it. To see only
          gallery photos, use <strong>Filters</strong> and choose Gallery category.
        </li>
        <li>
          The filter buttons on the Gallery page are managed under <strong>Gallery categories</strong>.
        </li>
      </ul>

      <h4>Deleting</h4>
      <ul>
        <li>
          Deleting a photo removes it everywhere. If the homepage slider or a news post still uses it, the website
          will tell you to choose another photo there first.
        </li>
      </ul>

      <h4>Photo size</h4>
      <PhotoSize />

      <h4>How the photo is cut to fit</h4>
      <ul>
        <li>
          Different places show the same photo in different shapes (the gallery uses small boxes, the slider a wide
          strip), so some edges may be trimmed. The whole photo is shown when a visitor opens it in the gallery.
        </li>
        <li>
          If a face or the main subject gets cut off, set the <strong>focal point</strong>: open the photo, click{' '}
          <strong>Edit Image</strong>, drag the circle onto the important part, click <strong>Apply Changes</strong>{' '}
          and then <strong>Save</strong>. Every place that uses the photo keeps that spot in view.
        </li>
      </ul>
    </Guide>
  )
}

export function PagePhotosGuide() {
  return (
    <Guide
      lead={
        <>
          Choose the photo for each section of the website. Every slot below says where the photo appears and what
          shape it is shown in.
        </>
      }
      facts={[
        { title: 'Empty keeps today\'s photo', text: 'A slot you leave empty keeps the photo the section has now.' },
        { title: 'Pick from Images', text: 'Choose from existing, or Create New to upload; it lands in Images.' },
        { title: 'Save to publish', text: 'The website updates as soon as you click Save.' },
      ]}
    >
      <h4>Changing a photo</h4>
      <ul>
        <li>
          Click <strong>Choose from existing</strong> under a slot and pick a photo, or <strong>Create New</strong> to
          upload one. Then click <strong>Save</strong>.
        </li>
        <li>
          To go back to the original photo, click the <strong>✕</strong> on the chosen photo and save.
        </li>
        <li>
          Slots that take several photos (the photo strip and the library) show them in the order you add them.
          Drag them to reorder.
        </li>
      </ul>
      <h4>Getting the crop right</h4>
      <ul>
        <li>
          Each slot says its shape: <strong>tall</strong> slots suit upright photos, <strong>wide</strong> slots
          suit landscape ones. Set the photo&apos;s focal point (click its <strong>✎ pencil</strong>, then{' '}
          <strong>Edit Image</strong>) to keep faces in view.
        </li>
      </ul>
    </Guide>
  )
}

/** Compact tips shown on the Images upload form. */
export function PhotoTips() {
  return (
    <details className="jcm-guide jcm-guide--tips">
      <summary>Photo tips: size, file types and cropping</summary>
      <div className="jcm-guide__body">
        <PhotoSize />
        <ul>
          <li>
            If the photo gets cut off in the wrong place on the website, click <strong>Edit Image</strong> above,
            drag the circle onto the most important part, click <strong>Apply Changes</strong> and then{' '}
            <strong>Save</strong>.
          </li>
        </ul>
      </div>
    </details>
  )
}

/** Dashboard shortcuts to everything photo-related. */
export function WebsitePhotos() {
  const links = [
    { href: '/admin/collections/media', title: 'Images', text: 'Every photo on the site, in one place' },
    { href: '/admin/globals/home-slider', title: 'Homepage slider', text: 'The big banner photos and text' },
    {
      href: '/admin/collections/media?where[galleryCategory][exists]=true',
      title: 'Gallery photos',
      text: 'Photos with a gallery category, in gallery order',
    },
    { href: '/admin/globals/page-photos', title: 'Page photos', text: 'Choose the photo for each page section' },
  ]
  return (
    <section className="jcm-panel">
      <div className="jcm-panel__head">
        <h3>Website photos</h3>
        <p>Upload photos of any size: they are shrunk and compressed automatically.</p>
      </div>
      <div className="jcm-shortcuts">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="jcm-shortcut">
            <strong>{l.title}</strong>
            <span>{l.text}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
