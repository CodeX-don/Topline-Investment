'use client';

import { AppLink as Link } from '@/components/ui/AppLink';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { navigation } from '@/data/company';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Navigation } from './Navigation';

/**
 * Fixed site header — Website Flow §1.2 / Design Brief §5.4
 * Transparent over the hero, solid Deep Black after 50px of scroll.
 */
export function Header() {
  const isScrolled = useScrollPosition(50);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const openMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);

  // Close the drawer after a route change. Doing this here (rather than in the
  // link's click handler) lets Next.js finish handling the click and start the
  // navigation before the link is unmounted.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black shadow-header'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-6 lg:h-24">
        <Logo />

        <Navigation items={navigation} pathname={pathname} />

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            prefetch={false}
            className="hidden h-11 items-center justify-center rounded-btn bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex"
          >
            Get a Free Quote
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={openMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/20 text-white transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            <FiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        items={navigation}
        triggerRef={menuButtonRef}
      />
    </header>
  );
}
