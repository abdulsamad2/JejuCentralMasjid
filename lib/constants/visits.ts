/** Minimum booking notice for a visit, in days. Schools and groups are asked for 1–2 weeks. */
export const VISIT_NOTICE_DAYS = 3

// Stored values for visit requests (cms/collections/VisitRequests.ts) with their admin labels.
export const VISITOR_TYPES = [
  { label: 'Korean or local visitor', value: 'local' },
  { label: 'Muslim traveller from overseas', value: 'overseas-muslim' },
  { label: 'School, university or group', value: 'group' },
  { label: 'Other', value: 'other' },
] as const

export const VISIT_LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Korean (한국어)', value: 'ko' },
  { label: 'Other', value: 'other' },
] as const

export const labelOf = (list: readonly { label: string; value: string }[], value?: string | null): string =>
  list.find((o) => o.value === value)?.label ?? value ?? ''
