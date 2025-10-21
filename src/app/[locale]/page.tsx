import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "../components/Hero";
import { StickyMobileBar } from "../components/StickyMobileBar";
import Information from "../sections/Information/Information";
import {
  items as baseItems,
  cards as baseCards,
  services as baseServices,
} from "../sections/data";
import { Cities } from "../sections/Cities";
import { HowWeWork } from "../sections/HowWeWork";
import { WhatMakesUsUnique } from "../sections/WhatMakesUsUnique";
// import FeatureStack from "../components/FeatureStack";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
    <main>
      {/* HERO con video */}
      <StickyMobileBar title="Mi piso" />
      <Hero
        logoText="mi piso"
        title={t("title")}
        subtitle={t("subtitle")}
        logoSubtitle={t("logoSubtitle")}
        videoSrc="https://www.datocms-assets.com/49893/1755596941-2025_numa_berlin-rome_homepage_1440x607_v3.mp4"
      />

      <Information items={items} />

      <WhatMakesUsUnique
        title={t("whatMakesUsUnique.title")}
        items={services}
      />

      <Cities />

      <HowWeWork
        title={t("howWeWork.title")}
        subtitle={t("howWeWork.subtitle")}
        items={cards}
      />
    </main>
  );
}
