import { FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const reasons = [
  {
    title: 'Licensed & Professional',
    description:
      'A professional team that takes safety, site standards, and accountability seriously.',
  },
  {
    title: 'On-Time Delivery',
    description:
      'Clear programmes and proactive coordination keep your project moving forward.',
  },
  {
    title: 'Quality Materials',
    description:
      'We specify materials that are fit for purpose and built to last in Namibian conditions.',
  },
  {
    title: 'Local Windhoek Team',
    description:
      'Based in Windhoek, with direct access to local suppliers, trades, and site knowledge.',
  },
];

/**
 * Trust section — PRD §6.1.
 */
export function WhyChooseUs() {
  return (
    <section className="bg-concrete-light py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div
                className="absolute -bottom-4 -right-4 h-full w-full border-2 border-primary"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-card bg-concrete">
                <Image
                  src="/assets/images/team/team-planning.webp"
                  alt="Toplin Investments team reviewing construction plans on site"
                  width={1000}
                  height={750}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Why Toplin"
              title="Why Choose Toplin Investments"
              subtitle="Construction is a partnership. We bring the experience, coordination, and finishing standards to make your project feel straightforward."
            />

            <ul className="mt-8 space-y-5">
              {reasons.map((reason) => (
                <li key={reason.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <FiCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-black">
                      {reason.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-concrete-dark">
                      {reason.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button href="/contact" size="md">
                Get a Free Quote
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
