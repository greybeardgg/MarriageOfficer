import { OFFICERS, officerById } from './officers';
import type { Officer } from './officers';
import { ANY_OFFICER } from '../situation/types';
import type { Situation } from '../situation/types';

/**
 * The officer a situation goes to. A named choice wins, provided that officer
 * works in the chosen province; otherwise the province's primary officer.
 * The main app replaces this with real assignment.
 */
export function assignOfficer(s: Situation): Officer | null {
  if (s.officer && s.officer !== ANY_OFFICER) {
    const chosen = officerById(s.officer);
    if (chosen && chosen.province === s.province) return chosen;
  }
  return OFFICERS.find(o => o.primary && o.province === s.province) ?? null;
}

/** True when the couple asked for this officer by name rather than being matched. */
export function wasChosen(s: Situation, officer: Officer | null): boolean {
  return !!officer && s.officer === officer.id;
}
