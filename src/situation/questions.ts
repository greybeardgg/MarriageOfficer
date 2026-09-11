import { PROVINCES, NATIONALITIES, NON_SA_STATUSES, PRIOR_MARRIAGES, SERVICES, PROVINCE_LABEL } from './types';
import type { Situation } from './types';

export interface Choice {
  value: string;
  label: string;
  hint?: string;
  door?: DoorId;
  /** What this answer prints on its stamp. A stamp has to state something on its own. */
  stampValue?: string;
}
export interface Question {
  id: 'province' | 'nationality' | 'nonSaStatus' | 'priorMarriage' | 'service' | 'date';
  /** The field name printed on this answer's stamp. Never rendered above a heading. */
  stampLabel: string;
  prompt: string;
  /** One line that names the worry and removes it. */
  note?: string;
  choices: Choice[];
  skipWhen?: (partial: Partial<Situation>) => boolean;
}

export type DoorId = 'legal' | 'ceremony';

/** The two counters that open the front door. Equal weight, by decision of 11 September 2026. */
export interface Door {
  id: DoorId;
  title: string;
  line: string;
  foot: string;
  /** The word struck across the legal door's round stamp. The ceremony door carries none. */
  stampWord?: string;
}

export const DOORS: Door[] = [
  {
    id: 'legal',
    title: 'Register A Marriage',
    stampWord: 'Registered',
    line: 'The legal part. An officer, your witnesses, the register signed and lodged with Home Affairs.',
    foot: 'At our offices, at your home, or wherever suits you.',
  },
  {
    id: 'ceremony',
    title: 'Have A Wedding',
    line: 'The day itself. Words that sound like you, your people watching, and the registration done properly inside it.',
    foot: 'Small and quiet, or the whole thing.',
  },
];

const provinceOrder = ['gauteng', 'western_cape', ...PROVINCES.filter(p => p !== 'gauteng' && p !== 'western_cape')] as const;

export const QUESTIONS: Question[] = [
  {
    id: 'service',
    stampLabel: 'Service',
    prompt: 'Which of the two do you need?',
    choices: [
      { value: 'registration', door: 'legal', label: 'Register a marriage', stampValue: 'Registration', hint: 'You, your witnesses, the paperwork done properly' },
      { value: 'small_ceremony', door: 'ceremony', label: 'A small ceremony', stampValue: 'Small ceremony', hint: 'A few words that sound like you, then the signing' },
      { value: 'wedding_ceremony', door: 'ceremony', label: 'A full wedding ceremony', stampValue: 'Wedding ceremony', hint: 'Your day, your guests, an officiant who makes it yours' },
    ],
  },
  {
    id: 'province',
    stampLabel: 'Place',
    prompt: 'Where will this happen?',
    note: 'This decides which of our twelve officers you will meet.',
    choices: provinceOrder.map(p => ({ value: p, label: PROVINCE_LABEL[p] })),
  },
  {
    id: 'nationality',
    stampLabel: 'Nationality',
    prompt: 'Are you both South African?',
    note: 'If one of you is not, there is an extra step. We will tell you exactly what it is.',
    choices: [
      { value: 'both_sa', label: 'Yes, both of us', stampValue: 'Both South African' },
      { value: 'one_non_sa', label: 'One of us is', stampValue: 'One not South African' },
      { value: 'both_non_sa', label: 'Neither of us', stampValue: 'Neither South African' },
    ],
  },
  {
    id: 'nonSaStatus',
    stampLabel: 'Status',
    prompt: 'What is the non-South African partner’s status?',
    note: 'This is the single question that changes the process most.',
    choices: [
      { value: 'permanent_resident', label: 'A permanent resident with an SA ID', stampValue: 'Permanent resident' },
      { value: 'temporary_visa', label: 'Here on a visa or permit', stampValue: 'Visa or permit' },
    ],
    skipWhen: p => p.nationality !== 'one_non_sa',
  },
  {
    id: 'priorMarriage',
    stampLabel: 'Prior',
    prompt: 'Has either of you been married before?',
    note: 'A previous marriage is not a problem. It is a document.',
    choices: [
      { value: 'none', label: 'No', stampValue: 'First marriage' },
      { value: 'divorced', label: 'Yes, divorced', stampValue: 'Divorced' },
      { value: 'widowed', label: 'Yes, widowed', stampValue: 'Widowed' },
    ],
  },
  {
    id: 'date',
    stampLabel: 'Date',
    prompt: 'Any date in mind?',
    note: 'Nothing is booked here. This only tells us how fast to move.',
    choices: [
      { value: 'pick', label: 'Yes, a date' },
      { value: 'soon', label: 'Soon, not fixed yet', stampValue: 'Soon' },
      { value: 'not_yet', label: 'Not yet', stampValue: 'Not fixed' },
    ],
  },
];

const LISTS: Record<Exclude<Question['id'], 'date'>, readonly string[]> = {
  province: PROVINCES, nationality: NATIONALITIES, nonSaStatus: NON_SA_STATUSES,
  priorMarriage: PRIOR_MARRIAGES, service: SERVICES,
};

export function applyAnswer(partial: Partial<Situation>, id: Question['id'], value: string): Partial<Situation> {
  if (id === 'date') {
    if (value === 'soon' || value === 'not_yet') return { ...partial, date: { kind: value } };
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return { ...partial, date: { kind: 'date', iso: value } };
    return partial;
  }
  if (!LISTS[id].includes(value)) return partial;
  const next = { ...partial, [id]: value } as Partial<Situation>;
  if (id === 'nationality' && value !== 'one_non_sa') delete next.nonSaStatus;
  return next;
}

export function isComplete(p: Partial<Situation>): p is Situation {
  return !!(p.province && p.nationality && p.priorMarriage && p.service && p.date);
}

/** The short word a given answer prints on its stamp. */
export function stampValue(id: Question['id'], partial: Partial<Situation>): string | null {
  if (id === 'date') {
    const d = partial.date;
    if (!d) return null;
    if (d.kind === 'soon') return 'Soon';
    if (d.kind === 'not_yet') return 'Not fixed';
    return d.iso;
  }
  const v = (partial as Record<string, unknown>)[id];
  if (typeof v !== 'string') return null;
  if (id === 'province') return PROVINCE_LABEL[v as keyof typeof PROVINCE_LABEL];
  const q = QUESTIONS.find(x => x.id === id);
  const choice = q?.choices.find(c => c.value === v);
  return choice?.stampValue ?? choice?.label ?? v;
}
