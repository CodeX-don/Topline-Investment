import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { companyInfo } from '@/data/company';

interface CTASectionProps {
  title?: string;
  description?: string;
  eyebrow?: string;
  image?: string;
}

const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
  "Hi Toplin Investments, I'd like to discuss a project."
)}`;

/**
 * Dark closing CTA — PRD §6.1 / TDD §5.2.
 */
export function CTASection({
  title = 'Ready to Start Your Project?',
  description = "Tell us what you have in mind. We'll arrange a consultation, assess the scope, and give you a clear next step.",
  eyebrow = 'Start a Conversation',
  image = '/assets/images/hero/cta-construction.webp',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-black py-20 lg:py-28">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Construction site with a crane at sunset"
          width={1920}
          height={1080}
          sizes="100vw"
          className="h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              subtitle={description}
              align="center"
              tone="light"
            />

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Get a Free Quote
              </Button>
              <Button
                href={whatsappHref}
                variant="outline"
                size="lg"
                ariaLabel="Chat with Toplin Investments on WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
