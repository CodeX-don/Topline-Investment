'use client';

import { AppLink as Link } from '@/components/ui/AppLink';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { FiMail, FiPhone, FiX } from 'react-icons/fi';
import { companyInfo } from '@/data/company';
import type { NavItem } from '@/types';
import { Logo } from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  items: NavItem[];
  triggerRef: RefObject<HTMLButtonElement>;
}

function isActivePath(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

/**
 * Slide-out mobile navigation drawer — Website Flow §2.2
 * Locks body scroll, traps focus, closes on Escape or navigation.
 */
export function MobileMenu({
  isOpen,
  onClose,
  pathname,
  items,
  triggerRef,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Links that point at the current page do not trigger a route change, so
  // close the drawer here. Other links are closed by Header once the pathname
  // updates, which avoids unmounting the link before Next.js handles the tap.
  const closeIfCurrentPage = (href: string) => {
    if (href === pathname) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const returnFocusTo =
      previouslyFocused && previouslyFocused !== document.body
        ? previouslyFocused
        : triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusTo?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div
        className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm animate-slide-in-right flex-col bg-black shadow-modal"
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <Logo onClick={() => closeIfCurrentPage('/')} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/20 text-white transition-colors hover:border-primary hover:text-primary"
          >
            <FiX className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col">
            {items.map((item, index) => {
              const active = isActivePath(pathname, item.href);

              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={() => closeIfCurrentPage(item.href)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between border-l-2 py-5 pl-4 font-heading text-lg font-bold uppercase tracking-wide transition-colors ${
                      active
                        ? 'border-primary text-white'
                        : 'border-transparent text-white/80 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`font-body text-[11px] font-medium tracking-widest ${
                        active ? 'text-primary' : 'text-concrete'
                      }`}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            prefetch={false}
            onClick={() => closeIfCurrentPage('/contact')}
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-btn bg-primary px-6 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-hover"
          >
            Get a Free Quote
          </Link>

          <div className="mt-10 space-y-3 border-t border-white/10 pt-6">
            <a
              href={`tel:+${companyInfo.whatsappNumber}`}
              className="flex min-h-[44px] items-center gap-3 text-sm text-white/80 transition-colors hover:text-primary"
            >
              <FiPhone className="h-4 w-4 shrink-0" aria-hidden="true" />
              {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex min-h-[44px] items-center gap-3 text-sm text-white/80 transition-colors hover:text-primary"
            >
              <FiMail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {companyInfo.email}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
