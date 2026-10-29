import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import { ContactForm } from '@/components/sections/ContactForm';
import { FAQSection } from '@/components/sections/FAQSection';
import { GoogleMap } from '@/components/sections/GoogleMap';
import { HeroSection } from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { companyInfo, officeHours } from '@/data/company';
import { createMetadata, pageSEO } from '@/utils/seo';

export const metadata: Metadata = createMetadata({
  ...pageSEO.contact,
  path: '/contact',
});

const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
  "Hi Toplin Investments, I'd like to discuss a project."
)}`;

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Get In Touch"
        subtitle="Tell us about your project, ask a question, or arrange a consultation. We work across Windhoek and are ready to help."
        image="/assets/images/hero/contact-hero.webp"
        imageAlt="Modern glass office building in Windhoek"
        eyebrow="Contact Toplin"
        size="compact"
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Talk to Us"
                title="Contact Information"
                subtitle="Call, email, or message us on WhatsApp. For project enquiries, the form is the quickest way to share the details."
              />

              <address className="mt-8 space-y-4 not-italic">
                <a
                  href={`tel:+${companyInfo.whatsappNumber}`}
                  className="flex min-h-[56px] items-start gap-4 rounded-btn border border-border p-4 transition-colors hover:border-primary"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary">
                    <FiPhone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-concrete-dark">
                      Phone
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-black">
                      {companyInfo.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex min-h-[56px] items-start gap-4 rounded-btn border border-border p-4 transition-colors hover:border-primary"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary">
                    <FiMail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-concrete-dark">
                      Email
                    </span>
                    <span className="mt-1 block break-all text-sm font-semibold text-black">
                      {companyInfo.email}
                    </span>
                  </span>
                </a>

                <div className="flex min-h-[56px] items-start gap-4 rounded-btn border border-border p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary">
                    <FiMapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-concrete-dark">
                      Location
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-black">
                      {companyInfo.city}, {companyInfo.country}
                    </span>
                  </span>
                </div>

                <div className="flex min-h-[56px] items-start gap-4 rounded-btn border border-border p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary">
                    <FiClock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-concrete-dark">
                      Office Hours
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-black">
                      {officeHours}
                    </span>
                  </span>
                </div>
              </address>

              <div className="mt-6">
                <Button
                  href={whatsappHref}
                  variant="secondary"
                  size="md"
                  ariaLabel="Chat with Toplin Investments on WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                  Chat on WhatsApp
                </Button>
              </div>

              <div className="mt-10">
                <GoogleMap />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <div id="contact-form" className="scroll-mt-24">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FAQSection />
    </>
  );
}
