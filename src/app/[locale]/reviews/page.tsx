import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "@/app/components/Hero";

import { reviewsItems as reviewsItemsBase } from "./data";
import { Review } from "./types";
import { Reviews } from "@/app/sections/Reviews";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("reviews"); // 👈 namespace para About

  const reviewsItems: Review[] = reviewsItemsBase.map((item, i) => ({
    ...item,
    title: t(`reviews.${i}.title`),
    subtitle: t(`reviews.${i}.subtitle`),
  }));

  return (
    <main>
      <Hero
        logoText="mi piso"
        videoSrc="https://www.datocms-assets.com/49893/1755596941-2025_numa_berlin-rome_homepage_1440x607_v3.mp4"
      />

      <Reviews items={reviewsItems} />
    </main>
  );
}
