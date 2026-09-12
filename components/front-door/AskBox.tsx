'use client';

import { useMemo, useRef, useState } from 'react';
import { askAnswers } from '@/src/answers/ask';
import { Clause } from '@/components/plan/Clause';
import { Perforation } from '@/components/brand/Action';

const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';

/**
 * The other way in. Whatever someone types is matched against the answer
 * library and answered on the spot, before a single question is asked and
 * without asking who they are.
 *
 * What comes back is honestly partial: the library knows what a visa or a
 * decree means, but the price, the process and the officer all depend on
 * answers we do not have yet, so anything conditional says what it still
 * depends on rather than pretending to be settled.
 */
export function AskBox({ onStart }: { onStart?: () => void }) {
  const [text, setText] = useState('');
  const [asked, setAsked] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => (asked ? askAnswers(asked, { includeDrafts: SHOW_DRAFTS }) : []), [asked]);
  const settled = results.filter(r => !r.dependsOn.length);
  const conditional = results.filter(r => r.dependsOn.length);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = text.trim();
    setAsked(v);
    if (v) window.setTimeout(() => resultsRef.current?.focus({ preventScroll: true }), 0);
  }

  return (
    <section className="ask-door" aria-label="Ask us directly">
      <Perforation label="Or Tell Us" />

      <form className="ask-form" onSubmit={submit}>
        <label className="question ask-door-head" htmlFor="ask">
          Or tell us your needs in the chat box below
        </label>
        <p className="prose ask-door-note">
          Write it however you like. We will answer what we can straight away, before you have
          answered anything and without knowing who you are.
        </p>
        <textarea
          id="ask"
          className="field"
          rows={3}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="My fiancé is Zimbabwean and on a work visa, and I was divorced two years ago."
        />
        <div>
          <button type="submit" className="act act-ink">Answer Me</button>
        </div>
      </form>

      <div ref={resultsRef} tabIndex={-1} aria-live="polite" style={{ outline: 'none' }}>
        {asked && !results.length ? (
          <div className="ask-empty">
            <p className="prose">
              Nothing in our answer library matched those words yet. That does not mean there is no
              answer: it means the questions will find it faster than the box will.
            </p>
            {onStart ? (
              <button type="button" className="act act-ruled" onClick={onStart}>Answer The Questions</button>
            ) : null}
          </div>
        ) : null}

        {results.length ? (
          <div className="ask-results">
            {settled.length ? (
              <section aria-labelledby="ask-settled">
                <div className="part-head">
                  <h3 id="ask-settled" className="plate part-title">This much we can tell you now</h3>
                  <span className="data part-count">
                    {String(settled.length).padStart(2, '0')} {settled.length === 1 ? 'answer' : 'answers'}
                  </span>
                </div>
                <ol className="clauses">
                  {settled.map((r, i) => <Clause key={r.answer.id} a={r.answer} seq={i + 1} />)}
                </ol>
              </section>
            ) : null}

            {conditional.length ? (
              <section aria-labelledby="ask-conditional" className="ask-conditional">
                <div className="part-head">
                  <h3 id="ask-conditional" className="plate part-title">
                    {settled.length ? 'And this much depends on you' : 'This much depends on your answers'}
                  </h3>
                  <span className="data part-count">
                    {String(conditional.length).padStart(2, '0')} {conditional.length === 1 ? 'answer' : 'answers'}
                  </span>
                </div>
                <ol className="clauses">
                  {conditional.map((r, i) => (
                    <Clause
                      key={r.answer.id}
                      a={r.answer}
                      seq={settled.length + i + 1}
                      note={`Whether this applies to you depends on ${listOf(r.dependsOn)}.`}
                    />
                  ))}
                </ol>
              </section>
            ) : null}

            <div className="ask-close">
              <p className="prose">
                That is everything your words alone can settle. The questions add your process, your
                price, what to bring and who you will meet, and they take about a minute.
              </p>
              {onStart ? (
                <button type="button" className="act act-ink" onClick={onStart}>Answer The Questions</button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function listOf(items: string[]): string {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
}
