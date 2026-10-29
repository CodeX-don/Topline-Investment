import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Image } from '@/components/ui/Image';

interface Cta {
  label: string;
  href: string;
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  eyebrow?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  size?: 'full' | 'compact';
}

/**
 * Full-bleed hero — PRD §6.1 / Design Brief §5.3.
 * The home page uses the full treatment; interior pages use the compact one.
 */
export function HeroSection({
  title,
  subtitle,
  image,
  imageAlt,
  eyebrow = 'Windhoek, Namibia',
  primaryCta,
  secondaryCta,
  size = 'full',
}: HeroSectionProps) {
  const isFull = size === 'full';

  return (
    <section
      className={`relative flex items-center overflow-hidden bg-black ${
        isFull ? 'min-h-[88vh]' : 'min-h-[62vh]'
      }`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          width={1920}
          height={1080}
          priority
          quality={82}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"
          aria-hidden="true"
        />
      </div>

      <Container className={`relative z-10 ${isFull ? 'py-32 lg:py-40' : 'pb-20 pt-32 lg:pb-24 lg:pt-40'}`}>
        <div className="max-w-4xl animate-fade-up">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            <span className="h-0.5 w-8 bg-primary" aria-hidden="true" />
            {eyebrow}
          </span>

          <h1
            className={`mt-6 max-w-4xl font-heading font-extrabold text-white ${
              isFull
                ? 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'
                : 'text-4xl sm:text-5xl lg:text-6xl'
            }`}
          >
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {subtitle}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryCta ? (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
