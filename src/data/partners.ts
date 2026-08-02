import type { Partner } from '@/types';

// Real partner and supporter organizations for Unity Provisions — see
// project-roadmap.md §7 for source. No logo assets are supplied yet
// (see §5's assets/ tree), so every entry currently renders as a text
// badge in PartnersAndSupporters.astro rather than a logo image.
export const partners: Partner[] = [
  { name: 'Wang YMCA', type: 'partner' },
  { name: 'Mystic Valley YMCA', type: 'partner' },
  { name: 'Food4Philly', type: 'partner' },
  { name: 'Esther R. Sanger Center for Compassion', type: 'supporter' },
  { name: 'Stephen J. Brady Stop Hunger', type: 'supporter' },
  { name: 'YMCA', type: 'supporter' },
  { name: 'Sodexo', type: 'supporter' },
  { name: 'Walmart Spark Good', type: 'supporter' },
  { name: 'Google', type: 'supporter' },
];