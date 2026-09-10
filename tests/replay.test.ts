import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { selectAnswers } from '@/src/answers/select';
import { assignOfficer } from '@/src/officers/assign';
import { renderBody } from '@/src/answers/render';
import type { Situation, Province, Nationality, Service } from '@/src/situation/types';

const rows = readFileSync('fixtures/enquiries.csv', 'utf-8').trim().split('\n').slice(1)
  .map(l => l.split(','))
  .map(([province, nationality, service]) => ({
    province: province as Province, nationality: nationality as Nationality, service: service as Service,
  }));

describe('replaying the archive', () => {
  it('has a meaningful number of rows', () => {
    expect(rows.length).toBeGreaterThan(5000);
  });
  it('builds a page for every historical enquiry', () => {
    for (const r of rows) {
      const s: Situation = { ...r, priorMarriage: 'none', date: { kind: 'not_yet' } };
      const secs = selectAnswers(s, { includeDrafts: true });
      const have = new Set(secs.map(x => x.section));
      expect(have.has('process'), JSON.stringify(s)).toBe(true);
      expect(have.has('price'), JSON.stringify(s)).toBe(true);
      expect(have.has('bring'), JSON.stringify(s)).toBe(true);
      for (const a of secs.flatMap(x => x.answers)) renderBody(a.body);
    }
  });
  it('sends every Western Cape enquiry to a Western Cape officer', () => {
    const wc = rows.filter(r => r.province === 'western_cape');
    expect(wc.length).toBeGreaterThan(1000);
    for (const r of wc) {
      const o = assignOfficer({ ...r, priorMarriage: 'none', date: { kind: 'not_yet' } });
      expect(o?.province).toBe('western_cape');
    }
  });
  it('sends every Gauteng enquiry to a Gauteng officer', () => {
    for (const r of rows.filter(r => r.province === 'gauteng')) {
      expect(assignOfficer({ ...r, priorMarriage: 'none', date: { kind: 'not_yet' } })?.province).toBe('gauteng');
    }
  });
});
