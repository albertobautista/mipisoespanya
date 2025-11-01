import { FAQAccordion } from "@/app/components/FAQAccordion";
import { FAQItem } from "@/app/components/FAQAccordion/FAQAccordion";
import { PartnersGrid } from "@/app/components/PartnersGrid";
import { useTranslations } from "next-intl";
import React from "react";

interface FaqsProps {
  title: string;
  items: FAQItem[];
}

const universities = [
  {
    src: "/images/partners/iteso.png",
    alt: "ITESO, Universidad Jesuita de Guadalajara",
    height: 140,
  },
  { src: "/images/partners/tec.png", alt: "Tecnológico de Monterrey" },
  { src: "/images/partners/up.png", alt: "Universidad Panamericana" },
  {
    src: "/images/partners/iese.webp",
    alt: "IESE Business School",
    height: 140,
  },
  { src: "/images/partners/esade.png", alt: "ESADE" },
];

const agencies = [
  { src: "/images/partners/aproperties.webp", alt: "Aproperties", height: 140 },
  { src: "/images/partners/engel.png", alt: "Engel & Völkers" },
  { src: "/images/partners/rightplace.png", alt: "Rightplace", height: 150 },
  { src: "/images/partners/ukio.png", alt: "Ukio" },
  { src: "/images/partners/alting.png", alt: "Alting", height: 140 },
  { src: "/images/partners/atemporal.png", alt: "Atemporal", height: 140 },
  { src: "/images/partners/dobleb.webp", alt: "Dobleb", height: 140 },
];

const Faqs = ({ title, items }: FaqsProps) => {
  const t = useTranslations("faqs");
  return (
    <section>
      <div className="max-w-7xl items-center mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-semibold font-cocomat">
          {title}
        </h2>
        <div>
          <FAQAccordion items={items} />
        </div>
      </div>
      <div className="w-full mx-auto bg-gray px-4 sm:px-8 md:px-16 py-16">
        <PartnersGrid
          title={t("partnersTitle")}
          left={{ heading: t("universities"), items: universities }}
          right={{ heading: t("agencies"), items: agencies }}
          logoMaxH={72}
        />
      </div>
    </section>
  );
};

export default Faqs;
