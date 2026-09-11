/**
 * The security-paper ground. A real guilloche rosette, built the way the
 * engraving is: one ellipse swept through a full turn, twice, at two radii.
 * Fixed to the viewport so the page reads as one continuous sheet.
 */
const SWEEP = Array.from({ length: 18 }, (_, i) => i * 10);

export function Guilloche() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.34,
      }}
    >
      <defs>
        <pattern id="guilloche" width="196" height="196" patternUnits="userSpaceOnUse">
          <g transform="translate(98 98)" fill="none" stroke="var(--rule)" strokeWidth="0.4">
            {SWEEP.map(a => (
              <ellipse key={`o${a}`} rx="86" ry="31" transform={`rotate(${a})`} />
            ))}
            {SWEEP.map(a => (
              <ellipse key={`i${a}`} rx="47" ry="16" transform={`rotate(${a + 5})`} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guilloche)" />
    </svg>
  );
}
