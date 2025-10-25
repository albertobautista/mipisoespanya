// StepShowcase.tsx
"use client";
import React from "react";

type Props = {
  /** 01, 1, I, etc. */
  number: string | number;
  /** Título del bloque de texto */
  title: string;
  /** Imagen única */
  image: { src: string; alt: string };
  /** Lado donde se coloca la imagen en desktop */
  imageSide?: "right" | "left";
  /** Clase extra opcional para el contenedor */
  className?: string;
};

export default function StepShowcase({
  number,
  title,
  image,
  imageSide = "right",
  className = "",
}: Props) {
  const imageFirst = imageSide === "left";

  return (
    <section
      className={[
        "w-full",
        "grid gap-6 md:grid-cols-12 items-start md:items-center",
        className,
      ].join(" ")}
    >
      {/* Número */}
      <div
        className={[
          "md:col-span-1",
          "text-2xl md:text-3xl font-medium tracking-wide font-cocomat",
          "text-neutral-800",
          imageFirst ? "order-1" : "order-1",
        ].join(" ")}
        aria-hidden
      >
        {typeof number === "number" && number < 10 ? `0${number}` : number}
      </div>

      {/* Texto (un solo bloque) */}
      <div
        className={[
          "md:col-span-7",
          "order-2",
          imageFirst ? "md:order-2" : "md:order-2",
        ].join(" ")}
      >
        <h2 className="text-2xl  font-cocomat leading-tight font-semibold text-neutral-900">
          {title}
        </h2>
      </div>

      {/* Imagen única */}
      <div
        className={[
          "md:col-span-4",
          "order-3",
          imageFirst ? "md:order-1" : "md:order-3", // controla izquierda/derecha en desktop
        ].join(" ")}
      >
        <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
          {/* Usa <Image> de Next si quieres; aquí dejo <img> para ser agnóstico */}
          <img
            src={image.src}
            alt={image.alt}
            className="block w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
