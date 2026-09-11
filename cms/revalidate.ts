import { revalidatePath } from 'next/cache'

/**
 * Hook factory: refresh the given pages as soon as an admin saves or deletes,
 * instead of waiting for the pages' timed revalidation. `layout` refreshes
 * every page under that path.
 */
export const revalidatePaths =
  (...paths: (string | { path: string; type: 'layout' | 'page' })[]) =>
  (): void => {
    for (const p of paths) {
      try {
        if (typeof p === 'string') revalidatePath(p)
        else revalidatePath(p.path, p.type)
      } catch {
        // Outside a Next.js request (e.g. `payload run` scripts) there is no
        // cache to revalidate; the pages' own revalidate timer still applies.
      }
    }
  }
