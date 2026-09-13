import { whereIs } from '@/src/officers/officers';
import type { Officer } from '@/src/officers/officers';
import { AffixedPrint } from '@/components/brand/AffixedPrint';

/** Photographs we hold for the officers a situation can be assigned to. */
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

export function OfficerPlate({ officer, chosen = false }: { officer: Officer | null; chosen?: boolean }) {
  const art = officer ? PORTRAIT[officer.id] : undefined;

  return (
    <section className="officer" aria-labelledby="officer-head">
      <h2 id="officer-head" className="plate part-title officer-head">Who You Will Meet</h2>
      {officer ? (
        <>
          <p className="officer-name">{officer.name}</p>
          <p className="data officer-where">{whereIs(officer)}</p>
          <p className="label officer-how">{chosen ? 'Your choice' : 'Nearest to you'}</p>
          {art ? (
            <div style={{ marginTop: 'var(--s-5)' }}>
              <AffixedPrint src={art.src} alt={art.alt} caption={art.caption} height={320} position={art.position} tilt={-0.6} />
            </div>
          ) : null}
        </>
      ) : (
        <p className="prose" style={{ marginTop: 'var(--s-3)', fontSize: 'var(--fs-md)', color: 'var(--carbon-soft)', maxWidth: '42ch' }}>
          We will name your officer when you book, and you will deal with that one person from then on.
        </p>
      )}
    </section>
  );
}
