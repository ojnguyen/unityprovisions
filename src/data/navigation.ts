import type { NavItem } from '@/types';

// Shared by the Navbar and Footer so the site's name stays consistent in both places.
export const orgName = 'Unity Provisions';

// Main links shown in the site's navigation.
export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Projects', href: '/projects' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Donate', href: '/donate' },
];