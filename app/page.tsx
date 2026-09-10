import { StepFlow } from '@/components/front-door/StepFlow';

export default function Home() {
  return (
    <main>
      <header className="mx-auto max-w-xl px-4 pt-16 text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]">Marriage Officers</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Let&rsquo;s get you married.</h1>
        <p className="mt-4 text-lg text-neutral-700">
          Five quick questions and we&rsquo;ll show you exactly how it works for you: the steps, the price,
          what to bring, and who you&rsquo;ll meet. No forms, no waiting.
        </p>
      </header>
      <StepFlow />
    </main>
  );
}
