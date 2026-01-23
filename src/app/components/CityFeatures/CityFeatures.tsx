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
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 font-montserratSemibold">
          {t("whyChoose", { city: city.name })}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {city.keyFeatures.map((featureKey, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-light-green/30">
                <span className="text-2xl font-bold text-green font-montserrat">
                  {index + 1}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 font-montserrat">
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
