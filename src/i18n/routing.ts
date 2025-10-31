import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/our-story": { en: "/our-story", es: "/nuestra-historia" },
    "/reviews": { en: "/reviews", es: "/reseñas" },
    "/faqs": { en: "/faqs", es: "/preguntas-frecuentes" },
  },
});
