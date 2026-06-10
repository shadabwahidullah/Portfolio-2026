"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Submission states the form can be in, used to drive UI feedback. */
type Status = "idle" | "submitting" | "success" | "error";

/** Minimum message length, kept in sync with the server validation. */
const MIN_MESSAGE_LENGTH = 30;

/** Per-field validation messages. Absent key = that field is currently valid. */
type FieldErrors = {
  name?: string;
  email?: string;
  contact?: string;
  message?: string;
};

/** Simple email format check, mirrored on the server. */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * ContactForm (Client Component)
 *
 * A controlled email form. It posts the data to the `/api/contact` route
 * handler, then shows a localized success or error message. It's a Client
 * Component because it manages input state and handles the submit event.
 *
 * All labels/placeholders/messages come from the dictionary, so the form is
 * fully localized (and RTL-aware via the document `dir`).
 */
export function ContactForm({ dict }: { dict: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  // Tracks which fields failed validation so we can mark them + show messages.
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Capture the form node now: `event.currentTarget` becomes null after await.
    const form = event.currentTarget;
    // Read values straight from the form element (uncontrolled = less state).
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    // Validate every field and collect localized messages for the bad ones.
    const nextErrors: FieldErrors = {};
    if (!payload.name) nextErrors.name = dict.errors.name;
    if (!payload.message) {
      nextErrors.message = dict.errors.message;
    } else if (payload.message.length < MIN_MESSAGE_LENGTH) {
      nextErrors.message = dict.errors.messageMin;
    }
    // Need at least one contact method; otherwise flag email format if present.
    if (!payload.email && !payload.phone) {
      nextErrors.contact = dict.errors.contact;
    } else if (payload.email && !isValidEmail(payload.email)) {
      nextErrors.email = dict.errors.email;
    }

    // Stop and surface the field errors if anything is invalid.
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({}); // All good — clear any previous messages.
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset(); // Clear the fields on success.
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          label={dict.name}
          placeholder={dict.namePlaceholder}
          required
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          name="email"
          type="email"
          label={dict.email}
          placeholder={dict.emailPlaceholder}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label={dict.phone}
          placeholder={dict.phonePlaceholder}
          autoComplete="tel"
        />
      </div>

      {/* Hint normally; turns into a red error when neither email nor phone is set. */}
      <p
        className={cn(
          "-mt-2 text-xs",
          errors.contact ? "text-red-500" : "text-muted"
        )}
      >
        {errors.contact ?? dict.contactHint}
      </p>

      <Field
        id="message"
        name="message"
        label={dict.message}
        placeholder={dict.messagePlaceholder}
        required
        error={errors.message}
        multiline
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? dict.sending : dict.send}
        </Button>

        {/* Polite live region so screen readers announce the result. */}
        <p aria-live="polite" className="text-sm">
          {status === "success" && (
            <span className="text-primary">{dict.success}</span>
          )}
          {status === "error" && (
            <span className="text-red-500">{dict.error}</span>
          )}
        </p>
      </div>
    </form>
  );
}
