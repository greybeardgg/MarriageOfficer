import { PROVINCES, NATIONALITIES, NON_SA_STATUSES, PRIOR_MARRIAGES, SERVICES, PROVINCE_LABEL, ANY_OFFICER, isLegal } from './types';
import type { Situation } from './types';
import { officersIn, officerById, whereIs } from '../officers/officers';

export interface Choice {
  value: string;
  label: string;
  hint?: string;
  /** What this answer prints on its stamp. A stamp has to state something on its own. */
  stampValue?: string;
}
export interface Question {
  id: 'province' | 'service' | 'nationality' | 'nonSaStatus' | 'priorMarriage' | 'officer' | 'date';
  /** The field name printed on this answer's stamp. Never rendered above a heading. */
  stampLabel: string;
  prompt: string;
  /** One line that names the worry and removes it. */
  note?: string;
  choices: Choice[];
  /** Choices that depend on earlier answers. Takes precedence over `choices`. */
  choicesFor?: (partial: Partial<Situation>) => Choice[];
  skipWhen?: (partial: Partial<Situation>) => boolean;
}

const provinceOrder = ['gauteng', 'western_cape', ...PROVINCES.filter(p => p !== 'gauteng' && p !== 'western_cape')] as const;

/** The officer question only exists where there is a choice to make. */
function officerChoices(partial: Partial<Situation>): Choice[] {
  return [
    { value: ANY_OFFICER, label: 'No preference', hint: 'We will match you to the nearest of ours', stampValue: 'Nearest to you' },
    ...officersIn(partial.province).map(o => ({
      value: o.id,
      label: o.name,
      hint: whereIs(o),
      stampValue: o.name,
    })),
  ];
}

/**
 * Order: what they need, then where (Ryan, 5 October 2026), then the legal
 * questions (skipped for a ceremony without a registration, asked of someone
 * still deciding), then who, then when. What they need decides which
 * questions follow; it is one question among the others, never a fork.
 */
export const QUESTIONS: Question[] = [
  {
    id: 'service',
    stampLabel: 'Service',
    prompt: 'What do you need?',
    note: 'The first three end with a marriage Home Affairs recognises.',
    choices: [
      { value: 'registration', label: 'Legal marriage registration', stampValue: 'Registration', hint: 'You, your witnesses, the paperwork done properly' },
      { value: 'small_ceremony', label: 'A small ceremony too', stampValue: 'Small ceremony', hint: 'A few words that sound like you, then the signing' },
      { value: 'wedding_ceremony', label: 'A full wedding ceremony', stampValue: 'Wedding ceremony', hint: 'Your day, your guests, an officiant who makes it yours' },
      { value: 'ceremony_only', label: 'A ceremony only', stampValue: 'Ceremony only', hint: 'You are already married, or registering elsewhere. No paperwork from us' },
      { value: 'undecided', label: 'I’m still deciding - show me all the options', stampValue: 'Still deciding', hint: 'We show you every option, and you choose after' },
    ],
  },
  {
    id: 'province',
    stampLabel: 'Place',
    prompt: 'Which province will you be married?',
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
    skipWhen: p => !isLegal(p.service),
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
    skipWhen: p => !isLegal(p.service) || p.nationality !== 'one_non_sa',
  },
  {
    id: 'priorMarriage',
    stampLabel: 'Prior',
    prompt: 'Have either of you been married before?',
    note: 'You’ll need a divorce decree.',
    choices: [
      { value: 'none', label: 'No', stampValue: 'First marriage' },
      { value: 'divorced', label: 'Yes, divorced', stampValue: 'Divorced' },
      { value: 'widowed', label: 'Yes, widowed', stampValue: 'Widowed' },
    ],
    skipWhen: p => !isLegal(p.service),
  },
  {
    id: 'officer',
    stampLabel: 'Officer',
    prompt: 'Do you have an officer in mind?',
    note: 'If not, we will match you to the nearest of ours. Either way you deal with one person from then on.',
    choices: [],
    choicesFor: officerChoices,
    skipWhen: p => officersIn(p.province).length < 2,
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

/** The choices a question offers, given what has been answered so far. */
export function choicesOf(q: Question, partial: Partial<Situation>): Choice[] {
  return q.choicesFor ? q.choicesFor(partial) : q.choices;
}

/** The questions this person will be asked, in order. */
export function visibleQuestions(partial: Partial<Situation>): Question[] {
  return QUESTIONS.filter(q => !q.skipWhen?.(partial));
}

const LISTS: Record<Exclude<Question['id'], 'date' | 'officer'>, readonly string[]> = {
  province: PROVINCES, nationality: NATIONALITIES, nonSaStatus: NON_SA_STATUSES,
  priorMarriage: PRIOR_MARRIAGES, service: SERVICES,
};

export function applyAnswer(partial: Partial<Situation>, id: Question['id'], value: string): Partial<Situation> {
  if (id === 'date') {
    if (value === 'soon' || value === 'not_yet') return { ...partial, date: { kind: value } };
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return { ...partial, date: { kind: 'date', iso: value } };
    return partial;
  }
  if (id === 'officer') {
    const ok = value === ANY_OFFICER || officerById(value)?.province === partial.province;
    return ok ? { ...partial, officer: value } : partial;
  }
  if (!LISTS[id].includes(value)) return partial;
  const next = { ...partial, [id]: value } as Partial<Situation>;
  if (id === 'nationality' && value !== 'one_non_sa') delete next.nonSaStatus;
  // An answer that changes which questions follow drops the answers that no longer apply.
  if (id === 'province' && next.officer && officerById(next.officer)?.province !== value) delete next.officer;
  if (id === 'service' && !isLegal(next.service)) {
    delete next.nationality;
    delete next.nonSaStatus;
    delete next.priorMarriage;
  }
  return next;
}

export function isComplete(p: Partial<Situation>): p is Situation {
  if (!p.province || !p.service || !p.date) return false;
  if (isLegal(p.service) && !(p.nationality && p.priorMarriage)) return false;
  if (officersIn(p.province).length >= 2 && !p.officer) return false;
  return true;
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
  const choice = q ? choicesOf(q, partial).find(c => c.value === v) : undefined;
  return choice?.stampValue ?? choice?.label ?? v;
}
