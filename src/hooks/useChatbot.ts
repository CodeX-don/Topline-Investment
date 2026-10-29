'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatbotMessage } from '@/types';
import {
  CHAT_STORAGE_KEY,
  createGreetingMessage,
  createMessageId,
  findMatchingRule,
  getEmailUrl,
  getWhatsAppUrl,
} from '@/utils/chatbot';

interface UseChatbotOptions {
  onClose?: () => void;
}

interface StoredMessage extends Omit<ChatbotMessage, 'timestamp'> {
  timestamp: string;
}

function loadStoredMessages(): ChatbotMessage[] | null {
  try {
    const raw = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredMessage[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    return parsed
      .filter(
        (message) =>
          message &&
          typeof message.text === 'string' &&
          (message.sender === 'bot' || message.sender === 'user')
      )
      .map((message) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      }));
  } catch {
    return null;
  }
}

/**
 * Chatbot state, persistence, and action handling — Website Flow §4.4 / §7.
 * Messages persist for the browser session.
 */
export function useChatbot({ onClose }: UseChatbotOptions = {}) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatbotMessage[]>(() => [
    createGreetingMessage(),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [highlightWhatsApp, setHighlightWhatsApp] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    const stored = loadStoredMessages();
    if (stored && stored.length > 0) {
      setMessages(stored);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      const stored: StoredMessage[] = messages.map((message) => ({
        ...message,
        timestamp: message.timestamp.toISOString(),
      }));
      window.sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Session storage can be unavailable in private browsing; chat still works.
    }
  }, [messages, isHydrated]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) {
        window.clearTimeout(typingTimer.current);
      }
    };
  }, []);

  const clearHighlight = useCallback(() => setHighlightWhatsApp(false), []);

  const sendMessage = useCallback(
    (rawText: string) => {
      const text = rawText.trim().slice(0, 500);
      if (!text || isTyping) return;

      const userMessage: ChatbotMessage = {
        id: createMessageId(),
        sender: 'user',
        text,
        timestamp: new Date(),
      };

      setMessages((current) => [...current, userMessage]);
      setIsTyping(true);

      if (typingTimer.current) {
        window.clearTimeout(typingTimer.current);
      }

      typingTimer.current = window.setTimeout(() => {
        const rule = findMatchingRule(text);
        const botMessage: ChatbotMessage = {
          id: createMessageId(),
          sender: 'bot',
          text: rule.response,
          timestamp: new Date(),
          quickReplies: rule.quickReplies,
          isFallback: rule.id === 'fallback',
        };

        setMessages((current) => [...current, botMessage]);
        setIsTyping(false);

        if (rule.id === 'fallback') {
          setHighlightWhatsApp(true);
        }

        switch (rule.action) {
          case 'open_whatsapp':
            setHighlightWhatsApp(false);
            window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
            break;
          case 'open_email':
            window.location.href = rule.actionTarget ?? getEmailUrl();
            break;
          case 'open_url':
            if (rule.actionTarget) {
              window.open(
                rule.actionTarget,
                '_blank',
                'noopener,noreferrer'
              );
            }
            break;
          case 'navigate':
            if (rule.actionTarget) {
              router.push(rule.actionTarget);
              onClose?.();
            }
            break;
          case 'scroll_to_section':
            if (rule.actionTarget) {
              const target = document.getElementById(rule.actionTarget);
              if (target) {
                const reducedMotion = window.matchMedia(
                  '(prefers-reduced-motion: reduce)'
                ).matches;
                target.scrollIntoView({
                  behavior: reducedMotion ? 'auto' : 'smooth',
                  block: 'start',
                });
              } else {
                router.push('/contact');
                onClose?.();
              }
            }
            break;
          default:
            break;
        }
      }, 500);
    },
    [isTyping, onClose, router]
  );

  return {
    messages,
    isTyping,
    sendMessage,
    highlightWhatsApp,
    clearHighlight,
  };
}
