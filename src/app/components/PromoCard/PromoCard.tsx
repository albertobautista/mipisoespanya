"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export interface PromoCardProps {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
}

export default function PromoCard({ title, subtitle, image }: PromoCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const t = useTranslations("reviews");

  return (
    <div className="w-full mx-auto max-w-xs sm:max-w-sm h-full flex flex-col">
      {/* Imagen */}
      <div className="relative overflow-hidden rounded-lg h-72 sm:h-80 md:h-[28rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 32rem, (min-width: 640px) 24rem, 20rem"
          className="object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="mt-4 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-cocomat md:text-2xl font-semibold leading-tight">
          {title}
        </h3>

        <p
          className={`mt-2 text-sm sm:text-base font-cocomat text-gray-600 ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {subtitle}
        </p>

        {/* Botón */}
        <div className="mt-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-sm cursor-pointer font-semibold text-green font-cocomat underline underline-offset-4 hover:text-light-green transition-colors"
          >
            {expanded ? t("showLess") : t("readMore")}
          </button>
        </div>
      </div>
    </div>
  );
}
