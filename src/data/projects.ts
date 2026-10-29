import type { Project } from '@/types';

/**
 * Featured project data — PRD §6.1 / TDD §6.2.
 * Representative portfolio copy pending final client project details.
 */
export const projects: Project[] = [
  {
    id: 'modern-family-home',
    title: 'Modern Family Home',
    slug: 'modern-family-home',
    category: 'Residential',
    description:
      'A contemporary family home with clean lines, generous glazing, and outdoor living at its centre.',
    location: 'Windhoek',
    year: 2024,
    images: [
      {
        url: '/assets/images/projects/modern-family-home.webp',
        alt: 'Modern family home with a mountain backdrop in Windhoek',
      },
    ],
    featured: true,
    href: '/services#residential-construction',
  },
  {
    id: 'custom-joinery-wardrobes',
    title: 'Custom Joinery & Wardrobes',
    slug: 'custom-joinery-wardrobes',
    category: 'Joinery',
    description:
      'Fitted wardrobes and built-in storage designed around the room, with a warm timber finish.',
    location: 'Windhoek',
    year: 2024,
    images: [
      {
        url: '/assets/images/projects/custom-joinery-wardrobes.webp',
        alt: 'Custom timber wardrobe and built-in shelving',
      },
    ],
    featured: true,
    href: '/services#joinery',
  },
  {
    id: 'suspended-ceiling-installation',
    title: 'Suspended Ceiling Installation',
    slug: 'suspended-ceiling-installation',
    category: 'Ceilings',
    description:
      'A precise suspended ceiling installation that delivers clean lines and an even, professional finish.',
    location: 'Windhoek',
    year: 2024,
    images: [
      {
        url: '/assets/images/projects/suspended-ceiling-installation.webp',
        alt: 'Technician installing a suspended ceiling grid',
      },
    ],
    featured: true,
    href: '/services#ceilings',
  },
  {
    id: 'paving-site-works',
    title: 'Paving & Site Works',
    slug: 'paving-site-works',
    category: 'Paving',
    description:
      'Site preparation and hard landscaping that complete the exterior and improve how the property works.',
    location: 'Windhoek',
    year: 2023,
    images: [
      {
        url: '/assets/images/projects/paving-site-works.webp',
        alt: 'Aerial view of a prepared construction and paving site',
      },
    ],
    featured: true,
    href: '/services#paving',
  },
  {
    id: 'full-home-renovation',
    title: 'Full Home Renovation',
    slug: 'full-home-renovation',
    category: 'Renovation',
    description:
      'A whole-home renovation that reworked the layout, finishes, and natural light.',
    location: 'Windhoek',
    year: 2023,
    images: [
      {
        url: '/assets/images/projects/full-home-renovation.webp',
        alt: 'Before and after view of a completed home renovation',
      },
    ],
    featured: false,
    href: '/services#renovations',
  },
  {
    id: 'commercial-office-build',
    title: 'Commercial Office Build',
    slug: 'commercial-office-build',
    category: 'Commercial',
    description:
      'A commercial office build with a dark glass facade and a considered approach to natural light.',
    location: 'Windhoek',
    year: 2024,
    images: [
      {
        url: '/assets/images/projects/commercial-office-build.webp',
        alt: 'Modern commercial office building with dark glass facade',
      },
    ],
    featured: false,
    href: '/services#commercial-buildings',
  },
  {
    id: 'polished-concrete-interior',
    title: 'Polished Concrete Interior',
    slug: 'polished-concrete-interior',
    category: 'Concrete',
    description:
      'An exposed concrete interior finish that balances durability with a minimal, architectural look.',
    location: 'Windhoek',
    year: 2023,
    images: [
      {
        url: '/assets/images/projects/polished-concrete-interior.webp',
        alt: 'Polished concrete floor and walls in a minimal interior',
      },
    ],
    featured: false,
    href: '/services#concrete-construction',
  },
  {
    id: 'kitchen-renovation',
    title: 'Kitchen Renovation',
    slug: 'kitchen-renovation',
    category: 'Renovation',
    description:
      'A kitchen renovation focused on better storage, a practical layout, and a crisp modern finish.',
    location: 'Windhoek',
    year: 2024,
    images: [
      {
        url: '/assets/images/projects/kitchen-renovation.webp',
        alt: 'Modern kitchen renovation with island and new cabinetry',
      },
    ],
    featured: false,
    href: '/services#renovations',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
