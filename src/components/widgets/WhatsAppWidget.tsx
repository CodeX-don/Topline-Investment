'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '@/utils/chatbot';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  prefillMessage?: string;
  isVisible: boolean;
  onOpened: () => void;
  highlighted?: boolean;
}

/**
 * WhatsApp launcher in the expanded FAB stack — PRD §7.1.
 */
export function WhatsAppWidget({
  phoneNumber,
  prefillMessage = "Hi Toplin Investments, I'm interested in your services.",
  isVisible,
  onOpened,
  highlighted = false,
}: WhatsAppWidgetProps) {
  if (!isVisible) return null;

  const href =
    phoneNumber === undefined
      ? getWhatsAppUrl(prefillMessage)
      : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefillMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onOpened}
      aria-label="Chat on WhatsApp"
      className={`group relative flex h-12 w-12 animate-fade-up items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all hover:bg-[#1FBF5B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
        highlighted ? 'ring-4 ring-whatsapp/40' : ''
      }`}
    >
      <FaWhatsapp
        className="h-6 w-6 text-[#0B3D24]"
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-btn bg-black px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-header transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        WhatsApp
      </span>
    </a>
  );
}
