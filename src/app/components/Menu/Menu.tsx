"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/app/navigation";
import { Menu as MenuIcon, X } from "lucide-react"; // íconos limpios
import { LocaleSwitcher } from "../LocaleSwitcher";
import { WhatsappButton } from "../Buttons/WhatsappButton";
import { menuItems } from "./contants";
import Image from "next/image";
import { getSocialIcon } from "@/app/helpers/utils";

type MenuProps = {
  /** Clase Tailwind para el fondo del header fijo */
  barBg?: string; // ej: "bg-black/70", "bg-[#101010]/80", "bg-emerald-900/80"
  /** Aplica blur al fondo del header */
  blur?: boolean;
  /** Color de texto (Tailwind) */
  textClass?: string; // ej: "text-white", "text-gray-100"
};

const HEADER_H = 56; // h-14

const social: {
  icon:
    | "instagram"
    | "tiktok"
    | "facebook"
    | "linkedin"
    | "twitter"
    | "youtube"
    | "whatsapp"
    | "email";
  href: string;
}[] = [
  { icon: "instagram", href: "https://www.instagram.com/mipiso_es/" },
  {
    icon: "whatsapp",
    href: `https://wa.me/+34658509768?text=${encodeURIComponent(
      "Hola, me gustaría más información."
    )}`,
  },
  {
    icon: "email",
    href: `mailto:mipisorelocation@gmail.com`,
  },
];

export default function Menu({
  barBg = "bg-[#0B0B0B]/80", // cambia aquí tu color por defecto
  blur = true,
  textClass = "text-white",
}: MenuProps) {
  const t = useTranslations("home");
  const locale = useLocale() as "es" | "en";
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open]);

  React.useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* HEADER FIJO */}
      <nav
        aria-label="Main"
        className={`fixed top-0 inset-x-0 z-50 ${barBg} ${
          blur ? "backdrop-blur-md" : ""
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={`h-14 flex items-center justify-between ${textClass}`}
          >
            {/* Marca */}
            <Link href="/" locale={locale} className="flex items-center gap-2">
              <Image
                src="/images/logos/text-white.png" // cambia por tu ruta real
                alt="Mi Piso Logo"
                width={220} // ajusta el tamaño según tu diseño
                height={52}
                className="object-contain"
                priority
              />
            </Link>
            {/* Desktop */}
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
              <div className="ml-2 flex gap-4">
                <LocaleSwitcher />
              </div>
              <div className="ml-2 flex gap-4">
                <WhatsappButton
                  phone="+34658509768"
                  variant="icon"
                  message="Ponte en contacto"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex w-full justify-end items-center gap-3 md:hidden">
              <LocaleSwitcher />
              <button
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                type="button"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? (
                  <X size={20} strokeWidth={2.25} />
                ) : (
                  <MenuIcon size={20} strokeWidth={2.25} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="h-px bg-white/10" />
      </nav>

      {/* Spacer bajo header */}
      <div style={{ height: HEADER_H }} aria-hidden />

      {/* DRAWER MÓVIL */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div
          className={`absolute inset-x-0 top-0 transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            paddingTop: `calc(${HEADER_H}px + env(safe-area-inset-top))`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-8 text-white">
            <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                locale={locale}
                className="font-bold tracking-wide"
              >
                Mi piso
              </Link>
              <button
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
              >
                <X size={20} strokeWidth={2.25} />
              </button>
            </div>

            <ul className="mt-2 space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="block rounded-md font-cocomat px-3 py-3 text-base font-semibold tracking-wide text-white hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {t(`menu.${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 ml-2 flex gap-3">
              {social.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="grid h-10 w-10 place-items-center rounded-full bg-light-green hover:bg-light-green/80 transition"
                  aria-label={s.icon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(s.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
