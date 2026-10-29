import { companyInfo } from '@/data/company';
import type {
  ChatbotMessage,
  ChatbotRule,
  QuickReply,
} from '@/types';

export const CHAT_STORAGE_KEY = 'toplin-chat-history';

const greetingReplies: QuickReply[] = [
  { label: 'View Services', value: 'View Services' },
  { label: 'Get a Quote', value: 'Get a Quote' },
  { label: 'Location & Hours', value: 'Location & Hours' },
  { label: 'Talk to Human', value: 'Talk to Human' },
];

const backToMenu: QuickReply = { label: 'Back to Menu', value: 'Back to Menu' };

/**
 * Rule base — PRD §7.2 / TDD §8.3.
 * Copy follows the PRD; the fallback uses the PRD wording plus the
 * Website Flow quick replies.
 */
export const chatbotRules: ChatbotRule[] = [
  {
    id: 'greeting',
    triggers: [
      'hi',
      'hello',
      'hey',
      'start',
      'good morning',
      'good afternoon',
      'good evening',
    ],
    response: 'Hi! Welcome to Toplin Investments. How can I help you today?',
    quickReplies: greetingReplies,
  },
  {
    id: 'services',
    triggers: [
      'service',
      'services',
      'what do you do',
      'what services',
      'offer',
      'view services',
    ],
    response:
      'We offer residential construction, commercial buildings, renovations, joinery, ceilings, and paving services. Which one interests you?',
    quickReplies: [
      { label: 'Residential', value: 'Residential' },
      { label: 'Commercial', value: 'Commercial' },
      { label: 'Renovations', value: 'Renovations' },
      backToMenu,
    ],
  },
  {
    id: 'residential',
    triggers: [
      'residential',
      'residential construction',
      'home',
      'house',
      'new home',
      'build a home',
    ],
    response:
      'We build new homes and custom residential projects across Windhoek, from foundations to final finishes. Would you like a quote or to speak with Ben?',
    quickReplies: [
      { label: 'Get a Quote', value: 'Get a Quote' },
      { label: 'Talk to Human', value: 'Talk to Human' },
      backToMenu,
    ],
  },
  {
    id: 'commercial',
    triggers: [
      'commercial',
      'commercial buildings',
      'office',
      'retail',
      'business premises',
    ],
    response:
      'We deliver commercial buildings and fit-outs, including offices and retail spaces, with coordinated site delivery. Tell us a little about your project.',
    quickReplies: [
      { label: 'Get a Quote', value: 'Get a Quote' },
      { label: 'Talk to Human', value: 'Talk to Human' },
      backToMenu,
    ],
  },
  {
    id: 'renovations',
    triggers: [
      'renovation',
      'renovations',
      'renovate',
      'kitchen',
      'bathroom',
      'remodel',
    ],
    response:
      'We renovate homes and workspaces, from kitchens and bathrooms to full interior updates. Tell us what you would like to change.',
    quickReplies: [
      { label: 'Get a Quote', value: 'Get a Quote' },
      { label: 'Talk to Human', value: 'Talk to Human' },
      backToMenu,
    ],
  },
  {
    id: 'finishing',
    triggers: [
      'joinery',
      'ceiling',
      'ceilings',
      'paving',
      'concrete',
      'finishing',
      'wardrobes',
    ],
    response:
      'Yes, we handle specialist finishing too: custom joinery, suspended ceilings, paving, and concrete works. Which detail can we help with?',
    quickReplies: [
      { label: 'Get a Quote', value: 'Get a Quote' },
      { label: 'Talk to Human', value: 'Talk to Human' },
      backToMenu,
    ],
  },
  {
    id: 'quote',
    triggers: [
      'quote',
      'price',
      'pricing',
      'cost',
      'costs',
      'estimate',
      'get a quote',
      'how much',
    ],
    response:
      "I'd be happy to help you get a quote! Please share your project details, or I can connect you directly with Ben on WhatsApp.",
    quickReplies: [
      { label: 'Contact on WhatsApp', value: 'Contact on WhatsApp', variant: 'whatsapp' },
      { label: 'Email Us', value: 'Email Us' },
      backToMenu,
    ],
  },
  {
    id: 'location',
    triggers: [
      'location',
      'location and hours',
      'location hours',
      'where',
      'where are you',
      'address',
      'hours',
      'office hours',
    ],
    response:
      "We're based in Windhoek, Namibia. Our office hours are Monday–Friday, 8:00 AM – 5:00 PM.",
    quickReplies: [
      { label: 'Get Directions', value: 'Get Directions' },
      { label: 'Contact Us', value: 'Contact Us' },
      backToMenu,
    ],
  },
  {
    id: 'directions',
    triggers: ['get directions', 'directions', 'map'],
    response:
      "I've opened Google Maps for Windhoek. Our team will confirm the exact meeting point when you get in touch.",
    quickReplies: [backToMenu],
    action: 'open_url',
    actionTarget:
      'https://www.google.com/maps/search/?api=1&query=Windhoek%2C+Namibia',
  },
  {
    id: 'contact',
    triggers: ['contact us', 'contact', 'get in touch'],
    response:
      "I've opened our contact page — send your details there and we'll get back to you.",
    quickReplies: [backToMenu],
    action: 'navigate',
    actionTarget: '/contact',
  },
  {
    id: 'human',
    triggers: [
      'human',
      'person',
      'agent',
      'speak to someone',
      'talk to human',
      'call me',
    ],
    response:
      "I'll connect you with Ben right away. He'll be happy to assist you!",
    quickReplies: [
      { label: 'Chat on WhatsApp', value: 'Chat on WhatsApp', variant: 'whatsapp' },
      backToMenu,
    ],
    action: 'open_whatsapp',
  },
  {
    id: 'whatsapp',
    triggers: [
      'contact on whatsapp',
      'chat on whatsapp',
      'yes open whatsapp',
      'open whatsapp',
      'whatsapp',
    ],
    response: 'Opening WhatsApp now — Ben will be happy to help.',
    quickReplies: [backToMenu],
    action: 'open_whatsapp',
  },
  {
    id: 'email',
    triggers: ['email us', 'email', 'send an email'],
    response: `You can reach us at ${companyInfo.email}. I've opened an email draft for you.`,
    quickReplies: [backToMenu],
    action: 'open_email',
    actionTarget: `mailto:${companyInfo.email}?subject=${encodeURIComponent(
      'Project enquiry from the Toplin website'
    )}`,
  },
  {
    id: 'menu',
    triggers: ['back to menu', 'menu', 'start over'],
    response: 'Hi! Welcome to Toplin Investments. How can I help you today?',
    quickReplies: greetingReplies,
  },
  {
    id: 'no-thanks',
    triggers: ['no thanks', 'no thank you', 'not right now'],
    response:
      'No problem. If you need anything else, just ask — or use the WhatsApp button whenever you are ready.',
    quickReplies: [backToMenu],
  },
  {
    id: 'fallback',
    triggers: ['*'],
    response:
      "I'm not sure about that, but you can chat directly with Ben on WhatsApp!",
    quickReplies: [
      {
        label: 'Yes, open WhatsApp',
        value: 'Yes, open WhatsApp',
        variant: 'whatsapp',
      },
      { label: 'No, thanks', value: 'No, thanks' },
    ],
  },
];

/**
 * Normalizes punctuation and ampersands so quick replies match typed input.
 */
export function normalizeChatInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesTrigger(normalizedInput: string, trigger: string): boolean {
  const normalizedTrigger = normalizeChatInput(trigger);
  if (!normalizedTrigger) return false;
  return ` ${normalizedInput} `.includes(` ${normalizedTrigger} `);
}

/**
 * Exact quick-reply matches win first; otherwise a whole-phrase match is used.
 * The fallback rule is returned only when nothing else matches.
 */
export function findMatchingRule(userInput: string): ChatbotRule {
  const normalizedInput = normalizeChatInput(userInput);

  const exactMatch = chatbotRules.find((rule) =>
    rule.triggers.some(
      (trigger) => normalizeChatInput(trigger) === normalizedInput
    )
  );
  if (exactMatch) return exactMatch;

  const partialMatch = chatbotRules.find(
    (rule) =>
      rule.id !== 'fallback' &&
      rule.triggers.some((trigger) => matchesTrigger(normalizedInput, trigger))
  );

  return (
    partialMatch ??
    chatbotRules.find((rule) => rule.id === 'fallback') ??
    chatbotRules[chatbotRules.length - 1]
  );
}

export function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createGreetingMessage(): ChatbotMessage {
  const greeting =
    chatbotRules.find((rule) => rule.id === 'greeting') ?? chatbotRules[0];

  return {
    id: createMessageId(),
    sender: 'bot',
    text: greeting.response,
    timestamp: new Date(),
    quickReplies: greeting.quickReplies,
  };
}

export function getWhatsAppUrl(
  message = "Hi Toplin Investments, I'm interested in your services."
): string {
  return `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export function getEmailUrl(): string {
  return `mailto:${companyInfo.email}?subject=${encodeURIComponent(
    'Project enquiry from the Toplin website'
  )}`;
}
