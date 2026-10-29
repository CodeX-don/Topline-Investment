import type { Metadata } from 'next';
import { AppLink as Link } from '@/components/ui/AppLink';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { CTASection } from '@/components/sections/CTASection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { ServiceSchema } from '@/components/seo/SchemaMarkup';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import {
  finishingServices,
  mainServices,
  processSteps,
  services,
} from '@/data/services';
import { createMetadata, pageSEO } from '@/utils/seo';

export const metadata: Metadata = createMetadata({
  ...pageSEO.services,
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      {services.map((service) => (
        <ServiceSchema key={service.id} service={service} />
      ))}

      <HeroSection
        title="Our Construction Services"
        subtitle="Residential and commercial builds, renovations, project management, and specialist finishing — all under one coordinated team."
        image="/assets/images/hero/services-hero.webp"
        imageAlt="Toplin Investments construction site with workers and equipment"
        eyebrow="What We Do"
        size="compact"
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Core Services"
              title="What We Build"
              subtitle="From the first foundation to the final finish, we deliver work that is planned properly and built to last."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {mainServices.map((service, index) => (
              <Reveal
                key={service.id}
                delay={index * 80}
                className="scroll-mt-28"
              >
                <article id={service.slug} className="scroll-mt-28">
                  <Card hover={false} className="h-full">
                    {service.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden bg-concrete-light">
                        <Image
                          src={service.image}
                          alt={`${service.title} service by Toplin Investments`}
                          width={900}
                          height={675}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}

                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-btn bg-primary/10 text-primary">
                          <ServiceIcon name={service.icon} />
                        </span>
                        <h3 className="font-heading text-xl font-bold text-black">
                          {service.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-concrete-dark">
                        {service.description}
                      </p>

                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-concrete-dark"
                          >
                            <FiCheck
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contact"
                        prefetch={false}
                        className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-primary"
                      >
                        Discuss This Service
                        <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </Card>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-concrete-light py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Details"
              title="Specialized Finishing"
              subtitle="The finishing work that makes a project feel complete — delivered by a team that cares about the lines you see and the ones you do not."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {finishingServices.map((service, index) => (
              <Reveal
                key={service.id}
                delay={index * 80}
                className="scroll-mt-28"
              >
                <article id={service.slug} className="scroll-mt-28">
                  <Card hover={false} className="h-full p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn bg-primary text-white">
                      <ServiceIcon name={service.icon} />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-bold text-black">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-concrete-dark">
                      {service.shortDescription}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs text-concrete-dark"
                        >
                          <FiCheck
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      prefetch={false}
                      className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-black transition-colors hover:text-primary"
                    >
                      Get a Quote
                      <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Card>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How We Work"
              title="Our Process"
              subtitle="A clear sequence from first conversation to handover, so you always know what happens next."
            />
          </Reveal>

          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      <CTASection
        eyebrow="Your Project"
        title="Tell Us What You Have in Mind"
        description="Whether it is a new build, a renovation, or a specialist finishing package, we will help you scope the next step."
      />
    </>
  );
}
