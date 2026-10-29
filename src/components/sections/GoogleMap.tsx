import { FiExternalLink, FiMapPin } from 'react-icons/fi';

const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Windhoek,Namibia&output=embed';
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Windhoek%2C+Namibia';

/**
 * Windhoek map — TDD §5.4.
 * Uses the public Google Maps embed, so no API key is required.
 */
export function GoogleMap() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-concrete-light">
      <div className="relative h-[320px] w-full sm:h-[380px]">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-concrete-dark"
          aria-hidden="true"
        >
          <FiMapPin className="h-7 w-7 text-primary" />
          <p className="text-sm font-semibold">Windhoek, Namibia</p>
          <p className="text-xs">Loading map…</p>
        </div>
        <iframe
          src={MAP_EMBED_URL}
          title="Map of Windhoek, Namibia"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="relative h-full w-full border-0"
        />
      </div>
      <div className="border-t border-border bg-white px-4 py-3">
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-primary"
        >
          Open in Google Maps
          <FiExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
