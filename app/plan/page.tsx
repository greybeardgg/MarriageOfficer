import Link from 'next/link';
import { Suspense } from 'react';
import { decodeSituation } from '@/src/situation/encode';
import { PlanPage } from '@/components/plan/PlanPage';

export default async function Plan({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (typeof v === 'string') p.set(k, v);
  const situation = decodeSituation(p);
  if (!situation) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Let&rsquo;s start again</h1>
        <p className="mt-3">This link is missing some of your answers.</p>
        <Link href="/" className="mt-6 inline-block rounded-2xl bg-[var(--accent)] px-6 py-3 text-white">Back to the questions</Link>
      </main>
    );
  }
  const includeDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';
  return (
    <Suspense>
      <PlanPage situation={situation} freeText={p.get('q') ?? ''} includeDrafts={includeDrafts} />
    </Suspense>
  );
}
