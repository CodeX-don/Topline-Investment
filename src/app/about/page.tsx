import type { Metadata } from 'next';
import {
  FiArrowRight,
  FiEye,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTarget,
} from 'react-icons/fi';
import { CTASection } from '@/components/sections/CTASection';
import { HeroSection } from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { companyInfo } from '@/data/company';
import { createMetadata, pageSEO } from '@/utils/seo';

export const metadata: Metadata = createMetadata({
  ...pageSEO.about,
  path: '/about',
});

const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
  "Hi Toplin Investments, I'd like to talk about a project."
)}`;

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About Toplin Investments"
        subtitle="A Windhoek-based construction and development company built on quality workmanship, clear coordination, and the details that make a space feel finished."
        image="/assets/images/hero/about-hero.webp"
        imageAlt="Toplin Investments team on a construction site in Windhoek"
        eyebrow="Our Story"
        size="compact"
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="Who We Are"
                title="Our Story"
                subtitle="Construction with a clear standard — and a team that stays close to the work."
              />
            </Reveal>

            <Reveal delay={120} className="lg:col-span-8">
              <div className="space-y-5 text-base leading-relaxed text-concrete-dark">
                <p>
                  Toplin Investments is a Windhoek-based construction and
                  development company built on a simple belief: a build should be
                  as refined as the vision behind it. From new homes and
                  commercial spaces to renovations and specialist finishing, we
                  bring structural expertise and meticulous detail together.
                </p>
                <p>
                  Our team works closely with clients from the first
                  consultation through to handover, combining quality materials,
                  careful planning, and transparent communication. Whether it is
                  a family home, a commercial build, or a joinery and ceilings
                  package, the standard is the same: build it properly, finish it
                  beautifully.
                </p>
                <p className="border-l-2 border-primary pl-5 font-heading text-lg font-semibold text-black">
                  Proudly Namibian. Proudly Windhoek.
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-card">
                <Image
                  src="/assets/images/team/team-group.webp"
                  alt="Toplin Investments team gathered on site in safety gear"
                  width={1000}
                  height={750}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-concrete-light py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What Guides Us"
              title="Mission & Vision"
              subtitle="Two simple commitments shape how we plan, build, and hand over every project."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={80}>
              <Card hover={false} className="h-full p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn bg-primary/10 text-primary">
                  <FiTarget className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-black">
                  Our Mission
                </h3>
                <p className="mt-3 text-base leading-relaxed text-concrete-dark">
                  To deliver residential and commercial construction that meets
                  high standards of quality, safety, and craftsmanship — on time
                  and with clear communication from start to finish.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={160}>
              <Card hover={false} className="h-full p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn bg-primary/10 text-primary">
                  <FiEye className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold text-black">
                  Our Vision
                </h3>
                <p className="mt-3 text-base leading-relaxed text-concrete-dark">
                  To be Windhoek&apos;s trusted construction and development
                  partner, known for buildings that are as durable as they are
                  refined.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-card bg-concrete-light">
                <Image
                  src="/assets/images/team/team-on-site.webp"
                  alt="Toplin Investments team members working on site"
                  width={1000}
                  height={750}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading eyebrow="Leadership" title="Our Team" />

              <h3 className="mt-6 font-heading text-xl font-bold text-black">
                Ben — Founder &amp; Lead
              </h3>
              <p className="mt-3 text-base leading-relaxed text-concrete-dark">
                Ben leads Toplin Investments and works directly with clients
                across Windhoek — from the first site visit and quote through to
                planning, construction, and handover. He keeps the line between
                client and site short, so decisions are made quickly and the
                details do not get lost.
              </p>

              <ul className="mt-6 space-y-2">
                <li>
                  <a
                    href={`tel:+${companyInfo.whatsappNumber}`}
                    className="inline-flex min-h-[44px] items-center gap-3 text-sm font-medium text-concrete-dark transition-colors hover:text-primary"
                  >
                    <FiPhone className="h-4 w-4 text-primary" aria-hidden="true" />
                    {companyInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="inline-flex min-h-[44px] items-center gap-3 text-sm font-medium text-concrete-dark transition-colors hover:text-primary"
                  >
                    <FiMail className="h-4 w-4 text-primary" aria-hidden="true" />
                    {companyInfo.email}
                  </a>
                </li>
                <li className="inline-flex min-h-[44px] items-center gap-3 text-sm font-medium text-concrete-dark">
                  <FiMapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  {companyInfo.city}, {companyInfo.country}
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="md">
                  Get in Touch
                </Button>
                <Button
                  href={whatsappHref}
                  variant="secondary"
                  size="md"
                  ariaLabel="Chat with Toplin Investments on WhatsApp"
                >
                  Chat on WhatsApp
                  <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Work With Us"
        title="Let's Build Something Together"
        description="Bring us your plans, your site, or just the idea. We will help you turn it into a clear, buildable project."
      />
    </>
  );
}
