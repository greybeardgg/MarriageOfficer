import { renderBody } from '@/src/answers/render';
import type { Answer } from '@/src/answers/types';

export function Timeline({ answers }: { answers: Answer[] }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid' }}>
      {answers.map((a, i) => (
        <li key={a.id} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 'var(--space-5)', paddingBottom: i === answers.length - 1 ? 0 : 'var(--space-7)', position: 'relative' }}>
          {i === answers.length - 1 ? null : <span aria-hidden="true" style={{ position: 'absolute', left: 27, top: 42, bottom: 8, width: 1, background: 'var(--border-hairline)' }} />}
          <span style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid var(--aqua-400)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-md)', fontWeight: 200, color: 'var(--slate-600)', background: 'var(--white)', position: 'relative', zIndex: 1 }}>{i + 1}</span>
          <div style={{ paddingTop: 6 }}>
            <h3 style={{ margin: '0 0 var(--space-2)', fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-regular)', fontSize: 'var(--fs-lg)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-heading)' }}>
              {a.question}{a.status === 'draft' ? <span className="draft-tag">Draft</span> : null}
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)', maxWidth: '58ch' }}>{renderBody(a.body)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
