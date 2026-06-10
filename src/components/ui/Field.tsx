import { cn } from "@/lib/utils";

/**
 * Field
 *
 * A labelled form control that renders EITHER an `<input>` or a `<textarea>`
 * with identical styling. Both the contact form's text inputs and its message
 * box reuse it, so the field look + label wiring live in exactly one place (DRY).
 */
export function Field({
  id,
  label,
  multiline = false,
  required = false,
  error,
  className,
  ...props
}: {
  /** Unique id used to associate the <label> with the control (accessibility). */
  id: string;
  /** Already-translated visible label. */
  label: string;
  /** Render a multi-line <textarea> instead of a single-line <input>. */
  multiline?: boolean;
  /** Marks the field with a "*" and sets `aria-required` for screen readers. */
  required?: boolean;
  /** Validation message; when set, the control turns red and shows the text. */
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  // Link the control to its error text for assistive technologies.
  const errorId = `${id}-error`;
  // Shared classes so input + textarea always match the design tokens. When
  // there's an error we swap the border/ring to red for an obvious cue.
  const controlClasses = cn(
    "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground",
    "placeholder:text-muted/70 transition-colors focus-visible:outline-none focus-visible:ring-2",
    error
      ? "border-red-500 focus-visible:ring-red-500"
      : "border-border focus-visible:ring-primary",
    className
  );

  // Attributes shared by both <input> and <textarea> for accessibility.
  const a11yProps = {
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          // Red asterisk marks the field as required (decorative for SR).
          <span aria-hidden="true" className="text-red-500">
            {" "}
            *
          </span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={5}
          className={cn(controlClasses, "resize-y")}
          {...a11yProps}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={controlClasses}
          {...a11yProps}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {/* Inline, localized validation message tied to the control via id. */}
      {error && (
        <p id={errorId} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
