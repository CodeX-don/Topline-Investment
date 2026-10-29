import { AppLink as Link } from '@/components/ui/AppLink';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

/**
 * Flat card with a restrained hover lift — Design Brief §5.2 / TDD §5.1
 */
export function Card({
  children,
  href,
  className = '',
  hover = true,
}: CardProps) {
  const classes = [
    'group relative overflow-hidden rounded-card border border-border bg-white transition-all duration-300',
    hover
      ? 'hover:-translate-y-1 hover:border-primary hover:shadow-card focus-within:border-primary'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link href={href} prefetch={false} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
