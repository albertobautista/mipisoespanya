import { StepShowcase } from "@/app/components/StepShowcase";
import React from "react";

export interface PointItem {
  number: string | number;
  title: string;
  image: { src: string; alt: string };
  imageSide?: "right" | "left";
}

interface PointsProps {
  items: PointItem[];
}

const Points = ({ items }: PointsProps) => {
  return (
    <section className="max-w-7xl items-center flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {items.map((item) => (
        <StepShowcase
          key={item.number}
          number={item.number}
          title={item.title}
          image={item.image}
          imageSide={item.imageSide}
        />
      ))}
    </section>
  );
};

export default Points;
