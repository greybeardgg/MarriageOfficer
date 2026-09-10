import { PROVINCES, NATIONALITIES, NON_SA_STATUSES, PRIOR_MARRIAGES, SERVICES } from './types';
import type { Situation, DateIntent } from './types';

function oneOf<T extends readonly string[]>(list: T, v: string | null): T[number] | null {
  return v !== null && (list as readonly string[]).includes(v) ? (v as T[number]) : null;
}

export function encodeSituation(s: Situation): URLSearchParams {
  const p = new URLSearchParams();
  p.set('p', s.province);
  p.set('n', s.nationality);
  if (s.nationality === 'one_non_sa' && s.nonSaStatus) p.set('ns', s.nonSaStatus);
  p.set('m', s.priorMarriage);
  p.set('s', s.service);
  p.set('d', s.date.kind === 'date' ? s.date.iso : s.date.kind);
  return p;
}

export function decodeSituation(p: URLSearchParams): Situation | null {
  const province = oneOf(PROVINCES, p.get('p'));
  const nationality = oneOf(NATIONALITIES, p.get('n'));
  const priorMarriage = oneOf(PRIOR_MARRIAGES, p.get('m'));
  const service = oneOf(SERVICES, p.get('s'));
  const d = p.get('d');
  if (!province || !nationality || !priorMarriage || !service || !d) return null;
  let date: DateIntent;
  if (d === 'soon' || d === 'not_yet') date = { kind: d };
  else if (/^\d{4}-\d{2}-\d{2}$/.test(d)) date = { kind: 'date', iso: d };
  else return null;
  const s: Situation = { province, nationality, priorMarriage, service, date };
  if (nationality === 'one_non_sa') {
    const ns = oneOf(NON_SA_STATUSES, p.get('ns'));
    if (ns) s.nonSaStatus = ns;
  }
  return s;
}
