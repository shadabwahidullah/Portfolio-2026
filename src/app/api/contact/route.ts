import { NextResponse } from "next/server";

/**
 * POST /api/contact — receives a contact-form submission.
 *
 * Responsibilities:
 *   1. Parse + validate the incoming JSON ({ name, email, message }).
 *   2. (Integration point) Forward the message to an email provider.
 *
 * To keep the project runnable with ZERO configuration, this handler currently
 * validates and logs the submission server-side, then returns success. When
 * you're ready to actually deliver mail, plug an email provider in at the
 * marked spot below (e.g. Resend, SendGrid, Nodemailer) using an API key from
 * an environment variable — never hard-code secrets.
 */

/**
 * Minimal shape we expect from the client. `email` and `phone` are both
 * optional individually, but AT LEAST ONE must be provided (see validation).
 */
interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Minimum message length, kept in sync with the client form. */
const MIN_MESSAGE_LENGTH = 30;

/** Lightweight email format check (kept simple on purpose). */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let data: Partial<ContactPayload>;

  // Guard against malformed / non-JSON bodies.
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  // Server-side validation (never trust the client alone).
  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and message are required." },
      { status: 400 }
    );
  }
  // Message must be reasonably detailed (kept in sync with the client).
  if (message.length < MIN_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must be at least ${MIN_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }
  // Require at least one way to reach back: email OR phone.
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Provide at least an email or a phone number." },
      { status: 400 }
    );
  }
  // If an email was given, it must be well-formed.
  if (email && !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // INTEGRATION POINT: deliver the message here.
  //
  //   const apiKey = process.env.RESEND_API_KEY;
  //   await resend.emails.send({ from, to, subject, text: message });
  //
  // For now we just log it so the form works out of the box during development.
  // ---------------------------------------------------------------------------
  console.log("New contact submission:", { name, email, phone, message });

  return NextResponse.json({ ok: true }, { status: 200 });
}
