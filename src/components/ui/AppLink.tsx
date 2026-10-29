'use client';

import Link from 'next/link';
import { forwardRef, type ComponentProps, type MouseEvent } from 'react';

type AppLinkProps = ComponentProps<typeof Link>;

/**
 * Next.js Link with a safety net.
 *
 * A click that lands while the App Router is still initialising (or while a
 * prefetch is in flight) can occasionally have its default action cancelled
 * without a navigation taking place. If the URL has not changed shortly after
 * the click, fall back to a normal browser navigation so the link always works.
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  function AppLink(
    { href, onClick, prefetch = false, target, ...props },
    ref
  ) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (target && target !== '_self')
      ) {
        return;
      }

      const destination = href.toString();

      // Only internal paths/hashes need the fallback; external links, email
      // and telephone links are handled by the browser.
      if (!destination.startsWith('/') && !destination.startsWith('#')) return;

      let targetUrl: string;
      try {
        targetUrl = new URL(destination, window.location.href).href;
      } catch {
        return;
      }

      const currentUrl = window.location.href;
      if (targetUrl === currentUrl) return;

      window.setTimeout(() => {
        if (window.location.href === currentUrl) {
          window.location.assign(targetUrl);
        }
      }, 600);
    }

    return (
      <Link
        ref={ref}
        href={href}
        prefetch={prefetch}
        target={target}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
