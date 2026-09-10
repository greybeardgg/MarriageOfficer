import { renderBody } from '@/src/answers/render';
import type { Answer } from '@/src/answers/types';

export function AnswerCard({ a }: { a: Answer }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">
        {a.question}
        {a.status === 'draft' && (
          <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 align-middle text-xs font-bold text-amber-800">DRAFT</span>
        )}
      </h3>
      <p className="mt-2 leading-relaxed text-neutral-800">{renderBody(a.body)}</p>
    </article>
  );
}
