'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, applyAnswer, choicesOf, isComplete, visibleQuestions } from '@/src/situation/questions';
import type { Question } from '@/src/situation/questions';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { Perforation } from '@/components/brand/Action';
import { AskBox } from './AskBox';
import { Banner } from './Banner';
import { BothSides } from './BothSides';
import { OptionList } from './OptionList';
import { Spine } from './Spine';

/**
 * The front door: the banner, Ryan's introduction, then two ways in. The
 * Quiz starts on Start The Quiz and takes over the page one question at a
 * time; the box answers on the spot without starting anything.
 */
export function FrontDoor({ autostart = false }: { autostart?: boolean }) {
  const router = useRouter();
  const [started, setStarted] = useState(autostart);
  const [partial, setPartial] = useState<Partial<Situation>>({});
  const [pickingDate, setPickingDate] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [pressing, setPressing] = useState<string | null>(null);
  const pending = useRef<number | null>(null);
  const pressTimer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const armed = useRef(false);

  const visible = useMemo(() => visibleQuestions(partial), [partial]);
  const current = useMemo(
    () => visible.find(q => (partial as Record<string, unknown>)[q.id] === undefined),
    [visible, partial],
  );

  const commit = useCallback(
    (id: Question['id'], value: string) => {
      const next = applyAnswer(partial, id, value);
      setPartial(next);
      setPickingDate(false);
      setChosen(null);
      setPressing(id);
      if (pressTimer.current !== null) window.clearTimeout(pressTimer.current);
      pressTimer.current = window.setTimeout(() => setPressing(null), 420);
      if (isComplete(next)) router.push('/plan?' + encodeSituation(next).toString());
    },
    [partial, router],
  );

  function answer(value: string, index: number) {
    if (!current || pending.current !== null) return;
    if (current.id === 'date' && value === 'pick') { setPickingDate(true); return; }
    setChosen(index);
    pending.current = window.setTimeout(() => { pending.current = null; commit(current.id, value); }, 150);
  }

  /** Drop this answer and everything after it, so the visitor lands back on that question. */
  function rewindTo(id: Question['id']) {
    const order = QUESTIONS.map(q => q.id);
    const cut = order.indexOf(id);
    const next: Partial<Situation> = {};
    for (const key of order.slice(0, cut)) {
      const v = (partial as Record<string, unknown>)[key];
      if (v !== undefined) (next as Record<string, unknown>)[key] = v;
    }
    setPartial(next);
    setPickingDate(false);
    setChosen(null);
  }

  function start() {
    setStarted(true);
    window.scrollTo({ top: 0 });
  }

  function back() {
    if (pending.current !== null) { window.clearTimeout(pending.current); pending.current = null; setChosen(null); }
    if (pickingDate) { setPickingDate(false); return; }
    if (!current) return;
    const idx = visible.findIndex(q => q.id === current.id);
    if (idx <= 0) {
      // Back off the first question returns to the door, answers intact.
      setStarted(false);
      window.setTimeout(() => startRef.current?.focus({ preventScroll: true }), 0);
      return;
    }
    rewindTo(visible[idx - 1].id);
  }

  useEffect(() => () => {
    if (pending.current !== null) window.clearTimeout(pending.current);
    if (pressTimer.current !== null) window.clearTimeout(pressTimer.current);
  }, []);

  useEffect(() => {
    if (!started) { armed.current = false; return; }
    if (!armed.current && !autostart) { armed.current = true; }
    headingRef.current?.focus({ preventScroll: true });
  }, [started, current?.id, pickingDate, autostart]);

  /* ------------------------------------------------------------ the door */
  if (!started) {
    return (
      <>
        <Banner />
        <div className="shell door">
          <section className="door-intro" aria-labelledby="door-head">
            <h2 id="door-head" className="question door-headline">
              Getting Married Is Two Different Jobs
            </h2>
            <div className="door-copy">
              <p className="prose">
                Whether you simply need to be legally married, have a simple wedding at home or want a
                dynamic officiant for your grand wedding as we look ahead, we have the experience and
                professionalism to make it happen.
              </p>
              <p className="prose">
                We are a small team of people who share an ethos of creating unforgettable personal
                ceremonies delivered professionally, coupled with the legal registration of your marriage
                at Home Affairs. With 25 years of experience we can help, whatever your need.
              </p>
            </div>
          </section>

          <Perforation label="Two Ways In" />

          <div className="door-ways">
            <section className="door-start" aria-labelledby="start-head">
              <h3 id="start-head" className="question door-way-head">
                To ensure you get the information tailored to you, let us know a few things about your plans.
              </h3>
              <p className="prose door-way-note">
                A few questions, about a minute. Your process, your price and your paperwork come back
                before we ask who you are. Nothing is booked.
              </p>
              <div>
                <button ref={startRef} type="button" className="act act-ink" onClick={start}>Start The Quiz</button>
              </div>
            </section>
            <AskBox onStart={start} />
          </div>

          <div className="door-sides">
            <BothSides />
          </div>
        </div>
      </>
    );
  }

  /* ------------------------------------------------ one question, one screen */
  if (!current) return null;

  const step = visible.findIndex(q => q.id === current.id) + 1;
  const choices = choicesOf(current, partial);
  const columns = choices.length > 5 ? 2 : 1;

  return (
    <div className="shell step-shell">
      <div className="step-main">
        <div className="step-bar">
          <button type="button" className="act-quiet" onClick={back}>
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back
          </button>
          <span className="data step-count">
            {String(step).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
          </span>
        </div>

        <div key={current.id + (pickingDate ? '-date' : '')} className="leaf step-body">
          <h1 ref={headingRef} tabIndex={-1} className="question" style={{ outline: 'none', maxWidth: '18ch' }}>
            {current.prompt}
          </h1>
          {current.note ? <p className="prose step-note">{current.note}</p> : null}

          {pickingDate ? (
            <form
              className="step-date"
              onSubmit={e => {
                e.preventDefault();
                const v = (e.currentTarget.elements.namedItem('d') as HTMLInputElement).value;
                if (v) commit('date', v);
              }}
            >
              <label className="label" htmlFor="chosen-date" style={{ color: 'var(--carbon-soft)' }}>The date you have in mind</label>
              <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
                <input id="chosen-date" name="d" type="date" required className="field" style={{ maxWidth: 260 }} />
                <button type="submit" className="act act-ink">Next</button>
              </div>
            </form>
          ) : (
            <div className={columns === 2 ? 'answers answers-wide' : 'answers'}>
              <OptionList choices={choices} chosen={chosen} columns={columns} onChoose={answer} />
            </div>
          )}
        </div>

        <div className="step-foot">
          <Perforation label={current.stampLabel} />
        </div>
      </div>

      <Spine partial={partial} visible={visible} pressing={pressing} onReopen={rewindTo} />

      <p aria-live="polite" className="sr-only">
        Question {step} of {visible.length}. {current.prompt}
      </p>
    </div>
  );
}
