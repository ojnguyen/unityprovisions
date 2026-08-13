import type { Partner } from '@/types';
import sodexo from '@assets/partners-and-supporters/sodexo.jpg';
import ymca from '@assets/partners-and-supporters/ymca.jpg';
import food4philly from '@assets/partners-and-supporters/food4philly.jpg';
import estherRSangerCenterForCompassion from '@assets/partners-and-supporters/esther-r-sanger-center-for-compassion.jpg';
import walmart from '@assets/partners-and-supporters/walmart.jpg';
import google from '@assets/partners-and-supporters/google.jpg';

// Real partner and supporter organizations for Unity Provisions — see
// project-roadmap.md §7 for source. Real logos are now in place for
// every org except Stephen J. Brady Stop Hunger (see §5's assets/
// tree) — that entry still renders as a text badge in
// PartnersAndSupporters.astro until one is supplied. The three
// YMCA-affiliated entries (Wang YMCA, Mystic Valley YMCA, YMCA) all
// share the same generic `ymca` logo import.
export const partners: Partner[] = [
  { name: 'Wang YMCA', type: 'partner', logo: ymca },
  { name: 'Mystic Valley YMCA', type: 'partner', logo: ymca },
  { name: 'Food4Philly', type: 'partner', logo: food4philly },
  { name: 'Esther R. Sanger Center for Compassion', type: 'supporter', logo: estherRSangerCenterForCompassion },
  { name: 'Stephen J. Brady Stop Hunger', type: 'supporter' },
  { name: 'YMCA', type: 'supporter', logo: ymca },
  { name: 'Sodexo', type: 'supporter', logo: sodexo },
  { name: 'Walmart Spark Good', type: 'supporter', logo: walmart },
  { name: 'Google', type: 'supporter', logo: google },
];