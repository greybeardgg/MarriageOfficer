import { selectAnswers } from '@/src/answers/select';
import { triggeredAnswers } from '@/src/answers/triggers';
import { assignOfficer } from '@/src/officers/assign';
import { summarise } from '@/src/plan/summary';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { AnswerCard } from './AnswerCard';
import { OfficerCard } from './OfficerCard';
import { FreeTextBox } from './FreeTextBox';

const BOOKING_FORM = 'https://www.marriageofficer.co.za/booking-form-wa';

export function PlanPage({ situation, freeText, includeDrafts }: { situation: Situation; freeText: string; includeDrafts: boolean }) {
  const extra = triggeredAnswers(freeText).filter(a => a.section === 'specific');
  const sections = selectAnswers(situation, { includeDrafts, extra });
  const seen = new Set<string>();
  const officer = assignOfficer(situation);
  const qs = encodeSituation(situation).toString();
  const selfUrl = '/plan?' + qs + (freeText ? '&q=' + encodeURIComponent(freeText) : '');

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm uppercase tracking-widest text-[var(--accent)]">What you&rsquo;re looking at</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{summarise(situation)}</h1>

      {sections.map(sec => (
        <section key={sec.section} className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">{sec.title}</h2>
          <div className="grid gap-4">
            {sec.answers.filter(a => !seen.has(a.id) && (seen.add(a.id), true)).map(a => <AnswerCard key={a.id} a={a} />)}
          </div>
        </section>
      ))}

      <section className="mt-10"><FreeTextBox /></section>

      <section className="mt-10"><OfficerCard officer={officer} /></section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2">
        <a href={`${BOOKING_FORM}?${qs}`} className="rounded-2xl bg-[var(--accent)] px-6 py-5 text-center text-lg font-semibold text-white">Book this</a>
        <details className="rounded-2xl border px-6 py-5">
          <summary className="cursor-pointer text-lg font-semibold">Send me this</summary>
          <p className="mt-2 text-sm text-neutral-700">This page is yours to keep. Copy the link:</p>
          <code className="mt-2 block break-all rounded bg-neutral-100 p-2 text-xs">{selfUrl}</code>
        </details>
      </section>
    </main>
  );
}
