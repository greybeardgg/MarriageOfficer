import { describe, it, expect } from 'vitest';
import { triggeredAnswers } from '@/src/answers/triggers';

const ids = (t: string) => triggeredAnswers(t).map(a => a.id);

describe('triggeredAnswers', () => {
  it('returns nothing for empty or unrelated text', () => {
    expect(ids('')).toEqual([]);
    expect(ids('we are so excited to get married!')).toEqual([]);
  });
  it('matches a trigger word case-insensitively and past punctuation', () => {
    expect(ids('Can we bring a Photographer?')).toContain('specific-photos');
  });
  it('matches multi-word triggers', () => {
    expect(ids('we have an ante-nuptial contract already')).toContain('specific-anc');
  });
  it('matches on word boundaries, not inside other words', () => {
    // "id" must not match "bridge"
    expect(ids('we met on the bridge')).not.toContain('bring-ids');
  });
  it('pulls in the certificate answer for overseas plans', () => {
    expect(ids('after the wedding she moves overseas')).toContain('ha-certificate');
  });
  it('returns each answer once', () => {
    const r = ids('photo photo photographer pictures');
    expect(r.filter(x => x === 'specific-photos')).toHaveLength(1);
  });
});
