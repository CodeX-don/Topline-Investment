import { AppLink as Link } from '@/components/ui/AppLink';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover focus-visible:outline-primary',
  secondary:
    'border-2 border-black bg-transparent text-black hover:bg-black hover:text-white focus-visible:outline-black',
  outline:
    'border-2 border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-black focus-visible:outline-white',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-11 px-4 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

/**
 * Brand button — Design Brief §5.1 / TDD §5.1
 * Rectangular with a 6px radius (never a pill); all sizes meet the 44px target.
 */
export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  target,
  rel,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const isExternal = /^https?:\/\//.test(href);

    return (
      <Link
        href={href}
        prefetch={false}
        className={classes}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
