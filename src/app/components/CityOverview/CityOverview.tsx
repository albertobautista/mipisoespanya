import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import React from "react";
import PriceGuide from "../PriceGuide";

interface CityOverviewProps {
  city: CityData;
}
const CityOverview = async ({ city }: CityOverviewProps) => {
  const t = await getTranslations("cities");
  return (
    <>
      <section className="py-16 bg-light-gray">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="text-center">
            <h2 className="mb-8 text-3xl text-gray-900 font-montserratSemibold">
              {t("aboutCity", { city: city.name })}
            </h2>
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-2 text-3xl text-blue-600 font-montserrat">
                  {city.population.toLocaleString()}
                </div>
                <div className="text-gray-700 font-montserrat">
                  {t("inhabitants")}
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-2 text-3xl font-bold text-green-600 font-montserrat">
                  {t(`languages.${city.language}`)}
                </div>
                <div className="font-medium text-gray-700 font-montserrat">
                  {t("language")}
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-2 text-2xl font-bold text-purple-600 font-montserrat">
                  {city.region}
                </div>
                <div className="font-medium text-gray-700 font-montserrat">
                  {t("region")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PriceGuide priceRanges={city.priceRanges} />
    </>
  );
};

export default CityOverview;
