'use client';

import { QUESTIONS, stampValue } from '@/src/situation/questions';
import type { Question } from '@/src/situation/questions';
import type { Situation } from '@/src/situation/types';
import { Stamp, StampSlot } from '@/components/brand/Stamp';
import type { Ink } from '@/components/brand/Stamp';

/** Ceremony answers stamp in teal, everything legal in oxblood, the state in violet. */
function inkFor(q: Question, partial: Partial<Situation>): Ink {
  if (q.id === 'nonSaStatus') return 'violet';
  if (q.id === 'service') return partial.service === 'registration' ? 'oxblood' : 'teal';
  return partial.service && partial.service !== 'registration' ? 'teal' : 'oxblood';
}

export function Spine({
  partial,
  visible,
  pressing,
  onReopen,
  compact = false,
}: {
  partial: Partial<Situation>;
  visible: Question[];
  pressing: string | null;
  onReopen?: (id: Question['id']) => void;
  /** The front door's channel: narrower slots, so the counters keep their scale. */
  compact?: boolean;
}) {
  return (
    <aside className={`spine${compact ? ' spine-compact' : ''}`} aria-label="Your answers so far">
      <p className="label spine-head">The Record</p>
      <ol className="spine-list">
        {visible.map((q, i) => {
          const value = stampValue(q.id, partial);
          return (
            <li key={q.id}>
              {value ? (
                <Stamp
                  label={q.stampLabel}
                  value={value}
                  seq={i + 1}
                  ink={inkFor(q, partial)}
                  pressing={pressing === q.id}
                  onClick={onReopen ? () => onReopen(q.id) : undefined}
                />
              ) : (
                <StampSlot label={q.stampLabel} seq={i + 1} />
              )}
            </li>
          );
        })}
      </ol>
      <p className="spine-foot data">
        {visible.filter(q => stampValue(q.id, partial)).length} of {visible.length} answered
      </p>
    </aside>
  );
}

/** Every answer, stamped, as the head of the finished document. */
export function StampRecord({ situation }: { situation: Situation }) {
  const visible = QUESTIONS.filter(q => !q.skipWhen?.(situation));
  return (
    <ol className="record">
      {visible.map((q, i) => {
        const value = stampValue(q.id, situation);
        if (!value) return null;
        return (
          <li key={q.id}>
            <Stamp label={q.stampLabel} value={value} seq={i + 1} ink={inkFor(q, situation)} size="sm" />
          </li>
        );
      })}
    </ol>
  );
}
