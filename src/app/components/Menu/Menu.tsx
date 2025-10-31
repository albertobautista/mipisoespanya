"use client";
// import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { menuItems } from "./contants"; // corrige a ./constants si aplica
import { LocaleSwitcher } from "../LocaleSwitcher";
import React from "react";
import { WhatsappButton } from "../Buttons/WhatsappButton";
import { Link } from "@/app/navigation";

export default function Menu() {
  const t = useTranslations("home");
  const locale = useLocale() as "es" | "en";
  const [open, setOpen] = React.useState(false);

  // Cierra el menú al cambiar de tamaño a md+
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      aria-label="Main"
      className="mx-auto flex items-center justify-between px-4 sm:px-6 py-3 md:py-5 text-white "
    >
      {/* Desktop menu */}
      <div className="hidden md:flex justify-end w-full gap-6 text-sm font-medium text-white/90">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={{ pathname: item.href }}
            className="transition-opacity uppercase font-cocomat font-bold text-base lg:text-md hover:opacity-80 text-light-green"
          >
            {t(`menu.${item.id}`)}
          </Link>
        ))}

        {/* Locale Switcher */}
        <div className="ml-2 flex  gap-4">
          <LocaleSwitcher locale={locale} />
        </div>
        <div className="ml-2 flex gap-4">
          <WhatsappButton
            phone="+34658509768"
            variant="icon"
            message="Ponte en contacto"
          />
        </div>
      </div>

      {/* Mobile right: locale + burger */}
      <div className="flex w-full justify-end items-center gap-3 md:hidden">
        <LocaleSwitcher locale={locale} />
        {/* <button
          className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/30"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`mt-1 block h-0.5 w-5 bg-white transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`mt-1 block h-0.5 w-5 bg-white transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button> */}
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-0 z-40 transform transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-black/70 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                locale={locale}
                className="font-bold tracking-wide text-white"
              >
                Mi piso
              </Link>
              <button
                className="grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/30"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <ul className="mt-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="block rounded-md px-3 py-3 text-base font-semibold tracking-wide text-white/90 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {t(`menu.${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-white/10 pt-4">
              <LocaleSwitcher locale={locale} />
            </div>

            <div className="pt-6 pb-4 text-xs text-white/60">
              © {new Date().getFullYear()} Mi piso
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
