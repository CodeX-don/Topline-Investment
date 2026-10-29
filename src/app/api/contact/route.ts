import { NextResponse } from 'next/server';
import { companyInfo } from '@/data/company';
import { services } from '@/data/services';
import type { ContactFormValues } from '@/utils/validation';
import {
  sanitizeInput,
  validateContactForm,
} from '@/utils/validation';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitStore.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  recent.push(now);
  rateLimitStore.set(ip, recent);

  // Keep the in-memory store from growing without bound on a long-lived instance.
  if (rateLimitStore.size > 500) {
    for (const [key, timestamps] of rateLimitStore) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitStore.delete(key);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

async function sendEmail(values: ContactFormValues): Promise<boolean> {
  const apiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[contact] EMAIL_API_KEY is not configured; enquiry logged.', {
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service,
    });
    return true;
  }

  const to =
    process.env.EMAIL_TO ||
    process.env.CONTACT_EMAIL_TO ||
    companyInfo.email;
  const from =
    process.env.EMAIL_FROM ||
    process.env.CONTACT_EMAIL_FROM ||
    'Toplin Website <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: values.email,
      subject: `Website enquiry: ${values.service} — ${values.name}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Service: ${values.service}`,
        '',
        values.message,
      ].join('\n'),
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(values.phone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(values.service)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(values.message).replace(/\n/g, '<br />')}</p>
      `,
    }),
  });

  if (!response.ok) {
    console.error('[contact] Resend request failed', response.status);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        message:
          'Too many messages have been sent from this connection. Please wait a few minutes or contact us on WhatsApp.',
      },
      { status: 429 }
    );
  }

  let body: Partial<ContactFormValues>;
  try {
    body = (await request.json()) as Partial<ContactFormValues>;
  } catch {
    return NextResponse.json(
      { message: 'Invalid request. Please try again.' },
      { status: 400 }
    );
  }

  const values: ContactFormValues = {
    name: sanitizeInput(String(body.name ?? '')),
    email: sanitizeInput(String(body.email ?? '')),
    phone: sanitizeInput(String(body.phone ?? '')),
    service: sanitizeInput(String(body.service ?? '')),
    message: sanitizeInput(String(body.message ?? '')),
  };

  const errors = validateContactForm(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: 'Please check the highlighted fields.', errors },
      { status: 400 }
    );
  }

  const validService =
    services.some((service) => service.title === values.service) ||
    values.service === 'Other';
  if (!validService) {
    return NextResponse.json(
      { message: 'Please select a valid service.' },
      { status: 400 }
    );
  }

  try {
    const sent = await sendEmail(values);
    if (!sent) {
      return NextResponse.json(
        {
          message:
            'We could not send your message right now. Please try again or contact us on WhatsApp.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: 'Thank you. Your message has been sent — we will be in touch shortly.',
    });
  } catch (error) {
    console.error('[contact] Unexpected error', error);
    return NextResponse.json(
      {
        message:
          'Something went wrong. Please try again or contact us on WhatsApp.',
      },
      { status: 500 }
    );
  }
}
