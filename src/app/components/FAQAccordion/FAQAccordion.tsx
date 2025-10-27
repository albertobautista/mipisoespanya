"use client";
import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

export type FAQAccordionProps = {
  items: FAQItem[];
  /** Permite abrir más de una a la vez */
  allowMultiple?: boolean;
  /** Índices que arrancan abiertos */
  defaultOpen?: number[];
  /** Estilo de separación */
  variant?: "bordered" | "separated"; // separated = línea fina entre items
  /** Tamaños responsivos de tipografía */
  size?: "sm" | "md" | "lg";
};

export default function FAQAccordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = "separated",
  size = "md",
}: FAQAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set(defaultOpen));

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else {
        if (!allowMultiple) next.clear();
        next.add(idx);
      }
      return next;
    });
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }[size];
  const answerSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <div
      className={
        variant === "bordered"
          ? "divide-y rounded-2xl border overflow-hidden"
          : "divide-y"
      }
    >
      {items.map((it, i) => (
        <Item
          key={i}
          index={i}
          q={it.question}
          a={it.answer}
          isOpen={openSet.has(i)}
          onToggle={() => toggle(i)}
          titleClass={titleSizes}
          answerClass={answerSizes}
        />
      ))}
    </div>
  );
}

function Item({
  index,
  q,
  a,
  isOpen,
  onToggle,
  titleClass,
  answerClass,
}: {
  index: number;
  q: string;
  a: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  titleClass: string;
  answerClass: string;
}) {
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={`w-full flex cursor-pointer items-center justify-between gap-4 py-4 sm:py-5 text-left ${titleClass}`}
      >
        <span className="font-medium text-2xl leading-snug font-cocomat">
          {q}
        </span>
        <motion.svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="shrink-0"
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "tween", duration: 0.18 }}
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0.38, 0.9] }}
            className="overflow-hidden"
          >
            <div
              className={`pb-5 sm:pb-6 pr-8 font-cocomat ${answerClass} text-gray-600 leading-relaxed`}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
