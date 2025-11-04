import { CityCTA } from "@/app/components/CityCTA";
import { CityFeatures } from "@/app/components/CityFeatures";
import { CityOverview } from "@/app/components/CityOverview";
import { CityPlaces } from "@/app/components/CityPlaces";
import { CityTransport } from "@/app/components/CityTransport";
import { GalleryGrid } from "@/app/components/GalleryGrid";
import { CityData } from "@/app/data/cities";
import React from "react";

interface CitiesProps {
  city: CityData;
}

const Cities = ({ city }: CitiesProps) => {
  return (
    <section className="bg-light-green/60">
      <GalleryGrid city={city} />
      <CityOverview city={city} />
      <CityPlaces city={city} />
      <CityFeatures city={city} />
      <CityTransport city={city} />
      <CityCTA city={city} />
    </section>
  );
};

export default Cities;
