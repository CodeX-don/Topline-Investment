'use client';

import type { RefObject } from 'react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { BsRobot } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { FiSend, FiX } from 'react-icons/fi';
import { useChatbot } from '@/hooks/useChatbot';
import type { ChatbotMessage } from '@/types';
import { getWhatsAppUrl } from '@/utils/chatbot';

interface ChatbotModalProps {
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement>;
  onHighlightWhatsApp?: (highlighted: boolean) => void;
}

function MessageBubble({
  message,
  showQuickReplies,
  onQuickReply,
}: {
  message: ChatbotMessage;
  showQuickReplies: boolean;
  onQuickReply: (value: string) => void;
}) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot ? (
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
          <BsRobot className="h-4 w-4" aria-hidden="true" />
        </span>
      ) : null}

      <div className={`max-w-[85%] ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div
          className={`rounded-lg p-3 text-sm leading-relaxed ${
            isBot
              ? 'rounded-tl-none border border-border bg-white text-concrete-dark'
              : 'rounded-tr-none bg-primary text-white'
          }`}
        >
          {message.text}
        </div>

        {isBot && showQuickReplies && message.quickReplies?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.quickReplies.map((reply) => {
              const isWhatsApp = reply.variant === 'whatsapp';

              return (
                <button
                  key={`${message.id}-${reply.value}`}
                  type="button"
                  onClick={() => onQuickReply(reply.value)}
                  className={`min-h-[44px] rounded-btn border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isWhatsApp
                      ? 'border-whatsapp bg-whatsapp text-[#0B3D24] hover:bg-[#1FBF5B] focus-visible:outline-black'
                      : 'border-primary/40 bg-white text-primary hover:bg-primary hover:text-white focus-visible:outline-primary'
                  }`}
                >
                  {reply.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Chatbot drawer — PRD §7.2 / Website Flow §4.4.
 * Locks scroll, traps focus, closes on Escape, and restores focus to the FAB.
 */
export function ChatbotModal({
  onClose,
  triggerRef,
  onHighlightWhatsApp,
}: ChatbotModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const {
    messages,
    isTyping,
    sendMessage,
    highlightWhatsApp,
    clearHighlight,
  } = useChatbot({ onClose });

  const lastMessage = messages[messages.length - 1];
  const showQuickReplies = !isTyping && lastMessage?.sender === 'bot';

  useEffect(() => {
    onHighlightWhatsApp?.(highlightWhatsApp);
  }, [highlightWhatsApp, onHighlightWhatsApp]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const returnFocusTo =
      triggerRef?.current ??
      (previouslyFocused && previouslyFocused !== document.body
        ? previouslyFocused
        : null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      0
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [onClose, triggerRef]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    messagesEndRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'end',
    });
  }, [messages, isTyping]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  }

  return (
    <div className="fixed inset-0 z-[1001] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-end sm:justify-end sm:p-6">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-title"
        className="relative flex h-[80vh] max-h-[620px] w-full max-w-md animate-scale-in flex-col overflow-hidden rounded-t-card bg-white shadow-modal sm:mb-20 sm:h-[540px] sm:max-h-[calc(100vh-8rem)] sm:rounded-card"
      >
        <div className="flex shrink-0 items-center justify-between bg-primary px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20">
              <BsRobot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3
                id="chatbot-title"
                className="font-heading text-sm font-bold text-white"
              >
                Toplin Investments Chat
              </h3>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-white">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-green-300"
                  aria-hidden="true"
                />
                Rule-based assistant
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-white/30 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
          className="flex-1 space-y-4 overflow-y-auto overscroll-contain bg-concrete-light p-4"
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              showQuickReplies={showQuickReplies && message.id === lastMessage?.id}
              onQuickReply={sendMessage}
            />
          ))}

          {isTyping ? (
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <BsRobot className="h-4 w-4" aria-hidden="true" />
              </span>
              <div
                className="flex items-center gap-1 rounded-lg rounded-tl-none border border-border bg-white px-3 py-3"
                aria-label="Assistant is typing"
              >
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-concrete" />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-concrete"
                  style={{ animationDelay: '120ms' }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-concrete"
                  style={{ animationDelay: '240ms' }}
                />
              </div>
            </div>
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        {highlightWhatsApp ? (
          <div className="shrink-0 border-t border-border bg-white px-3 pt-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={clearHighlight}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-btn bg-whatsapp px-4 text-sm font-bold text-[#0B3D24] transition-colors hover:bg-[#1FBF5B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              Chat with Ben on WhatsApp
            </a>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="flex shrink-0 items-center gap-2 border-t border-border bg-white p-3"
        >
          <label htmlFor="chatbot-input" className="sr-only">
            Type your message
          </label>
          <input
            id="chatbot-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={500}
            placeholder="Type a message…"
            autoComplete="off"
            className="min-h-[44px] flex-1 rounded-btn border border-concrete bg-input px-3 text-sm text-black placeholder:text-concrete-dark focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-primary text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSend className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
