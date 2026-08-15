import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PlaceholderNotice } from '@/components/ui';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://www.core-im.com'; // TODO: replace with the real domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CORE Instrumentation & Monitoring',
    template: '%s · CORE Instrumentation & Monitoring',
  },
  description:
    'Geotechnical and structural instrumentation and monitoring for dams, tailings facilities, tunnels, deep excavations and structures across North and South America.',
  openGraph: {
    type: 'website',
    siteName: 'CORE Instrumentation & Monitoring',
    title: 'CORE Instrumentation & Monitoring',
    description:
      'Instrumentation designed, installed and monitored by one team — with the data on your screen.',
  },
  icons: {
    icon: [
      { url: '/brand/core-favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/core-favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/brand/core-apple-touch-180.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#16242C',
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CORE Instrumentation & Monitoring',
  alternateName: 'CORE',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/core-mark-1024.png`,
  description:
    'Geotechnical and structural instrumentation and monitoring across North and South America.',
  areaServed: ['North America', 'South America'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <PlaceholderNotice />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
