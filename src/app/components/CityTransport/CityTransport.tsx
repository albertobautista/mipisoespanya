import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import React from "react";

interface CityTransportProps {
  city: CityData;
}

const CityTransport = async ({ city }: CityTransportProps) => {
  const t = await getTranslations("cities");
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl  mb-12 text-center text-gray-900 font-montserratSemibold">
          {t("transport")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {city.transportInfo.map((transportKey, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-4 rounded-lg"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold font-montserrat">
                  ✓
                </span>
              </div>
              <span className="text-gray-700 font-montserrat">
                {t(`transportOptions.${transportKey}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityTransport;
