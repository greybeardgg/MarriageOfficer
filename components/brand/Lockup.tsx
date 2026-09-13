/**
 * The lockup Ryan supplied on 13 September 2026: the "Ryan Hogarth" wordmark
 * with the interlocking rings (the current site's own SVG, `logo-mark.svg`),
 * and "Marriage Officers" set in the serif beneath it between two rules. The
 * wordmark is the fixed part of the brand; the line beneath is type, so it
 * stays crisp at any size and takes the ground's ink.
 */
export function Lockup({ width = 320, tone = 'dark' }: { width?: number | string; tone?: 'dark' | 'light' }) {
  return (
    <span className={`lockup lockup-${tone}`} style={{ width }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tone === 'light' ? '/logo-mark-light.svg' : '/logo-mark.svg'} alt="" width={790} height={181} className="lockup-mark" />
      <span className="lockup-line" aria-hidden="true">Marriage Officers</span>
      <span className="sr-only">Ryan Hogarth Marriage Officers</span>
    </span>
  );
}
