import { AppLink as Link } from '@/components/ui/AppLink';
import type { NavItem } from '@/types';

interface NavigationProps {
  items: NavItem[];
  pathname: string;
}

function isActivePath(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

/**
 * Desktop primary navigation — Design Brief §5.4
 */
export function Navigation({ items, pathname }: NavigationProps) {
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-6 lg:gap-8">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                aria-current={active ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium uppercase tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 hover:text-white ${
                  active
                    ? 'text-white after:scale-x-100'
                    : 'text-white/75 after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
