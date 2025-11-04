import React from "react";
import { WhatsappButton } from "../Buttons/WhatsappButton";
import { CityData } from "@/app/data/cities";
import { getTranslations } from "next-intl/server";

interface CityCTAProps {
  city: CityData;
}

const CityCTA = async ({ city }: CityCTAProps) => {
  const t = await getTranslations("cities");
  return (
    <section className="py-16 bg-gray text-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 font-poiret">
          {t("readyToMove", { city: city.name })}
        </h2>
        <p className="text-xl mb-8 opacity-90">{t("ctaDescription")}</p>
        <WhatsappButton
          phone="34612345678"
          message={`Quiero más información sobre mudanza a ${city.name}`}
        />
      </div>
    </section>
  );
};

export default CityCTA;
