'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The menu. The page you are on is ruled under; the rest are plain. */
export function NavLinks({ items }: { items: readonly { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Site" className="nav">
      <ul className="nav-list">
        {items.map(item => {
          const target = item.href.split('#')[0] || '/';
          const here = target === path && !item.href.includes('#');
          return (
            <li key={item.href}>
              <Link href={item.href} className="label nav-link" aria-current={here ? 'page' : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
