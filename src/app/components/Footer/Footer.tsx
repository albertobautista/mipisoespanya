"use client";
import Link from "next/link";
import { CityStrickers } from "../CittyStickers";
import { useTranslations } from "next-intl";
import { HoverVideoCard } from "../HoverVideoCard";
import { items } from "./data";

type LinkItem = { label: string; href: string };

interface FooterProps {
  contact?: LinkItem[];
  discover?: LinkItem[];
  about?: LinkItem[];
  social?: {
    icon:
      | "instagram"
      | "tiktok"
      | "facebook"
      | "linkedin"
      | "twitter"
      | "youtube"
      | "whatsapp";
    href: string;
  }[];
  bigLogoText?: string;
  legal?: LinkItem[];
  bg?: string; // tailwind color class para fondo
}

export default function Footer({
  contact: baseContact = [
    { label: "faq", href: "#" },
    { label: "whatsapp", href: "#" },
  ],
  about: baseAbout = [
    { label: "ourStory", href: "#" },
    { label: "reviews", href: "#" },
  ],
  social = [
    { icon: "instagram", href: "#" },
    { icon: "whatsapp", href: "#" },
  ],
  bigLogoText = "MiPiso",
  legal = [
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Imprint", href: "#" },
    { label: "Configuración de privacidad", href: "#" },
  ],
  bg = "bg-green",
}: FooterProps) {
  const t = useTranslations("footer");

  const contact = baseContact.map((item) => ({
    label: t(`contact.${item.label}`),
    href: item.href,
  }));

  const about = baseAbout.map((item) => ({
    label: t(`about.${item.label}`),
    href: item.href,
  }));
  return (
    <footer>
      <header className="w-screen bg-green py-12 text-center">
        <div className="max-w-8xl mx-auto px-6">
          <h2 className="text-3xl uppercase font-poiret md:text-5xl font-bold tracking-tight text-neutral-900">
            {t("title")}
          </h2>
        </div>
      </header>
      <div className="w-full overflow-x-auto bg-transparent my-10">
        <div className="flex gap-6 px-4 md:px-8 snap-x snap-mandatory">
          {items.map((item, idx) => (
            <div key={idx} className="snap-start flex-shrink-0 w-64 md:w-80">
              <HoverVideoCard
                city={item.city}
                videoSrc={item.videoSrc}
                pillClassName={item.pillClassName}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Top grid */}
      <div className={`${bg} text-[#0f0f0f]`}>
        <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Contacto y ayuda */}
            <div>
              <h3 className="mb-4 font-semibold text-lg font-cocomat">
                {t("contact.label")}
              </h3>
              <ul className="space-y-3">
                {contact.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Numa */}
            <div>
              <h3 className="mb-4 font-semibold text-lg font-cocomat">
                Mi piso
              </h3>
              <ul className="space-y-3">
                {about.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-lg font-cocomat">
                  {t("social.followUs")}
                </h3>
                <div className="flex items-center gap-4">
                  {social.map((s, idx) => (
                    <Link
                      key={idx}
                      href={s.href}
                      className="grid h-12 w-12 place-items-center rounded-full bg-black/10 hover:bg-black/20 transition"
                      aria-label={s.icon}
                    >
                      {getSocialIcon(s.icon)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Big logo + claim */}
          <div className="mt-10 grid  grid-cols-1 items-end gap-8 md:mt-2 md:grid-cols-6">
            {/* Logo ocupa las tres primeras columnas */}
            <div className="md:col-span-4">
              <h1
                className=" select-none uppercase whitespace-pre-wrap font-poiret leading-none font-extrabold tracking-tight text-[#121212] drop-shadow-sm"
                style={{
                  fontSize: "clamp(90px, 18vw, 230px)",
                  lineHeight: "1.05",
                }}
              >
                {bigLogoText}
              </h1>
            </div>
            <div className="md:col-span-2 ">
              <CityStrickers
                items={[
                  { label: "Salamanca", bg: "#3ec4a0" },
                  { label: "Chamberi", bg: "#eea37a" },
                  { label: "El retiro", bg: "#f0a400" },
                  { label: "lista", bg: "#0a5dd8", fg: "#081a2f" },
                  { label: "almagro", bg: "#8aa0b6" },
                  { label: "gracia", bg: "#5e63ff" },
                  { label: "eixample", bg: "#7cc8ff", fg: "#0b2746" },
                  { label: "sariiá", bg: "#ff4b2e" },
                  { label: "san gervasi ", bg: "#d11669" },
                ]}
                fontSize="sm"
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-black/10 py-6 text-sm text-black/70">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {legal.map((l, i) => (
                  <span key={l.label} className="flex items-center">
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                    {i !== legal.length - 1 && (
                      <span className="mx-3 opacity-60">|</span>
                    )}
                  </span>
                ))}
              </div>
              <p>© Mi Piso Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------- helpers --------- */
function getSocialIcon(
  kind:
    | "instagram"
    | "tiktok"
    | "facebook"
    | "linkedin"
    | "twitter"
    | "youtube"
    | "whatsapp"
) {
  const cls = "h-7 w-7 text-black";
  switch (kind) {
    case "instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 3h3a5 5 0 004 4v3a8 8 0 01-7-3v7a6 6 0 11-6-6h1v3h-1a3 3 0 103 3V3z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 3a2 2 0 110 4 2 2 0 010-4zM3 8h3v13H3zM9 8h3v2a4 4 0 013-1c3 0 5 2 5 6v6h-3v-6c0-2-1-3-3-3s-2 .9-2 3v6H9z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.67 0c-2.5 0-4.51 2.04-4.51 4.55 0 1.02.38 1.95 1 2.67A12.9 12.9 0 012 3.5a4.48 4.48 0 001.39 5.95A4.52 4.52 0 012 8.5c0 2.5 1.79 4.58 4.14 5.06A4.52 4.52 0 014 16.5c0 2.5 1.79 4.58 4.14 5.06A12.9 12.9 0 0023 3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19.8 7.2s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C13.7 4 12 4 12 4h0s-1.7 0-5 .3c-.4 0-1.3.1-2.1.9-.6.6-.8 2-.8 2S4 9 4 10.8v2.4C4 15 4.2 16.6 4.2 16.6s.2 1.4.8 2c.8.8 1.8.8 2.3.9 1.7.2 7.3.3
  7.3.3s1.7 0 5-.3c.4 0 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.4v-2.4c0-1.8-.2-3.6-.2-3.6zM10 15.5v-7l6 3.5-6 3.5z"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className={cls}
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 224 32C106.8 32 12.7 126.1 12.7 243.3c0 43.2 11.4 85 33.1 121.9L0 480l118.6-45.5c35.2 19.2 74.6 29.3 115.3 29.3h.1c117.1 0 211.3-94.1 211.3-211.2 0-59.2-23-114.9-64.4-156.5zM224 438.6c-35.9 0-71.2-9.6-102-27.9l-7.3-4.3-70.3 27 26.1-72.4-4.8-7.5c-20.7-32.5-31.7-70.1-31.7-108.6C34 141.3 121.9 53.4 224 53.4c52.2 0 101.3 20.3 138.2 57.2 36.9 36.9 57.2 85.9 57.2 138.1 0 102.1-88 189.9-195.4 189.9zm101.6-138.3c-5.5-2.7-32.6-16.1-37.7-18-5.1-1.9-8.8-2.7-12.6 2.7-3.7 5.3-14.4 18-17.6 21.7-3.2 3.7-6.5 4.2-12 1.4-5.5-2.7-23.1-8.5-44-27.1-16.2-14.4-27.1-32.3-30.3-37.7-3.2-5.3-.3-8.2 2.4-11 2.5-2.5 5.5-6.5 8.2-9.7 2.7-3.2 3.7-5.3 5.6-8.8 1.9-3.5.9-6.6-.5-9.4-1.4-2.7-12.6-30.3-17.3-41.5-4.5-10.8-9.1-9.3-12.6-9.5-3.2-.2-6.9-.2-10.6-.2s-9.6 1.4-14.7 6.9c-5.1 5.5-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.7 3.7 39.1 59.7 94.7 83.8 13.2 5.7 23.5 9.1 31.5 11.7 13.2 4.2 25.2 3.6 34.7 2.2 10.6-1.6 32.6-13.3 37.2-26.2 4.6-12.8 4.6-23.8 3.2-26.2-1.3-2.4-5-3.7-10.5-6.4z" />
        </svg>
      );
  }
}
