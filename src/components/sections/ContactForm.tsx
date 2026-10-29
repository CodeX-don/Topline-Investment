'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { FiSend } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { companyInfo } from '@/data/company';
import { services } from '@/data/services';
import type { ContactFormErrors, ContactFormValues } from '@/utils/validation';
import { validateContactForm } from '@/utils/validation';

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
  "Hi Toplin Investments, I'd like to discuss a project."
)}`;

function fieldClasses(hasError: boolean): string {
  return `min-h-[48px] w-full rounded-btn border bg-input px-4 py-3 text-sm text-black placeholder:text-concrete-dark transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
    hasError ? 'border-error' : 'border-concrete'
  }`;
}

/**
 * Contact form — PRD §6.4 / TDD §5.3.
 * Client-side validation, a 10-second request timeout, and a 5-second
 * success auto-dismiss.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => setStatus('idle'), 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const name = event.target.name as keyof ContactFormValues;
    const { value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      const firstError = Object.keys(nextErrors)[0];
      window.setTimeout(() => {
        document.getElementById(firstError)?.focus();
      }, 0);
      return;
    }

    setStatus('submitting');
    setServerError('');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          payload.message ??
            'We could not send your message. Please try again or contact us on WhatsApp.'
        );
      }

      setValues(initialValues);
      setErrors({});
      setStatus('success');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setServerError(
          'The request timed out. Please try again or message us on WhatsApp.'
        );
      } else {
        setServerError(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again or contact us on WhatsApp.'
        );
      }
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const isSubmitting = status === 'submitting';

  return (
    <div className="rounded-card border border-border bg-white p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-bold text-black">
        Send Us a Message
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-concrete-dark">
        Tell us about your project and we will get back to you with the next
        steps.
      </p>

      {status === 'success' ? (
        <div
          role="status"
          className="mt-6 rounded-btn border border-success/30 bg-success/10 p-4 text-sm font-medium text-green-900"
        >
          Thank you. Your message has been sent — we will be in touch shortly.
        </div>
      ) : null}

      {status === 'error' && serverError ? (
        <div
          role="alert"
          className="mt-6 rounded-btn border border-error/30 bg-error/5 p-4 text-sm text-red-800"
        >
          <p>{serverError}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-black underline decoration-primary underline-offset-4 hover:text-primary"
          >
            Chat with us on WhatsApp instead
          </a>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-black"
          >
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClasses(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs font-medium text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-black"
            >
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={fieldClasses(Boolean(errors.email))}
            />
            {errors.email ? (
              <p
                id="email-error"
                className="mt-1.5 text-xs font-medium text-red-700"
              >
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-semibold text-black"
            >
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="+264 81 718 4507"
              value={values.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={fieldClasses(Boolean(errors.phone))}
            />
            {errors.phone ? (
              <p
                id="phone-error"
                className="mt-1.5 text-xs font-medium text-red-700"
              >
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-1.5 block text-sm font-semibold text-black"
          >
            Service <span aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={values.service}
            onChange={handleChange}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={fieldClasses(Boolean(errors.service))}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other">Other / Not sure</option>
          </select>
          {errors.service ? (
            <p
              id="service-error"
              className="mt-1.5 text-xs font-medium text-red-700"
            >
              {errors.service}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-semibold text-black"
          >
            Project Details <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us about the project, location, and timeline."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${fieldClasses(Boolean(errors.message))} resize-y`}
          />
          {errors.message ? (
            <p
              id="message-error"
              className="mt-1.5 text-xs font-medium text-red-700"
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <p className="text-xs text-concrete-dark">
          <span aria-hidden="true">*</span> Required fields
        </p>

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="disabled:cursor-wait"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
          {!isSubmitting ? (
            <FiSend className="h-4 w-4" aria-hidden="true" />
          ) : null}
        </Button>
      </form>
    </div>
  );
}
