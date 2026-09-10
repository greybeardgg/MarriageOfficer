import { describe, it, expect } from 'vitest';
import { ANSWERS } from '@/src/answers/library';
import { renderBody } from '@/src/answers/render';

describe('seed answer library', () => {
  it('has unique ids', () => {
    const ids = ANSWERS.map(a => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('every price placeholder resolves', () => {
    for (const a of ANSWERS) expect(() => renderBody(a.body)).not.toThrow();
  });
  it('never types a rand amount into a body', () => {
    for (const a of ANSWERS) expect(a.body, a.id).not.toMatch(/R\s?\d{3,}/);
  });
  it('explains Home Affairs and never compares', () => {
    const banned = /cheaper|faster than|better than|unlike home affairs|worse|queue for hours/i;
    for (const a of ANSWERS) expect(a.body, a.id).not.toMatch(banned);
  });
  it('has at least one live answer in each of process, price, bring and home_affairs', () => {
    for (const s of ['process','price','bring','home_affairs'] as const) {
      expect(ANSWERS.some(a => a.section === s), s).toBe(true);
    }
  });
  it('every answer has a question, a body and a review date', () => {
    for (const a of ANSWERS) {
      expect(a.question.length, a.id).toBeGreaterThan(10);
      expect(a.body.length, a.id).toBeGreaterThan(40);
      expect(a.lastReviewed, a.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
