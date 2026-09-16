import { summarise } from '@/src/plan/summary';
import { encodeSituation } from '@/src/situation/encode';
import { visibleQuestions } from '@/src/situation/questions';
import type { Situation } from '@/src/situation/types';
import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { Action } from '@/components/brand/Action';
import { StampRecord } from '@/components/front-door/Spine';
import { Chat } from './Chat';

const BOOKING_FORM = 'https://www.marriageofficer.co.za/booking-form-wa';

/**
 * The plan: two-thirds conversation, one-third record, inside one viewport
 * (Cameron, 14 September 2026). The record keeps the right; Book This and
 * Send Me This sit at the foot of that column. The clause list, the officer
 * plate, the closing photograph and the perforation that used to follow were
 * "way too long on this page": they are now messages, sent when asked for.
 */
export function PlanPage({ situation, freeText, includeDrafts }: { situation: Situation; freeText: string; includeDrafts: boolean }) {
  const qs = encodeSituation(situation).toString();
  const selfUrl = '/plan?' + qs + (freeText ? '&q=' + encodeURIComponent(freeText) : '');
  const answered = visibleQuestions(situation).length;
  const WORDS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

  return (
    <>
      <Guilloche />
      <Chrome note={`Assembled from your ${WORDS[answered] ?? answered} answers`} />

      <main className="shell doc-shell" style={{ position: 'relative', zIndex: 1 }}>
        <div className="doc-main">
          <h1 className="headline doc-title">{summarise(situation)}</h1>
          <Chat situation={situation} includeDrafts={includeDrafts} opening={freeText || undefined} />
        </div>

        <aside className="doc-record" aria-label="Your record">
          <p className="label" style={{ color: 'var(--carbon-soft)' }}>The Record</p>
          <StampRecord situation={situation} />
          <div className="doc-actions doc-record-actions">
            <Action href={`${BOOKING_FORM}?${qs}`} external>Book This</Action>
            <Action href={selfUrl} variant="ruled">Send Me This</Action>
          </div>
        </aside>
      </main>
    </>
  );
}
