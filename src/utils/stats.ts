import { stats } from '@data/stats';

/**
 * Looks up a stat's display value by its label (e.g. 'branches',
 * 'countries') from stats.ts. Used by page copy that references one of
 * these numbers inside a sentence, so the number can't drift out of
 * sync with stats.ts — the same source ImpactStats renders from.
 *
 * Only safe for stats with no `liveSheetLabel` (branches, countries) —
 * those two are never touched by ImpactStats' client-side Google Sheet
 * fetch, so this stays a plain build-time read. Don't reach for this
 * for the two live-synced stats (pounds, dollars raised); their
 * real-time value only exists client-side inside ImpactStats itself.
 * (A build-time and a live-synced version of a similar idea were tried
 * for About's founder-story dollar figure and reverted — too much
 * machinery for one sentence, see project-roadmap.md §7's ImpactStats
 * entry. This is a different, much simpler case: a static number
 * already sitting in stats.ts, read once at build time.)
 *
 * Throws if no stat with the given label exists — a build-time
 * fail-fast rather than silently rendering "undefined" in real copy.
 */
export function getStatValue(label: string): string {
  const stat = stats.find((s) => s.label === label);
  if (!stat) {
    throw new Error(`getStatValue: no stat in stats.ts has label "${label}"`);
  }
  return stat.value;
}