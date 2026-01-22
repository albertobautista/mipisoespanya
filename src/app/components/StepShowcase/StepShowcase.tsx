// StepShowcase.tsx
"use client";
import Image from "next/image";
import React from "react";

type Props = {
  /** 01, 1, I, etc. */
  number: string | number;
  /** Título del bloque de texto */
  title: string;
  /** Imagen única */
  image: { src: string; alt: string; width?: number; height?: number };
  /** Lado donde se coloca la imagen en desktop */
  imageSide?: "right" | "left";
  /** Clase extra opcional para el contenedor */
  className?: string;
  /** Altura fija (opcional) */
  imageHeight?: number;
};

export default function StepShowcase({
  number,
  title,
  image,
  imageSide = "right",
  className = "",
  imageHeight = 300,
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
      {/* Texto */}
      <div
        className={[
          "md:col-span-7 order-2",
          imageFirst ? "md:order-2" : "md:order-2",
        ].join(" ")}
      >
        <h2 className="text-2xl font-cocomat leading-tight font-semibold text-neutral-900">
          {title}
        </h2>
      </div>

      {/* Imagen */}
      <div
        className={[
          "md:col-span-4 order-3",
          imageFirst ? "md:order-1" : "md:order-3",
        ].join(" ")}
      >
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-sm"
          style={{ height: imageHeight }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
