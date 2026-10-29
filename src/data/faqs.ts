import type { FAQ } from '@/types';

/**
 * FAQ content — PRD §6.4 / TDD §6.2.
 * Also used as the knowledge base for the rule-based chatbot.
 */
export const faqs: FAQ[] = [
  {
    id: 'services',
    question: 'What services does Toplin Investments offer?',
    answer:
      'We handle residential construction, commercial buildings, renovations, project management, joinery, ceilings, paving, and concrete construction in Windhoek.',
  },
  {
    id: 'location',
    question: 'Where are you based?',
    answer:
      'We are based in Windhoek, Namibia, and work with clients across the city.',
  },
  {
    id: 'quote',
    question: 'How do I get a quote?',
    answer:
      'Use the contact form on this site, call +264 81 718 4507, or message us on WhatsApp. Share your project type, location, and scope, and we will arrange a consultation.',
  },
  {
    id: 'hours',
    question: 'What are your office hours?',
    answer:
      'Our office hours are Monday to Friday, 08:00 to 17:00. You can also send us a WhatsApp message outside these hours.',
  },
  {
    id: 'renovations',
    question: 'Do you handle renovations and specialist finishing?',
    answer:
      'Yes. We renovate existing homes and workspaces and provide specialist joinery, ceilings, paving, and concrete finishing.',
  },
  {
    id: 'project-management',
    question: 'Do you manage projects from start to finish?',
    answer:
      'Yes. Our project management service covers planning, procurement, site coordination, quality control, and handover.',
  },
];
