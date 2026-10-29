import type { ElementType, ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3';
type HeadingAlign = 'left' | 'center';
type HeadingTone = 'light' | 'dark';

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: string;
  as?: HeadingLevel;
  align?: HeadingAlign;
  tone?: HeadingTone;
  className?: string;
}

const titleSizes: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl',
  h2: 'text-3xl sm:text-4xl',
  h3: 'text-2xl',
};

/**
 * Shared section heading — TDD §5.1.
 * `tone="light"` is used on dark sections.
 */
export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  as = 'h2',
  align = 'left',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const Tag = as as ElementType;
  const isLight = tone === 'light';
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span
          className={`mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
            isLight ? 'text-white/80' : 'text-concrete-dark'
          }`}
        >
          <span className="h-0.5 w-8 bg-primary" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}

      <Tag
        className={`${titleSizes[as]} font-heading font-bold ${
          isLight ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </Tag>

      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${isLight ? 'text-concrete' : 'text-concrete-dark'}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
