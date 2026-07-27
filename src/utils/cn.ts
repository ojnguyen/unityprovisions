/**
 * Joins class-name fragments together, skipping any falsy values
 * (false, undefined, ''). Used wherever a component needs to combine a
 * base class string with a conditional one, e.g.:
 *
 *   cn('rounded-md', isActive && 'bg-primary')
 *
 * TODO: No dependency, no conflict resolution — if two conflicting Tailwind
 * classes ever end up in the same list (e.g. both 'px-2' and 'px-4'),
 * which one wins is undefined.
 */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}