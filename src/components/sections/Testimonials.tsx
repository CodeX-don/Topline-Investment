import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Testimonial } from '@/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

/**
 * Testimonials — TDD §5.2.
 * Renders nothing until verified client quotes are available.
 */
export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-concrete-light py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client Feedback"
          title="What Our Clients Say"
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex h-full flex-col rounded-card border border-border bg-white p-6"
            >
              <FaQuoteLeft className="h-6 w-6 text-primary" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-concrete-dark">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div
                  className="flex gap-1 text-warning"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-4 w-4 ${
                        index < testimonial.rating ? '' : 'text-border'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-2 font-heading text-sm font-bold text-black">
                  {testimonial.name}
                </p>
                {testimonial.role || testimonial.company ? (
                  <p className="text-xs text-concrete-dark">
                    {[testimonial.role, testimonial.company]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
