import { Suspense } from 'react';
import { decodeSituation } from '@/src/situation/encode';
import { PlanPage } from '@/components/plan/PlanPage';
import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { Action } from '@/components/brand/Action';

export default async function Plan({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (typeof v === 'string') p.set(k, v);
  const situation = decodeSituation(p);

  if (!situation) {
    return (
      <>
        <Guilloche />
        <Chrome note="This page could not be assembled" />
        <main className="shell" style={{ position: 'relative', zIndex: 1, paddingTop: 'var(--s-9)', paddingBottom: 'var(--s-10)', display: 'grid', gap: 'var(--s-5)', justifyItems: 'start' }}>
          <h1 className="question" style={{ maxWidth: '16ch' }}>This link is missing some of your answers</h1>
          <p className="prose" style={{ fontSize: 'var(--fs-md)', color: 'var(--carbon-soft)', maxWidth: '48ch' }}>
            Nothing is lost. A few questions take about a minute, and the page rebuilds itself at the end of them.
          </p>
          <div style={{ marginTop: 'var(--s-3)' }}>
            <Action href="/">Back to the questions</Action>
          </div>
        </main>
      </>
    );
  }

  const includeDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';
  return (
    <Suspense>
      <PlanPage situation={situation} freeText={p.get('q') ?? ''} includeDrafts={includeDrafts} />
    </Suspense>
  );
}
