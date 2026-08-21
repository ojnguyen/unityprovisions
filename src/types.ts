// Shared prop shapes for components and their data sources.

import type { ImageMetadata } from 'astro';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Shape for a styled link to an external destination.
export interface ExternalLink {
  label: string;
  href: string;
  icon?: string; // Iconify icon name, such as 'lucide:external-link'.
}

// Shape for an internal site-navigation entry, not an external link.
export interface NavItem {
  label: string;
  href: string;
}

// Shape for an impact statistic.
export interface Stat {
  value: string;
  label: string;
  liveSheetLabel?: string; // Exact label used to look up a live value; unset keeps the stat static.
  icon?: string; // Optional decorative Iconify icon rendered above the value.
}

// Shape for a partner or supporter organization.
export interface Partner {
  name: string;
  type?: 'partner' | 'supporter'; // An omitted type is treated as a partner.
  logo?: ImageMetadata | string;
}

// Shape for a team member. Staff cards use a placeholder when no photo is set.
export interface StaffMember {
  name: string;
  role: string;
  email?: string; // For example: 'firstname.lastname@unityprovisions.org'.
  photo?: ImageMetadata | string;
}

// Shape for a project. Image and embedUrl are independent and may be combined.
export interface Project {
  title: string;
  description: string;
  image?: ImageMetadata | string;
  imageAlt?: string;
  embedUrl?: string;
  embedTitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: string;
}
