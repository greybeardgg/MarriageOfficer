/** The ring-and-rule motif from the logo lockup. */
export function Divider({ width = 180, color = 'var(--neutral-400)', align = 'center' }: { width?: number; color?: string; align?: 'left' | 'center' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'left' ? 'flex-start' : 'center', width: '100%' }} aria-hidden="true">
      <div style={{ height: 1, background: color, width: width / 2 }} />
      <div style={{ width: 20, height: 20, border: `2px solid ${color}`, borderRadius: '50%', flex: 'none', margin: '0 -1px' }} />
      <div style={{ height: 1, background: color, width: width / 2 }} />
    </div>
  );
}
