import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "@/app/components/Hero";
import { Points } from "@/app/sections/OurStory";
import { PointItem } from "@/app/sections/OurStory/Points/Points";
import { faqsItems as faqsItemsBase } from "./data";
import { Faqs } from "@/app/sections/Faqs";
import { FAQItem } from "@/app/components/FAQAccordion/FAQAccordion";

const heroImageSrc = "/images/heros/our-story.webp";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("faqs");

  const faqsItems: FAQItem[] = faqsItemsBase.map((item, i) => ({
    ...item,
    question: t(`faqs.${i}.question`),
    answer: t(`faqs.${i}.answer`),
  }));

  return (
    <main>
      <Hero
        logoText="mi piso"
        title={`${t("title")} / ${t("partners")}`}
        media={{
          kind: "image",
          src: heroImageSrc,
          priority: true,
        }}
      />

      <Faqs items={faqsItems} title={t("title")} />
    </main>
  );
}
