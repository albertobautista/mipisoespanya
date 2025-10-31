"use client";
import * as React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LocaleSwitcher } from "../LocaleSwitcher";

/**
 * Barra superior que aparece en móviles al hacer scroll (> threshold)
 * y se oculta cuando se vuelve al tope de la página.
 */
export default function StickyMobileBar({
  title = "Mi piso",
  threshold = 12, // px desde el tope para mostrar la barra
}: {
  title?: string;
  threshold?: number;
}) {
  const locale = useLocale() as "es" | "en";
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let rAF = 0;
    const onScroll = () => {
      if (rAF) return;
      rAF = window.requestAnimationFrame(() => {
        rAF = 0;
        const y = window.scrollY || window.pageYOffset;
        setVisible(y > threshold);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, [threshold]);

  return (
    <div
      aria-hidden={!visible}
      className={[
        "md:hidden",
        "fixed top-0 inset-x-0 z-40",
        // 🔴 Fondo rojo sólido y opaco
        "bg-light-green text-white",
        // Transición suave al aparecer/desaparecer
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "-translate-y-full",
        // Sombra para destacar
        "shadow-md shadow-black/30",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link
          href="/"
          className="font-semibold tracking-wide text-white uppercase font-poiret text-lg"
          aria-label={title}
        >
          {title}
        </Link>

        {/* Selector de idioma */}
        <LocaleSwitcher />
      </div>
    </div>
  );
}
