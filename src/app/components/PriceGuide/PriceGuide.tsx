import { PriceRange } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";
import React from "react";

interface PriceGuideProps {
  priceRanges: PriceRange[];
}

const PriceGuide = async ({ priceRanges }: PriceGuideProps) => {
  const t = await getTranslations("cities");

  // Agrupar por zona
  const groupedByZone = priceRanges.reduce((acc, range) => {
    if (!acc[range.zone]) {
      acc[range.zone] = [];
    }
    acc[range.zone].push(range);
    return acc;
  }, {} as Record<string, PriceRange[]>);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 font-poiret">
            {t("priceGuide")}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-cocomat">
            {t("priceGuideSubtitle")}
          </p>
        </div>

        {/* Versión Desktop - Cards por zona */}
        <div className="hidden grid-cols-1 gap-8 md:grid lg:grid-cols-2">
          {Object.entries(groupedByZone).map(([zone, ranges]) => (
            <div
              key={zone}
              className="p-6 transition-shadow duration-300 border shadow-sm bg-gradient-to-br from-light-gray to-gray/20 rounded-2xl hover:shadow-md border-gray/30"
            >
              <h3 className="mb-6 text-xl font-bold text-center font-poiret text-dark-green">
                {zone}
              </h3>
              <div className="space-y-4">
                {ranges.map((range, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 transition-colors duration-200 bg-white rounded-lg shadow-sm hover:bg-light-gray/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-light-green to-green"></div>
                      <span className="font-medium font-cocomat text-dark-green">
                        {range.rooms}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold font-cocomat text-green">
                        €{range.priceRange}
                      </span>
                      <div className="text-xs text-gray font-cocomat">
                        / {t("priceRange").split("(")[1]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Versión Mobile - Tabla tradicional */}
        <div className="md:hidden">
          <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-gray/30">
            {/* Header de la tabla */}
            <div className="text-white bg-gradient-to-r from-green to-dark-green">
              <div className="grid grid-cols-3 gap-4 p-4 text-sm font-semibold font-cocomat">
                <div>{t("zone")}</div>
                <div className="text-center">{t("rooms")}</div>
                <div className="text-right">{t("priceRange")}</div>
              </div>
            </div>

            {/* Filas de datos */}
            <div className="divide-y divide-gray/20">
              {priceRanges.map((range, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-4 transition-colors duration-200 hover:bg-light-gray/70"
                >
                  <div className="text-sm font-medium font-cocomat text-dark-green">
                    {range.zone}
                  </div>
                  <div className="text-sm text-center font-cocomat text-dark-green/80">
                    {range.rooms}
                  </div>
                  <div className="text-sm font-bold text-right font-cocomat text-green">
                    €{range.priceRange}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nota explicativa en mobile */}
          <div className="p-4 mt-4 border rounded-lg bg-light-green/20 border-light-green/30">
            <p className="text-xs text-center text-dark-green font-cocomat">
              * {t("priceDisclaimer")}
            </p>
          </div>
        </div>

        {/* Nota explicativa en desktop */}
        <div className="hidden md:block mt-8 text-center">
          <p className="text-sm text-gray font-cocomat">
            * {t("priceDisclaimerLong")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceGuide;
