import { describe, expect, it } from 'vitest';
import { openThread, pressReply, askThread, TOPIC_LABEL } from '../src/chat/thread';
import type { Situation } from '../src/situation/types';

const gauteng: Situation = { province: 'gauteng', service: 'registration', nationality: 'both_sa', priorMarriage: 'none', officer: 'any', date: { kind: 'not_yet' } };
const wc: Situation = { province: 'western_cape', service: 'registration', nationality: 'one_non_sa', nonSaStatus: 'temporary_visa', priorMarriage: 'divorced', officer: 'any', date: { kind: 'not_yet' } };
const ceremonyOnly: Situation = { province: 'gauteng', service: 'ceremony_only', officer: 'christa', date: { kind: 'soon' } };

describe('opening the thread', () => {
  it('opens with the process, and offers every other topic the situation has answers for', () => {
    const t = openThread(gauteng, { includeDrafts: true });
    expect(t.messages).toHaveLength(1);
    const first = t.messages[0];
    expect(first.from).toBe('us');
    expect(first.topic).toBe('process');
    expect(first.answers.map(a => a.id)).toContain('process-registration-office');
    expect(first.replies.map(r => r.id)).toEqual(['price', 'bring', 'home_affairs', 'officer', 'always']);
    expect(first.replies.map(r => r.label)).toEqual(['price', 'bring', 'home_affairs', 'officer', 'always'].map(k => TOPIC_LABEL[k as keyof typeof TOPIC_LABEL]));
  });

  it('offers no topic that has nothing to say: a ceremony on its own has no Home Affairs and nothing to bring', () => {
    const t = openThread(ceremonyOnly, { includeDrafts: true });
    expect(t.messages[0].replies.map(r => r.id)).toEqual(['price', 'officer', 'always']);
  });

  it('shows no drafts unless asked to', () => {
    const t = openThread(gauteng, { includeDrafts: false });
    expect(t.messages[0].answers.every(a => a.status === 'live')).toBe(true);
  });
});

describe('pressing a reply', () => {
  it('posts the visitor’s words, then our message for that topic, and never offers it again', () => {
    let t = openThread(wc, { includeDrafts: true });
    t = pressReply(t, 'bring');
    expect(t.messages).toHaveLength(3);
    expect(t.messages[1]).toMatchObject({ from: 'you', title: TOPIC_LABEL.bring });
    const ours = t.messages[2];
    expect(ours.from).toBe('us');
    expect(ours.topic).toBe('bring');
    expect(ours.answers.map(a => a.id)).toContain('bring-decree');
    expect(ours.replies.map(r => r.id)).toEqual(['price', 'home_affairs', 'officer', 'always']);
  });

  it('the officer message names who they will meet, and whether it was their choice', () => {
    const t = pressReply(openThread(ceremonyOnly, { includeDrafts: true }), 'officer');
    const ours = t.messages[2];
    expect(ours.officer?.name).toBe('Christa Lizamore');
    expect(ours.chosen).toBe(true);
    const any = pressReply(openThread(wc, { includeDrafts: true }), 'officer');
    expect(any.messages[2].officer?.name).toBe('Lara Thomas');
    expect(any.messages[2].chosen).toBe(false);
  });

  it('closes once every topic has been sent', () => {
    let t = openThread(ceremonyOnly, { includeDrafts: true });
    for (const id of ['price', 'officer', 'always']) t = pressReply(t, id);
    const last = t.messages[t.messages.length - 1];
    expect(last.replies).toEqual([]);
    expect(last.closing).toBe(true);
  });

  it('ignores a reply that is not on offer', () => {
    const t = openThread(gauteng, { includeDrafts: true });
    expect(pressReply(t, 'process')).toBe(t);
    expect(pressReply(t, 'nonsense')).toBe(t);
  });
});

describe('asking in words', () => {
  it('answers from the library, only with what holds for this situation', () => {
    const t = askThread(openThread(wc, { includeDrafts: true }), 'can we bring a photographer on a Saturday?');
    expect(t.messages[1]).toMatchObject({ from: 'you', title: 'can we bring a photographer on a Saturday?' });
    const ours = t.messages[2];
    expect(ours.answers.map(a => a.id)).toEqual(expect.arrayContaining(['specific-photos', 'specific-saturday']));
    // a permanent-resident answer does not hold for someone on a visa
    const pr = askThread(openThread(wc, { includeDrafts: true }), 'my partner is a permanent resident');
    expect(pr.messages[2].answers.map(a => a.id)).not.toContain('process-permanent-resident');
  });

  it('keeps the replies on offer when nothing matches, and says so', () => {
    const t = askThread(openThread(gauteng, { includeDrafts: true }), 'zzz qqq');
    const ours = t.messages[2];
    expect(ours.answers).toEqual([]);
    expect(ours.note).toMatch(/matched/);
    expect(ours.replies.map(r => r.id)).toEqual(['price', 'bring', 'home_affairs', 'officer', 'always']);
  });

  it('does nothing with blank text', () => {
    const t = openThread(gauteng, { includeDrafts: true });
    expect(askThread(t, '   ')).toBe(t);
  });
});
