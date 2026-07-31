import type { Stat } from '@/types';

// Build-time fallback for Unity Provisions' impact numbers. ImpactStats.astro
// renders these immediately — so the numbers are correct even with JS
// disabled, or before the live fetch resolves — then a client-side script
// overwrites the two `liveSheetLabel` entries below with current values
// from the "Donations Overview" Google Sheet tab. Branches and countries
// have no `liveSheetLabel` and are never touched by that script — they
// stay exactly as written here. Keep the live entries' fallback values
// reasonably close to the sheet's real numbers, since they're what every
// visitor sees first (and what shows permanently if the live fetch ever
// fails). See ImpactStats.astro's own comments, and project-roadmap.md
// §7/§10, for how the live source is wired up.
export const stats: Stat[] = [
  {
    value: '6,272lbs',
    label: 'of food & clothing collected',
    liveSheetLabel: 'Total (lbs)',
  },
  {
    value: '$22,376.00',
    label: 'raised',
    liveSheetLabel: 'Money Collected ($)',
  },
  { value: '35+', label: 'branches' },
  { value: '8', label: 'countries' },
];