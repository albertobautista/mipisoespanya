import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import React from "react";

interface CityOverviewProps {
  city: CityData;
}
const CityOverview = async ({ city }: CityOverviewProps) => {
  const t = await getTranslations("cities");
  return (
    <section className="py-16 bg-light-gray">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-poiret mb-8 text-gray-900">
            {t("aboutCity", { city: city.name })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold font-cocomat text-blue-600 mb-2">
                {city.population.toLocaleString()}
              </div>
              <div className="text-gray-700 font-medium font-cocomat">
                {t("inhabitants")}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2 font-cocomat">
                {t(`languages.${city.language}`)}
              </div>
              <div className="text-gray-700 font-medium font-cocomat">
                {t("language")}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600 font-cocomat mb-2">
                {city.region}
              </div>
              <div className="text-gray-700 font-medium font-cocomat">
                {t("region")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityOverview;
