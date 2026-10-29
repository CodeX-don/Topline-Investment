import type { Metadata } from 'next';

// Global SEO configuration — TDD §7.1
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://toplin.com.na';

export const siteName = 'Toplin Investments';

export const defaultTitle =
  'Toplin Investments - Building & Developing in Windhoek';

export const defaultDescription =
  'Expert residential and commercial construction company in Windhoek, Namibia. Specializing in building, renovations, joinery, and paving.';

export const ogImage = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Toplin Investments - Construction Company',
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_NA',
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@toplininvest',
    creator: '@toplininvest',
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Per-page SEO copy — TDD §7.1
export const pageSEO = {
  home: {
    title: 'Home - Building Strong Foundations',
    description:
      'Trusted residential & commercial construction experts delivering quality, safety, and on-time results in Windhoek.',
  },
  about: {
    title: 'About Us - Toplin Investments',
    description:
      "Learn about Toplin Investments, Windhoek's premier construction and development company.",
  },
  services: {
    title: 'Our Services - Construction & Development',
    description:
      'Residential construction, commercial buildings, renovations, joinery, and paving services in Namibia.',
  },
  contact: {
    title: 'Contact Us - Get a Free Quote',
    description:
      'Contact Toplin Investments for your construction project. Call +264 81 718 4507 or email ben@toplin.com.na',
  },
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

/**
 * Builds page-level metadata with a self-referencing canonical and OG/Twitter
 * data. Titles that already contain the brand bypass the root title template
 * to avoid duplicated brand names.
 */
export function createMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const containsBrand = title.includes(siteName);
  const fullTitle = containsBrand ? title : `${title} | ${siteName}`;
  const canonical =
    path === '/'
      ? `${siteUrl}/`
      : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'en_NA',
      url: path,
      siteName,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@toplininvest',
      creator: '@toplininvest',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
