/*
 * Joins class fragments into a single class string while dropping falsy values.
 *
 * This keeps conditional utility classes readable without producing empty
 * entries in the final class list.
*/
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}