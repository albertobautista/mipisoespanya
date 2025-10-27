import { FAQAccordion } from "@/app/components/FAQAccordion";
import { FAQItem } from "@/app/components/FAQAccordion/FAQAccordion";
import React from "react";

interface FaqsProps {
  title: string;
  items: FAQItem[];
}

const Faqs = ({ title, items }: FaqsProps) => {
  return (
    <section className="max-w-6xl items-center mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
      <h2 className="text-3xl sm:text-4xl font-semibold font-cocomat">
        {title}
      </h2>
      <div>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
};

export default Faqs;
