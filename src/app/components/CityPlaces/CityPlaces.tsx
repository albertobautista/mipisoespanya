import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import React from "react";

interface CityPlacesProps {
  city: CityData;
}

const CityPlaces = async ({ city }: CityPlacesProps) => {
  const t = await getTranslations("cities");

  return (
    <section className="py-16 bg-light-green/">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl mb-12 text-center font-montserratSemibold text-gray-900">
          {t("bestNeighborhoods")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {city.bestNeighborhoods.map((neighborhood, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg font-montserrat text-gray-900 text-center">
                {neighborhood}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityPlaces;
