import { use } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "../components/Hero";
import Information from "../sections/Information/Information";
import {
  items as baseItems,
  cards as baseCards,
  services as baseServices,
} from "../sections/data";
import { HowWeWork } from "../sections/HowWeWork";
import { WhatMakesUsUnique } from "../sections/WhatMakesUsUnique";
import type { Metadata } from "next";
import { CitiesData } from "../sections/CitiesData";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      title: t("home.ogTitle"),
      description: t("home.ogDescription"),
      type: "website",
      images: [
        {
          url: "/images/og-home.jpg",
          width: 1200,
          height: 630,
          alt: t("home.ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.twitterTitle"),
      description: t("home.twitterDescription"),
      images: ["/images/twitter-home.jpg"],
    },
  };
}

const heroVideoSrc = "/videos/hero_video.mp4";

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  const items = baseItems.map((item, i) => ({
    title: t(`information.${i}.title`),
    image: {
      ...item.image,
      alt: t(`information.${i}.alt`),
    },
  }));

  const cards = baseCards.map((card, i) => ({
    ...card,
    title: t(`howWeWork.cards.${i}.title`),
    body: t(`howWeWork.cards.${i}.body`),
  }));

  const services = baseServices.map((service, i) => ({
    ...service,
    title: t(`whatMakesUsUnique.services.${i}.title`),
  }));

  return (
    <>
      {/* Structured Data para la página principal */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: t("title"),
            description: t("whatMakesUsUnique.title"),
            url: `https://mipisoespana.com/${locale}`,
            mainEntity: {
              "@type": "Service",
              name: "Servicios de Reubicación",
              provider: {
                "@type": "RealEstateAgent",
                name: "Mi Piso España",
              },
              areaServed: ["Madrid", "Barcelona"],
            },
          }),
        }}
      />

      {/* HERO con video */}
      <Hero
        logoText="mi piso"
        title={t("title")}
        media={{
          kind: "video",
          src: heroVideoSrc,
        }}
      />

      <Information items={items} />

      <WhatMakesUsUnique
        title={t("whatMakesUsUnique.title")}
        items={services}
      />

      <CitiesData />

      <HowWeWork
        title={t("howWeWork.title")}
        subtitle={t("howWeWork.subtitle")}
        items={cards}
      />
    </>
  );
}
