'use client';

import { useEffect, useRef, useState } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ReadonlyArray<ProcessStep>;
}

/**
 * Process timeline — PRD §6.3 / Website Flow §8.2.
 * The connector draws and steps reveal as the section enters the viewport.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const fallback = window.setTimeout(() => setVisible(true), 4000);

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className="relative mt-12">
      <div
        className="absolute left-6 top-0 h-full w-px -translate-x-1/2 bg-border md:left-0 md:top-6 md:h-px md:w-full md:translate-x-0"
        aria-hidden="true"
      >
        <div
          className={`h-full w-full origin-top bg-primary transition-transform duration-1000 ease-out md:origin-left ${
            visible ? 'scale-y-100 md:scale-x-100' : 'scale-y-0 md:scale-x-0'
          }`}
        />
      </div>

      <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className={`relative pl-16 transition-all duration-700 ease-out md:pl-0 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-white font-heading text-sm font-bold text-primary md:relative md:mb-6">
              {step.number}
            </span>
            <h3 className="font-heading text-lg font-bold text-black">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-concrete-dark">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
