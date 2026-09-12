import { AffixedPrint } from '@/components/brand/AffixedPrint';
import { RoundStamp } from '@/components/brand/RoundStamp';

/**
 * What the business actually does, shown rather than offered. These were two
 * buttons until 12 September 2026; making the visitor choose a path before a
 * single question had been asked was a fork at the door, so the panels now
 * state both kinds of work and the path falls out of the answers instead.
 * Nothing here is clickable, on purpose.
 */
const SIDES = [
  {
    id: 'legal',
    title: 'Register A Marriage',
    line: 'The legal part. An officer, your witnesses, the register signed and lodged with Home Affairs.',
    foot: 'At our offices, at your home, or wherever suits you.',
    stamp: 'Registered',
    ink: { field: 'var(--oxblood)', pale: 'var(--oxblood-pale)' },
    art: {
      src: '/photography/registration-01.jpg',
      alt: 'A couple, their witnesses and the officer at a dining table, the marriage register open in front of them and the Home Affairs certificate held up behind.',
      position: '50% 56%',
      caption: 'A registration at home, Gauteng',
    },
  },
  {
    id: 'ceremony',
    title: 'Have A Wedding',
    line: 'The day itself. Words that sound like you, your people watching, and the registration done properly inside it.',
    foot: 'Small and quiet, or the whole thing.',
    stamp: null,
    ink: { field: 'var(--teal)', pale: 'var(--teal-pale)' },
    art: {
      src: '/photography/ceremony-03.jpg',
      alt: 'An officer standing with a couple on coastal rocks, binding their hands with a ribbon.',
      position: '50% 45%',
      caption: 'A ceremony on the rocks, Western Cape',
    },
  },
] as const;

export function BothSides() {
  return (
    <section className="sides" aria-labelledby="sides-head">
      <h2 id="sides-head" className="plate sides-head">We Do Both</h2>
      <div className="sides-pair">
        {SIDES.map(side => (
          <article
            key={side.id}
            className={`side side-${side.id}`}
            style={{ ['--field' as string]: side.ink.field, ['--field-pale' as string]: side.ink.pale }}
          >
            <h3 className="plate side-title">{side.title}</h3>
            <p className="side-line">{side.line}</p>
            <p className="label side-foot">{side.foot}</p>

            {side.stamp ? (
              <div className="side-mark">
                <RoundStamp word={side.stamp} ink="oxblood" size={156} />
              </div>
            ) : null}

            <div className="side-art">
              <AffixedPrint
                src={side.art.src}
                alt={side.art.alt}
                caption={side.art.caption}
                height="var(--art-h)"
                position={side.art.position}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
