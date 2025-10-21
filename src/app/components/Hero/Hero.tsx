"use client";
import React from "react";
import { Menu } from "../Menu";

interface HeroProps {
  videoSrc?: string;
  videoPoster?: string;
  logoText?: string;
  title?: string;
  subtitle?: string;
  logoSubtitle?: string;
  country?: string;
}

export default function Hero({
  videoSrc = "/video/hero.mp4",
  videoPoster = "/video/hero-poster.jpg",
  logoText = "Mi piso",
  title = "We do the room. You do the city.",
  subtitle = "",
  logoSubtitle = "Your trusty home hunters",
  country = "spain",
}: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={videoPoster}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Video de fondo"
      />
      {/* Respeta accesibilidad: si el usuario prefiere menos animación, pausa el video con CSS */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          video[aria-label="Video de fondo"] { animation: none; }
        }
      `}</style>

      {/* Overlays para contraste */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      {/* TOP NAV sobre el video */}
      <div className="absolute inset-x-0 top-0 z-20">
        <Menu />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[70svh] md:min-h-[85svh] lg:min-h-[90svh] max-w-7xl flex-col px-4 sm:px-6 md:px-8">
        {/* Logo grande (fluido) */}
        <div
          className="mt-20 sm:mt-24 md:mt-28 select-none font-extrabold  uppercase font-poiret text-green [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
          style={{ fontSize: "clamp(96px, 12vw, 150px)", lineHeight: "0.9" }}
        >
          {logoText}
        </div>

        {/* Textos pegados al logo: país + subtítulo */}
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

        {/* Headline (centrado en móvil, balanceado en desktop) */}
        <div className="mt-auto max-w-6xl pb-16 sm:pb-20 md:pb-24 font-poiret flex flex-col gap-4 sm:gap-6 md:gap-8 mx-auto">
          <h1
            className="whitespace-pre-wrap uppercase text-center font-extrabold tracking-tight text-white drop-shadow-sm"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.05" }}
          >
            {title}
          </h1>
          {!!subtitle && (
            <h2
              className="whitespace-pre-wrap uppercase text-center font-extrabold tracking-tight text-white/95 drop-shadow-sm"
              style={{
                fontSize: "clamp(24px, 4.5vw, 48px)",
                lineHeight: "1.05",
              }}
            >
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
