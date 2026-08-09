import type { Partner } from '@/types';
import sodexoImage from '@assets/sodexo.jpg';
import ymca from '@assets/ymca.jpg'
import food4philly from '@assets/food4philly.jpg'
import estherRSangerCenter from '@assets/esther_r_sanger_center.jpg'
import walmart from '@assets/walmart.jpg'
import google from '@assets/google.jpg'

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
  { name: 'Esther R. Sanger Center for Compassion', type: 'supporter', logo: estherRSangerCenter },
  { name: 'Stephen J. Brady Stop Hunger', type: 'supporter' },
  { name: 'YMCA', type: 'supporter', logo: ymca },
  { name: 'Sodexo', type: 'supporter', logo: sodexoImage },
  { name: 'Walmart Spark Good', type: 'supporter', logo: walmart },
  { name: 'Google', type: 'supporter', logo: google },
];