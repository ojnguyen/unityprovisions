/**
 * Joins class-name fragments together into a single class string,
 * skipping any falsy values (false, undefined, null, '').
 *
 * Useful when building classes that may include optional values, e.g.:
 *
 *   cn('rounded-md', isActive && 'bg-primary')
 *
 * Currently used as a consistent helper for combining component classes.
 * Some components may not require the falsy filtering, but using cn()
 * keeps class construction consistent as components grow.
 *
 * TODO: No dependency, no conflict resolution — if two conflicting Tailwind
 * classes ever end up in the same list (e.g. both 'px-2' and 'px-4'),
 * which one wins is undefined.
 */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}