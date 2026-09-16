'use client';

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { askThread, openThread, pressReply } from '@/src/chat/thread';
import type { Message, Thread } from '@/src/chat/thread';
import { renderBody } from '@/src/answers/render';
import { whereIs } from '@/src/officers/officers';
import type { Situation } from '@/src/situation/types';

/** Amounts are measurements: they set in tabular figures, beside the prose. */
function measured(text: string) {
  return text.split(/(R[\d ]+)/g).map((p, i) =>
    /^R[\d ]+$/.test(p) ? <span key={i} className="data amount">{p}</span> : <span key={i}>{p}</span>,
  );
}

/**
 * The conversation on the plan page. Our messages are blocks from the answer
 * library with the next questions as buttons under them; theirs are the
 * button they pressed or the words they typed. Nothing here is generated.
 */
export function Chat({ situation, includeDrafts, opening }: { situation: Situation; includeDrafts: boolean; opening?: string }) {
  const [thread, setThread] = useState<Thread>(() => {
    const t = openThread(situation, { includeDrafts });
    return opening ? askThread(t, opening) : t;
  });
  const [text, setText] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLElement>(null);
  const armed = useRef(false);
  const last = thread.messages[thread.messages.length - 1];
  const liveReplies = useMemo(() => last.replies, [last]);

  // Each new message of ours is brought into view and takes focus, so a
  // keyboard reads the answer before the buttons under it.
  useEffect(() => {
    if (!armed.current) { armed.current = true; return; }
    lastRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    lastRef.current?.focus({ preventScroll: true });
  }, [thread.messages.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setThread(t => askThread(t, v));
    setText('');
  }

  return (
    <section className="chat" aria-label="Your plan, as a conversation">
      <div ref={logRef} className="chat-log" role="log" aria-live="polite">
        {thread.messages.map((m, i) => (
          <Bubble key={m.id} m={m} ref={i === thread.messages.length - 1 ? lastRef : undefined} />
        ))}
        {liveReplies.length ? (
          <div className="chat-replies" aria-label="What to ask next">
            {liveReplies.map(r => (
              <button key={r.id} type="button" className="chat-reply" onClick={() => setThread(t => pressReply(t, r.id))}>
                {r.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <form className="chat-ask" onSubmit={submit}>
        <label className="sr-only" htmlFor="chat-text">Ask anything else</label>
        <input
          id="chat-text"
          className="field chat-field"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ask anything else, in your own words…"
          autoComplete="off"
        />
        <button type="submit" className="act act-ink">Ask</button>
      </form>
    </section>
  );
}


const Bubble = forwardRef<HTMLElement, { m: Message }>(function Bubble({ m }, ref) {
  if (m.from === 'you') {
    return (
      <article className="msg msg-you" aria-label="You">
        <p className="msg-you-text">{m.title}</p>
      </article>
    );
  }
  return (
    <article ref={ref} tabIndex={-1} className="msg msg-us leaf" aria-label="Marriage Officers">
      <p className="label msg-title">{m.title}</p>
      {m.officer !== undefined ? (
        <div className="msg-officer">
          {m.officer ? (
            <>
              <p className="officer-name">{m.officer.name}</p>
              <p className="data officer-where">{whereIs(m.officer)}</p>
              <p className="label officer-how">{m.chosen ? 'Your choice' : 'Nearest to you'}</p>
              <p className="prose msg-text">You will deal with {m.officer.name.split(' ')[0]} from your first message to the day itself.</p>
            </>
          ) : (
            <p className="prose msg-text">We will name your officer when you book, and you will deal with that one person from then on.</p>
          )}
        </div>
      ) : null}
      {m.answers.map(a => (
        <div key={a.id} className="msg-answer">
          <h3 className="clause-head msg-q">
            {a.question}
            {a.status === 'draft' ? <span className="draft">Draft</span> : null}
          </h3>
          <p className="prose msg-text">{measured(renderBody(a.body))}</p>
        </div>
      ))}
      {m.note ? <p className="prose msg-text msg-note">{m.note}</p> : null}
      {m.closing ? <p className="prose msg-text msg-note">That is the whole of it. When you are ready, Book This is beside your record.</p> : null}
    </article>
  );
});
