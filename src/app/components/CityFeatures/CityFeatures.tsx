import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import React from "react";

interface CityFeaturesProps {
  city: CityData;
}

const CityFeatures = async ({ city }: CityFeaturesProps) => {
  const t = await getTranslations("cities");
  return (
    <section className="py-16 bg-light-gray">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 font-poiret text-center text-gray-900">
          {t("whyChoose", { city: city.name })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {city.keyFeatures.map((featureKey, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 font-cocomat">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-semibold text-lg font-cocomat text-gray-900 mb-2">
                {t(`features.${featureKey}`)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityFeatures;
