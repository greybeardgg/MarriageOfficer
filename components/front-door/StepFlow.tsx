'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { QUESTIONS, applyAnswer, isComplete } from '@/src/situation/questions';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { ChoiceButton } from './ChoiceButton';

export function StepFlow() {
  const router = useRouter();
  const [partial, setPartial] = useState<Partial<Situation>>({});
  const [history, setHistory] = useState<Partial<Situation>[]>([]);
  const [pickingDate, setPickingDate] = useState(false);

  const current = useMemo(
    () => QUESTIONS.find(q => (partial as Record<string, unknown>)[q.id] === undefined && !(q.skipWhen?.(partial))),
    [partial],
  );

  function answer(value: string) {
    if (!current) return;
    if (current.id === 'date' && value === 'pick') { setPickingDate(true); return; }
    const next = applyAnswer(partial, current.id, value);
    setHistory(h => [...h, partial]);
    setPartial(next);
    setPickingDate(false);
    if (isComplete(next)) router.push('/plan?' + encodeSituation(next).toString());
  }

  function back() {
    if (pickingDate) { setPickingDate(false); return; }
    const prev = history[history.length - 1];
    if (!prev) return;
    setHistory(h => h.slice(0, -1));
    setPartial(prev);
  }

  if (!current) return null;
  const stepIndex = QUESTIONS.filter(q => !(q.skipWhen?.(partial))).findIndex(q => q.id === current.id);
  const stepCount = QUESTIONS.filter(q => !(q.skipWhen?.(partial))).length;

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10" aria-live="polite">
      <div className="mb-6 flex items-center justify-between text-sm text-neutral-500">
        <button type="button" onClick={back} disabled={!history.length} className="disabled:opacity-30">← Back</button>
        <span>{stepIndex + 1} of {stepCount}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + (pickingDate ? '-date' : '')}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight">{current.prompt}</h2>
          {pickingDate ? (
            <form
              className="flex gap-3"
              onSubmit={e => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem('d') as HTMLInputElement).value; if (v) answer(v); }}
            >
              <input name="d" type="date" required className="flex-1 rounded-2xl border px-4 py-4 text-lg" />
              <button type="submit" className="rounded-2xl bg-[var(--accent)] px-6 text-white">Next</button>
            </form>
          ) : (
            <div className="grid gap-3">
              {current.choices.map(c => (
                <ChoiceButton key={c.value} label={c.label} hint={c.hint} onClick={() => answer(c.value)} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
