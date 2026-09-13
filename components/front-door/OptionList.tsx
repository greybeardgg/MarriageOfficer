'use client';

import type { Choice } from '@/src/situation/questions';

const LETTERS = 'ABCDEFGHIJKLMNOP';

export function OptionList({
  choices,
  chosen,
  columns = 1,
  compact = false,
  onChoose,
}: {
  choices: Choice[];
  chosen: number | null;
  columns?: 1 | 2 | 3;
  /** Tighter rows for a long list of short answers: the nine provinces on the door. */
  compact?: boolean;
  onChoose: (value: string, index: number) => void;
}) {
  const template =
    columns === 3 ? 'repeat(3, minmax(0, 1fr))'
    : columns === 2 ? 'repeat(auto-fit, minmax(280px, 1fr))'
    : '1fr';
  return (
    <ul
      className={compact ? 'opts opts-compact' : 'opts'}
      style={{
        display: 'grid',
        gridTemplateColumns: template,
        columnGap: compact ? 'var(--s-5)' : 'var(--s-7)',
        alignContent: 'start',
      }}
    >
      {choices.map((c, i) => (
        <li key={c.value} style={{ display: 'grid' }}>
          <button
            type="button"
            className={`opt${chosen === i ? ' is-chosen' : ''}`}
            onClick={() => onChoose(c.value, i)}
          >
            <span className="box" aria-hidden="true">{LETTERS[i]}</span>
            <span className="opt-text" style={{ minWidth: 0 }}>
              <span className="opt-label">{c.label}</span>
              {c.hint && !compact ? <span className="opt-hint">{c.hint}</span> : null}
            </span>
            <svg
              className="tick"
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
