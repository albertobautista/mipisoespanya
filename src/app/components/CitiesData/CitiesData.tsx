"use client";
import React from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";

/**
 * Numa-style Cities Hover — columnas simétricas (3 por lado)
 * - Todas las imágenes del mismo tamaño
 * - Sin brillos ni overlays
 * - Bordes discretos: rounded-sm
 * - Hover suave: scale(1.01)
 * - Anti-flicker: debounce + preload sólo de la activa
 */

export type CityImage = { src: string; alt?: string };
export type CityMedia = {
  name: string;
  href?: string;
  accent?: string;
  leftImages: CityImage[];
  rightImages: CityImage[];
};

type Props = {
  cities: CityMedia[];
  accentClassName?: string; // ej: "text-red-500"
  hideSidesBelow?: "sm" | "md" | "lg" | "xl"; // oculta lados < breakpoint
  className?: string;
};

export default function NumaCitiesHover({
  cities,
  accentClassName = "text-green",
  hideSidesBelow = "sm",
  className = "",
}: Props) {
  const [active, setActive] = React.useState(0);
  const debounceRef = React.useRef<number | null>(null);

  const hideSidesClass = React.useMemo(
    () => `${hideSidesBelow}:flex`,
    [hideSidesBelow]
  );
  const current = cities[active] ?? cities[0];

  React.useEffect(() => {
    preloadCityMedia(current); // sólo activa al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleActivate = React.useCallback(
    (idx: number) => {
      if (idx === active) return; // ya activa
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        setActive(idx);
        preloadCityMedia(cities[idx]); // sólo la nueva activa
      }, 90);
    },
    [active, cities]
  );

  return (
    <section
      className={`relative w-full min-h-[70vh] ${className} selection:bg-black/90 selection:text-white`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-10 md:py-16 lg:grid-cols-[380px_minmax(420px,640px)_380px] lg:gap-16">
        {/* LEFT column (simétrica) */}
        <div className={`${hideSidesClass} items-start justify-center`}>
          <SideColumnSimple
            keyId={`left-${active}`}
            images={current.leftImages.slice(0, 3)}
          />
        </div>

        {/* CENTER list */}
        <div className="flex flex-col items-start justify-center lg:place-self-center">
          <ol className="w-full">
            {cities.map((c, idx) => {
              const isActive = idx === active;
              return (
                <li
                  key={c.name}
                  className="group"
                  onMouseEnter={() => handleActivate(idx)}
                  onFocus={() => handleActivate(idx)}
                >
                  <a
                    href={c.href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline gap-3 py-2 outline-none"
                    aria-pressed={isActive}
                  >
                    {/* Flecha grande y responsiva */}
                    <motion.span
                      aria-hidden
                      className={`-translate-y-[2px] text-4xl md:text-5xl lg:text-6xl font-bold leading-none ${
                        isActive
                          ? c.accent ?? accentClassName
                          : "text-neutral-300"
                      } transition-colors duration-200`}
                      initial={false}
                      animate={{
                        x: isActive ? 0 : -6,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      ↗
                    </motion.span>

                    {/* Label */}
                    <motion.span
                      className={`text-5xl font-extrabold tracking-tight md:text-6xl ${
                        isActive
                          ? `${
                              c.accent ?? accentClassName
                            } drop-shadow-[0_1px_0_rgba(0,0,0,0.1)]`
                          : "text-neutral-900"
                      } transition-colors duration-300`}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.02 : 1,
                        x: isActive ? 2 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    >
                      {c.name}
                    </motion.span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>

        {/* RIGHT column (simétrica) */}
        <div className={`${hideSidesClass} items-start justify-center`}>
          <SideColumnSimple
            keyId={`right-${active}`}
            images={current.rightImages.slice(0, 3)}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Columnas verticales SIMÉTRICAS: mismas alturas, mismo gap.
 * - Máx 3 imágenes por lado.
 * - Bordes rounded-sm, hover leve 1.01.
 */
function SideColumnSimple({
  images,
  keyId,
}: {
  images: CityImage[];
  keyId: string;
}) {
  return (
    <div className="w-[360px]">
      <div className="flex w-full flex-col gap-5">
        {images.map((img, i) => (
          <motion.div
            key={`${keyId}-${i}-${img.src}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-40 md:h-48 lg:h-56 w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 bg-neutral-100"
          >
            <NextImage
              src={img.src}
              alt={img.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 100vw"
              className="object-cover select-none transition-transform duration-300 ease-out hover:scale-[1.01]"
              draggable={false}
              priority={i === 0}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Preload sólo de la activa (cliente) */
function preloadCityMedia(city?: CityMedia) {
  if (typeof window === "undefined" || !city) return;
  const urls = [...city.leftImages, ...city.rightImages]
    .slice(0, 3)
    .map((i) => i.src);
  urls.forEach((src) => {
    const img = document.createElement("img");
    (img as HTMLImageElement).decoding = "async";
    img.src = src;
  });
}
