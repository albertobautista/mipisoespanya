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
              src: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
              alt: "Madrid Gran Vía",
            },
            {
              src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFkcmlkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
              alt: "Parque del Retiro",
            },
            {
              src: "https://images.unsplash.com/photo-1574556462575-eb106a5865a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hZHJpZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
              alt: "Plaza Mayor",
            },
          ],
          rightImages: [
            {
              src: "https://images.unsplash.com/photo-1518620121781-adab13a3d1ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hZHJpZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
              alt: "Madrid atardecer",
            },
            {
              src: "https://images.unsplash.com/photo-1533403611115-5b62680b6318?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hZHJpZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
              alt: "Arquitectura en Madrid",
            },
            {
              src: "https://images.unsplash.com/photo-1562120679-3a7feddcb926?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hZHJpZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
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
              src: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
              alt: "Sagrada Familia",
            },
            {
              src: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
              alt: "Barceloneta",
            },
            {
              src: "https://images.unsplash.com/photo-1593368858664-a7fe556ab936?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
              alt: "Parque Güell",
            },
          ],
          rightImages: [
            {
              src: "https://images.unsplash.com/photo-1610213989414-acc5773ba2c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhcmNlbG9uYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
              alt: "Barrio Gótico",
            },
            {
              src: "https://images.unsplash.com/photo-1598808947498-a04aab131fe2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhcmNlbG9uYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
              alt: "Casa Batlló",
            },
            {
              src: "https://images.unsplash.com/photo-1728249960363-13079cc2c6f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhcmNlbG9uYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
              alt: "Vista de Barcelona",
            },
          ],
        },
      ]}
    />
  );
};

export default CitiesData;
