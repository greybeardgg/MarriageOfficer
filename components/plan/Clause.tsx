import { renderBody } from '@/src/answers/render';
import type { Answer } from '@/src/answers/types';

/** Amounts are measurements: they set in tabular figures, beside the prose. */
function measured(text: string) {
  const parts = text.split(/(R[\d ]+)/g);
  return parts.map((p, i) =>
    /^R[\d ]+$/.test(p) ? (
      <span key={i} className="data amount">{p}</span>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function Clause({ a, seq }: { a: Answer; seq: number }) {
  return (
    <li className="clause">
      <span className="data clause-no" aria-hidden="true">
        {String(seq).padStart(2, '0')}
      </span>
      <div className="clause-body">
        <h3 className="clause-head">
          {a.question}
          {a.status === 'draft' ? <span className="draft">Draft</span> : null}
        </h3>
        <p className="prose clause-text">{measured(renderBody(a.body))}</p>
      </div>
    </li>
  );
}
