import Image from 'next/image';
import { AffixedPrint } from '@/components/brand/AffixedPrint';

/**
 * The banner: Ryan's two photographs, combined the way this document
 * combines everything else. The hands run edge to edge as the ground; the
 * certificate, rings and pen are an affixed print pinned over the right of
 * it. One is the day, the other is the paperwork: both sides of the work in
 * one strip. The name sits on the paper-toned foot of the photograph, in
 * carbon, because the photograph is pale and white type would vanish on it.
 */
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
        <h1 id="banner-name" className="banner-name">
          <span className="banner-name-main">Ryan Hogarth</span>
          <span className="label banner-name-sub">Professional Marriage Officers</span>
        </h1>
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
