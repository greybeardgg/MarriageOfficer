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
  it('says nothing legal about a ceremony on its own', () => {
    expect(summarise({ province: 'gauteng', service: 'ceremony_only', date: { kind: 'soon' } }))
      .toBe('ceremony on its own, Gauteng');
  });
  it('says every option for someone still deciding, with what they told us', () => {
    expect(summarise({ ...base, service: 'undecided' })).toBe('every option, both South African, first marriage, Gauteng');
  });
  it('names the officer only when they were asked for', () => {
    expect(summarise({ ...base, officer: 'christa' }))
      .toBe('legal registration, both South African, first marriage, Gauteng, with Christa Lizamore');
    expect(summarise({ ...base, officer: 'any' })).toBe(summarise(base));
  });
});
