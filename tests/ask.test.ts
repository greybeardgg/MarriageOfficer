import { describe, it, expect } from 'vitest';
import { askAnswers, dependenciesOf } from '@/src/answers/ask';
import { ANSWERS } from '@/src/answers/library';

describe('answering from free text alone', () => {
  it('returns nothing for empty text', () => {
    expect(askAnswers('')).toEqual([]);
    expect(askAnswers('   ')).toEqual([]);
  });

  it('answers something a visitor might actually type', () => {
    const out = askAnswers('my fiance is zimbabwean and on a work visa', { includeDrafts: true });
    expect(out.length).toBeGreaterThan(0);
  });

  it('puts what needs no qualifying first', () => {
    const out = askAnswers('divorced and we want a visa and a certificate', { includeDrafts: true });
    const depths = out.map(r => r.dependsOn.length);
    expect(depths).toEqual([...depths].sort((a, b) => a - b));
  });

  it('never claims a conditional answer is settled', () => {
    for (const a of ANSWERS) {
      const t = a.appliesTo;
      const conditional = !!(t.provinces || t.nationalities || t.nonSaStatuses || t.priorMarriages || t.services);
      expect(dependenciesOf(a).length > 0, a.id).toBe(conditional);
    }
  });

  it('hides drafts unless they are asked for', () => {
    const drafts = ANSWERS.filter(a => a.status === 'draft').flatMap(a => a.triggers).filter(t => !t.endsWith('~'));
    if (!drafts.length) return;
    const live = askAnswers(drafts[0]);
    expect(live.every(r => r.answer.status === 'live')).toBe(true);
  });
});
