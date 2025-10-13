"use client";
import React from "react";
import { Menu } from "../Menu";

type MenuItem = { label: string; href: string };

interface HeroProps {
  videoSrc?: string;
  logoText?: string;
  title?: string;
  subtitle?: string;
  logoSubtitle?: string;
  menu?: MenuItem[];
}

export default function Hero({
  videoSrc = "/video/hero.mp4",
  logoText = "Numa",
  title = "We do the room.\nYou do the city.",
  subtitle = "",
  logoSubtitle = "Your trusty home hunters",
  menu = [],
}: HeroProps) {
  return (
    <section className="relative h-[90svh] min-h-[600px] w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Video de fondo"
      />

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      {/* TOP NAV */}
      <div className="absolute inset-x-0 top-0 z-20">
        <Menu />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6">
        {/* Logo */}
        <div className="mt-16 md:mt-20 select-none text-[120px] sm:text-[140px] md:text-[150px] font-extrabold tracking-wider uppercase font-poiret text-green [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]">
          {logoText}
        </div>

        {/* Smaller texts closer to logo */}
        <div className="flex flex-col text-white/90">
          <p className="text-5xl font-light leading-tight uppercase font-poiret">
            spain
          </p>
          <p className="text-lg font-light leading-tight uppercase font-poiret">
            {logoSubtitle}
          </p>
        </div>

        {/* Headline */}
        <div className="mt-auto max-w-6xl pb-24 font-poiret flex flex-col gap-9">
          <h1 className="whitespace-pre-wrap uppercase text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-sm sm:text-6xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <h2 className="whitespace-pre-wrap uppercase text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-sm sm:text-6xl md:text-5xl">
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
