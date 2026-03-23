import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'Kansalt | Premium Software Development & SaaS Solutions',
  description: 'Kansalt builds premium SaaS solutions and custom software for hospitals, institutes, firms, enterprises, and modern service businesses.',
  keywords: ['Kansalt', 'software development company', 'SaaS solutions', 'HMS', 'custom software', 'enterprise software']
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
