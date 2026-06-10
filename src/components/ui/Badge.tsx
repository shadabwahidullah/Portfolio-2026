import { cn } from "@/lib/utils";

/**
 * Badge
 *
 * A small pill used to display tech tags (in project cards) and skills.
 * Defined once and reused so every tag looks identical across the site (DRY).
 */
export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
