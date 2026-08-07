/** Shared prop-shape types, used across ui/, layout/, and sections/
 *  components, and the data files that feed them. Root-level (not in
 *  utils/) since these are types, not functions — keeping them separate
 *  from `utils/` avoids mixing runtime code with type-only declarations. */

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

/**
 * Shared shape for a single site-navigation entry — an internal route,
 * not an off-site destination (see ExternalLink above for that case).
 * Used by navigation.ts (the Navbar's source) and footer.ts (which
 * reuses the same list for its own nav column).
 */
export interface NavItem {
  label: string;
  href: string;
}

/**
 * Shared shape for a single impact number — used by stats.ts (the data
 * source) and ImpactStats.astro (which accepts an array of these as a
 * `stats` prop rather than importing stats.ts directly, so Home and
 * About can each pass their own subset/order without the component
 * needing to know which page it's on).
 */
export interface Stat {
  value: string;
  label: string;
  /**
   * Optional. When set, ImpactStats.astro's client-side script looks
   * for a row in the "Donations Overview" Google Sheet tab whose
   * column B text matches this string *exactly*, and replaces this
   * stat's displayed value with that row's column C value if found.
   * Leave unset to keep a stat permanently static — it will never be
   * touched by the live-fetch script. See src/data/stats.ts for which
   * stats currently use this, and project-roadmap.md §7/§10 for the
   * live-data mechanism and setup requirements.
   */
  liveSheetLabel?: string;
  /**
   * Optional Iconify icon name (e.g. 'lucide:globe'), rendered above
   * the stat's value in ImpactStats.astro. Purely decorative — a stat
   * with no icon just renders without one, same as `logo` on Partner.
   */
  icon?: string;
}

/**
 * Shared shape for a single partner or supporter organization — used by
 * partners.ts (the data source) and PartnersAndSupporters.astro (which
 * accepts an array of these as a `partners` prop, then splits it into
 * a "Partners" group and a "Supporters" group for display; an entry
 * with no `type` set is treated as a partner).
 */
export interface Partner {
  name: string;
  type?: 'partner' | 'supporter';
  /**
   * Optional path/URL to a logo image. No logo assets exist yet for
   * this project (see §5's assets/ tree), until one is supplied here,
   * this organization renders as a plain text badge instead.
   */
  logo?: string;
}