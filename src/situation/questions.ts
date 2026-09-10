import { PROVINCES, NATIONALITIES, NON_SA_STATUSES, PRIOR_MARRIAGES, SERVICES, PROVINCE_LABEL } from './types';
import type { Situation } from './types';

export interface Choice { value: string; label: string; hint?: string }
export interface Question {
  id: 'province' | 'nationality' | 'nonSaStatus' | 'priorMarriage' | 'service' | 'date';
  prompt: string;
  choices: Choice[];
  skipWhen?: (partial: Partial<Situation>) => boolean;
}

const provinceOrder = ['gauteng', 'western_cape', ...PROVINCES.filter(p => p !== 'gauteng' && p !== 'western_cape')] as const;

export const QUESTIONS: Question[] = [
  {
    id: 'province',
    prompt: 'Where will this happen?',
    choices: provinceOrder.map(p => ({ value: p, label: PROVINCE_LABEL[p] })),
  },
  {
    id: 'nationality',
    prompt: 'Are you both South African?',
    choices: [
      { value: 'both_sa', label: 'Yes, both of us' },
      { value: 'one_non_sa', label: 'One of us is' },
      { value: 'both_non_sa', label: 'Neither of us' },
    ],
  },
  {
    id: 'nonSaStatus',
    prompt: 'Is the non-South African partner…',
    choices: [
      { value: 'permanent_resident', label: 'A permanent resident with an SA ID' },
      { value: 'temporary_visa', label: 'Here on a visa or permit' },
    ],
    skipWhen: p => p.nationality !== 'one_non_sa',
  },
  {
    id: 'priorMarriage',
    prompt: 'Has either of you been married before?',
    choices: [
      { value: 'none', label: 'No' },
      { value: 'divorced', label: 'Yes, divorced' },
      { value: 'widowed', label: 'Yes, widowed' },
    ],
  },
  {
    id: 'service',
    prompt: 'What do you need?',
    choices: [
      { value: 'registration', label: 'Just the legal registration', hint: 'You, your witnesses, the paperwork done properly' },
      { value: 'small_ceremony', label: 'A small ceremony too', hint: 'A few words that sound like you, then the signing' },
      { value: 'wedding_ceremony', label: 'A full wedding ceremony', hint: 'Your day, your guests, an officiant who makes it yours' },
    ],
  },
  {
    id: 'date',
    prompt: 'Any date in mind?',
    choices: [
      { value: 'pick', label: 'Yes, a date' },
      { value: 'soon', label: 'Soon, not fixed yet' },
      { value: 'not_yet', label: 'Not yet' },
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
