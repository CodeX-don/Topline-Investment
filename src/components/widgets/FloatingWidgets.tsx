'use client';

import { useEffect, useRef, useState } from 'react';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import { ChatbotModal } from './ChatbotModal';
import { ChatbotWidget } from './ChatbotWidget';
import { WhatsAppWidget } from './WhatsAppWidget';

interface FloatingWidgetsProps {
  whatsappNumber: string;
}

/**
 * Floating action button stack — PRD §7 / Website Flow §4.
 */
export function FloatingWidgets({ whatsappNumber }: FloatingWidgetsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [highlightWhatsApp, setHighlightWhatsApp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const chatbotButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen || isChatbotOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setHighlightWhatsApp(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setHighlightWhatsApp(false);
        mainButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, isChatbotOpen]);

  function toggleMenu() {
    setIsMenuOpen((open) => {
      if (open) {
        setHighlightWhatsApp(false);
      }
      return !open;
    });
  }

  function handleWhatsAppOpened() {
    setIsMenuOpen(false);
    setIsChatbotOpen(false);
    setHighlightWhatsApp(false);
  }

  return (
    <>
      {isChatbotOpen ? (
        <ChatbotModal
          onClose={() => setIsChatbotOpen(false)}
          triggerRef={chatbotButtonRef}
          onHighlightWhatsApp={setHighlightWhatsApp}
        />
      ) : null}

      <div
        ref={containerRef}
        className="fixed bottom-5 right-5 z-[1000] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      >
        {isMenuOpen ? (
          <div
            id="floating-contact-options"
            className="flex flex-col items-end gap-3"
          >
            <ChatbotWidget
              isVisible
              onClick={() => setIsChatbotOpen(true)}
              buttonRef={chatbotButtonRef}
            />
            <div
              className="animate-fade-up"
              style={{ animationDelay: '70ms' }}
            >
              <WhatsAppWidget
                phoneNumber={whatsappNumber}
                isVisible
                onOpened={handleWhatsAppOpened}
                highlighted={highlightWhatsApp}
              />
            </div>
          </div>
        ) : null}

        <button
          ref={mainButtonRef}
          type="button"
          onClick={toggleMenu}
          aria-label={
            isMenuOpen ? 'Close contact options' : 'Open contact options'
          }
          aria-expanded={isMenuOpen}
          aria-controls="floating-contact-options"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" aria-hidden="true" />
          ) : (
            <FiMessageCircle className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
