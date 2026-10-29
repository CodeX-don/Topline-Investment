import type { Service } from '@/types';

/**
 * Service catalogue — PRD §6.3 / TDD §6.2
 * Copy is intentionally grounded in the services listed in the brief.
 */
export const services: Service[] = [
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    slug: 'residential-construction',
    category: 'residential',
    icon: 'home',
    shortDescription:
      'New homes and custom residential builds, from foundations to final finishes.',
    description:
      'We build homes for the way you want to live. From first foundations to the final coat of paint, our residential construction service combines structural quality with the finishes that make a house feel considered.',
    features: [
      'Custom home builds',
      'Quality materials',
      'On-time delivery',
      'Windhoek-based team',
    ],
    image: '/assets/images/services/residential-construction.webp',
  },
  {
    id: 'commercial-buildings',
    title: 'Commercial Buildings',
    slug: 'commercial-buildings',
    category: 'commercial',
    icon: 'building',
    shortDescription:
      'Commercial buildings and fit-outs designed to perform for your business.',
    description:
      'Commercial spaces need to work as hard as you do. We deliver office, retail, and light industrial builds with a focus on durable finishes, practical layouts, and coordinated site delivery.',
    features: [
      'Office & retail builds',
      'Site coordination',
      'Compliance-focused delivery',
      'Durable finishes',
    ],
    image: '/assets/images/services/commercial-buildings.webp',
  },
  {
    id: 'renovations',
    title: 'Renovations',
    slug: 'renovations',
    category: 'renovation',
    icon: 'renovation',
    shortDescription:
      'Thoughtful renovations that modernise and add value to existing spaces.',
    description:
      'A good renovation respects what is already there while making it work better. We update homes and workspaces with careful planning, minimal disruption, and a clean finish.',
    features: [
      'Kitchens & bathrooms',
      'Structural updates',
      'Interior refreshes',
      'Minimal disruption',
    ],
    image: '/assets/images/services/renovations.webp',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    slug: 'project-management',
    category: 'commercial',
    icon: 'clipboard',
    shortDescription:
      'End-to-end coordination of your build, from planning through to handover.',
    description:
      'Good projects are managed, not left to chance. We coordinate budgets, programmes, suppliers, and site teams so your project moves forward with clear decisions and fewer surprises.',
    features: [
      'Budget oversight',
      'Programme planning',
      'Contractor coordination',
      'Quality control',
    ],
    image: '/assets/images/services/project-management.webp',
  },
  {
    id: 'joinery',
    title: 'Joinery',
    slug: 'joinery',
    category: 'finishing',
    icon: 'joinery',
    shortDescription:
      'Custom cabinetry, wardrobes, shelving, and built-in joinery, finished to detail.',
    description:
      'Our specialist joinery service brings precision to the details you touch every day: fitted wardrobes, custom cabinetry, shelving, and built-in storage made for the space.',
    features: [
      'Built-in cabinetry',
      'Wardrobes',
      'Shelving & storage',
      'Custom finishes',
    ],
    image: '/assets/images/services/joinery.webp',
  },
  {
    id: 'ceilings',
    title: 'Ceilings',
    slug: 'ceilings',
    category: 'finishing',
    icon: 'ceilings',
    shortDescription:
      'Suspended and decorative ceiling systems with clean lines and a professional finish.',
    description:
      'Ceilings shape how a room feels and performs. We install suspended and decorative ceiling systems with precise setting-out, tidy service integration, and a finish that is ready for handover.',
    features: [
      'Suspended ceilings',
      'Bulkheads',
      'Insulation',
      'Precise installation',
    ],
    image: '/assets/images/services/ceilings.webp',
  },
  {
    id: 'paving',
    title: 'Paving',
    slug: 'paving',
    category: 'finishing',
    icon: 'paving',
    shortDescription:
      'Paving and hard landscaping that completes the exterior of your property.',
    description:
      'The outside of a property deserves the same attention as the inside. We prepare and lay paving for driveways, walkways, and outdoor areas with a focus on levels, drainage, and durability.',
    features: [
      'Driveways',
      'Walkways',
      'Site preparation',
      'Durable finishes',
    ],
    image: '/assets/images/services/paving.webp',
  },
  {
    id: 'concrete-construction',
    title: 'Concrete Construction',
    slug: 'concrete-construction',
    category: 'finishing',
    icon: 'concrete',
    shortDescription:
      'Concrete works and structural finishing, executed with precision and durability.',
    description:
      'From foundations and slabs to exposed structural finishes, our concrete work is set out, poured, and finished with the accuracy a build depends on.',
    features: [
      'Foundations',
      'Slabs',
      'Structural concrete',
      'Surface finishing',
    ],
    image: '/assets/images/services/concrete-construction.webp',
  },
];

export const mainServices = services.filter((service) =>
  ['residential', 'commercial', 'renovation'].includes(service.category)
);

export const finishingServices = services.filter(
  (service) => service.category === 'finishing'
);

export const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'We listen to your vision, assess the site, and understand your budget and priorities.',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'We prepare the scope, materials, and programme so everyone knows what happens next.',
  },
  {
    number: '03',
    title: 'Construction',
    description:
      'Our team builds with quality materials, careful coordination, and clear communication.',
  },
  {
    number: '04',
    title: 'Handover',
    description:
      'We complete the finishing, walk the project with you, and hand over a space ready to use.',
  },
] as const;
