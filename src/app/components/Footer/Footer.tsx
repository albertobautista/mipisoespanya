"use client";
import Link from "next/link";
import { CityStrickers } from "../CittyStickers";
import { useTranslations } from "next-intl";
import { HoverVideoCard } from "../HoverVideoCard";
import { items } from "./data";
import { getSocialIcon } from "@/app/helpers/utils";

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
      | "whatsapp"
      | "email";
    href: string;
  }[];
  bigLogoText?: string;
  bg?: string; // tailwind color class para fondo
}

export default function Footer({
  contact: baseContact = [
    { label: "faq", href: "/faqs" },
    {
      label: "whatsapp",
      href: `https://wa.me/+34658509768?text=${encodeURIComponent(
        "Hola, me gustaría más información."
      )}`,
    },
  ],
  about: baseAbout = [
    { label: "ourStory", href: "/our-story" },
    { label: "reviews", href: "/reviews" },
  ],
  social = [
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
  ],
  bigLogoText = "MiPiso",

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
      <header className="w-screen  bg-green py-12 text-center">
        <div className="max-w-8xl mx-auto px-6">
          <h2 className="text-3xl uppercase font-poiret md:text-5xl font-bold tracking-tight text-neutral-900">
            {t("title")}
          </h2>
        </div>
      </header>
      <div className="w-full overflow-x-auto bg-transparent my-10">
        <div className="flex gap-6 px-4 md:px-8 snap-x snap-mandatory after:content-[''] after:flex-shrink-0 after:w-8 md:after:w-3">
          {items.map((item, idx) => (
            <div key={idx} className="snap-start flex-shrink-0 w-64 md:w-80">
              <HoverVideoCard
                city={item.city}
                videoSrc={item.videoSrc}
                pillClassName={item.pillClassName}
                posterSrc={item.posterSrc}
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
                    <Link
                      href={item.href}
                      className="hover:underline"
                      target="_blank"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="mailto:mipisorelocation@gmail.com" target="_blank">
                    mipisorelocation@gmail.com
                  </a>
                </li>
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
                      target="_blank"
                    >
                      {getSocialIcon(s.icon)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Big logo + claim */}
          <div className="mt-10 grid  grid-cols-1 items-end md:gap-8 md:mt-2 md:grid-cols-6">
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
                height={300}
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-black/10 py-6 text-sm text-black/70">
            <div className="flex flex-col justify-end md:flex-row">
              <p>© Mi Piso {t("rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
