'use client';

import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faqs';

/**
 * Accessible FAQ accordion — PRD §6.4 / TDD §5.4.
 * Also doubles as the chatbot's reference content.
 */
export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faqs" className="scroll-mt-24 bg-concrete-light py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Good to Know"
            title="FAQs"
            subtitle="Quick answers about our services, location, and how to get started."
            align="center"
          />

          <div className="mt-10 divide-y divide-border rounded-card border border-border bg-white">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id} className="px-5 sm:px-6">
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left font-heading text-base font-bold text-black transition-colors hover:text-primary"
                    >
                      <span>{faq.question}</span>
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary">
                        {isOpen ? (
                          <FiMinus className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <FiPlus className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </h3>

                  {isOpen ? (
                    <div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-button-${faq.id}`}
                      className="pb-5 pr-10 text-sm leading-relaxed text-concrete-dark animate-fade-in"
                    >
                      {faq.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
