import type { ExternalLink } from '@/types';
import { navigation, orgName } from './navigation';

// The footer reuses the main navigation list so it and the Navbar stay in sync.
export const footerNav = navigation;

// Re-exports the organization name so Footer.astro can get its data from one module.
export { orgName };

// This general contact-list form collects a name, email, phone number, and state.
// Keep the URL named because the Get Involved page also links to the same form.
export const contactListFormUrl = 'https://forms.gle/7JFDkKPdzYv1LfCP6';

// Links shown in the footer's external-links section.
export const externalLinks: ExternalLink[] = [
  { label: 'Email List', href: contactListFormUrl },
  { label: 'Linktree', href: 'https://linktr.ee/UnityProvisions' },
];

// Social profiles shown in the footer.
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

// Main phone contact shown in the footer.
export const phone: ExternalLink = {
  label: '(857) 777-8811',
  href: 'tel:8577778811',
};