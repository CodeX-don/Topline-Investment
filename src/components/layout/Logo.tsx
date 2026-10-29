import { AppLink as Link } from '@/components/ui/AppLink';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Text wordmark used until the official logo asset is supplied.
 */
export function Logo({ className = '', onClick }: LogoProps) {
  return (
    <Link
      href="/"
      prefetch={false}
      onClick={onClick}
      aria-label="Toplin Investments — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="h-9 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-extrabold uppercase tracking-[0.08em] text-white lg:text-2xl">
          Toplin
        </span>
        <span className="mt-1 font-body text-[9px] font-semibold uppercase tracking-[0.42em] text-white/60">
          Investments
        </span>
      </span>
    </Link>
  );
}
