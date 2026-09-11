/**
 * Ink behaves as material: pressure, bleed and a little misregistration.
 * One hidden SVG carries the filters every impression on the site references.
 * The alpha floor is deliberately high (0.88) so a stamped word still clears
 * WCAG AA against the paper ground.
 */
export function InkFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="ink-bleed" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" seed="7" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.1" xChannelSelector="R" yChannelSelector="G" result="pressed" />
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="11" result="patch" />
          <feColorMatrix
            in="patch"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.12 0.88"
            result="pressure"
          />
          <feComposite in="pressed" in2="pressure" operator="in" />
        </filter>

        {/* For large marks where no text has to survive the bleed. */}
        <filter id="ink-bleed-soft" x="-14%" y="-14%" width="128%" height="128%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="3" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="pressed" />
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="5" result="patch" />
          <feColorMatrix
            in="patch"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.34 0.66"
            result="pressure"
          />
          <feComposite in="pressed" in2="pressure" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
