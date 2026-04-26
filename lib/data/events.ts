export type EventItem = {
  title: string
  description?: string
  startDate: string // YYYY-MM-DD
  startTime?: string
  endTime?: string
  location?: string
  recurring?: string
}

export const EVENTS: EventItem[] = [
  {
    title: 'Jummah Prayer',
    description: 'Weekly congregational prayer and khutbah — open to all.',
    startDate: '2026-04-24',
    startTime: '13:15',
    endTime: '14:00',
    location: 'Jeju Central Masjid',
    recurring: 'Every Friday',
  },
  {
    title: 'Community Iftar',
    description: 'Open iftar gathering bringing brothers, sisters, and families together.',
    startDate: '2026-05-03',
    startTime: '18:10',
    endTime: '20:00',
    location: 'Jeju Central Masjid',
  },
]
