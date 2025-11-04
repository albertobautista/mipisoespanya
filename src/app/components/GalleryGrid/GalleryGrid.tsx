import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

interface GalleryGridProps {
  city: CityData;
}

const GalleryGrid = async ({ city }: GalleryGridProps) => {
  const t = await getTranslations("cities");
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold font-poiret mb-12 text-center text-gray-900">
          {t("discover", { city: city.name })}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {city.images.gallery.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <Image
                src={image}
                alt={`${city.name} - Vista ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={85}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
