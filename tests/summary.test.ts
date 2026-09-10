import { describe, it, expect } from 'vitest';
import { summarise } from '@/src/plan/summary';
import type { Situation } from '@/src/situation/types';

const base: Situation = {
  province: 'gauteng', nationality: 'both_sa', priorMarriage: 'none',
  service: 'registration', date: { kind: 'not_yet' },
};

describe('summarise', () => {
  it('reads as the spec example', () => {
    expect(summarise(base)).toBe('legal registration, both South African, first marriage, Gauteng');
  });
  it('names the non-SA status and the ceremony', () => {
    expect(summarise({ ...base, service: 'wedding_ceremony', nationality: 'one_non_sa',
      nonSaStatus: 'temporary_visa', priorMarriage: 'divorced', province: 'western_cape' }))
      .toBe('wedding ceremony, one of you not South African (on a visa), one of you married before, Western Cape');
  });
});
