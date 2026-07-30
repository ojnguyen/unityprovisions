import type { ExternalLink } from '@/types';
import { navigation, orgName } from './navigation';

// Reuses navigation.ts rather than duplicating the list — the footer's
// nav column and the Navbar always stay in sync automatically.
export const footerNav = navigation;

// Re-exported so Footer.astro can import everything it needs (nav,
// external links, social, phone, org name) from this one file, rather
// than also reaching into navigation.ts directly for just this one value.
export { orgName };

// The Google Form behind this URL is a general contact-list signup
// (name/email/phone/state) with no volunteer-specific question — see
// roadmap §10. Exported by name, not just inlined below, since the
// Get Involved page's Volunteer CTA likely reuses this same form.
export const contactListFormUrl = 'https://forms.gle/7JFDkKPdzYv1LfCP6';

export const externalLinks: ExternalLink[] = [
  { label: 'Email List', href: contactListFormUrl },
  { label: 'Linktree', href: 'https://linktr.ee/UnityProvisions' },
];

export const socialLinks: ExternalLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/unityprovisions',
    icon: 'simple-icons:instagram',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@unityprovisionsboston',
    icon: 'simple-icons:tiktok',
  },
];

export const phone: ExternalLink = {
  label: '(857) 777-8811',
  href: 'tel:8577778811',
};