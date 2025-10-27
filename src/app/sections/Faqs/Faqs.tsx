import { FAQAccordion } from "@/app/components/FAQAccordion";
import { FAQItem } from "@/app/components/FAQAccordion/FAQAccordion";
import React from "react";

interface FaqsProps {
  items: FAQItem[];
}

const Faqs = ({ items }: FaqsProps) => {
  return (
    <section className="max-w-6xl items-center  mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <FAQAccordion items={items} />
    </section>
  );
};

export default Faqs;
