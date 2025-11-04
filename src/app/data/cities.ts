export interface CityData {
  slug: string;
  name: string;
  region: string;
  population: number;
  averageRent: string;
  bestNeighborhoods: string[];
  keyFeatures: string[];
  transportInfo: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  images: {
    hero: string;
    gallery: string[];
  };
  seo: {
    title: {
      es: string;
      en: string;
    };
    description: {
      es: string;
      en: string;
    };
    keywords: {
      es: string[];
      en: string[];
    };
  };
}

export const cities: CityData[] = [
  {
    slug: "madrid",
    name: "Madrid",
    region: "Comunidad de Madrid",
    population: 3223000,
    averageRent: "€800-1500",
    bestNeighborhoods: [
      "Malasaña",
      "Chueca",
      "La Latina",
      "Salamanca",
      "Retiro",
      "Chamberí",
    ],
    keyFeatures: [
      "Capital de España",
      "Centro financiero",
      "Rica vida cultural",
      "Excelente transporte público",
      "Vida nocturna vibrante",
    ],
    transportInfo: [
      "Metro con 12 líneas",
      "Red de autobuses extensa",
      "Cercanías conectan con área metropolitana",
      "Bicicletas públicas BiciMAD",
    ],
    coordinates: {
      lat: 40.4168,
      lng: -3.7038,
    },
    images: {
      hero: "/images/cities/madrid/hero.webp",
      gallery: [
        "/images/cities/madrid/gallery-1.webp",
        "/images/cities/madrid/gallery-2.webp",
        "/images/cities/madrid/gallery-3.webp",
        "/images/cities/madrid/gallery-4.webp",
        "/images/cities/madrid/gallery-5.webp",
        "/images/cities/madrid/gallery-6.webp",
      ],
    },
    seo: {
      title: {
        es: "Alquiler en Madrid - Encuentra tu Hogar Ideal | Mi Piso España",
        en: "Rent in Madrid - Find Your Ideal Home | Mi Piso España",
      },
      description: {
        es: "Encuentra el apartamento perfecto en Madrid. Asesoramiento experto en los mejores barrios: Malasaña, Chueca, La Latina. Servicios de reubicación completos.",
        en: "Find the perfect apartment in Madrid. Expert guidance in the best neighborhoods: Malasaña, Chueca, La Latina. Complete relocation services.",
      },
      keywords: {
        es: [
          "alquiler Madrid",
          "apartamentos Madrid",
          "pisos Madrid",
          "mudanza Madrid",
          "reubicación Madrid",
          "Malasaña",
          "Chueca",
          "La Latina",
        ],
        en: [
          "rent Madrid",
          "apartments Madrid",
          "flats Madrid",
          "moving Madrid",
          "relocation Madrid",
          "Malasaña",
          "Chueca",
          "La Latina",
        ],
      },
    },
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    region: "Cataluña",
    population: 1620000,
    averageRent: "€700-1300",
    bestNeighborhoods: [
      "Eixample",
      "Gràcia",
      "Born",
      "Barceloneta",
      "Poble Sec",
      "Sarrià",
    ],
    keyFeatures: [
      "Ciudad cosmopolita",
      "Arquitectura única (Gaudí)",
      "Playa mediterránea",
      "Fuerte sector tech",
      "Cultura catalana",
    ],
    transportInfo: [
      "Metro con 8 líneas",
      "Red de autobuses TMB",
      "Tranvías modernos",
      "Bicing (bicicletas públicas)",
    ],
    coordinates: {
      lat: 41.3851,
      lng: 2.1734,
    },
    images: {
      hero: "/images/cities/barcelona/hero.webp",
      gallery: [
        "/images/cities/barcelona/gallery-1.webp",
        "/images/cities/barcelona/gallery-2.webp",
        "/images/cities/barcelona/gallery-3.webp",
        "/images/cities/barcelona/gallery-4.webp",
        "/images/cities/barcelona/gallery-5.webp",
        "/images/cities/barcelona/gallery-6.webp",
      ],
    },
    seo: {
      title: {
        es: "Alquiler en Barcelona - Tu Nuevo Hogar te Espera | Mi Piso España",
        en: "Rent in Barcelona - Your New Home Awaits | Mi Piso España",
      },
      description: {
        es: "Descubre tu hogar ideal en Barcelona. Expertos en Eixample, Gràcia, Born y más. Servicios completos de reubicación en la ciudad condal.",
        en: "Discover your ideal home in Barcelona. Experts in Eixample, Gràcia, Born and more. Complete relocation services in the Catalan capital.",
      },
      keywords: {
        es: [
          "alquiler Barcelona",
          "apartamentos Barcelona",
          "pisos Barcelona",
          "mudanza Barcelona",
          "reubicación Barcelona",
          "Eixample",
          "Gràcia",
          "Born",
        ],
        en: [
          "rent Barcelona",
          "apartments Barcelona",
          "flats Barcelona",
          "moving Barcelona",
          "relocation Barcelona",
          "Eixample",
          "Gràcia",
          "Born",
        ],
      },
    },
  },
];

// Función helper para obtener datos de ciudad
export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((city) => city.slug === slug);
}

// Función helper para generar paths estáticos
export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}
