/** Shared prop-shape types, used across ui/ and sections/ components.
 *  Root-level (not in utils/) since these are types, not functions —
 *  keeping them separate from `utils/` avoids mixing runtime code with
 *  type-only declarations. */

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Shared shape for anything that renders as a styled link out to an
 * external destination — this is the exact pattern Phase 3 generalized
 * as ExternalLinkCTA: Email List, Volunteer, Branch Founder, each
 * Opportunity posting, and the Zeffy donate link all use this shape.
 */
export interface ExternalLink {
  label: string;
  href: string;
  /** Iconify icon name, e.g. 'lucide:external-link' or 'lucide:arrow-up-right' */
  icon?: string;
}