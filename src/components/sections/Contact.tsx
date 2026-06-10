import type { Dictionary } from "@/i18n/dictionaries";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

/**
 * Contact
 *
 * Intro text + social links + an email/phone form (the form itself is a Client
 * Component). The email is also shown as a `mailto:` link for visitors who
 * prefer their own mail client. Uses the shared <Card> surface for consistency.
 */
export function Contact({
  dict,
  social,
}: {
  dict: Dictionary["contact"];
  social: Dictionary["social"];
}) {
  return (
    <Section id="contact" title={dict.title}>
      <Card className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-muted">
            {dict.body}{" "}
            <a
              href={`mailto:${dict.email}`}
              className="font-medium text-primary hover:underline"
            >
              {dict.email}
            </a>
          </p>
          <SocialLinks social={social} />
        </div>

        <ContactForm dict={dict.form} />
      </Card>
    </Section>
  );
}
