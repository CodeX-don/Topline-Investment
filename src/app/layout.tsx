import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { FloatingWidgets } from '@/components/widgets/FloatingWidgets';
import { companyInfo } from '@/data/company';
import { defaultMetadata } from '@/utils/seo';
import './globals.css';

// Brand typography — Design Brief §3.2 / TDD §11.2
// Self-hosted WOFF2 (Latin) so builds do not depend on Google Fonts availability.
const montserrat = localFont({
  src: [
    {
      path: '../../public/assets/fonts/montserrat-latin-variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['Montserrat', 'sans-serif'],
});

const openSans = localFont({
  src: [
    {
      path: '../../public/assets/fonts/open-sans-latin-variable.woff2',
      weight: '300 800',
      style: 'normal',
    },
  ],
  variable: '--font-open-sans',
  display: 'swap',
  preload: true,
  fallback: ['Open Sans', 'sans-serif'],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white font-body text-concrete-dark antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>

        <Footer />

        <FloatingWidgets whatsappNumber={companyInfo.whatsappNumber} />

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />

        <SchemaMarkup />
      </body>
    </html>
  );
}
