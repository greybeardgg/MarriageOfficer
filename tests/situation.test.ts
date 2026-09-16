import { describe, it, expect } from 'vitest';
import { encodeSituation, decodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';

/** Gauteng has several officers, so a link without one reads as no preference. */
const base: Situation = {
  province: 'gauteng', nationality: 'both_sa', priorMarriage: 'none',
  service: 'registration', officer: 'any', date: { kind: 'not_yet' },
};

describe('situation url encoding', () => {
  it('round-trips a plain situation', () => {
    expect(decodeSituation(encodeSituation(base))).toEqual(base);
  });
  it('round-trips a one-non-SA situation with status and a date', () => {
    const s: Situation = { ...base, nationality: 'one_non_sa', nonSaStatus: 'temporary_visa',
      date: { kind: 'date', iso: '2026-12-05' } };
    expect(decodeSituation(encodeSituation(s))).toEqual(s);
  });
  it('drops nonSaStatus when nationality is not one_non_sa', () => {
    const s = { ...base, nonSaStatus: 'temporary_visa' } as Situation;
    expect(decodeSituation(encodeSituation(s))).toEqual(base);
  });
  it('round-trips a ceremony on its own without the legal answers', () => {
    const s: Situation = { province: 'western_cape', service: 'ceremony_only', officer: 'any', date: { kind: 'soon' } };
    const p = encodeSituation(s);
    expect(p.has('n')).toBe(false);
    expect(p.has('m')).toBe(false);
    expect(decodeSituation(p)).toEqual(s);
  });
  it('leaves the legal answers out of a ceremony-only link even if present', () => {
    const s = { province: 'gauteng', service: 'ceremony_only', nationality: 'both_sa', priorMarriage: 'none', date: { kind: 'soon' } } as Situation;
    expect(decodeSituation(encodeSituation(s))).toEqual({ province: 'gauteng', service: 'ceremony_only', officer: 'any', date: { kind: 'soon' } });
  });
  it('round-trips a named officer and omits no preference', () => {
    const named: Situation = { ...base, province: 'western_cape', officer: 'lara' };
    expect(encodeSituation(named).get('o')).toBe('lara');
    expect(decodeSituation(encodeSituation(named))).toEqual(named);
    const any = { ...base, officer: 'any' } as Situation;
    expect(encodeSituation(any).has('o')).toBe(false);
    expect(decodeSituation(encodeSituation(any))).toEqual(any);
  });
  it('reads a missing officer as no preference where the question is asked, and not where it is not', () => {
    expect(decodeSituation(encodeSituation(base))?.officer).toBe('any');
    const solo: Situation = { ...base, province: 'eastern_cape', officer: undefined };
    expect(decodeSituation(encodeSituation(solo))?.officer).toBeUndefined();
  });
  it('drops an officer from another province', () => {
    const p = encodeSituation(base); p.set('o', 'lara');
    expect(decodeSituation(p)).toEqual({ ...base, officer: 'any' });
  });
  it('returns null for a missing required field', () => {
    expect(decodeSituation(new URLSearchParams('p=gauteng'))).toBeNull();
    expect(decodeSituation(new URLSearchParams('p=gauteng&s=registration&d=soon'))).toBeNull();
  });
  it('returns null for an unknown value', () => {
    const p = encodeSituation(base); p.set('p', 'mars');
    expect(decodeSituation(p)).toBeNull();
  });
});
