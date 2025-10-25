import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "@/app/components/Hero";
import { Points } from "@/app/sections/OurStory";
import { PointItem } from "@/app/sections/OurStory/Points/Points";
import { pointsItems as pointsItemsBase } from "./data";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("ourStory"); // 👈 namespace para About

  const pointsItems: PointItem[] = pointsItemsBase.map((item, i) => ({
    ...item,
    title: t(`points.${i}.title`),
  }));

  return (
    <main>
      <Hero
        logoText="mi piso"
        videoSrc="https://www.datocms-assets.com/49893/1755596941-2025_numa_berlin-rome_homepage_1440x607_v3.mp4"
      />

      <Points items={pointsItems} />
    </main>
  );
}
