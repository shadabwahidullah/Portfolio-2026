"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";

export function BrandLink({ locale }: { locale: Locale }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already on home page, scroll to top instead of navigating
    if (window.location.pathname === `/${locale}`) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href={`/${locale}`}
      className="text-lg font-bold transition-transform hover:scale-110 hover:text-primary"
      onClick={handleClick}
    >
      {"<dev />"}
    </Link>
  );
}
