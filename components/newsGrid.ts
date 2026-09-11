// Large-screen columns for news cards: one per post so the row is always
// full width, capped at 4 — extra posts wrap onto the next row. A lone post
// keeps half width rather than stretching into one huge card.
// (Lives in components/ so Tailwind sees these class names.)
const LG_COLS = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
} as const

export function newsGrid(count: number): { className: string; sizes: string } {
  const cols = Math.min(4, Math.max(2, count)) as keyof typeof LG_COLS
  return {
    className: LG_COLS[cols],
    sizes: `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.round(100 / cols)}vw`,
  }
}
