import { ShowcaseItem } from "../components/TextImageScrollTransition/TextImageScrollTransition";

import {
  House,
  HandHelping,
  ShieldCheck,
  Search,
  MapPinned,
  Star,
} from "lucide-react";

export const items: ShowcaseItem[] = [
  {
    image: {
      src: "/images/information/information-1.webp",
      alt: "Estancia de trabajo cómoda",
    },
  },
  {
    image: {
      src: "/images/information/information-2.webp",
      alt: "Sala moderna",
    },
  },
  {
    image: {
      src: "/images/information/information-3.webp",
      alt: "Apartamento luminoso",
    },
  },
  {
    image: {
      src: "/images/information/information-4.webp",
      alt: "Recepción acogedora",
    },
  },
  {
    image: {
      src: "/images/information/information-5.webp",
      alt: "Apartamento luminoso",
    },
  },
];

export const cards = [
  {
    title: "Texto a la izquierda, imagen a la derecha",
    image: {
      src: "/images/how-we-work/how-we-work-1.webp",
      alt: "Demo 1",
    },
    backgroundClass: "bg-light-gray",
  },
  {
    title: "Texto a la izquierda, imagen a la derecha",
    image: {
      src: "/images/how-we-work/how-we-work-2.webp",
      alt: "Demo 1",
    },
    backgroundClass: "bg-light-gray",
  },
  {
    title: "Texto a la izquierda, imagen a la derecha",
    image: {
      src: "/images/how-we-work/how-we-work-3.webp",
      alt: "Demo 1",
    },
    backgroundClass: "bg-light-gray",
  },
  {
    title: "Texto a la izquierda, imagen a la derecha",
    image: {
      src: "/images/how-we-work/how-we-work-4.webp",
      alt: "Demo 1",
    },
    backgroundClass: "bg-light-gray",
  },
];

export const services = [
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    icon: <House size={70} />,
  },
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    icon: <HandHelping size={70} />,
  },
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    icon: <ShieldCheck size={70} />,
  },
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    icon: <Search size={70} />,
  },
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    icon: <MapPinned size={70} />,
  },
  {
    title: "Servicio 1",
    description: "Descripción del servicio 1",
    icon: <Star size={70} />,
  },
];
