import { AppLink as Link } from '@/components/ui/AppLink';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Project } from '@/types';

interface ProjectsGalleryProps {
  projects: Project[];
}

/**
 * Featured project gallery — PRD §6.1 / TDD §5.2.
 */
export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Our Work"
              title="Featured Projects"
              subtitle="A look at recent residential, commercial, and specialist finishing work."
            />
            <Link
              href="/services"
              prefetch={false}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-black transition-colors hover:text-primary"
            >
              Explore Services
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2 lg:col-span-3">
            <Card href={lead.href ?? '/services'} className="h-full">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-concrete-light lg:aspect-auto lg:min-h-[360px]">
                  <Image
                    src={lead.images[0].url}
                    alt={lead.images[0].alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-10">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {lead.category}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-bold text-black lg:text-3xl">
                    {lead.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-concrete-dark">
                    {lead.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-concrete-dark">
                    <FiMapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {lead.location} &middot; {lead.year}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {rest.map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <Card href={project.href ?? '/services'} className="h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-concrete-light">
                  <Image
                    src={project.images[0].url}
                    alt={project.images[0].alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-black">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-dark">
                    {project.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
