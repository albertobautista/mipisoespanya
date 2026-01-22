"use client";
import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * StackedAlternatingCards (balance, dramático, compacto)
 *
 * - Cards edge-to-edge con fondo blanco translúcido + blur ligero.
 * - Altura de sección compacta (min-h 60vh) y sticky para solape elegante.
 * - Alterna columnas (texto/imagen) por índice.
 * - Sin saltos de posición: y = 0 (no traslada la card completa al hacer scroll).
 * - Micro-scale al entrar/salir y fade-in sutil; parallax mínimo SOLO en imagen.
 */

export type StackedItem = {
  title: string;
  body?: React.ReactNode;
  cta?: { label: string; href: string };
  image: { src: string; alt: string; width?: number; height?: number };
  backgroundClass?: string; // opcional, se aplica al <section>
};

export type StackedAlternatingCardsProps = {
  items: StackedItem[];
  lift?: number; // mantenido por compatibilidad, ya no mueve la card (y=0)
  minScale?: number; // mantenido por compatibilidad
  overlapVH?: number; // separador invisible para solape
  innerPaddingX?: string; // padding horizontal interno
  cardPaddingY?: string; // padding vertical interno
};

export default function StackedAlternatingCards({
  items,
  lift = 50,
  minScale = 0.96,
  overlapVH = 4,
  innerPaddingX = "px-5 md:px-10",
  cardPaddingY = "py-0",
}: StackedAlternatingCardsProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useScroll({ target: wrapperRef });

  return (
    <div ref={wrapperRef} className="relative w-full">
      {items.map((item, idx) => (
        <SectionCard
          key={idx}
          index={idx}
          total={items.length}
          item={item}
          lift={lift}
          minScale={minScale}
          overlapVH={overlapVH}
          innerPaddingX={innerPaddingX}
          cardPaddingY={cardPaddingY}
        />
      ))}
    </div>
  );
}

function SectionCard({
  index,
  total,
  item,
  lift,
  minScale,
  overlapVH,
  innerPaddingX,
  cardPaddingY,
}: {
  index: number;
  total: number;
  item: StackedItem;
  lift: number;
  minScale: number;
  overlapVH: number;
  innerPaddingX: string;
  cardPaddingY: string;
}) {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // SIN movimientos verticales en la card completa
  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  // Micro-scale cinematográfico (entra 1.01 → 1, sale 1 → 0.99)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.01, 1, 0.99]);
  // Fade-in sutil (0.97 → 1)
  const opacity = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  const reversed = index % 2 === 1; // alterna columnas

  // Columnas preparadas
  const TextCol = (
    <div className="space-y-4 md:space-y-6 font-cocomat ">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-neutral-900">
        {item.title}
      </h2>
      {item.body ? (
        <h2 className="text-neutral-700 text-base md:text-2xl leading-relaxed">
          {item.body}
        </h2>
      ) : null}
      {item.cta ? (
        <a
          href={item.cta.href}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
        >
          {item.cta.label}
        </a>
      ) : null}
    </div>
  );

  const ImageCol = (
    <div className="relative w-full h-[36vh] md:h-[44vh] lg:h-[52vh] overflow-hidden rounded-xl md:rounded-2xl">
      <motion.div
        className="absolute inset-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
      >
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover object-center select-none"
          priority={index === 0}
        />
      </motion.div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={[
        "sticky top-0 min-h-[60vh] flex items-center",
        item.backgroundClass ?? "",
      ].join(" ")}
      style={{ isolation: "isolate", zIndex: index + 1 }}
    >
      <motion.div
        style={{ y, scale, opacity }}
        className={[
          "w-full min-h-[60vh] flex items-center",
          cardPaddingY,
          // Fondo + blur para contención visual
          "bg-white/85 backdrop-blur-md",
          // Sombra elegante (arriba y abajo), nivel profundo pero sutil
          "shadow-[0_10px_32px_-4px_rgba(0,0,0,0.22)] md:shadow-[0_14px_40px_-6px_rgba(0,0,0,0.26)]",
          // Borde limpio opcional
          "border-0 rounded-none",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto w-full",
            innerPaddingX,
            "grid gap-6 md:gap-8 items-center",
            "lg:grid-cols-2",
            "max-w-7xl",
          ].join(" ")}
        >
          {reversed ? (
            <>
              {ImageCol}
              {TextCol}
            </>
          ) : (
            <>
              {TextCol}
              {ImageCol}
            </>
          )}
        </div>
      </motion.div>

      {/* Separador para el solape entre tarjetas */}
      {index < total - 1 && (
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{ bottom: `-${overlapVH}vh`, height: `${overlapVH}vh` }}
        />
      )}
    </section>
  );
}
