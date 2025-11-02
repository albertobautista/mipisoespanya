"use client";
import React from "react";
import Image from "next/image";
import { Menu } from "../Menu";

type VideoMedia = {
  kind: "video";
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  ariaLabel?: string;
};

type ImageMedia = {
  kind: "image";
  src: string;
  alt?: string;
  priority?: boolean;
  // Si tu imagen es externa, recuerda configurar images.domains en next.config.js
};

type Media = VideoMedia | ImageMedia;

interface HeroProps {
  media?: Media; // <-- ahora controlas imagen o video
  logoText?: string;
  title?: string;
  logoSubtitle?: string;
  country?: string;
}

export default function Hero({
  media = {
    kind: "video",
    src: "/video/hero.mp4",
    poster: "/video/hero-poster.jpg",
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    ariaLabel: "Video de fondo",
  },
  logoText = "Mi piso",
  title = "We do the room. You do the city.",
  logoSubtitle = "Your trusty home hunters",
  country = "spain",
}: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* MEDIA DE FONDO */}
      {media.kind === "video" ? (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={media.src}
            poster={media.poster}
            autoPlay={media.autoPlay ?? true}
            muted={media.muted ?? true}
            loop={media.loop ?? true}
            playsInline={media.playsInline ?? true}
            aria-label={media.ariaLabel ?? "Video de fondo"}
          />
          {/* Respeta accesibilidad: reduce animación si el usuario lo pide */}
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              video[aria-label="Video de fondo"] { animation: none; }
            }
          `}</style>
        </>
      ) : (
        <div className="absolute inset-0">
          <Image
            src={media.src}
            alt={media.alt ?? "Imagen de fondo"}
            fill
            priority={media.priority ?? false}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Overlays para contraste */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      {/* TOP NAV sobre el fondo */}
      <div className="absolute inset-x-0 top-0 z-20">
        <Menu barBg="bg-green/90" />
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto flex min-h-[70svh] md:min-h-[85svh] lg:min-h-[90svh] max-w-7xl flex-col px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <div
          className="mt-20 sm:mt-24 md:mt-28 select-none font-extrabold uppercase font-poiret text-green [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
          style={{ fontSize: "clamp(96px, 12vw, 150px)", lineHeight: "0.9" }}
        >
          {logoText}
        </div>

        {/* País + subtítulo */}
        <div className="mt-1 flex flex-col gap-1 text-white/90">
          <p
            className="uppercase font-poiret"
            style={{ fontSize: "clamp(28px, 5vw, 60px)", lineHeight: "1" }}
          >
            {country}
          </p>
          <p
            className="uppercase font-poiret"
            style={{ fontSize: "clamp(18px, 3.5vw, 26px)", lineHeight: "1.1" }}
          >
            {logoSubtitle}
          </p>
        </div>

        {/* Headline */}
        <div className="mt-auto max-w-6xl pb-16 sm:pb-20 md:pb-24 font-poiret flex flex-col gap-4 sm:gap-6 md:gap-8 mx-auto">
          {!!title && (
            <h2
              className="whitespace-pre-wrap uppercase text-center font-extrabold tracking-tight text-white/95 drop-shadow-sm"
              style={{
                fontSize: "clamp(24px, 4.5vw, 48px)",
                lineHeight: "1.05",
              }}
            >
              {title}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
