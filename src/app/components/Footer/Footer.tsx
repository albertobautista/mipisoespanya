"use client";
import Link from "next/link";
import Image from "next/image";
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
  logoImage?: string;
  citiesImage?: string;
  bg?: string; // tailwind color class para fondo
}

export default function Footer({
  contact: baseContact = [
    { label: "faq", href: "/faqs" },
    {
      label: "whatsapp",
      href: `https://wa.me/+34658509768?text=${encodeURIComponent(
        "Hola, me gustaría más información.",
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
        "Hola, me gustaría más información.",
      )}`,
    },
    {
      icon: "email",
      href: `mailto:mipisorelocation@gmail.com`,
    },
  ],
  logoImage,
  citiesImage,
  bg = "bg-dark-green",
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
      <header className="w-screen bg-light-green py-12 text-center">
        <div className="max-w-8xl mx-auto px-6">
          <h2 className="text-3xl uppercase font-montserratSemibold md:text-5xl tracking-tight text-white">
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
      <div className={`${bg} text-white`}>
        <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Contacto y ayuda */}
            <div>
              <h3 className="mb-4 font-semibold text-lg font-montserrat">
                {t("contact.label")}
              </h3>
              <ul className="space-y-3">
                {contact.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:underline font-montserrat"
                      target="_blank"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:mipisorelocation@gmail.com"
                    target="_blank"
                    className="font-montserrat"
                  >
                    mipisorelocation@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Numa */}
            <div>
              <h3 className="mb-4 text-lg font-montserrat">Mi piso</h3>
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
                <h3 className="mb-3 font-semibold text-lg font-montserrat">
                  {t("social.followUs")}
                </h3>
                <div className="flex items-center gap-4">
                  {social.map((s, idx) => (
                    <Link
                      key={idx}
                      href={s.href}
                      className="grid h-12 w-12 place-items-center rounded-full text-white bg-white hover:bg-white/90 transition"
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
          <div className="mt-10 grid grid-cols-1 gap-6 items-center md:mt-14 md:grid-cols-6 md:gap-8">
            {logoImage && (
              <div className="md:col-span-4 flex items-center justify-center md:justify-start">
                <Image
                  src={logoImage}
                  alt="Mi Piso Logo"
                  width={500}
                  height={250}
                  className="w-4/5 md:w-1/2 h-auto object-contain"
                />
              </div>
            )}

            {citiesImage && (
              <div className="md:col-span-2 md:col-start-5 flex items-center justify-center">
                <Image
                  src={citiesImage}
                  alt="Cities"
                  width={500}
                  height={450}
                  className="w-5/6 md:w-6/6 h-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-white/10 py-6 text-sm text-white/70">
            <div className="flex flex-col justify-end md:flex-row">
              <p>© Mi Piso {t("rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
