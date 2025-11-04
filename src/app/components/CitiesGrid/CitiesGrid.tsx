import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { cities } from "@/app/data/cities";

export default function CitiesGrid() {
  const locale = useLocale();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          {locale === "es" ? "Ciudades Disponibles" : "Available Cities"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${locale}/cities/${city.slug}`}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={city.images.hero}
                  alt={`Vista de ${city.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={85}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{city.name}</h3>
                  <p className="text-sm opacity-90">{city.region}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    {locale === "es" ? "Población" : "Population"}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {city.population.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    {locale === "es" ? "Alquiler promedio" : "Average rent"}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {city.averageRent}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    {locale === "es"
                      ? "Mejores barrios:"
                      : "Best neighborhoods:"}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {city.bestNeighborhoods
                      .slice(0, 3)
                      .map((neighborhood, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {neighborhood}
                        </span>
                      ))}
                    {city.bestNeighborhoods.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{city.bestNeighborhoods.length - 3} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                    {locale === "es" ? "Ver detalles →" : "View details →"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
