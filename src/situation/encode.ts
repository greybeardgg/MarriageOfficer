import { PROVINCES, NATIONALITIES, NON_SA_STATUSES, PRIOR_MARRIAGES, SERVICES, ANY_OFFICER, isLegal } from './types';
import type { Situation, DateIntent } from './types';
import { officerById, officersIn } from '../officers/officers';

function oneOf<T extends readonly string[]>(list: T, v: string | null): T[number] | null {
  return v !== null && (list as readonly string[]).includes(v) ? (v as T[number]) : null;
}

/**
 * p place · s service · n nationality · ns non-SA status · m prior marriage
 * · o officer · d date. The legal three are absent for a ceremony without a
 * registration; `o` is absent when no officer was named.
 */
export function encodeSituation(s: Situation): URLSearchParams {
  const p = new URLSearchParams();
  p.set('p', s.province);
  p.set('s', s.service);
  if (isLegal(s.service)) {
    if (s.nationality) p.set('n', s.nationality);
    if (s.nationality === 'one_non_sa' && s.nonSaStatus) p.set('ns', s.nonSaStatus);
    if (s.priorMarriage) p.set('m', s.priorMarriage);
  }
  if (s.officer && s.officer !== ANY_OFFICER) p.set('o', s.officer);
  p.set('d', s.date.kind === 'date' ? s.date.iso : s.date.kind);
  return p;
}

export function decodeSituation(p: URLSearchParams): Situation | null {
  const province = oneOf(PROVINCES, p.get('p'));
  const service = oneOf(SERVICES, p.get('s'));
  const d = p.get('d');
  if (!province || !service || !d) return null;
  let date: DateIntent;
  if (d === 'soon' || d === 'not_yet') date = { kind: d };
  else if (/^\d{4}-\d{2}-\d{2}$/.test(d)) date = { kind: 'date', iso: d };
  else return null;

  const s: Situation = { province, service, date };
  if (isLegal(service)) {
    const nationality = oneOf(NATIONALITIES, p.get('n'));
    const priorMarriage = oneOf(PRIOR_MARRIAGES, p.get('m'));
    if (!nationality || !priorMarriage) return null;
    s.nationality = nationality;
    s.priorMarriage = priorMarriage;
    if (nationality === 'one_non_sa') {
      const ns = oneOf(NON_SA_STATUSES, p.get('ns'));
      if (ns) s.nonSaStatus = ns;
    }
  }
  // No `o`, or one from another province, reads as no preference wherever
  // the question is asked, so the record shows the answer that was given.
  const o = p.get('o');
  if (o && officerById(o)?.province === province) s.officer = o;
  else if (officersIn(province).length >= 2) s.officer = ANY_OFFICER;
  return s;
}
