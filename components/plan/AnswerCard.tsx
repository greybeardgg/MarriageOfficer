import { renderBody } from '@/src/answers/render';
import type { Answer } from '@/src/answers/types';

export function AnswerCard({ a }: { a: Answer }) {
  return (
    <article className="card">
      <h3 style={{ margin: '0 0 var(--space-2)', fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-regular)', fontSize: 'var(--fs-lg)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-heading)' }}>
        {a.question}{a.status === 'draft' ? <span className="draft-tag">Draft</span> : null}
      </h3>
      <p style={{ margin: 0, fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>{renderBody(a.body)}</p>
    </article>
  );
}
