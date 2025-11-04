import { MetadataRoute } from "next";
import { getAllCitySlugs } from "./data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mipisoespana.com";

  const routes = ["", "/about", "/reviews", "/faqs"];
  const cities = getAllCitySlugs();

  const locales = ["es", "en"];

  const sitemap: MetadataRoute.Sitemap = [];

  // Añadir rutas principales para cada locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });

    // Añadir páginas de ciudades para cada locale
    cities.forEach((city) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/cities/${city}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/es/cities/${city}`,
            en: `${baseUrl}/en/cities/${city}`,
          },
        },
      });
    });
  });

  // Añadir redirect de la raíz
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  return sitemap;
}
