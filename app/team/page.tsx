import type { Metadata } from 'next';
import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { Action, Perforation } from '@/components/brand/Action';
import { AffixedPrint } from '@/components/brand/AffixedPrint';
import { officersIn, whereIs } from '@/src/officers/officers';
import { PROVINCE_LABEL } from '@/src/situation/types';
import type { Province } from '@/src/situation/types';

export const metadata: Metadata = {
  title: 'Our Team · Ryan Hogarth Marriage Officers',
  description: 'Twelve marriage officers in twelve places across South Africa. Every one of us is a Civil Union marriage officer.',
};

/** Photographs we hold. Officers without one are listed all the same; a name and a place is the honest minimum. */
const PORTRAIT: Record<string, { src: string; alt: string; position: string; caption: string }> = {
  ryan: {
    src: '/photography/ryan-04.jpg',
    alt: 'Ryan Hogarth speaking at a microphone between a couple holding hands during their ceremony.',
    position: '52% 40%',
    caption: 'Ryan, mid-ceremony',
  },
  lara: {
    src: '/photography/lara-02.jpg',
    alt: 'Lara Thomas standing at a table on a deck above the sea, the register open in front of a seated couple.',
    position: '38% 54%',
    caption: 'Lara, signing above the sea',
  },
};

const PROVINCE_ORDER: Province[] = ['gauteng', 'western_cape', 'eastern_cape', 'kwazulu_natal'];

export default function Team() {
  const provinces = PROVINCE_ORDER.filter(p => officersIn(p).length);

  return (
    <>
      <Guilloche />
      <Chrome note="Twelve officers · Twelve locations" />
      <main className="shell team" style={{ position: 'relative', zIndex: 1 }}>
        <div className="team-head">
          <h1 className="headline" style={{ maxWidth: '12ch' }}>Our Team</h1>
          <p className="prose" style={{ fontSize: 'var(--fs-lg)', lineHeight: 1.5, maxWidth: '46ch' }}>
            Twelve marriage officers in twelve places. Every one of us is a Civil Union marriage
            officer, so we marry every couple. You will deal with one of us from the first message
            to the signing.
          </p>
        </div>

        {provinces.map(p => {
          const list = officersIn(p);
          return (
            <section key={p} className="part" aria-labelledby={`team-${p}`}>
              <div className="part-head">
                <h2 id={`team-${p}`} className="plate part-title">{PROVINCE_LABEL[p]}</h2>
                <span className="data part-count">
                  {String(list.length).padStart(2, '0')} {list.length === 1 ? 'officer' : 'officers'}
                </span>
              </div>
              <ol className="team-list">
                {list.map(o => {
                  const art = PORTRAIT[o.id];
                  return (
                    <li key={o.id} className={`team-row${art ? ' team-row-art' : ''}`}>
                      <div className="team-who">
                        <p className="officer-name">{o.name}</p>
                        <p className="data officer-where">{whereIs(o)}</p>
                      </div>
                      {art ? (
                        <div className="team-art">
                          <AffixedPrint src={art.src} alt={art.alt} caption={art.caption} height={260} position={art.position} tilt={o.id === 'ryan' ? -0.6 : 0.5} />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}

        <div className="team-close">
          <Perforation label="Which Of Us" />
          <p className="prose" style={{ fontSize: 'var(--fs-md)', maxWidth: '52ch' }}>
            The Quiz asks where you are and, where there is a choice, which of us you would like.
            Ask for someone by name or let us match you to the nearest.
          </p>
          <div>
            <Action href="/?start">Start The Quiz</Action>
          </div>
        </div>
      </main>
    </>
  );
}
