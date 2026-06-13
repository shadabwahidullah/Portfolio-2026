import { NextResponse } from "next/server";
import { Resend } from "resend";
import { serverEnv } from "@/lib/env";

/**
 * POST /api/contact — receives a contact-form submission.
 *
 * Responsibilities:
 *   1. Parse + validate the incoming JSON ({ name, email, message }).
 *   2. Forward the message to the recipient email via Resend.
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

  // Send email via Resend
  const apiKey = serverEnv.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set in environment variables");
    return NextResponse.json(
      { error: "Email service not configured." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    
    // Get recipient email from environment or use default
    // Note: Resend free tier only allows sending to the base email address (without + subaddressing)
    const recipientEmail = serverEnv.CONTACT_EMAIL;
    
    // Build email content
    const emailContent = `
Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}

Message:
${message}
    `.trim();

    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
    });

  } catch (error) {
    console.error("Failed to send email. Error details:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
