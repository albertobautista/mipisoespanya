import { StackedCards } from "@/app/components/StackedCards";
import { StackedItem } from "@/app/components/StackedCards/StackedCards";
import React from "react";

interface HowWeWorkProps {
  title: string;
  subtitle: string;
  items: StackedItem[];
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ title, subtitle, items }) => {
  return (
    <section className="relative w-full py-20 md:py-28 bg-green">
      {/* HEADER */}
      <header className="text-center max-w-6xl mx-auto mb-16 px-6">
        <h2 className="text-3xl uppercase font-poiret md:text-7xl font-bold tracking-tight text-neutral-900">
          {title}
        </h2>
        <p className="text-lg md:text-xl font-cocomat text-neutral-600 mt-10">
          {subtitle}
        </p>
      </header>

      {/* CARDS */}
      <StackedCards lift={120} minScale={0.94} items={items} />
    </section>
  );
};

export default HowWeWork;
