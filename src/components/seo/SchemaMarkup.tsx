import { companyInfo, socialLinks } from '@/data/company';
import type { Service } from '@/types';
import { siteUrl } from '@/utils/seo';

/**
 * Global LocalBusiness structured data — PRD §4 / TDD §7.2
 */
export function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: companyInfo.name,
    image: `${siteUrl}/og-image.jpg`,
    url: siteUrl,
    telephone: companyInfo.phone.replace(/\s/g, ''),
    email: companyInfo.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: companyInfo.city,
      addressCountry: 'NA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.5597,
      longitude: 17.0832,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Per-service structured data — TDD §7.2.
 */
export function ServiceSchema({ service }: { service: Service }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${siteUrl}/services#${service.slug}`,
    serviceType: service.title,
    areaServed: {
      '@type': 'City',
      name: companyInfo.city,
    },
    provider: {
      '@type': 'LocalBusiness',
      name: companyInfo.name,
      telephone: companyInfo.phone.replace(/\s/g, ''),
      email: companyInfo.email,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
