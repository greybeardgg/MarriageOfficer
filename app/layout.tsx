import type { Metadata } from 'next';
import { Archivo, Faustina, Azeret_Mono } from 'next/font/google';
import './globals.css';
import { InkFilters } from '@/components/brand/InkFilters';

/* Plate lettering: counters, stamps, labels, actions. */
const plate = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
/* The document's own sentences. */
const prose = Faustina({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-faustina', display: 'swap' });
/* Data only: dates, reference numbers, amounts, measured annotations. */
const data = Azeret_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-azeret', display: 'swap' });

export const metadata: Metadata = {
  title: 'Ryan Hogarth Marriage Officers',
  description: 'Getting married in South Africa is two different jobs. Answer six questions and we will show you your own process, price and paperwork before we ask you for anything.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${plate.variable} ${prose.variable} ${data.variable}`}>
      <body>
        <InkFilters />
        {children}
      </body>
    </html>
  );
}
