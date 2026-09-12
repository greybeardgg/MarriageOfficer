import { triggeredAnswers } from './triggers';
import { SECTION_ORDER } from './select';
import type { Answer, AppliesTo } from './types';

/**
 * Answering from free text alone, before any question has been asked.
 *
 * `triggeredAnswers` matches words against the library but knows nothing about
 * the person, so some of what it returns only holds for certain provinces,
 * nationalities, histories or services. Showing those unqualified would be a
 * wrong answer wearing a confident face. Every result therefore carries the
 * list of things it still depends on, and the caller must show them.
 */
export interface AskResult {
  answer: Answer;
  /** Plain-language conditions this answer has not been checked against yet. */
  dependsOn: string[];
}

const CONDITIONS: { key: keyof AppliesTo; says: string }[] = [
  { key: 'provinces', says: 'where this happens' },
  { key: 'nationalities', says: 'whether you are both South African' },
  { key: 'nonSaStatuses', says: 'the non-South African partner’s status' },
  { key: 'priorMarriages', says: 'whether either of you has been married before' },
  { key: 'services', says: 'whether you want a registration or a ceremony' },
];

export function dependenciesOf(a: Answer): string[] {
  const out: string[] = [];
  for (const c of CONDITIONS) {
    const list = a.appliesTo[c.key];
    if (list && list.length) out.push(c.says);
  }
  return out;
}

export function askAnswers(
  freeText: string,
  opts: { includeDrafts?: boolean; answers?: Answer[] } = {},
): AskResult[] {
  const hits = triggeredAnswers(freeText, opts.answers)
    .filter(a => opts.includeDrafts || a.status === 'live');

  return hits
    .map(a => ({ answer: a, dependsOn: dependenciesOf(a) }))
    .sort((x, y) => {
      // What we can say without qualification comes first.
      if (x.dependsOn.length !== y.dependsOn.length) return x.dependsOn.length - y.dependsOn.length;
      const s = SECTION_ORDER.indexOf(x.answer.section) - SECTION_ORDER.indexOf(y.answer.section);
      return s !== 0 ? s : x.answer.order - y.answer.order;
    });
}
