import Image from 'next/image';
import { AffixedPrint } from '@/components/brand/AffixedPrint';
import { Lockup } from '@/components/brand/Lockup';

/**
 * The banner: Ryan's photographs, combined the way this document combines
 * everything else. The hands run edge to edge as the ground; the certificate,
 * rings and pen are an affixed print pinned over the right of it; and the
 * rest of his photographs are pasted small between the name and the
 * certificate, like prints on a fridge (Ryan, 1 October 2026): less a hero
 * picture, more a picture of what we do. The lockup sits on the left on the
 * paper-toned foot of the photograph, because the photograph is pale.
 */
const PINS: { src: string; alt: string; x: number; y: number; r: number }[] = [
  { src: '/photography/pin-01.jpg', alt: 'Ryan at a microphone between a couple during their ceremony.', x: 0, y: 4, r: -5 },
  { src: '/photography/pin-02.jpg', alt: 'Two grooms holding hands under a wooden arch.', x: 19, y: 10, r: 3 },
  { src: '/photography/pin-03.jpg', alt: 'Lara at a table on a deck above the sea with a couple.', x: 38, y: 3, r: -2 },
  { src: '/photography/pin-04.jpg', alt: 'Two brides facing each other in the veld.', x: 57, y: 9, r: 4 },
  { src: '/photography/pin-05.jpg', alt: 'Ryan beside a bride signing the register.', x: 76, y: 2, r: -4 },
  { src: '/photography/pin-06.jpg', alt: 'An outdoor ceremony under white flowers, guests in front.', x: 3, y: 52, r: 4 },
  { src: '/photography/pin-07.jpg', alt: 'An officer reading between a bride and groom.', x: 23, y: 58, r: -3 },
  { src: '/photography/pin-08.jpg', alt: 'A couple signing the register, their families around them.', x: 43, y: 51, r: 5 },
  { src: '/photography/pin-09.jpg', alt: 'Hands pointing to the line to sign in the register.', x: 62, y: 57, r: -6 },
  { src: '/photography/pin-10.jpg', alt: 'A couple signing at a table in a garden.', x: 79, y: 50, r: 2 },
];

export function Banner() {
  return (
    <section className="banner" aria-labelledby="banner-name">
      <div className="banner-ground" aria-hidden="true">
        <Image
          src="/photography/hands-01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '50% 52%' }}
        />
      </div>
      <div className="shell banner-body">
        <h1 id="banner-name" className="banner-mark">
          <Lockup width="clamp(220px, 30vw, 440px)" />
        </h1>
        <ul className="banner-pins" aria-label="Photographs of our ceremonies and registrations">
          {PINS.map(p => (
            <li
              key={p.src}
              className="pin"
              style={{ '--x': `${p.x}%`, '--y': `${p.y}%`, '--r': `${p.r}deg` } as React.CSSProperties}
            >
              <AffixedPrint src={p.src} alt={p.alt} height="100%" priority />
            </li>
          ))}
        </ul>
        <div className="banner-print">
          <AffixedPrint
            src="/photography/certificate-01.jpg"
            alt="Two wedding rings and a pen resting on a marriage certificate."
            height="100%"
            position="50% 40%"
            priority
            tilt={-1.4}
          />
        </div>
      </div>
    </section>
  );
}
