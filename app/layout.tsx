import type { Metadata } from 'next';
import { Montserrat, Nunito_Sans, Faustina } from 'next/font/google';
import './globals.css';
import { InkFilters } from '@/components/brand/InkFilters';

/* Headings, eyebrows, plates and stamps (Ryan, 13 September 2026). */
const display = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
/* Everything read or operated: body, options, fields, actions, counts. */
const body = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
/* The lockup's "Marriage Officers" line only: the logo's own serif, one weight. */
const lockup = Faustina({ subsets: ['latin'], weight: ['400'], variable: '--font-faustina', display: 'swap' });

export const metadata: Metadata = {
  title: 'Ryan Hogarth Marriage Officers',
  description: 'Getting married in South Africa is two different jobs. Answer a few questions and we will show you your own process, price and paperwork before we ask you for anything.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${body.variable} ${lockup.variable}`}>
      <body>
        <InkFilters />
        {children}
      </body>
    </html>
  );
}
