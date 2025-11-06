"use client";
import React, { useState, useRef, useEffect } from "react";
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
  preload?: "none" | "metadata" | "auto";
  fallbackImage?: string;
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
  media?: Media;
  logoText?: string;
  title?: string;
  logoSubtitle?: string;
  country?: string;
  priority?: boolean; // Para optimizar la carga above-the-fold
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
    preload: "metadata",
    fallbackImage: "/images/heros/default-hero.webp",
  },
  logoText = "Mi piso",
  title = "We do the room. You do the city.",
  logoSubtitle = "Your trusty home hunters",
  country = "spain",
}: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detectar conexión lenta
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Detectar tipo de conexión si está disponible
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const isEffectivelySlowConnection =
          connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g" ||
          connection.effectiveType === "3g" ||
          connection.downlink < 1.5;
        setIsSlowConnection(isEffectivelySlowConnection);
      }
    }

    // Detectar si es móvil para optimizar el comportamiento
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // En móviles o conexiones lentas, mostrar imagen por defecto
    if (isMobile || isSlowConnection) {
      setShowVideo(false);
    } else {
      setShowVideo(true);
    }
  }, [isSlowConnection]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* MEDIA DE FONDO */}
      {media.kind === "video" ? (
        <div className="absolute inset-0">
          {/* Imagen de fondo por defecto (siempre visible) */}
          <div className="absolute inset-0 bg-gradient-to-br from-light-gray via-gray to-dark-green">
            <Image
              src={
                media.poster ||
                media.fallbackImage ||
                "/images/heros/default-hero.webp"
              }
              alt="Imagen de fondo"
              fill
              priority={true}
              sizes="100vw"
              className="object-cover"
              quality={85}
            />
          </div>

          {/* Video (solo si debe mostrarse y no hay errores) */}
          {showVideo && !videoError && (
            <>
              <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={media.src}
                poster={media.poster}
                autoPlay={media.autoPlay ?? true}
                muted={media.muted ?? true}
                loop={media.loop ?? true}
                playsInline={media.playsInline ?? true}
                preload={media.preload ?? "metadata"}
                onLoadedData={handleVideoLoad}
                onCanPlay={handleVideoCanPlay}
                onError={handleVideoError}
                aria-label={media.ariaLabel ?? "Video de fondo"}
              />

              {/* Loading indicator */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                </div>
              )}
            </>
          )}

          {/* Respeta accesibilidad: reduce animación si el usuario lo pide */}
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              video[aria-label="Video de fondo"] { 
                animation: none; 
                opacity: 0 !important;
              }
            }
          `}</style>
        </div>
      ) : (
        <div className="absolute inset-0">
          {/* Fondo inmediato con gradiente mientras carga la imagen */}
          <div className="absolute inset-0 bg-gradient-to-br from-light-gray via-gray to-dark-green" />

          {/* Imagen principal con transición suave */}
          <Image
            src={media.src}
            alt={media.alt ?? "Imagen de fondo"}
            fill
            priority={media.priority ?? true}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onLoad={handleImageLoad}
          />

          {/* Loading indicator para imagen - más sutil y elegante */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-end justify-end p-6">
              <div className="flex items-center px-3 py-2 space-x-2 rounded-full bg-black/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-light-green animate-pulse"></div>
                <div className="w-2 h-2 delay-75 rounded-full bg-green animate-pulse"></div>
                <div className="w-2 h-2 delay-150 rounded-full bg-dark-green animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlays para contraste */}
      <div className="absolute inset-0 pointer-events-none bg-black/30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      {/* TOP NAV sobre el fondo */}
      <div className="absolute inset-x-0 top-0 z-20">
        <Menu variant="hero" barBg="bg-green/90" />
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto flex min-h-[70svh] md:min-h-[85svh] lg:min-h-[90svh] max-w-7xl flex-col px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <h1
          className="mt-20 sm:mt-24 md:mt-28 select-none font-extrabold uppercase font-poiret text-green [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
          style={{ fontSize: "clamp(96px, 12vw, 150px)", lineHeight: "0.9" }}
        >
          {logoText}
        </h1>

        {/* País + subtítulo */}
        <div className="flex flex-col gap-1 mt-1 text-white/90">
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
        <div className="flex flex-col max-w-6xl gap-4 pb-16 mx-auto mt-auto sm:pb-20 md:pb-24 font-poiret sm:gap-6 md:gap-8">
          {!!title && (
            <h2
              className="font-extrabold tracking-tight text-center uppercase whitespace-pre-wrap text-white/95 drop-shadow-sm"
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
