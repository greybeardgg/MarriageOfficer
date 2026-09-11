import { StepFlow } from '@/components/front-door/StepFlow';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { Divider } from '@/components/brand/Divider';
import { SiteHeader } from '@/components/brand/SiteHeader';

export default function Home() {
  return (
    <main style={{ background: 'var(--surface-page)', minHeight: '100vh' }}>
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-6 pt-16 text-center" style={{ display: 'grid', gap: 'var(--space-4)', justifyItems: 'center' }}>
        <Eyebrow>Getting Married</Eyebrow>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-thin)', fontSize: 'clamp(var(--fs-3xl), 6vw, var(--fs-5xl))', letterSpacing: 'var(--type-hero-tracking)', lineHeight: 1.1, textTransform: 'uppercase', color: 'var(--text-heading)' }}>
          Let&rsquo;s get you married.
        </h1>
        <p style={{ margin: 0, maxWidth: '52ch', fontSize: 'var(--fs-md)', lineHeight: 'var(--lh-relaxed)', color: 'var(--text-body)' }}>
          Five quick questions and we&rsquo;ll show you exactly how it works for you: the steps, the price, what to bring, and who you&rsquo;ll meet. No forms, no waiting.
        </p>
        <Divider />
      </section>
      <StepFlow />
    </main>
  );
}
