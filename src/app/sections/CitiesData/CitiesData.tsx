import { CitiesData as CitiesDataComponent } from "@/app/components/CitiesData";
import React from "react";

const CitiesData = () => {
  return (
    <CitiesDataComponent
      cities={[
        {
          name: "Madrid",
          href: "/cities/madrid",
          accent: "text-blue-500",
          leftImages: [
            {
              src: "/images/cities/madrid/image-1.webp",
              alt: "Madrid Gran Vía",
            },
            {
              src: "/images/cities/madrid/image-2.webp",
              alt: "Parque del Retiro",
            },
            {
              src: "/images/cities/madrid/image-3.webp",
              alt: "Plaza Mayor",
            },
          ],
          rightImages: [
            {
              src: "/images/cities/madrid/image-4.webp",
              alt: "Madrid atardecer",
            },
            {
              src: "/images/cities/madrid/image-5.webp",
              alt: "Arquitectura en Madrid",
            },
            {
              src: "/images/cities/madrid/image-6.webp",
              alt: "Calles de Madrid",
            },
          ],
        },
        {
          name: "Barcelona",
          href: "/cities/barcelona",
          accent: "text-red-500",
          leftImages: [
            {
              src: "/images/cities/barcelona/image-1.webp",
              alt: "Sagrada Familia",
            },
            {
              src: "/images/cities/barcelona/image-2.webp",
              alt: "Barceloneta",
            },
            {
              src: "/images/cities/barcelona/image-3.webp",
              alt: "Parque Güell",
            },
          ],
          rightImages: [
            {
              src: "/images/cities/barcelona/image-4.webp",
              alt: "Barrio Gótico",
            },
            {
              src: "/images/cities/barcelona/image-5.webp",
              alt: "Casa Batlló",
            },
            {
              src: "/images/cities/barcelona/image-6.webp",
              alt: "Vista de Barcelona",
            },
          ],
        },
      ]}
    />
  );
};

export default CitiesData;
