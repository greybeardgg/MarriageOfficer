'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, applyAnswer, isComplete } from '@/src/situation/questions';
import type { Question } from '@/src/situation/questions';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { Perforation } from '@/components/brand/Action';
import { AskBox } from './AskBox';
import { BothSides } from './BothSides';
import { OptionList } from './OptionList';
import { Spine } from './Spine';

export function FrontDoor() {
  const router = useRouter();
  const [partial, setPartial] = useState<Partial<Situation>>({});
  const [pickingDate, setPickingDate] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [pressing, setPressing] = useState<string | null>(null);
  const pending = useRef<number | null>(null);
  const pressTimer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const visible = useMemo(() => QUESTIONS.filter(q => !q.skipWhen?.(partial)), [partial]);
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

  function back() {
    if (pending.current !== null) { window.clearTimeout(pending.current); pending.current = null; setChosen(null); }
    if (pickingDate) { setPickingDate(false); return; }
    if (!current) return;
    const idx = visible.findIndex(q => q.id === current.id);
    if (idx <= 0) return;
    rewindTo(visible[idx - 1].id);
  }

  useEffect(() => () => {
    if (pending.current !== null) window.clearTimeout(pending.current);
    if (pressTimer.current !== null) window.clearTimeout(pressTimer.current);
  }, []);

  useEffect(() => {
    if (!started.current) { started.current = current?.id !== 'service'; return; }
    headingRef.current?.focus({ preventScroll: true });
  }, [current?.id, pickingDate]);

  if (!current) return null;

  const step = visible.findIndex(q => q.id === current.id) + 1;

  const columns = current.choices.length > 5 ? 2 : 1;

  // On the front door the page's h1 is the headline, so the question sits under it.
  const QuestionHeading = step === 1 ? 'h2' : 'h1';

  const questionBlock = (
    <div key={current.id + (pickingDate ? '-date' : '')} className="leaf step-body">
      <QuestionHeading ref={headingRef} tabIndex={-1} className="question" style={{ outline: 'none', maxWidth: '18ch' }}>
        {current.prompt}
      </QuestionHeading>
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
          <OptionList choices={current.choices} chosen={chosen} columns={columns} onChoose={answer} />
        </div>
      )}
    </div>
  );

  /* ---------------------------------------- the front door: hero, then the quiz */
  if (step === 1) {
    return (
      <div className="shell door-shell">
        <div className="door-head">
          <h1 className="headline" style={{ maxWidth: '15ch' }}>
            Getting Married Is Two Different Jobs
          </h1>
          <p className="prose" style={{ fontSize: 'var(--fs-lg)', lineHeight: 1.55, maxWidth: '54ch' }}>
            By answering a few questions we will speak directly to your needs.
          </p>
        </div>

        <div className="door-tear">
          <Perforation label="Start Here" />
        </div>

        <div className="door-question">{questionBlock}</div>

        <Spine partial={partial} visible={visible} pressing={pressing} compact />

        <div className="door-ask">
          <AskBox onStart={() => headingRef.current?.scrollIntoView({ block: 'center' })} />
        </div>

        <div className="door-sides">
          <BothSides />
        </div>

        <p aria-live="polite" className="sr-only">
          Question {step} of {visible.length}. {current.prompt}
        </p>
      </div>
    );
  }

  /* ------------------------------------------------ one question, one screen */
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

        {questionBlock}

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
