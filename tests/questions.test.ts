import { describe, it, expect } from 'vitest';
import { QUESTIONS, applyAnswer, choicesOf, isComplete, visibleQuestions } from '@/src/situation/questions';
import { officersIn } from '@/src/officers/officers';

const q = (id: string) => QUESTIONS.find(x => x.id === id)!;

describe('questions', () => {
  it('asks what they need first, then where (Ryan, 5 October 2026)', () => {
    expect(QUESTIONS.map(x => x.id)).toEqual(['service', 'province', 'nationality', 'nonSaStatus', 'priorMarriage', 'officer', 'date']);
    const service = q('service');
    expect(service.choices[0].value).toBe('registration');
    expect(service.choices.map(c => c.value)).toEqual(['registration', 'small_ceremony', 'wedding_ceremony', 'ceremony_only', 'undecided']);
    expect(service.choices.at(-1)!.label).toBe('I’m still deciding - show me all the options');
  });
  it('asks every remaining question of someone still deciding', () => {
    expect(visibleQuestions({ service: 'undecided', province: 'gauteng' }).map(x => x.id))
      .toEqual(['service', 'province', 'nationality', 'priorMarriage', 'officer', 'date']);
    let s = {};
    s = applyAnswer(s, 'service', 'undecided');
    s = applyAnswer(s, 'province', 'limpopo');
    s = applyAnswer(s, 'date', 'soon');
    expect(isComplete(s)).toBe(false);
    s = applyAnswer(s, 'nationality', 'both_sa');
    s = applyAnswer(s, 'priorMarriage', 'none');
    expect(isComplete(s)).toBe(true);
  });
  it('lists Gauteng and Western Cape first', () => {
    expect(q('province').choices.slice(0, 2).map(c => c.value)).toEqual(['gauteng', 'western_cape']);
  });
  it('skips the non-SA status question unless one partner is non-SA', () => {
    expect(q('nonSaStatus').skipWhen!({ service: 'registration', nationality: 'both_sa' })).toBe(true);
    expect(q('nonSaStatus').skipWhen!({ service: 'registration', nationality: 'one_non_sa' })).toBe(false);
  });
  it('asks no legal question for a ceremony on its own', () => {
    const ids = visibleQuestions({ province: 'limpopo', service: 'ceremony_only' }).map(x => x.id);
    expect(ids).toEqual(['service', 'province', 'date']);
    const legal = visibleQuestions({ province: 'limpopo', service: 'registration' }).map(x => x.id);
    expect(legal).toEqual(['service', 'province', 'nationality', 'priorMarriage', 'date']);
  });
  it('asks which officer only where there is a choice', () => {
    expect(q('officer').skipWhen!({ province: 'gauteng' })).toBe(false);
    expect(q('officer').skipWhen!({ province: 'western_cape' })).toBe(false);
    expect(q('officer').skipWhen!({ province: 'eastern_cape' })).toBe(true);
    expect(q('officer').skipWhen!({ province: 'limpopo' })).toBe(true);
    expect(q('officer').skipWhen!({})).toBe(true);
  });
  it('offers no preference first, then every officer in the province', () => {
    const choices = choicesOf(q('officer'), { province: 'gauteng' });
    expect(choices[0].value).toBe('any');
    expect(choices.slice(1).map(c => c.value)).toEqual(officersIn('gauteng').map(o => o.id));
    expect(choices.slice(1)[0].label).toBe('Ryan Hogarth');
    for (const c of choices) expect(c.stampValue, c.value).toBeTruthy();
  });
  it('builds a complete situation from answers', () => {
    let s = {};
    s = applyAnswer(s, 'province', 'gauteng');
    s = applyAnswer(s, 'service', 'registration');
    s = applyAnswer(s, 'nationality', 'both_sa');
    s = applyAnswer(s, 'priorMarriage', 'none');
    expect(isComplete(s)).toBe(false);
    s = applyAnswer(s, 'officer', 'any');
    expect(isComplete(s)).toBe(false);
    s = applyAnswer(s, 'date', '2026-12-05');
    expect(isComplete(s)).toBe(true);
    expect((s as Record<string, unknown>).date).toEqual({ kind: 'date', iso: '2026-12-05' });
  });
  it('is complete for a ceremony on its own without the legal answers', () => {
    let s = {};
    s = applyAnswer(s, 'province', 'eastern_cape');
    s = applyAnswer(s, 'service', 'ceremony_only');
    s = applyAnswer(s, 'date', 'soon');
    expect(isComplete(s)).toBe(true);
  });
  it('drops the legal answers when the service turns into a ceremony on its own', () => {
    let s = {};
    s = applyAnswer(s, 'province', 'gauteng');
    s = applyAnswer(s, 'service', 'registration');
    s = applyAnswer(s, 'nationality', 'one_non_sa');
    s = applyAnswer(s, 'nonSaStatus', 'temporary_visa');
    s = applyAnswer(s, 'priorMarriage', 'divorced');
    s = applyAnswer(s, 'service', 'ceremony_only');
    expect(s).toEqual({ province: 'gauteng', service: 'ceremony_only' });
  });
  it('only accepts an officer who works in the chosen province', () => {
    expect(applyAnswer({ province: 'gauteng' }, 'officer', 'lara')).toEqual({ province: 'gauteng' });
    expect(applyAnswer({ province: 'western_cape' }, 'officer', 'lara')).toEqual({ province: 'western_cape', officer: 'lara' });
    expect(applyAnswer({ province: 'western_cape', officer: 'lara' }, 'province', 'gauteng')).toEqual({ province: 'gauteng' });
  });
  it('ignores an unknown value', () => {
    expect(applyAnswer({}, 'province', 'mars')).toEqual({});
  });
  it('every question carries the field name printed on its stamp', () => {
    for (const x of QUESTIONS) expect(x.stampLabel.length, x.id).toBeGreaterThan(2);
    expect(q('province').stampLabel).toBe('Place');
    expect(q('officer').stampLabel).toBe('Officer');
  });
});
