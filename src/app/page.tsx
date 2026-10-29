import type { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsGallery } from '@/components/sections/ProjectsGallery';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { mainServices } from '@/data/services';
import { featuredProjects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { createMetadata, pageSEO } from '@/utils/seo';

export const metadata: Metadata = createMetadata({
  ...pageSEO.home,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Building & Developing Your Vision in Windhoek."
        subtitle="Residential and commercial construction, renovations, and specialist finishing — delivered with precision, clear communication, and a proper finish."
        image="/assets/images/hero/home-hero.webp"
        imageAlt="Modern home built by Toplin Investments in Windhoek"
        eyebrow="Windhoek, Namibia"
        primaryCta={{ label: 'Get a Free Quote', href: '/contact' }}
        secondaryCta={{ label: 'View Our Projects', href: '#projects' }}
      />

      <ServicesOverview services={mainServices} />
      <WhyChooseUs />
      <ProjectsGallery projects={featuredProjects} />
      <Testimonials testimonials={testimonials} />
      <CTASection />
    </>
  );
}
