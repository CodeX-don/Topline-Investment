import type { CompanyInfo, NavItem, SocialLink } from '@/types';

// Company information — TDD §6.2
export const companyInfo: CompanyInfo = {
  name: 'Toplin Investments',
  tagline: 'Building & Developing',
  slogan: '#YourVisionOurBuild',
  description:
    'Expert residential and commercial construction in Windhoek, Namibia. Building, renovations, joinery, ceilings, and paving.',
  address: 'Windhoek',
  city: 'Windhoek',
  country: 'Namibia',
  phone: '+264 81 718 4507',
  email: 'ben@toplin.com.na',
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '264817184507',
};

// Primary navigation — PRD §5
export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

// Verified social profiles — TDD §7.2
export const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/toplin_investments',
    icon: 'instagram',
  },
];

export const officeHours = 'Monday – Friday, 08:00 – 17:00';
