'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { QUESTIONS, applyAnswer, isComplete } from '@/src/situation/questions';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { AnswerRow } from './AnswerRow';
import { Ground } from './Ground';

export type Direction = 'quiet' | 'bleed' | 'split';

export function StepFlow({ direction = 'quiet' }: { direction?: Direction }) {
  const router = useRouter();
  const [partial, setPartial] = useState<Partial<Situation>>({});
  const [history, setHistory] = useState<Partial<Situation>[]>([]);
  const [pickingDate, setPickingDate] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const pending = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const visible = useMemo(() => QUESTIONS.filter(q => !(q.skipWhen?.(partial))), [partial]);
  const current = useMemo(
    () => visible.find(q => (partial as Record<string, unknown>)[q.id] === undefined),
    [visible, partial],
  );

  function commit(value: string) {
    if (!current) return;
    const next = applyAnswer(partial, current.id, value);
    setHistory(h => [...h, partial]);
    setPartial(next);
    setPickingDate(false);
    setSelected(null);
    if (isComplete(next)) router.push('/plan?' + encodeSituation(next).toString());
  }

  function answer(value: string, index: number) {
    if (!current) return;
    if (pending.current !== null) return;
    if (current.id === 'date' && value === 'pick') { setPickingDate(true); return; }
    setSelected(index);
    pending.current = window.setTimeout(() => { pending.current = null; commit(value); }, 160);
  }

  function back() {
    if (pending.current !== null) { window.clearTimeout(pending.current); pending.current = null; setSelected(null); }
    if (pickingDate) { setPickingDate(false); return; }
    const prev = history[history.length - 1];
    if (!prev) return;
    setHistory(h => h.slice(0, -1));
    setPartial(prev);
    setSelected(null);
  }

  useEffect(() => () => { if (pending.current !== null) window.clearTimeout(pending.current); }, []);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id, pickingDate]);

  if (!current) return null;
  const stepIndex = visible.findIndex(q => q.id === current.id);
  const stepCount = visible.length;
  const inverse = direction === 'bleed';
  const ink = inverse ? 'var(--white)' : 'var(--text-heading)';
  const sub = inverse ? 'rgba(255,255,255,.65)' : 'var(--text-muted)';

  const body = (
    <MotionConfig reducedMotion="user">
    <section className="mx-auto w-full max-w-2xl px-6 py-12" style={{ display: 'grid', gap: 'var(--space-7)', justifyItems: direction === 'split' ? 'start' : 'center', textAlign: direction === 'split' ? 'left' : 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', justifyContent: direction === 'split' ? 'flex-start' : 'center', width: '100%' }}>
        <button type="button" onClick={back} disabled={!history.length && !pickingDate} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-3xs)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', color: sub, opacity: !history.length && !pickingDate ? 0.3 : 1 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div className="rule-progress" style={inverse ? { background: 'rgba(255,255,255,.3)' } : undefined}><i style={{ width: Math.round(((stepIndex + 1) / stepCount) * 100) + '%', background: inverse ? 'var(--aqua-300)' : undefined }} /></div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-3xs)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', color: sub }}>Question {stepIndex + 1} of {stepCount}</span>
        </div>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + (pickingDate ? '-date' : '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: '100%', display: 'grid', gap: 'var(--space-6)', justifyItems: direction === 'split' ? 'start' : 'center' }}
          >
            <div style={{ display: 'grid', gap: 'var(--space-4)', justifyItems: direction === 'split' ? 'start' : 'center' }}>
              <Eyebrow tone={inverse ? 'inverse' : 'accent'}>{current.eyebrow}</Eyebrow>
              <h2 ref={headingRef} tabIndex={-1} style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-thin)', fontSize: 'clamp(var(--fs-2xl), 5vw, var(--fs-4xl))', letterSpacing: '0.06em', lineHeight: 1.15, color: ink, outline: 'none' }}>{current.prompt}</h2>
            </div>
            {pickingDate ? (
              <form style={{ display: 'flex', gap: 'var(--space-3)', width: '100%', maxWidth: 620 }}
                onSubmit={e => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem('d') as HTMLInputElement).value; if (v) commit(v); }}>
                <input name="d" type="date" required className="field" aria-label="Your date" />
                <button type="submit" className="btn btn-primary btn-md">Next</button>
              </form>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--space-3)', width: '100%', maxWidth: 620 }}>
                {current.choices.map((c, i) => (
                  <AnswerRow key={c.value} index={i} label={c.label} hint={c.hint} selected={selected === i} onClick={() => answer(c.value, i)} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
    </MotionConfig>
  );

  if (direction === 'bleed') return <Ground minHeight="70vh"><div style={{ display: 'grid', alignItems: 'center', minHeight: '70vh' }}>{body}</div></Ground>;
  if (direction === 'split') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.15fr)' }} className="max-md:grid-cols-1!">
        <Ground minHeight={320} />
        <div style={{ background: 'var(--surface-page)', display: 'grid', alignItems: 'center' }}>{body}</div>
      </div>
    );
  }
  return body;
}
