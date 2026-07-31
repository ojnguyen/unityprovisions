import type { Stat } from '@/types';

// Real, current impact numbers for Unity Provisions — see
// project-roadmap.md §7 for source. Consumed by ImpactStats.astro, which
// accepts these as a `stats` prop rather than importing this array
// directly, so Home and About can each pass their own subset/order.
export const stats: Stat[] = [
  { value: '6,180+', label: 'lbs of food & clothing collected' },
  { value: '$21,376+', label: 'raised' },
  { value: '35+', label: 'branches' },
  { value: '8', label: 'countries' },
];