import type { Metadata } from 'next';
import { Montserrat, Nunito_Sans } from 'next/font/google';
import './globals.css';

const display = Montserrat({ subsets: ['latin'], weight: ['200', '300', '400', '500'], variable: '--font-montserrat', display: 'swap' });
const body = Nunito_Sans({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-nunito', display: 'swap' });

export const metadata: Metadata = {
  title: 'Marriage Officer',
  description: 'Tell us your situation and we will show you exactly how getting married works for you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
