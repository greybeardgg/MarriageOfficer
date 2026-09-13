/** Which side of the work an answer belongs to. Each ink is a palette colour with a role. */
export type Ink = 'legal' | 'ceremony' | 'state';

const INK: Record<Ink, { solid: string; pale: string }> = {
  legal: { solid: 'var(--ink-legal)', pale: 'var(--ink-legal-pale)' },
  ceremony: { solid: 'var(--ink-ceremony)', pale: 'var(--ink-ceremony-pale)' },
  state: { solid: 'var(--ink-state)', pale: 'var(--ink-state-pale)' },
};

/** Deterministic, so a stamp does not jump between renders. */
const TILT = [-2.1, 1.4, -1.2, 2.2, -1.7, 0.9, -2.6, 1.8];

const PAD: Record<'sm' | 'md' | 'lg', string> = {
  sm: '9px 12px 8px',
  md: '12px 15px 10px',
  lg: '16px 22px 14px',
};

const VALUE_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'var(--fs-sm)',
  md: 'var(--fs-lg)',
  lg: 'var(--fs-xl)',
};

export function Stamp({
  label,
  value,
  seq,
  ink = 'legal',
  pressing = false,
  onClick,
  size = 'md',
  note,
  tilt: tiltProp,
  tone = 'solid',
}: {
  label: string;
  value: string;
  seq?: number;
  ink?: Ink;
  pressing?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  /** Replaces the sequence line; null drops it entirely. */
  note?: string | null;
  tilt?: number;
  /** "pale" prints the impression in the field's light ink, for stamping onto an ink ground. */
  tone?: 'solid' | 'pale';
}) {
  const c = INK[ink];
  const colour = tone === 'pale' ? c.pale : c.solid;
  // The border, label and foot take the ink; the value itself stays in the
  // heading ink on paper so the lighter ceremony aqua never carries reading text.
  const valueColour = tone === 'pale' ? colour : 'var(--carbon)';
  const tilt = tiltProp ?? TILT[((seq ?? 1) - 1) % TILT.length];
  const foot = note === undefined ? `Answered · No.${String(seq ?? 1).padStart(2, '0')}` : note;

  const face = (
    <span
      className={`impression${tone === 'pale' ? ' impression-pale' : ''}${pressing ? ' is-pressing' : ''}`}
      style={
        {
          '--tilt': `${tilt}deg`,
          display: 'block',
          transform: `rotate(${tilt}deg)`,
          border: `1.5px solid ${colour}`,
          outline: `1px solid ${colour}`,
          outlineOffset: 3,
          padding: PAD[size],
          color: colour,
          background: 'transparent',
        } as React.CSSProperties
      }
    >
      <span className="label" style={{ display: 'block', fontSize: '.625rem', letterSpacing: '.18em' }}>
        {label}
      </span>
      <span
        className="plate"
        style={{ display: 'block', marginTop: 4, fontSize: VALUE_SIZE[size], fontWeight: 500, lineHeight: 1.16, letterSpacing: '.04em', color: valueColour }}
      >
        {value}
      </span>
      {foot ? (
        <span style={{ display: 'block', marginTop: 11, paddingTop: 6, borderTop: `1px solid ${colour}`, opacity: 0.92 }}>
          <span className="data" style={{ fontSize: '.5625rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            {foot}
          </span>
        </span>
      ) : null}
    </span>
  );

  if (!onClick) return face;

  return (
    <button
      type="button"
      onClick={onClick}
      title={`Change your answer: ${label}`}
      style={{ display: 'block', background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left', width: '100%' }}
    >
      {face}
      <span className="sr-only">Change your answer for {label}, currently {value}</span>
    </button>
  );
}

/** A question not yet answered: ruled and waiting. */
export function StampSlot({ label, seq }: { label: string; seq: number }) {
  return (
    <span
      style={{
        display: 'block',
        border: '1px dashed var(--rule-strong)',
        padding: '12px 15px 10px',
        color: 'var(--carbon-soft)',
        opacity: 0.9,
      }}
    >
      <span className="label" style={{ display: 'block', fontSize: '.625rem', letterSpacing: '.18em' }}>
        {label}
      </span>
      <span className="data" style={{ display: 'block', marginTop: 6, fontSize: '.5625rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
        Awaiting · No.{String(seq).padStart(2, '0')}
      </span>
    </span>
  );
}
