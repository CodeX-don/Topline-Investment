// Form validation — TDD §6.5 / PRD §6.4

export const NAMIBIAN_PHONE_REGEX = /^(\+264|0)[8-9]\d{8}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const compact = phone.replace(/\s/g, '');
  return NAMIBIAN_PHONE_REGEX.test(compact);
}

/**
 * Removes control characters and trims whitespace. Output is rendered as text
 * by React, and is additionally escaped for the email payload.
 */
export function sanitizeInput(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim();
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function validateContactForm(
  values: ContactFormValues
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Please enter at least 2 characters.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!validatePhone(values.phone)) {
    errors.phone = 'Enter a Namibian number, e.g. +264 81 718 4507.';
  }

  if (!values.service) {
    errors.service = 'Please select a service.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please tell us about your project.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please provide a little more detail (at least 10 characters).';
  }

  return errors;
}
