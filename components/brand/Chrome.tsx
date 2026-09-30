import Link from 'next/link';
import { Lockup } from './Lockup';
import { NavLinks } from './NavLinks';

/**
 * The document head: the mark, the menu, and one honest line. The mark is
 * held at the top of every screen so this page is never mistaken for a state
 * document. The menu is the one the current site carries, minus the pages
 * this rebuild does not have yet (Ryan, 13 September 2026). Each entry has
 * its own page since 30 September, at the address the live site already uses.
 */
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/marriage-registrations', label: 'Marriage Registration' },
  { href: '/wedding-ceremonies', label: 'Wedding Ceremonies' },
  { href: '/same-sex-weddings', label: 'Same-Sex Weddings' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Chrome({ note }: { note?: string }) {
  return (
    <header className="chrome">
      <div className="shell chrome-row">
        <Link href="/" aria-label="Ryan Hogarth Marriage Officers, back to the start" className="chrome-mark">
          <Lockup width={170} />
        </Link>
        <div className="chrome-side">
          <NavLinks items={NAV} />
          {note ? <p className="label chrome-note">{note}</p> : null}
        </div>
      </div>
    </header>
  );
}
