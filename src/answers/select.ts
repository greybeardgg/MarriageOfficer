import { ANSWERS } from './library';
import type { Answer, Section } from './types';
import type { Situation } from '../situation/types';

export const SECTION_ORDER: Section[] = ['process', 'price', 'bring', 'home_affairs', 'specific', 'always'];

export const SECTION_TITLE: Record<Section, string> = {
  process: 'Your process',
  price: 'Your price, and what it includes',
  bring: 'What to bring on the day',
  home_affairs: 'Where Home Affairs fits',
  specific: 'About what you told us',
  always: 'Good to know',
};

export interface PlanSection { section: Section; title: string; answers: Answer[] }

function inList<T>(list: T[] | undefined, v: T | undefined): boolean {
  return !list || (v !== undefined && list.includes(v));
}

export function matches(a: Answer, s: Situation): boolean {
  const t = a.appliesTo;
  if (!inList(t.provinces, s.province)) return false;
  if (!inList(t.nationalities, s.nationality)) return false;
  if (!inList(t.priorMarriages, s.priorMarriage)) return false;
  // Someone still deciding is shown every service's answers; the rest still narrows.
  if (s.service !== 'undecided' && !inList(t.services, s.service)) return false;
  if (t.nonSaStatuses) {
    if (s.nationality !== 'one_non_sa') return false;
    if (!inList(t.nonSaStatuses, s.nonSaStatus)) return false;
  }
  return true;
}

export function selectAnswers(
  s: Situation,
  opts: { includeDrafts?: boolean; extra?: Answer[]; answers?: Answer[] } = {},
): PlanSection[] {
  const pool = opts.answers ?? ANSWERS;
  const visible = (a: Answer) => opts.includeDrafts || a.status === 'live';
  const out: PlanSection[] = [];
  for (const section of SECTION_ORDER) {
    let picked: Answer[];
    if (section === 'specific') {
      picked = (opts.extra ?? []).filter(a => a.section === 'specific' && visible(a));
    } else {
      picked = pool.filter(a => a.section === section && visible(a) && matches(a, s));
    }
    picked = [...picked].sort((a, b) => a.order - b.order);
    if (picked.length) out.push({ section, title: SECTION_TITLE[section], answers: picked });
  }
  return out;
}
