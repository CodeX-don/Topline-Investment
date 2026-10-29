import { AppLink as Link } from '@/components/ui/AppLink';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import type { Service } from '@/types';

interface ServicesOverviewProps {
  services: Service[];
  showCta?: boolean;
}

/**
 * Home services grid — PRD §6.1.
 */
export function ServicesOverview({
  services,
  showCta = true,
}: ServicesOverviewProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            subtitle="From new builds to the finishing details, we deliver construction and development work across Windhoek."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 80}>
              <Card href={`/services#${service.slug}`} className="h-full">
                {service.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-concrete-light">
                    <Image
                      src={service.image}
                      alt={`${service.title} by Toplin Investments`}
                      width={900}
                      height={675}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}

                <div className="p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-btn bg-primary/10 text-primary">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-black">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-dark">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    Explore Service
                    <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {showCta ? (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              prefetch={false}
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-primary"
            >
              View All Services
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
