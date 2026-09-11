export function Eyebrow({ children, tone = 'accent', className = '' }: { children: React.ReactNode; tone?: 'accent' | 'muted' | 'inverse'; className?: string }) {
  const t = tone === 'muted' ? ' eyebrow-muted' : tone === 'inverse' ? ' eyebrow-inverse' : '';
  return <div className={`eyebrow${t} ${className}`.trim()}>{children}</div>;
}
