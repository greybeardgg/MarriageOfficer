import { describe, it, expect } from 'vitest';
import { encodeSituation, decodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';

const base: Situation = {
  province: 'gauteng', nationality: 'both_sa', priorMarriage: 'none',
  service: 'registration', date: { kind: 'not_yet' },
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
  it('returns null for a missing required field', () => {
    expect(decodeSituation(new URLSearchParams('p=gauteng'))).toBeNull();
  });
  it('returns null for an unknown value', () => {
    const p = encodeSituation(base); p.set('p', 'mars');
    expect(decodeSituation(p)).toBeNull();
  });
});
