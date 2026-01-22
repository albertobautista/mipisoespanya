"use client";
import { Review } from "@/app/[locale]/reviews/types";
import { PromoCard } from "@/app/components/PromoCard";
import { useTranslations } from "next-intl";
import React from "react";

interface ReviewsProps {
  items: Review[];
}

const Reviews = ({ items }: ReviewsProps) => {
  const t = useTranslations("reviews");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <PromoCard
            key={item.title + index}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
          />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <a
          href="https://maps.app.goo.gl/16vy95P3oD6zVQtf8"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-dark-green text-white rounded-lg hover:bg-light-green transition-colors font-cocomat font-bold text-sm uppercase inline-block"
        >
          {t("viewMore")}
        </a>
      </div>
    </section>
  );
};

export default Reviews;
