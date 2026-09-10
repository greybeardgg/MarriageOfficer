import { describe, it, expect } from 'vitest';
import { OFFICERS } from '@/src/officers/officers';
import { assignOfficer } from '@/src/officers/assign';
import type { Situation } from '@/src/situation/types';

const base: Situation = {
  province: 'gauteng', nationality: 'both_sa', priorMarriage: 'none',
  service: 'registration', date: { kind: 'not_yet' },
};

describe('officers', () => {
  it('carries no contact details', () => {
    const blob = JSON.stringify(OFFICERS);
    expect(blob).not.toMatch(/\d{3}[\s-]?\d{3}[\s-]?\d{4}/);
    expect(blob).not.toMatch(/@/);
  });
  it('has exactly one primary in gauteng and one in western_cape', () => {
    expect(OFFICERS.filter(o => o.primary && o.province === 'gauteng')).toHaveLength(1);
    expect(OFFICERS.filter(o => o.primary && o.province === 'western_cape')).toHaveLength(1);
  });
});

describe('assignOfficer', () => {
  it('names a Western Cape officer for a Western Cape situation', () => {
    const o = assignOfficer({ ...base, province: 'western_cape' });
    expect(o).not.toBeNull();
    expect(o!.province).toBe('western_cape');
  });
  it('names a Gauteng officer for Gauteng', () => {
    expect(assignOfficer(base)?.province).toBe('gauteng');
  });
  it('returns null for a province with no primary', () => {
    expect(assignOfficer({ ...base, province: 'limpopo' })).toBeNull();
  });
});
