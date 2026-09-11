import { selectAnswers } from '@/src/answers/select';
import { triggeredAnswers } from '@/src/answers/triggers';
import { assignOfficer } from '@/src/officers/assign';
import { summarise } from '@/src/plan/summary';
import { encodeSituation } from '@/src/situation/encode';
import type { Situation } from '@/src/situation/types';
import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { Action, Perforation } from '@/components/brand/Action';
import { AffixedPrint } from '@/components/brand/AffixedPrint';
import { StampRecord } from '@/components/front-door/Spine';
import { Clause } from './Clause';
import { OfficerPlate } from './OfficerPlate';
import { FreeTextBox } from './FreeTextBox';

const BOOKING_FORM = 'https://www.marriageofficer.co.za/booking-form-wa';

/** The state gets its own ink, and it appears nowhere else on the page. */
const STATE_SECTION = 'home_affairs';

const CLOSING: Record<string, { src: string; alt: string; position: string; caption: string }> = {
  registration: {
    src: '/photography/registration-01.jpg',
    alt: 'A couple, their witnesses and the officer at a dining table, the marriage register open in front of them and the Home Affairs certificate held up behind.',
    position: '50% 58%',
    caption: 'The register, signed and witnessed, at home in Gauteng',
  },
  ceremony: {
    src: '/photography/ceremony-03.jpg',
    alt: 'An officer standing with a couple on coastal rocks, binding their hands with a ribbon.',
    position: '50% 44%',
    caption: 'A ceremony on the rocks, Western Cape',
  },
};

export function PlanPage({ situation, freeText, includeDrafts }: { situation: Situation; freeText: string; includeDrafts: boolean }) {
  const extra = triggeredAnswers(freeText).filter(a => a.section === 'specific');
  const sections = selectAnswers(situation, { includeDrafts, extra });
  const officer = assignOfficer(situation);
  const qs = encodeSituation(situation).toString();
  const selfUrl = '/plan?' + qs + (freeText ? '&q=' + encodeURIComponent(freeText) : '');
  const closing = CLOSING[situation.service === 'registration' ? 'registration' : 'ceremony'];

  const seen = new Set<string>();
  const unique = (list: (typeof sections)[number]['answers']) =>
    list.filter(a => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });

  return (
    <>
      <Guilloche />
      <Chrome note="Assembled from your six answers" />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* ---- the head of the document: what was answered, and what happens next ---- */}
        <div style={{ background: 'var(--paper-deep)', borderBottom: '1px solid var(--rule)' }}>
          <div className="shell doc-head">
            <div className="doc-head-main">
              <h1 className="headline doc-title">{summarise(situation)}</h1>
              <div className="doc-actions">
                <Action href={`${BOOKING_FORM}?${qs}`} external>Book This</Action>
                <Action href={selfUrl} variant="ruled">Send Me This</Action>
              </div>
              <p className="prose doc-note">
                Nothing here is a quote against your name yet. Read it all first: that is the point of it.
              </p>
            </div>
            <div className="doc-head-record">
              <p className="label" style={{ color: 'var(--carbon-soft)', marginBottom: 'var(--s-5)' }}>The Record</p>
              <StampRecord situation={situation} />
            </div>
          </div>
        </div>

        {/* ---- the clauses ---- */}
        <div className="shell doc-body">
          {sections.map(sec => {
            const answers = unique(sec.answers);
            if (!answers.length) return null;
            const isState = sec.section === STATE_SECTION;

            return (
              <section key={sec.section} className={`part${isState ? ' part-state' : ''}`} aria-labelledby={`part-${sec.section}`}>
                <div className="part-head">
                  <h2 id={`part-${sec.section}`} className="plate part-title">{sec.title}</h2>
                  <span className="data part-count">
                    {String(answers.length).padStart(2, '0')} {answers.length === 1 ? 'clause' : 'clauses'}
                  </span>
                </div>
                <ol className="clauses">
                  {answers.map((a, i) => (
                    <Clause key={a.id} a={a} seq={i + 1} />
                  ))}
                </ol>
              </section>
            );
          })}

          <div className="doc-aside">
            <OfficerPlate officer={officer} />
            <FreeTextBox />
          </div>

          <div className="doc-close">
            <AffixedPrint
              src={closing.src}
              alt={closing.alt}
              caption={closing.caption}
              height={300}
              position={closing.position}
              tilt={0.4}
            />
            <div className="doc-close-text">
              <h2 className="question" style={{ fontSize: 'var(--fs-2xl)', maxWidth: '16ch' }}>
                That is the whole of it. Shall we put it in the book?
              </h2>
              <div className="doc-actions">
                <Action href={`${BOOKING_FORM}?${qs}`} external>Book This</Action>
                <Action href="/" variant="ruled">Start Again</Action>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 'var(--s-7)' }}>
            <Perforation label="End Of Document" />
          </div>
        </div>
      </main>
    </>
  );
}
