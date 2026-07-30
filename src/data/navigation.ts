import type { NavItem } from '@/types';

// Site-wide branding name — lives here rather than footer.ts, since both
// Navbar (site name/logo text) and Footer (copyright line) need it, and
// navigation.ts is the more central of the two data files.
export const orgName = 'Unity Provisions';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Projects', href: '/projects' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Donate', href: '/donate' },
];