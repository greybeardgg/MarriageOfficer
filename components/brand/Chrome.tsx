import Link from 'next/link';

/**
 * The document head: the mark, and one honest line. Nothing else lives here.
 * The mark is held at the top of every screen so this page is never mistaken
 * for a state document.
 */
export function Chrome({ note = 'Twelve officers · Twelve locations' }: { note?: string }) {
  return (
    <header
      style={{
        position: 'relative',
        zIndex: 2,
        borderBottom: '1px solid var(--rule)',
        background: 'var(--paper)',
      }}
    >
      <div
        className="shell"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--s-5)',
          minHeight: 76,
        }}
      >
        <Link href="/" aria-label="Ryan Hogarth Marriage Officers, back to the start" style={{ display: 'flex', lineHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-charcoal.svg" alt="Ryan Hogarth Marriage Officers" width={146} height={102} style={{ width: 146, height: 'auto' }} />
        </Link>
        <p className="label chrome-note" style={{ color: 'var(--carbon-soft)', textAlign: 'right' }}>
          {note}
        </p>
      </div>
    </header>
  );
}
