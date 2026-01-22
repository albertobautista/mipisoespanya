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
    <section className="relative w-full">
      <header className="w-screen bg-light-green py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl uppercase font-poiret md:text-7xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-lg md:text-xl font-cocomat text-white mt-10">
            {subtitle}
          </p>
        </div>
      </header>

      {/* CARDS */}
      <StackedCards lift={120} minScale={0.94} items={items} />
    </section>
  );
};

export default HowWeWork;
