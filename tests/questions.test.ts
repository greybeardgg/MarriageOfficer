import { describe, it, expect } from 'vitest';
import { QUESTIONS, applyAnswer, isComplete } from '@/src/situation/questions';

describe('questions', () => {
  it('asks where it happens first, and never forks the path at the door', () => {
    expect(QUESTIONS[0].id).toBe('province');
  });
  it('asks what they need on the way through, not up front', () => {
    const order = QUESTIONS.map(q => q.id);
    expect(order.indexOf('service')).toBe(order.length - 2);
    const service = QUESTIONS.find(q => q.id === 'service')!;
    expect(service.choices[0].value).toBe('registration');
    expect(service.choices).toHaveLength(3);
  });
  it('lists Gauteng and Western Cape first', () => {
    const p = QUESTIONS.find(q => q.id === 'province')!;
    expect(p.choices.slice(0, 2).map(c => c.value)).toEqual(['gauteng', 'western_cape']);
  });
  it('skips the non-SA status question unless one partner is non-SA', () => {
    const q = QUESTIONS.find(q => q.id === 'nonSaStatus')!;
    expect(q.skipWhen!({ nationality: 'both_sa' })).toBe(true);
    expect(q.skipWhen!({ nationality: 'one_non_sa' })).toBe(false);
  });
  it('builds a complete situation from answers', () => {
    let s = {};
    s = applyAnswer(s, 'province', 'gauteng');
    s = applyAnswer(s, 'nationality', 'both_sa');
    s = applyAnswer(s, 'priorMarriage', 'none');
    s = applyAnswer(s, 'service', 'registration');
    expect(isComplete(s)).toBe(false);
    s = applyAnswer(s, 'date', '2026-12-05');
    expect(isComplete(s)).toBe(true);
    expect((s as Record<string, unknown>).date).toEqual({ kind: 'date', iso: '2026-12-05' });
  });
  it('ignores an unknown value', () => {
    expect(applyAnswer({}, 'province', 'mars')).toEqual({});
  });
  it('every question carries the field name printed on its stamp', () => {
    for (const q of QUESTIONS) expect(q.stampLabel.length, q.id).toBeGreaterThan(2);
    expect(QUESTIONS.find(q => q.id === 'province')!.stampLabel).toBe('Place');
  });
});
