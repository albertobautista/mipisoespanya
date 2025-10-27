import { Review } from "@/app/[locale]/reviews/types";
import { PromoCard } from "@/app/components/PromoCard";
import React from "react";

interface ReviewsProps {
  items: Review[];
}

const Reviews = ({ items }: ReviewsProps) => {
  return (
    <section className="max-w-7xl grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {items.map((item) => (
        <PromoCard
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          image={item.image}
        />
      ))}
    </section>
  );
};

export default Reviews;
