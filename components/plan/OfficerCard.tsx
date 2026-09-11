import type { Officer } from '@/src/officers/officers';
import { Eyebrow } from '@/components/brand/Eyebrow';

export function OfficerCard({ officer }: { officer: Officer | null }) {
  return (
    <div style={{ background: 'var(--surface-tint)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', display: 'grid', gap: 'var(--space-2)' }}>
      <Eyebrow>Your Officer</Eyebrow>
      {officer ? (
        <>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-light)', fontSize: 'var(--fs-xl)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-heading)' }}>{officer.name}</p>
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>{officer.locationLabel} &middot; {officer.area}</p>
        </>
      ) : (
        <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>We&rsquo;ll match you with an officer in your area as soon as you book.</p>
      )}
    </div>
  );
}
