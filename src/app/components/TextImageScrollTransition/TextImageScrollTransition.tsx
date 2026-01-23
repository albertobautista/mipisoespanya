"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type ShowcaseItem = {
  title?: string;
  image: { src: string; alt: string };
};

type ColorPair = { inactive: string; active: string };

type Props = {
  items: ShowcaseItem[];
  /** Permite overrides parciales: { inactive } o { active } o ambos */
  colors?: Partial<ColorPair>;
  frameStyle?: "none" | "glass"; // default: glass
  finalAnimation?: "quiet" | "subtle"; // default: quiet
  maxContentWidth?: number; // default: 1150
};

// --- Hook helper: detectar mobile sin SSR leaks ---
function useIsMobile(query = "(max-width: 767px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
}

// --- Tipos internos ---
type Range = { in: number; mid: number; out: number };

// ----- Subcomponente: línea de texto -----
function TextLine({
  title,
  range,
  isLast,
  colors,
  scrollYProgress,
  yDelta,
  finalAnimation,
}: {
  title?: string;
  range: Range;
  isLast: boolean;
  colors: ColorPair;
  scrollYProgress: MotionValue<number>;
  yDelta: number;
  finalAnimation: "quiet" | "subtle";
}) {
  const color = useTransform(
    scrollYProgress,
    [range.in, range.mid, range.out],
    isLast
      ? [colors.inactive, colors.active, colors.active]
      : [colors.inactive, colors.active, colors.inactive],
    { clamp: true },
  );

  const opacity = useTransform(
    scrollYProgress,
    [range.in, range.mid, range.out],
    isLast ? [0.3, 1, 1] : [0.3, 1, 0.3],
    { clamp: true },
  );

  const y = useTransform(
    scrollYProgress,
    [range.in, range.mid, range.out],
    finalAnimation === "quiet" && isLast ? [0, 0, 0] : [yDelta, 0, -yDelta],
    { clamp: true },
  );

  return (
    <motion.h2
      style={{ color, opacity, y }}
      className="leading-[0.98] uppercase font-montserratSemibold tracking-tight text-[clamp(28px,6vw,72px)] md:text-[clamp(32px,6vw,48px)]"
    >
      {title}
    </motion.h2>
  );
}

// ----- Subcomponente: slide de imagen -----
function ImageSlide({
  item,
  range,
  isLast,
  scrollYProgress,
  scaleDelta,
  finalAnimation,
  isFirst,
}: {
  item: ShowcaseItem;
  range: Range;
  isLast: boolean;
  isFirst: boolean;
  scrollYProgress: MotionValue<number>;
  scaleDelta: number;
  finalAnimation: "quiet" | "subtle";
}) {
  const opacity = useTransform(
    scrollYProgress,
    [range.in, range.mid, range.out],
    isLast ? [0, 1, 1] : [0, 1, 0],
    { clamp: true },
  );

  const scale = useTransform(
    scrollYProgress,
    [range.in, range.mid, range.out],
    finalAnimation === "quiet" && isLast
      ? [1, 1, 1]
      : [1 - scaleDelta, 1, 1 - scaleDelta],
    { clamp: true },
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_36px_rgba(0,0,0,0.10)]"
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        className="object-cover"
        style={{ objectPosition: "50% 35%" }}
        priority={isFirst}
        sizes="(min-width:1024px) 40vw, 100vw"
      />
    </motion.div>
  );
}

const DEFAULT_COLORS: ColorPair = { inactive: "#cccccc", active: "#0a0a0a" };

export default function TextImageScrollTransition({
  items,
  colors,
  frameStyle = "glass",
  finalAnimation = "quiet",
  maxContentWidth = 1150,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  const steps = items.length;
  const totalHeightVh = steps * 100; // 100vh por paso

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Merge seguro para colors -> garantiza {inactive:string, active:string}
  const resolvedColors = useMemo<ColorPair>(() => {
    return {
      inactive: colors?.inactive ?? DEFAULT_COLORS.inactive,
      active: colors?.active ?? DEFAULT_COLORS.active,
    };
  }, [colors]);

  // Rango por paso (con pequeño solape)
  const ranges = useMemo<Range[]>(() => {
    return items.map((_, i) => {
      const start = i / steps;
      const end = (i + 1) / steps;
      return {
        in: Math.max(0, start - 0.1),
        mid: start + (end - start) / 2,
        out: Math.min(1, end + 0.1),
      };
    });
  }, [items, steps]);

  const yDelta = reduce ? 0 : isMobile ? 4 : 6;
  const scaleDelta = reduce ? 0 : isMobile ? 0.01 : 0.015;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${totalHeightVh}vh` }}
    >
      <div className="sticky top-0 flex items-center justify-center h-screen px-4 sm:px-6 md:px-8">
        {/* Frame luxury opcional */}
        <div
          className={[
            "w-full transition-all",
            frameStyle === "glass"
              ? "rounded-[28px] sm:rounded-[32px] border border-white/30 bg-white/50 supports-[backdrop-filter]:backdrop-blur-lg ring-1 ring-inset ring-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.14),0_2px_12px_rgba(0,0,0,0.06)]"
              : "",
          ].join(" ")}
          style={{ maxWidth: maxContentWidth }}
        >
          <div className="grid items-center grid-cols-1 gap-8 px-5 py-8 lg:grid-cols-2 lg:gap-14 sm:px-8 lg:px-12 sm:py-10 lg:py-12">
            {/* TEXTO */}
            <div className="max-w-[760px]">
              {items.map((item, i) => (
                <TextLine
                  key={`t-${i}`}
                  title={item.title}
                  range={ranges[i]}
                  isLast={i === items.length - 1}
                  colors={resolvedColors}
                  scrollYProgress={scrollYProgress}
                  yDelta={yDelta}
                  finalAnimation={finalAnimation}
                />
              ))}
            </div>

            {/* IMÁGENES */}
            <div className="relative mt-4 lg:mt-0 h-[38vh] sm:h-[44vh] md:h-[50vh] lg:h-[56vh]">
              {items.map((item, i) => (
                <ImageSlide
                  key={`i-${i}`}
                  item={item}
                  range={ranges[i]}
                  isLast={i === items.length - 1}
                  isFirst={i === 0}
                  scrollYProgress={scrollYProgress}
                  scaleDelta={scaleDelta}
                  finalAnimation={finalAnimation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
