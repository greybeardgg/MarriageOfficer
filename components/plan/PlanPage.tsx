import { selectAnswers } from '@/src/answers/select';
import { triggeredAnswers } from '@/src/answers/triggers';
import { assignOfficer } from '@/src/officers/assign';
import { summarise } from '@/src/plan/summary';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { Eyebrow } from '@/components/brand/Eyebrow';
import { Divider } from '@/components/brand/Divider';
import { Button } from '@/components/brand/Button';
import { AnswerCard } from './AnswerCard';
import { OfficerCard } from './OfficerCard';
import { FreeTextBox } from './FreeTextBox';
import { Timeline } from './Timeline';

const BOOKING_FORM = 'https://www.marriageofficer.co.za/booking-form-wa';

export function PlanPage({ situation, freeText, includeDrafts }: { situation: Situation; freeText: string; includeDrafts: boolean }) {
  const extra = triggeredAnswers(freeText).filter(a => a.section === 'specific');
  const sections = selectAnswers(situation, { includeDrafts, extra });
  const officer = assignOfficer(situation);
  const qs = encodeSituation(situation).toString();
  const selfUrl = '/plan?' + qs + (freeText ? '&q=' + encodeURIComponent(freeText) : '');
  const seen = new Set<string>();
  const unique = (list: typeof sections[number]['answers']) => list.filter(a => { if (seen.has(a.id)) return false; seen.add(a.id); return true; });

  return (
    <main style={{ background: 'var(--surface-page)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="mx-auto max-w-5xl px-6" style={{ display: 'flex', alignItems: 'center', height: 88 }}>
          <a href="/" aria-label="Ryan Hogarth Professional Marriage Officers"><img src="/logo-charcoal.svg" alt="" width={168} height={118} style={{ height: 64, width: 'auto' }} /></a>
        </div>
      </header>

      <div style={{ background: 'var(--surface-tint)', borderBottom: '1px solid var(--border-hairline)' }}>
        <div className="mx-auto max-w-5xl px-6 py-16" style={{ display: 'grid', gap: 'var(--space-5)', justifyItems: 'start' }}>
          <Eyebrow>Based On Your Answers</Eyebrow>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-thin)', fontSize: 'clamp(var(--fs-2xl), 4.5vw, var(--fs-4xl))', letterSpacing: '0.06em', lineHeight: 1.15, color: 'var(--text-heading)', maxWidth: '22ch' }}>{summarise(situation)}</h1>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button href={`${BOOKING_FORM}?${qs}`} size="lg">Book This</Button>
            <Button href={selfUrl} variant="ghost" size="lg">Send Me This</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6" style={{ paddingTop: 'var(--section-y-tight)', paddingBottom: 'var(--section-y)', display: 'grid', gap: 'var(--space-9)' }}>
        {sections.map(sec => {
          const answers = unique(sec.answers);
          if (!answers.length) return null;
          return (
            <section key={sec.section} style={{ display: 'grid', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-display-light)', fontSize: 'var(--fs-2xl)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-heading)' }}>{sec.title}</h2>
              </div>
              {sec.section === 'process'
                ? <div style={{ maxWidth: 'var(--container-narrow)' }}><Timeline answers={answers} /></div>
                : <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>{answers.map(a => <AnswerCard key={a.id} a={a} />)}</div>}
            </section>
          );
        })}

        <section style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'start' }}>
          <FreeTextBox />
          <OfficerCard officer={officer} />
        </section>

        <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-5)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-hairline)' }}>
          <Divider />
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>Not quite what you expected?</p>
          <Button href="/" variant="ghost">Start Again</Button>
        </div>
      </div>
    </main>
  );
}
