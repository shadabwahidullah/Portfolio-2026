import { cn } from "@/lib/utils";

/**
 * Card
 *
 * A thin wrapper around the shared `.surface-card` style (defined in
 * globals.css). Centralizing it here means project cards, the contact box, and
 * any future panels share one visual definition — change it once, update all.
 */
export function Card({
  as: Tag = "div",
  className,
  children,
}: {
  /** Render as a different element/tag when semantics require it. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cn("surface-card", className)}>{children}</Tag>;
}
