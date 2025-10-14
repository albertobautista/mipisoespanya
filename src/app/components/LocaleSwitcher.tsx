"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocaleSwitcher({ locale }: { locale: "es" | "en" }) {
  const pathname = usePathname();
  // Ensure path always has a locale prefix
  const normalized = pathname?.match(/^\/(en|es)(\/.*)?$/)
    ? pathname
    : `/${locale}`;

  const to = (target: "es" | "en") =>
    normalized.replace(/^\/(en|es)/, `/${target}`);

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 text-sm font-cocomat font-bold text-white"
    >
      <Link
        href={to("es")}
        prefetch
        className={
          locale === "es" ? "font-semibold" : "opacity-70 hover:opacity-100"
        }
      >
        ES
      </Link>
      <span className="opacity-40">／</span>
      <Link
        href={to("en")}
        prefetch
        className={
          locale === "en" ? "font-semibold" : "opacity-70 hover:opacity-100"
        }
      >
        EN
      </Link>
    </nav>
  );
}
