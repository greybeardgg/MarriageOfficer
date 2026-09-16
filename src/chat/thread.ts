import { ANSWERS } from '../answers/library';
import { SECTION_TITLE, matches } from '../answers/select';
import { triggeredAnswers } from '../answers/triggers';
import type { Answer, Section } from '../answers/types';
import { assignOfficer, wasChosen } from '../officers/assign';
import type { Officer } from '../officers/officers';
import type { Situation } from '../situation/types';

/**
 * The conversation on the plan page, shaped like the WhatsApp flow the
 * business already runs (fixtures/whatsapp-flows-2026-09-10.json): we send a
 * message, the visitor presses a button or types, a router picks the next
 * message by button id or keyword, and a message already sent is not sent
 * again. No model anywhere: every message is a block from the answer library.
 */

/** What can be pressed. The library's sections in their order, plus the officer. */
export type Topic = Exclude<Section, 'specific'> | 'officer';

export const TOPIC_ORDER: Topic[] = ['process', 'price', 'bring', 'home_affairs', 'officer', 'always'];

export const TOPIC_LABEL: Record<Topic, string> = {
  process: 'How does it work?',
  price: 'What does it cost?',
  bring: 'What do we bring?',
  home_affairs: 'Where does Home Affairs fit?',
  officer: 'Who will we meet?',
  always: 'Anything else to know?',
};

export const TOPIC_TITLE: Record<Topic, string> = {
  process: SECTION_TITLE.process,
  price: SECTION_TITLE.price,
  bring: SECTION_TITLE.bring,
  home_affairs: SECTION_TITLE.home_affairs,
  officer: 'Who you will meet',
  always: SECTION_TITLE.always,
};

export interface Reply { id: Topic; label: string }

export interface Message {
  id: string;
  from: 'us' | 'you';
  /** Ours: the topic's title. Theirs: the words they pressed or typed. */
  title: string;
  topic?: Topic;
  answers: Answer[];
  officer?: Officer | null;
  chosen?: boolean;
  /** One honest line when the library has nothing for the words typed. */
  note?: string;
  /** True on the message that sends the last topic. */
  closing?: boolean;
  replies: Reply[];
}

export interface Thread {
  situation: Situation;
  includeDrafts: boolean;
  sent: Topic[];
  messages: Message[];
}

const NO_MATCH = 'Nothing in our answer library matched those words yet. Ask it another way, or press one of the buttons; everything we know about your situation is behind them.';

function answersFor(t: Thread, topic: Topic): Answer[] {
  if (topic === 'officer') return [];
  return ANSWERS
    .filter(a => a.section === topic && (t.includeDrafts || a.status === 'live') && matches(a, t.situation))
    .sort((a, b) => a.order - b.order);
}

/** A topic is offered only when it has something to say for this situation. */
function hasSomething(t: Thread, topic: Topic): boolean {
  return topic === 'officer' || answersFor(t, topic).length > 0;
}

function repliesFor(t: Thread): Reply[] {
  return TOPIC_ORDER
    .filter(topic => !t.sent.includes(topic) && hasSomething(t, topic))
    .map(topic => ({ id: topic, label: TOPIC_LABEL[topic] }));
}

function ours(t: Thread, topic: Topic): Message {
  const replies = repliesFor(t);
  const m: Message = {
    id: `${t.messages.length + 1}-${topic}`,
    from: 'us',
    title: TOPIC_TITLE[topic],
    topic,
    answers: answersFor(t, topic),
    replies,
    closing: replies.length === 0,
  };
  if (topic === 'officer') {
    const officer = assignOfficer(t.situation);
    m.officer = officer;
    m.chosen = wasChosen(t.situation, officer);
  }
  return m;
}

function theirs(t: Thread, words: string): Message {
  return { id: `${t.messages.length + 1}-you`, from: 'you', title: words, answers: [], replies: [] };
}

export function openThread(situation: Situation, opts: { includeDrafts?: boolean } = {}): Thread {
  const t: Thread = { situation, includeDrafts: !!opts.includeDrafts, sent: ['process'], messages: [] };
  t.messages = [ours(t, 'process')];
  return t;
}

/** The visitor presses a button under our last message. */
export function pressReply(t: Thread, id: string): Thread {
  const last = t.messages[t.messages.length - 1];
  const reply = last?.replies.find(r => r.id === id);
  if (!reply) return t;
  const next: Thread = { ...t, sent: [...t.sent, reply.id], messages: [...t.messages, theirs(t, reply.label)] };
  next.messages = [...next.messages, ours(next, reply.id)];
  return next;
}

/** The visitor types. Keywords against the library, checked against what we know of them. */
export function askThread(t: Thread, text: string): Thread {
  const words = text.trim();
  if (!words) return t;
  const hits = triggeredAnswers(words).filter(a => (t.includeDrafts || a.status === 'live') && matches(a, t.situation));
  const next: Thread = { ...t, messages: [...t.messages, theirs(t, words)] };
  const replies = repliesFor(next);
  next.messages = [
    ...next.messages,
    {
      id: `${next.messages.length + 1}-asked`,
      from: 'us',
      title: hits.length ? 'About what you asked' : 'Not in the book yet',
      answers: hits,
      note: hits.length ? undefined : NO_MATCH,
      replies,
    },
  ];
  return next;
}
