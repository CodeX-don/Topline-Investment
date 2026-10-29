import { AppLink as Link } from '@/components/ui/AppLink';
import type { IconType } from 'react-icons';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import {
  companyInfo,
  navigation,
  officeHours,
  socialLinks,
} from '@/data/company';
import type { SocialLink } from '@/types';
import { Logo } from './Logo';

// Footer service shortcuts — PRD §6.3
const serviceLinks = [
  { label: 'Residential Construction', href: '/services#residential-construction' },
  { label: 'Commercial Buildings', href: '/services#commercial-buildings' },
  { label: 'Renovations', href: '/services#renovations' },
  { label: 'Joinery', href: '/services#joinery' },
  { label: 'Paving', href: '/services#paving' },
];

const socialIcons: Record<SocialLink['icon'], IconType> = {
  instagram: FiInstagram,
  facebook: FiFacebook,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
};

const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
  "Hi Toplin Investments, I'm interested in your services."
)}`;

/**
 * Global footer — TDD §4.2.1
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 text-sm font-semibold text-white/90">
              {companyInfo.slogan}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-concrete">
              {companyInfo.description}
            </p>

            <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.icon];

                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${companyInfo.name} on ${link.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/15 text-white/80 transition-colors hover:border-primary hover:text-primary"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="inline-flex min-h-[44px] items-center text-sm text-concrete transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Services
            </h2>
            <ul className="mt-5 space-y-1">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    prefetch={false}
                    className="inline-flex min-h-[44px] items-center text-sm text-concrete transition-colors hover:text-primary"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Contact
            </h2>

            <address className="mt-5 space-y-1 not-italic">
              <p className="flex min-h-[44px] items-center gap-3 text-sm text-concrete">
                <FiMapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {companyInfo.city}, {companyInfo.country}
              </p>
              <a
                href={`tel:+${companyInfo.whatsappNumber}`}
                className="flex min-h-[44px] items-center gap-3 text-sm text-concrete transition-colors hover:text-primary"
              >
                <FiPhone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex min-h-[44px] items-center gap-3 text-sm text-concrete transition-colors hover:text-primary"
              >
                <FiMail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {companyInfo.email}
              </a>
              <p className="flex min-h-[44px] items-center gap-3 text-sm text-concrete">
                <FiClock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {officeHours}
              </p>
            </address>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-whatsapp transition-opacity hover:opacity-80"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-concrete sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {companyInfo.name}. All rights reserved.
          </p>
          <p>
            {companyInfo.city}, {companyInfo.country} &middot; {companyInfo.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
