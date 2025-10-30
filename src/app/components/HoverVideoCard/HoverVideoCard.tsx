"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface HoverVideoCardProps {
  city: string;
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  pillClassName?: string;
}

function HoverVideoCard({
  city,
  videoSrc,
  posterSrc = "/images/fallback.jpg",
  className,
  pillClassName,
}: HoverVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.3 });

  // Control play/pause según visibilidad
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && playing) v.play().catch(() => {});
    else v.pause();
  }, [inView, playing]);

  // Safari fix: asegurar primer frame visible
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.load();
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      try {
        await v.play();
        setPlaying(true);
      } catch {
        /* autoplay bloqueado, espera interacción */
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={[
        "relative overflow-hidden rounded-3xl bg-black select-none aspect-[9/16]",
        "shadow-xl ring-1 ring-black/5",
        className || "",
      ].join(" ")}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
    >
      {/* 🖼️ Capa combinada: poster y video con cross-fade */}
      <div className="absolute inset-0">
        {/* Poster visible cuando no está en reproducción */}
        <img
          src={posterSrc}
          alt={`${city} poster`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />

        {/* Video sobre el poster */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
        >
          <source src={videoSrc} />
        </video>
      </div>

      {/* Degradado inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Pill superior izquierda */}
      <span
        className={[
          "absolute left-3 top-3 z-10 rounded-lg px-3 py-1 text-sm font-semibold",
          "bg-rose-200/95 text-rose-900 shadow-sm",
          pillClassName || "",
        ].join(" ")}
      >
        {city}
      </span>

      {/* Icono de control */}
      <div
        className={[
          "absolute right-4 bottom-4 z-10 grid place-items-center rounded-full w-12 h-12",
          "bg-white/15 backdrop-blur-md ring-1 ring-white/25 transition-opacity duration-300",
        ].join(" ")}
        aria-hidden
      >
        {playing ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default HoverVideoCard;
