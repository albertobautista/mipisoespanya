import Image from "next/image";
import React from "react";

export interface PromoCardProps {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
}

export default function PromoCard({ title, subtitle, image }: PromoCardProps) {
  return (
    <div className="w-full mx-auto max-w-xs sm:max-w-sm">
      {/* Wrapper con relación/altura responsiva para la imagen */}
      <div className="relative overflow-hidden rounded-lg h-72 sm:h-80 md:h-[28rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 32rem, (min-width: 640px) 24rem, 20rem"
          className="object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-cocomat md:text-2xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base font-cocomat text-gray-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
