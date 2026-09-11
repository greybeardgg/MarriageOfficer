/** Photographic ground. No imagery has been supplied, so this is the system's placeholder: slate with the flat scrim. */
export function Ground({ children, minHeight = '100%' }: { children?: React.ReactNode; minHeight?: string | number }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--slate-700)', minHeight }}>
      <div style={{ position: 'absolute', right: 'var(--space-5)', bottom: 'var(--space-5)', color: 'rgba(255,255,255,.28)', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-3xs)', textTransform: 'uppercase', letterSpacing: 'var(--ls-label)', pointerEvents: 'none' }}>Photography</div>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-flat)' }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
