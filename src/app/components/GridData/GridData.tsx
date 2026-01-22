"use client";
import Image from "next/image";
import { ReactNode } from "react";

/**
 * FeatureGridHero
 * Sección con imagen de fondo, título grande y un grid de 3x2 (responsive)
 * - Desktop: 3 columnas x 2 filas
 * - Tablet: 2 columnas x 3 filas
 * - Mobile: 1 columna x N (stack)
 *
 * Props:
 *  - backgroundSrc: string           → URL de la imagen de fondo
 *  - backgroundAlt?: string          → alt de la imagen (accesibilidad)
 *  - title: string                   → título grande centrado
 *  - subtitle?: string               → subtítulo opcional
 *  - items: Array<{
 *      label: string;               → texto del ítem
 *      icon: ReactNode;             → icono (ej. <Wine /> de lucide-react)
 *    }>
 *  - overlay?: boolean               → activa un overlay para mejorar contraste (default: true)
 *  - minHeight?: number              → altura mínima en px (default: 520)
 */

export type FeatureGridItem = {
  title: string;
  icon: ReactNode;
};

export default function FeatureGridHero({
  backgroundSrc,
  backgroundAlt = "",
  title,
  items,
  overlay = true,
  minHeight = 650,
}: {
  backgroundSrc: string;
  backgroundAlt?: string;
  title: string;
  items: FeatureGridItem[];
  overlay?: boolean;
  minHeight?: number;
}) {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label={title}
      style={{ minHeight }}
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          className="object-cover"
        />
        {overlay && <div className="absolute inset-0 bg-black/50" />}
      </div>

      {/* Contenido */}
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center text-white">
          <h2 className="text-5xl uppercase font-poiret font-extrabold tracking-tight sm:text-6xl lg:text-8xl">
            {title}
          </h2>
        </header>

        {/* Grid responsive: 1col → 2col → 3col */}
        <ul
          className="grid w-full max-w-5xl mx-auto justify-center place-items-center gap-6 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {items.map((it, idx) => (
            <li
              key={idx}
              className="rounded-xl bg-light-green/90 p-8 w-full h-40 flex items-center justify-center max-w-sm mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-16 w-16  shrink-0 items-center justify-center rounded-xl text-white"
                  aria-hidden
                >
                  {it.icon}
                </span>
                <p className="text-2xl font-cocomat leading-6 text-white font-extrabold">
                  {it.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===============================
   Ejemplo de uso
   (Copia esto donde lo necesites)

import { Luggage, Percent, Clock5, DoorOpen, DoorClosed, Martini } from "lucide-react";
import FeatureGridHero from "./FeatureGridHero";

export default function Demo() {
  const demoItems = [
    { label: "Disfruta de un 15% de descuento", icon: <Percent size={20} /> },
    { label: "25% en estancias de 7 noches o más", icon: <Clock5 size={20} /> },
    { label: "Cancela hasta las 18:00", icon: <Luggage size={20} /> },
    { label: "Entrada anticipada desde las 14:00", icon: <DoorOpen size={20} /> },
    { label: "Salida tardía hasta las 13:00", icon: <DoorClosed size={20} /> },
    { label: "Bebidas y snacks de bienvenida", icon: <Martini size={20} /> },
  ];

  return (
    <FeatureGridHero
      backgroundSrc="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1920&auto=format&fit=crop"
      backgroundAlt="Calles europeas al atardecer"
      title="Únete gratis"
      subtitle="Beneficios exclusivos para miembros"
      items={demoItems}
    />
  );
}
*/
