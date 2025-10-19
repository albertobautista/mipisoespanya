"use client";

import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function FeatureStack() {
  const container = useRef<HTMLDivElement>(null);

  // scrollYProgress ya está tipado como MotionValue<number>
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={container} className="relative h-[300vh]">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <Section3 scrollYProgress={scrollYProgress} />
    </main>
  );
}

const SEG = 1 / 3;
const clamp = true;

// ---------- Tipos auxiliares ----------
type NumericMotion = number | MotionValue<number>;

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

// ---------- Sections ----------
function Section1({ scrollYProgress }: SectionProps) {
  const reduce = useReducedMotion();

  const rawScale = useTransform(
    scrollYProgress,
    [0.0, SEG * 0.6, SEG],
    [1, 0.9, 0.85],
    { clamp }
  );
  const rawRotate = useTransform(scrollYProgress, [0.0, SEG], [0, -5], {
    clamp,
  });
  const rawOpacity = useTransform(
    scrollYProgress,
    [0.0, SEG * 0.75, SEG * 1.35],
    [1, 1, 0],
    { clamp }
  );

  const scale: NumericMotion = reduce ? 1 : rawScale;
  const rotate: NumericMotion = reduce ? 0 : rawRotate;
  const opacity: NumericMotion = reduce ? 1 : rawOpacity;

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="sticky top-0 h-screen bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] z-[30]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4 items-center">
        <p>Section</p>
        <div className="relative w-[12.5vw] h-[12.5vw] bg-white/10 rounded-lg grid place-items-center">
          Content
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
}

function Section2({ scrollYProgress }: SectionProps) {
  const reduce = useReducedMotion();

  const rawScale = useTransform(
    scrollYProgress,
    [SEG * 0.6, SEG, SEG * 1.5, SEG * 2],
    [0.9, 0.95, 1, 0.92],
    { clamp }
  );
  const rawRotate = useTransform(
    scrollYProgress,
    [SEG * 0.7, SEG * 1.5, SEG * 2],
    [5, 0, -3],
    { clamp }
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [SEG * 0.5, SEG, SEG * 1.6, SEG * 2.1],
    [0, 1, 1, 0],
    { clamp }
  );

  const scale: NumericMotion = reduce ? 1 : rawScale;
  const rotate: NumericMotion = reduce ? 0 : rawRotate;
  const opacity: NumericMotion = reduce ? 1 : rawOpacity;

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="sticky top-0 h-screen bg-[#316767] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] z-[40]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4 items-center">
        <p>Section</p>
        <div className="relative w-[12.5vw] h-[12.5vw] bg-white/10 rounded-lg grid place-items-center">
          Content
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
}

function Section3({ scrollYProgress }: SectionProps) {
  const reduce = useReducedMotion();

  const rawScale = useTransform(
    scrollYProgress,
    [SEG * 1.5, SEG * 2, 1.0],
    [0.88, 0.95, 1],
    { clamp }
  );
  const rawRotate = useTransform(
    scrollYProgress,
    [SEG * 1.7, SEG * 2, 1.0],
    [3, 0, 0],
    { clamp }
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [SEG * 1.6, SEG * 2, 1.0],
    [0, 1, 1],
    { clamp }
  );

  const scale: NumericMotion = reduce ? 1 : rawScale;
  const rotate: NumericMotion = reduce ? 0 : rawRotate;
  const opacity: NumericMotion = reduce ? 1 : rawOpacity;

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="sticky top-0 h-screen bg-[#0F172A] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] z-[50]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4 items-center">
        <p>Section</p>
        <div className="relative w-[12.5vw] h-[12.5vw] bg-white/10 rounded-lg grid place-items-center">
          Content
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
}
