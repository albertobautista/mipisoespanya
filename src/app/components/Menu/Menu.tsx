"use client";

import { useTranslations, useLocale } from "next-intl";
import { menuItems } from "./contants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Menu() {
  const t = useTranslations("home");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="mx-auto flex items-center justify-end px-6 py-4 md:py-5 text-white"
    >
      <div className="hidden items-center gap-6 text-sm font-medium text-white/90 md:flex">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="transition-opacity font-cocomat font-bold text-lg hover:opacity-80 text-light-green"
          >
            {t(`menu.${item.id}`)}
          </Link>
        ))}

        <div className="ml-2 flex items-center gap-4">
          <button
            type="button"
            // onClick={toggleLocale}
            aria-label="Cambiar idioma"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            title={locale === "es" ? "English" : "Español"}
          >
            {/* ícono globo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.66 0 3.17.51 4.42 1.37-.76.42-1.6.77-2.51 1.02C13.39 5.5 12.72 4 12 4zM4 12c0-1.32.32-2.56.87-3.65.8 1.09 1.98 1.95 3.52 2.49-.23.69-.37 1.45-.39 2.26H4zm6 8c-.72 0-1.39-1.5-1.91-3.39.91.25 1.75.6 2.51 1.02C10.32 19.49 8.82 20 7.16 20H10zm10-8h-4c-.02-.81-.16-1.57-.39-2.26 1.54-.54 2.72-1.4 3.52-2.49.55 1.09.87 2.33.87 3.65z" />
            </svg>
          </button>

          <div
            className="h-9 w-9 rounded-full bg-white/20 ring-1 ring-white/30"
            aria-hidden
          />
        </div>
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/30"
        aria-label="Abrir menú"
        type="button"
      >
        <span className="block h-0.5 w-5 bg-white" />
        <span className="mt-1 block h-0.5 w-5 bg-white" />
        <span className="mt-1 block h-0.5 w-5 bg-white" />
      </button>
    </nav>
  );
}
