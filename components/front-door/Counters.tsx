'use client';

import { useId, useState } from 'react';
import { DOORS } from '@/src/situation/questions';
import type { Choice, DoorId } from '@/src/situation/questions';
import { AffixedPrint } from '@/components/brand/AffixedPrint';
import { RoundStamp } from '@/components/brand/RoundStamp';
import type { Ink } from '@/components/brand/Stamp';

const ART: Record<DoorId, { src: string; alt: string; position: string; caption: string }> = {
  legal: {
    src: '/photography/registration-01.jpg',
    alt: 'A couple, their witnesses and the officer at a dining table, the marriage register open in front of them and the Home Affairs certificate held up behind.',
    position: '50% 56%',
    caption: 'A registration at home, Gauteng',
  },
  ceremony: {
    src: '/photography/ceremony-03.jpg',
    alt: 'An officer standing with a couple on coastal rocks, binding their hands with a ribbon.',
    position: '50% 45%',
    caption: 'A ceremony on the rocks, Western Cape',
  },
};

const INK: Record<DoorId, { field: string; deep: string; pale: string; stamp: Ink }> = {
  legal: { field: 'var(--oxblood)', deep: 'var(--oxblood-deep)', pale: 'var(--oxblood-pale)', stamp: 'oxblood' },
  ceremony: { field: 'var(--teal)', deep: 'var(--teal-deep)', pale: 'var(--teal-pale)', stamp: 'teal' },
};

export function Counters({ choices, onChoose }: { choices: Choice[]; onChoose: (value: string) => void }) {
  const [open, setOpen] = useState<DoorId | null>(null);
  const panelId = useId();

  return (
    <div className="counters">
      {DOORS.map(door => {
        const ink = INK[door.id];
        const art = ART[door.id];
        const mine = choices.filter(c => c.door === door.id);
        const isOpen = open === door.id;
        const single = mine.length === 1;

        return (
          <section
            key={door.id}
            className={`counter counter-${door.id}${isOpen ? ' is-open' : ''}`}
            style={{ ['--field' as string]: ink.field, ['--field-deep' as string]: ink.deep, ['--field-pale' as string]: ink.pale }}
          >
            <button
              type="button"
              className="counter-face on-ink"
              aria-expanded={single ? undefined : isOpen}
              aria-controls={single ? undefined : `${panelId}-${door.id}`}
              onClick={() => (single ? onChoose(mine[0].value) : setOpen(isOpen ? null : door.id))}
            >
              <span className="plate counter-title">{door.title}</span>
              <span className="counter-line">{door.line}</span>
              <span className="counter-foot">
                <span className="label">{door.foot}</span>
                <Nib open={!single && isOpen} />
              </span>
            </button>

            {/* The legal door carries the officer's own round stamp. */}
            {door.stampWord ? (
              <div className="counter-mark">
                <RoundStamp word={door.stampWord} ink={ink.stamp} />
              </div>
            ) : null}

            {single ? null : (
              <div id={`${panelId}-${door.id}`} className="counter-panel" hidden={!isOpen}>
                <ul>
                  {mine.map(c => (
                    <li key={c.value}>
                      <button type="button" className="subopt on-ink" onClick={() => onChoose(c.value)}>
                        <span className="subopt-label">{c.label}</span>
                        <span className="subopt-hint">{c.hint}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="counter-art">
              <AffixedPrint
                src={art.src}
                alt={art.alt}
                caption={art.caption}
                height="var(--art-h)"
                position={art.position}
                priority={door.id === 'legal'}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

/** A drawn pen nib: the mark that means "this one opens". */
function Nib({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: 'none', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform var(--settle) var(--out)' }}
    >
      <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
    </svg>
  );
}
