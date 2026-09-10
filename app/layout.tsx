import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marriage Officer',
  description: 'Tell us your situation and we will show you exactly how getting married works for you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
