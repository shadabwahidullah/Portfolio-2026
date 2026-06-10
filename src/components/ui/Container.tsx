import { cn } from "@/lib/utils";

/**
 * Container
 *
 * Centers content and applies a consistent max-width + horizontal padding.
 * Every section uses it so page gutters stay identical everywhere (DRY).
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
      {children}
    </div>
  );
}
