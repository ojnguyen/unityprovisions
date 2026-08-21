import type { Stat } from '@/types';

/*
 * Fallback impact statistics for the food, clothing, and monetary totals shown on the site.
 * They render at build time, remain available without JavaScript, and display while live values load.
 * The client updates only entries with `liveSheetLabel`, so keep those fallback values close to the live data.
 * Icon values use decorative Iconify names.
 */
export const stats: Stat[] = [
  {
    value: '6,272lbs',
    label: 'of food & clothing collected',
    liveSheetLabel: 'Total (lbs)',
    icon: 'lucide:package',
  },
  {
    value: '$22,376.00',
    label: 'raised',
    liveSheetLabel: 'Money Collected ($)',
    icon: 'lucide:circle-dollar-sign',
  },
  { value: '35+', label: 'branches', icon: 'lucide:map-pin' },
  { value: '8+', label: 'countries', icon: 'lucide:globe' },
];