"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

/**
 * HoverVideoCard
 * - Solo video
 * - Desktop: al hacer hover/focus -> play; al salir/blur -> pause (sin reiniciar el tiempo)
 * - Móvil: click/tap para alternar play/pause
 * - Muestra un ícono de play cuando está pausado y uno de pausa cuando está reproduciendo
 * - Etiqueta tipo pill en la esquina superior izquierda
 */
export default function HoverVideoCard({
  city,
  videoSrc,
  className,
  pillClassName = "bg-rose-200/95 text-rose-900",
}: {
  city: string;
  videoSrc: string;
  className?: string;
  pillClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReducedMotion(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const play = useCallback(async () => {
    if (reducedMotion) return;
    try {
      await videoRef.current?.play();
    } catch (_) {}
  }, [reducedMotion]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl bg-black group aspect-[10/16] select-none",
        "shadow-xl ring-1 ring-black/5",
        className || "",
      ].join(" ")}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} />
      </video>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <span
        className={[
          "absolute left-3 top-3 z-10 rounded-lg px-3 py-1 text-lg font-semibold",
          "shadow-sm",
          pillClassName || "",
        ].join(" ")}
      >
        {city}
      </span>

      <div
        className={[
          "absolute right-4 bottom-4 z-10 grid place-items-center rounded-full w-12 h-12",
          "bg-white/15 backdrop-blur-md ring-1 ring-white/25 transition-opacity duration-200",
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

/** Ejemplo de uso
 * <HoverVideoCard city="Madrid" videoSrc="/videos/script.mp4" />
 */
