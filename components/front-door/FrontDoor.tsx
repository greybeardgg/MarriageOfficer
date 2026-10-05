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
import { DateDialog } from './DateDialog';
import { OptionList } from './OptionList';
import { Spine } from './Spine';

/**
 * The front door: the banner, Ryan's introduction, then question one beside
 * the box that answers. The first answer takes the page over, one question
 * per screen; Back off question two lands on the door again. The date opens in
 * a dialog over its question (Cameron, 14 September 2026). On a content page
 * (`inPage`) the quiz starts where the visitor is, with no door, and Back off
 * question one hands the page back (Ryan, 1 October 2026).
 */
export function FrontDoor({
  autostart = false,
  inPage = false,
  onLeave,
}: {
  autostart?: boolean;
  /** Running on a content page: no door, question one is a screen of its own, and Back off it leaves the quiz. */
  inPage?: boolean;
  onLeave?: () => void;
}) {
  const router = useRouter();
  const [partial, setPartial] = useState<Partial<Situation>>({});
  const [pickingDate, setPickingDate] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [pressing, setPressing] = useState<string | null>(null);
  const pending = useRef<number | null>(null);
  const pressTimer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
      else window.scrollTo({ top: 0 });
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

  function goToQuestion() {
    headingRef.current?.scrollIntoView({ block: 'center' });
    headingRef.current?.focus({ preventScroll: true });
  }

  function back() {
    if (pending.current !== null) { window.clearTimeout(pending.current); pending.current = null; setChosen(null); }
    if (pickingDate) { setPickingDate(false); return; }
    if (!current) return;
    const idx = visible.findIndex(q => q.id === current.id);
    if (idx <= 0) { onLeave?.(); return; }
    rewindTo(visible[idx - 1].id);
  }

  useEffect(() => () => {
    if (pending.current !== null) window.clearTimeout(pending.current);
    if (pressTimer.current !== null) window.clearTimeout(pressTimer.current);
  }, []);

  // Question one is on the door, so the page does not steal focus on arrival;
  // from the second question on, each new question takes it.
  useEffect(() => {
    if (!armed.current) {
      armed.current = true;
      if (autostart) goToQuestion();
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [current?.id, autostart]);

  if (!current) return null;

  const step = visible.findIndex(q => q.id === current.id) + 1;
  const onDoor = step === 1 && !inPage;
  const choices = choicesOf(current, partial);

  /* ------------------------------------------------------------ the door */
  if (onDoor) {
    return (
      <>
        <Banner />
        <div className="shell door">
          <section className="door-intro" aria-label="Who we are">
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
          </section>

          <div className="door-ways">
            <section className="door-question" aria-labelledby="door-q">
              <p className="prose door-way-lead">
                To ensure you get the information tailored to you, let us know a few things about your plans.
              </p>
              <div key={current.id} className="leaf">
                <h2 id="door-q" ref={headingRef} tabIndex={-1} className="question door-q" style={{ outline: 'none' }}>
                  {current.prompt}
                </h2>
                {current.note ? <p className="prose step-note">{current.note}</p> : null}
                {/* Nine provinces fit a compact three-by-three grid; any other question one keeps its hints. */}
                {current.id === 'province' ? (
                  <div className="answers answers-grid">
                    <OptionList choices={choices} chosen={chosen} columns={3} compact onChoose={answer} />
                  </div>
                ) : (
                  <div className="answers door-answers">
                    <OptionList choices={choices} chosen={chosen} onChoose={answer} />
                  </div>
                )}
              </div>
            </section>
            <AskBox onStart={goToQuestion} />
          </div>

          {/* Same-sex marriage is a statement, never a separate flow: every officer is a Civil Union officer. */}
          <p id="every-couple" className="sides-every">
            <span className="label">Every couple.</span>{' '}
            Every one of our officers is a Civil Union marriage officer, which means we marry every
            couple, same-sex or not. Many officers will not; we always have.
          </p>

          <p aria-live="polite" className="sr-only">
            Question {step} of {visible.length}. {current.prompt}
          </p>
        </div>
      </>
    );
  }

  /* ------------------------------------------------ one question, one screen */
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

        <div key={current.id} className="leaf step-body">
          <h1 ref={headingRef} tabIndex={-1} className="question" style={{ outline: 'none', maxWidth: '18ch' }}>
            {current.prompt}
          </h1>
          {current.note ? <p className="prose step-note">{current.note}</p> : null}

          <div className={columns === 2 ? 'answers answers-wide' : 'answers'}>
            <OptionList choices={choices} chosen={chosen} columns={columns} onChoose={answer} />
          </div>
        </div>

        <div className="step-foot">
          <Perforation label={current.stampLabel} />
        </div>
      </div>

      <Spine partial={partial} visible={visible} pressing={pressing} onReopen={rewindTo} />

      <DateDialog open={pickingDate} onPick={iso => commit('date', iso)} onClose={() => setPickingDate(false)} />

      <p aria-live="polite" className="sr-only">
        Question {step} of {visible.length}. {current.prompt}
      </p>
    </div>
  );
}
