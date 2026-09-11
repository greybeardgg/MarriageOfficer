import Image from 'next/image';

/**
 * A photograph affixed to the document: paper margin, hairline, and four
 * drawn corner mounts. Photographs are the client's own, never stock, and
 * never invented couples.
 */
export function AffixedPrint({
  src,
  alt,
  caption,
  height = 220,
  position = '50% 50%',
  priority = false,
  tilt = 0,
}: {
  src: string;
  alt: string;
  caption?: string;
  height?: number | string;
  position?: string;
  priority?: boolean;
  tilt?: number;
}) {
  return (
    <figure style={{ margin: 0, transform: tilt ? `rotate(${tilt}deg)` : undefined }}>
      <div
        style={{
          position: 'relative',
          background: 'var(--paper-lift)',
          border: '1px solid var(--rule-strong)',
          padding: 7,
          boxShadow: '0 10px 26px -18px rgba(24, 22, 20, .55)',
        }}
      >
        <div style={{ position: 'relative', height, overflow: 'hidden' }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 900px) 100vw, 640px"
            style={{ objectFit: 'cover', objectPosition: position }}
          />
        </div>
        <Corners />
      </div>
      {caption ? (
        <figcaption className="label print-caption">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Corners() {
  const common = { position: 'absolute' as const, width: 20, height: 20, pointerEvents: 'none' as const };
  return (
    <>
      <svg aria-hidden="true" style={{ ...common, top: 0, left: 0 }} viewBox="0 0 20 20">
        <path d="M0 12 L12 0 L0 0 Z" fill="var(--paper-deep)" />
        <path d="M0 12 L12 0" stroke="var(--rule-strong)" strokeWidth="1" fill="none" />
      </svg>
      <svg aria-hidden="true" style={{ ...common, top: 0, right: 0 }} viewBox="0 0 20 20">
        <path d="M20 12 L8 0 L20 0 Z" fill="var(--paper-deep)" />
        <path d="M20 12 L8 0" stroke="var(--rule-strong)" strokeWidth="1" fill="none" />
      </svg>
      <svg aria-hidden="true" style={{ ...common, bottom: 0, left: 0 }} viewBox="0 0 20 20">
        <path d="M0 8 L12 20 L0 20 Z" fill="var(--paper-deep)" />
        <path d="M0 8 L12 20" stroke="var(--rule-strong)" strokeWidth="1" fill="none" />
      </svg>
      <svg aria-hidden="true" style={{ ...common, bottom: 0, right: 0 }} viewBox="0 0 20 20">
        <path d="M20 8 L8 20 L20 20 Z" fill="var(--paper-deep)" />
        <path d="M20 8 L8 20" stroke="var(--rule-strong)" strokeWidth="1" fill="none" />
      </svg>
    </>
  );
}
