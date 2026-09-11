'use client';

export function AnswerRow({ index, label, hint, selected, onClick }: { index: number; label: string; hint?: string; selected?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`answer-row${selected ? ' is-selected' : ''}`}>
      <span className="n">{String(index + 1).padStart(2, '0')}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="label">{label}</span>
        {hint ? <span className="hint">{hint}</span> : null}
      </span>
      <svg className="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </button>
  );
}
