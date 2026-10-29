'use client';

import type { RefObject } from 'react';
import { BsRobot } from 'react-icons/bs';

interface ChatbotWidgetProps {
  isVisible: boolean;
  onClick: () => void;
  buttonRef?: RefObject<HTMLButtonElement>;
}

/**
 * Chatbot launcher in the expanded FAB stack — PRD §7.2.
 */
export function ChatbotWidget({
  isVisible,
  onClick,
  buttonRef,
}: ChatbotWidgetProps) {
  if (!isVisible) return null;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label="Chat with the Toplin Investments assistant"
      aria-haspopup="dialog"
      className="group relative flex h-12 w-12 animate-fade-up items-center justify-center rounded-full border border-primary/40 bg-black text-white shadow-lg transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <BsRobot className="h-5 w-5" aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-btn bg-black px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-header transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        Chat with us
      </span>
    </button>
  );
}
