import { describe, it, expect } from 'vitest';
import { matches, selectAnswers, SECTION_ORDER } from '@/src/answers/select';
import type { Answer } from '@/src/answers/types';
import type { Situation } from '@/src/situation/types';

const base: Situation = {
  province: 'gauteng', nationality: 'both_sa', priorMarriage: 'none',
  service: 'registration', date: { kind: 'not_yet' },
};
const mk = (over: Partial<Answer>): Answer => ({
  id: 'x', question: 'q?', body: 'b', section: 'process', appliesTo: {}, triggers: [],
  order: 1, status: 'live', lastReviewed: '2026-09-10', ...over,
});

describe('matches', () => {
  it('empty appliesTo matches everyone', () => {
    expect(matches(mk({}), base)).toBe(true);
  });
  it('filters by province', () => {
    expect(matches(mk({ appliesTo: { provinces: ['western_cape'] } }), base)).toBe(false);
    expect(matches(mk({ appliesTo: { provinces: ['gauteng'] } }), base)).toBe(true);
  });
  it('filters by prior marriage', () => {
    expect(matches(mk({ appliesTo: { priorMarriages: ['divorced'] } }), base)).toBe(false);
    expect(matches(mk({ appliesTo: { priorMarriages: ['divorced'] } }), { ...base, priorMarriage: 'divorced' })).toBe(true);
  });
  it('checks nonSaStatus only for one_non_sa', () => {
    const a = mk({ appliesTo: { nationalities: ['one_non_sa'], nonSaStatuses: ['permanent_resident'] } });
    expect(matches(a, base)).toBe(false);
    expect(matches(a, { ...base, nationality: 'one_non_sa', nonSaStatus: 'permanent_resident' })).toBe(true);
    expect(matches(a, { ...base, nationality: 'one_non_sa', nonSaStatus: 'temporary_visa' })).toBe(false);
  });
});

describe('selectAnswers', () => {
  it('returns sections in the fixed order and omits empty ones', () => {
    const secs = selectAnswers(base, { includeDrafts: true });
    const order = secs.map(s => s.section);
    expect(order).toEqual(SECTION_ORDER.filter(s => order.includes(s)));
    expect(order).not.toContain('specific');
  });
  it('excludes drafts by default', () => {
    expect(selectAnswers(base).flatMap(s => s.answers).every(a => a.status === 'live')).toBe(true);
  });
  it('shows the decree answer only to the divorced', () => {
    const ids = (s: Situation) => selectAnswers(s, { includeDrafts: true }).flatMap(x => x.answers).map(a => a.id);
    expect(ids(base)).not.toContain('bring-decree');
    expect(ids({ ...base, priorMarriage: 'divorced' })).toContain('bring-decree');
  });
  it('sorts within a section by order', () => {
    const bring = selectAnswers({ ...base, priorMarriage: 'divorced' }, { includeDrafts: true })
      .find(s => s.section === 'bring')!;
    const orders = bring.answers.map(a => a.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });
  it('includes extra answers under specific', () => {
    const extra = [mk({ id: 'e', section: 'specific' })];
    const secs = selectAnswers(base, { extra });
    expect(secs.find(s => s.section === 'specific')?.answers.map(a => a.id)).toEqual(['e']);
  });
});
