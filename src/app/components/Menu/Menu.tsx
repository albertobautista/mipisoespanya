"use client";
import React from "react";
import { createPortal } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { menuItems } from "./contants";
import { LocaleSwitcher } from "../LocaleSwitcher";
import { WhatsappButton } from "../Buttons/WhatsappButton";
import { Link } from "@/app/navigation";
import { Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import { getSocialIcon } from "@/app/helpers/utils";

type MenuProps = {
  barBg?: string;
  blur?: boolean;
  textClass?: string;
  variant?: "hero" | "fixed"; // hero: integrado en Hero, fixed: fijo en top
};

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
      "Hola, me gustaría más información.",
    )}`,
  },
  { icon: "email", href: `mailto:mipisorelocation@gmail.com` },
];

/** Bloqueo de scroll robusto cuando locked=true */
function useLockBodyScroll(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { body, documentElement: html } = document;
    const prevBodyStyle = body.getAttribute("style") || "";
    const prevHtmlStyle = html.getAttribute("style") || "";

    body.setAttribute(
      "style",
      `${prevBodyStyle}; position: fixed; top: -${scrollY}px; left: 0; right: 0; width: 100%; overflow: hidden; touch-action: none;`,
    );
    html.setAttribute(
      "style",
      `${prevHtmlStyle}; overflow: hidden; height: 100%;`,
    );

    return () => {
      body.setAttribute("style", prevBodyStyle);
      html.setAttribute("style", prevHtmlStyle);
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

export default function Menu({
  barBg = "bg-green/90",
  blur = true,
  textClass = "text-white",
  variant = "hero",
}: MenuProps) {
  const t = useTranslations("home");
  const locale = useLocale() as "es" | "en";
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Precargar la imagen del logo para evitar delays
    if (typeof window !== "undefined") {
      const logoImage = document.createElement("img");
      logoImage.src = "/images/logos/monograma-avena.png";
    }
  }, []); // Controla cuándo renderizar/desmontar el Portal para evitar parpadeos
  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      // Delay para permitir que la animación de salida se complete
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  React.useEffect(() => setOpen(false), [pathname]);

  // Cerrar con ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cerrar al crecer a md+
  React.useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Bloqueo de scroll del documento cuando el drawer está abierto
  useLockBodyScroll(open);

  if (variant === "hero") {
    // Menú integrado en Hero (solo desktop, móvil usa fixed)
    return (
      <>
        {/* Desktop: Menu integrado */}
        <nav
          aria-label="Main"
          className="hidden md:block mx-auto px-4 sm:px-6 py-3 md:py-5"
        >
          <div className="flex justify-end w-full gap-6 text-sm font-medium text-white/90">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={{ pathname: item.href }}
                locale={locale}
                className="transition-opacity uppercase font-montserratSemibold text-base lg:text-md hover:opacity-80 text-white"
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
        </nav>

        {/* Mobile: Menu fijo (fuera del Hero) */}
        {mounted && (
          <>
            <nav
              aria-label="Main"
              className={`md:hidden fixed top-0 inset-x-0 z-50 ${barBg} ${
                blur ? "backdrop-blur-md" : ""
              }`}
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div
                  className={`h-14 flex items-center justify-between ${textClass}`}
                >
                  <Link
                    href="/"
                    locale={locale}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="/images/logos/monograma-avena.png"
                      alt="Mi Piso Logo"
                      width={100}
                      height={100}
                      className="object-contain"
                      priority
                    />
                  </Link>
                  <div className="flex items-center gap-3">
                    <WhatsappButton
                      phone="+34658509768"
                      variant="icon"
                      message="Ponte en contacto"
                    />
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
            </nav>

            {/* Spacer para móvil */}
            <div
              className="md:hidden h-14"
              aria-hidden
              style={{ marginTop: "env(safe-area-inset-top)" }}
            />

            {/* Drawer móvil usando Portal */}
            {mounted &&
              typeof document !== "undefined" &&
              shouldRender &&
              createPortal(
                <div
                  id="mobile-menu"
                  className={`md:hidden fixed inset-0 z-[100] transition-all duration-300 ease-out ${
                    open
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  style={{ overscrollBehavior: "contain" }}
                  onClick={() => setOpen(false)}
                >
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      open
                        ? "bg-black/40 backdrop-blur-md"
                        : "bg-black/0 backdrop-blur-none"
                    }`}
                  />

                  {/* Panel del drawer */}
                  <div
                    className={`absolute inset-x-0 top-0 transition-all duration-300 ease-out ${
                      open ? "translate-y-0" : "-translate-y-full"
                    }`}
                    style={{
                      height: "100dvh",
                      overscrollBehavior: "contain",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header del drawer con logo y cerrar */}
                    <div
                      className={`transition-all duration-300 ease-out backdrop-blur-lg border-b border-white/20 ${
                        open
                          ? "bg-gradient-to-r from-green/80 to-green/70"
                          : "bg-gradient-to-r from-green/0 to-green/0"
                      }`}
                      style={{ paddingTop: "env(safe-area-inset-top)" }}
                    >
                      <div className="h-14 flex items-center justify-between px-4 sm:px-6">
                        <Link
                          href="/"
                          locale={locale}
                          className="flex items-center gap-2"
                        >
                          <Image
                            src="/images/logos/monograma-avena.png"
                            alt="Mi Piso Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                            priority
                            loading="eager"
                            unoptimized
                          />
                        </Link>
                        <button
                          className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 ease-out"
                          aria-label="Cerrar menú"
                          onClick={() => setOpen(false)}
                        >
                          <X size={20} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    {/* Contenido del drawer */}
                    <div
                      className={`transition-all duration-300 ease-out backdrop-blur-xl text-white overflow-y-auto ${
                        open
                          ? "bg-gradient-to-b from-black/60 to-black/70"
                          : "bg-gradient-to-b from-black/0 to-black/0"
                      }`}
                      style={{
                        height: "calc(100% - 56px - env(safe-area-inset-top))",
                        WebkitOverflowScrolling: "touch", // Scroll suave en iOS
                      }}
                    >
                      <div className="px-4 sm:px-6 py-6">
                        {/* Enlaces del menú */}
                        <ul className="space-y-2">
                          {menuItems.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                locale={locale}
                                className="block rounded-md font-montserratSemibold px-3 py-4 text-lg tracking-wide text-white hover:bg-white/10 transition"
                                onClick={() => setOpen(false)}
                              >
                                {t(`menu.${item.id}`)}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* Selector de idioma */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <div className="flex justify-center">
                            <LocaleSwitcher />
                          </div>
                        </div>

                        {/* Redes sociales */}
                        <div className="mt-6 flex gap-4 justify-center">
                          {social.map((s, idx) => (
                            <a
                              key={idx}
                              href={s.href}
                              className="grid h-12 w-12 place-items-center rounded-full bg-light-green hover:bg-light-green/80 transition"
                              aria-label={s.icon}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getSocialIcon(s.icon)}
                            </a>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 text-center text-sm text-white/60 border-t border-white/5">
                          © {new Date().getFullYear()} Mi piso España
                        </div>

                        {/* Espacio adicional para el scroll */}
                        <div className="h-8"></div>
                      </div>
                    </div>
                  </div>
                </div>,
                document.body,
              )}
          </>
        )}
      </>
    );
  }

  // Variant "fixed" - Menú completamente fijo para otras páginas
  return (
    <>
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
            <Link href="/" locale={locale} className="flex items-center gap-2">
              <Image
                src="/images/logos/monograma-avena.png"
                alt="Mi Piso Logo"
                width={220}
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
                  className="transition-opacity uppercase font-montserratSemibold text-base lg:text-md hover:opacity-80 text-light-green"
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
              <WhatsappButton
                phone="+34658509768"
                variant="icon"
                message="Ponte en contacto"
              />
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
      </nav>

      {/* Spacer */}
      <div
        style={{ height: 56, marginTop: "env(safe-area-inset-top)" }}
        aria-hidden
      />
    </>
  );
}
