import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "@/app/components/Hero";
import { Points } from "@/app/sections/OurStory";
import { PointItem } from "@/app/sections/OurStory/Points/Points";
import { pointsItems as pointsItemsBase } from "./data";

const heroImageSrc = "/images/heros/our-story.webp";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("ourStory");

  const pointsItems: PointItem[] = pointsItemsBase.map((item, i) => ({
    ...item,
    title: t(`points.${i}.title`),
  }));

  return (
    <main>
      <Hero
        logoText="mi piso"
        title={t("title")}
        media={{
          kind: "image",
          src: heroImageSrc,
          priority: true,
        }}
      />

      <Points items={pointsItems} />
    </main>
  );
}
