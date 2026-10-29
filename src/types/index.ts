// Shared data models — TDD §6.1

import type { Project } from './project';
import type { Service } from './service';
import type { Testimonial } from './testimonial';

export type { Project, ProjectImage } from './project';
export type { Service, ServiceCategory } from './service';
export type { Testimonial } from './testimonial';

export interface CompanyInfo {
  name: string;
  tagline: string;
  slogan?: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  registrationNumber?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: 'instagram' | 'facebook' | 'linkedin' | 'whatsapp';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export type ChatbotAction =
  | 'open_whatsapp'
  | 'open_email'
  | 'open_url'
  | 'navigate'
  | 'scroll_to_section'
  | 'none';

export interface QuickReply {
  label: string;
  value: string;
  variant?: 'default' | 'whatsapp';
}

export interface ChatbotRule {
  id: string;
  triggers: string[];
  response: string;
  quickReplies?: QuickReply[];
  action?: ChatbotAction;
  actionTarget?: string;
}

export interface ChatbotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
  isFallback?: boolean;
}

export type ServiceSummary = Pick<
  Service,
  'id' | 'title' | 'slug' | 'shortDescription' | 'icon'
>;

export type ProjectSummary = Pick<
  Project,
  'id' | 'title' | 'slug' | 'category' | 'images'
>;

export type TestimonialSummary = Pick<
  Testimonial,
  'id' | 'name' | 'quote' | 'rating'
>;
