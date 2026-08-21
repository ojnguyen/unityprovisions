import { stats } from '@data/stats';

/*
 * Looks up a static stat value by label.
 *
 * This is for values that are fixed at build time, such as branches or
 * countries, so page copy stays in sync with the source data used by the
 * stats components. It intentionally does not cover live-updated values.
*/
export function getStatValue(label: string): string {
  const stat = stats.find((s) => s.label === label);
  if (!stat) {
    throw new Error(`getStatValue: no stat in stats.ts has label "${label}"`);
  }
  return stat.value;
}