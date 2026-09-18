import type { Metadata, Viewport } from 'next';
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, Inter } from 'next/font/google';
import { siteDescription, siteTitle, wedding } from '@/config/wedding';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-aref-ruqaa',
  display: 'swap',
});
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(wedding.siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon-64.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'دعوة زفاف | Wedding Invitation',
    locale: 'ar_AR',
    alternateLocale: ['en_US'],
    title: siteTitle,
    description: siteDescription,
    url: '/',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/og-image.png', alt: siteTitle }],
  },
};

export const viewport: Viewport = {
  themeColor: '#17070C',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${arefRuqaa.variable} ${amiri.variable}`}>
      <body>{children}</body>
    </html>
  );
}
