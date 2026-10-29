import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-black pb-20 pt-32 lg:pt-40">
      <Container>
        <p className="font-heading text-7xl font-extrabold text-primary sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 max-w-2xl font-heading text-4xl font-extrabold text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-concrete">
          The page you are looking for may have moved or no longer exists. Head
          back home, or get in touch and we will point you in the right
          direction.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
