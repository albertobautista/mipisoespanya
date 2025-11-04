import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getCityBySlug, getAllCitySlugs } from "@/app/data/cities";
import { Hero } from "@/app/components/Hero";
import Cities from "@/app/sections/Cities/Cities";

interface CityPageProps {
  params: {
    city: string;
    locale: string;
  };
}

// Generar parámetros estáticos para todas las ciudades
export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();

  return citySlugs.map((city) => ({
    city,
  }));
}

// Generar metadata dinámica para SEO
export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.city);
  const locale = (await getLocale()) as "es" | "en";

  if (!city) {
    return {
      title: "Ciudad no encontrada | Mi Piso España",
      description: "La ciudad que buscas no está disponible.",
    };
  }

  const title = city.seo.title[locale];
  const description = city.seo.description[locale];
  const keywords = city.seo.keywords[locale].join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://mipisoespanya.com/${locale}/cities/${city.slug}`,
      siteName: "Mi Piso España",
      images: [
        {
          url: city.images.hero,
          width: 1200,
          height: 630,
          alt: `Alquiler en ${city.name}`,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [city.images.hero],
    },
    alternates: {
      canonical: `https://mipisoespanya.com/${locale}/cities/${city.slug}`,
      languages: {
        es: `https://mipisoespanya.com/es/cities/${city.slug}`,
        en: `https://mipisoespanya.com/en/cities/${city.slug}`,
      },
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.city);
  const locale = (await getLocale()) as "es" | "en";
  const t = await getTranslations("cities");

  if (!city) {
    notFound();
  }

  // Structured data para la ciudad
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: city.name,
    description: city.seo.description[locale],
    address: {
      "@type": "PostalAddress",
      addressRegion: city.region,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    },
    population: city.population,
    image: city.images.hero,
    url: `https://mipisoespanya.com/${locale}/cities/${city.slug}`,
    sameAs: [
      `https://mipisoespanya.com/es/cities/${city.slug}`,
      `https://mipisoespanya.com/en/cities/${city.slug}`,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen">
        {/* Hero Section con Menu */}
        <Hero
          media={{
            kind: "image",
            src: city.images.hero,
            alt: `Vista de ${city.name}`,
            priority: true,
          }}
          logoText={city.name}
          title={`${t("findHome")}\n${city.name}`}
          logoSubtitle={city.seo.description[locale]}
          country="ESPAÑA"
        />

        <Cities city={city} />
      </main>
    </>
  );
}
