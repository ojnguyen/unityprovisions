import sodexo from '@assets/partners-and-supporters/sodexo.jpg';
import ymca from '@assets/partners-and-supporters/ymca.jpg';
import food4philly from '@assets/partners-and-supporters/food4philly.jpg';
import estherRSangerCenterForCompassion from '@assets/partners-and-supporters/esther-r-sanger-center-for-compassion.jpg';
import walmart from '@assets/partners-and-supporters/walmart.jpg';
import google from '@assets/partners-and-supporters/google.jpg';
import type { Partner } from '@/types';

/*
 * The partners array lists the organizations that support Unity Provisions as partners or supporters.
 * Stephen J. Brady Stop Hunger has no logo, so its entry renders as a text badge.
 * The Wang YMCA, Mystic Valley YMCA, and YMCA entries share the generic YMCA logo.
 */
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