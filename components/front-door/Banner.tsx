import Image from 'next/image';
import { Lockup } from '@/components/brand/Lockup';

/**
 * The banner: the name on a paper panel, then a strip of Ryan's photographs
 * running to the edge, a collage of the work (Ryan, 1 October 2026). Each is
 * a portrait crop of the same height, parted by the paper, like frames on a
 * contact sheet. Fewer frames show as the screen narrows; the name never goes.
 */
const FRAMES = [
  { src: '/photography/banner-01.jpg', alt: 'Ryan at a microphone between a couple during their ceremony.' },
  { src: '/photography/banner-02.jpg', alt: 'Two grooms holding hands under a wooden arch, the officer between them.' },
  { src: '/photography/banner-03.jpg', alt: 'Lara at a table on a deck above the sea, a couple seated with the register.' },
  { src: '/photography/banner-04.jpg', alt: 'Two brides facing each other in the veld, the officer reading beside them.' },
  { src: '/photography/banner-05.jpg', alt: 'Ryan beside a bride as she signs the marriage register.' },
  { src: '/photography/banner-06.jpg', alt: 'An outdoor ceremony under white flowers, the officiant at a lectern, guests in front.' },
];

export function Banner() {
  return (
    <section className="banner" aria-labelledby="banner-name">
      <div className="banner-body">
        <h1 id="banner-name" className="banner-mark">
          <Lockup width="clamp(200px, 22vw, 340px)" />
        </h1>
        <ul className="collage" aria-label="Photographs of our ceremonies and registrations">
          {FRAMES.map(f => (
            <li key={f.src} className="collage-frame">
              <Image src={f.src} alt={f.alt} fill priority sizes="(max-width: 860px) 34vw, 18vw" style={{ objectFit: 'cover' }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
