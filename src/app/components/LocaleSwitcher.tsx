"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "../navigation";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 text-sm font-montserratSemibold text-white"
    >
      <Link
        href={{ pathname }}
        locale="es"
        className={`
          transition-opacity
          ${
            locale === "es"
              ? "font-bold underline underline-offset-2"
              : "opacity-70 hover:opacity-100"
          }
        `}
      >
        ES
      </Link>
      <span className="opacity-40">／</span>
      <Link
        href={{ pathname }}
        locale="en"
        className={`
          transition-opacity
          ${
            locale === "en"
              ? "font-bold underline underline-offset-2"
              : "opacity-70 hover:opacity-100"
          }
        `}
      >
        EN
      </Link>
    </nav>
  );
}
