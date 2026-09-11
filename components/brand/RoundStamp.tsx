import type { Ink } from './Stamp';

const INK: Record<Ink, { solid: string; pale: string }> = {
  oxblood: { solid: 'var(--oxblood)', pale: 'var(--oxblood-pale)' },
  teal: { solid: 'var(--teal)', pale: 'var(--teal-pale)' },
  violet: { solid: 'var(--violet)', pale: 'var(--violet-pale)' },
};

/**
 * The officer's own round stamp, the way a real one is cut: two rings, the
 * officer's name curved around the inside, the word struck across the middle.
 * It carries no coat of arms and no designation number, because this is a
 * private officer's mark and must never be mistaken for a state one.
 */
export function RoundStamp({
  word,
  top = 'Ryan Hogarth',
  bottom = 'Marriage Officers',
  ink = 'oxblood',
  tone = 'pale',
  size = 186,
  tilt = -7,
}: {
  word: string;
  top?: string;
  bottom?: string;
  ink?: Ink;
  tone?: 'solid' | 'pale';
  size?: number;
  tilt?: number;
}) {
  const c = tone === 'pale' ? INK[ink].pale : INK[ink].solid;
  const id = `rs-${word.toLowerCase().replace(/[^a-z]/g, '')}`;

  return (
    <span
      className={`impression${tone === 'pale' ? ' impression-pale' : ''}`}
      style={{ display: 'block', width: size, height: size, transform: `rotate(${tilt}deg)` }}
    >
      <svg viewBox="0 0 180 180" width={size} height={size} aria-hidden="true" focusable="false">
        <defs>
          <path id={`${id}-top`} d="M 26 90 A 64 64 0 0 1 154 90" fill="none" />
          <path id={`${id}-bottom`} d="M 20 90 A 70 70 0 0 0 160 90" fill="none" />
        </defs>

        <circle cx="90" cy="90" r="86" fill="none" stroke={c} strokeWidth="2.5" />
        <circle cx="90" cy="90" r="76" fill="none" stroke={c} strokeWidth="1" />

        <text className="plate" fill={c} fontSize="12.5" letterSpacing="2.2">
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">{top}</textPath>
        </text>
        <text className="plate" fill={c} fontSize="10" letterSpacing="1.6">
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">{bottom}</textPath>
        </text>

        {/* The separators a cut stamp uses between its two arcs. */}
        <path d="M 20 90 l 4.5 -4.5 l 4.5 4.5 l -4.5 4.5 Z" fill={c} />
        <path d="M 160 90 l -4.5 -4.5 l -4.5 4.5 l 4.5 4.5 Z" fill={c} />

        <text
          className="plate"
          x="90"
          y="90"
          fill={c}
          fontSize="19"
          letterSpacing="0.4"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {word}
        </text>
      </svg>
    </span>
  );
}
