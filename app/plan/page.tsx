import { Suspense } from 'react';
import { decodeSituation } from '@/src/situation/encode';
import { PlanPage } from '@/components/plan/PlanPage';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { Button } from '@/components/brand/Button';

export default async function Plan({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (typeof v === 'string') p.set(k, v);
  const situation = decodeSituation(p);
  if (!situation) {
    return (
      <main style={{ padding: 'var(--section-y) var(--space-5)', display: 'grid', gap: 'var(--space-5)', justifyItems: 'center', textAlign: 'center' }}>
        <Eyebrow>Something Is Missing</Eyebrow>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-thin)', fontSize: 'var(--fs-3xl)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-heading)' }}>Let&rsquo;s start again</h1>
        <p style={{ margin: 0, fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>This link is missing some of your answers.</p>
        <Button href="/" variant="ghost">Back To The Questions</Button>
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
