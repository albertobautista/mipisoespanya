"use client";
import Image from "next/image";
import Pic1 from "../../public/images/1.jpg";
import Pic2 from "../../public/images/2.jpeg";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function FeatureStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"], // progreso 0..1 a lo largo de todo el wrapper
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

/**
 * Helpers para mapear el progreso a tercios con un pequeño solapamiento.
 * seg = 1/3
 * - Section1 actúa de ~0.00 a ~0.45
 * - Section2 actúa de ~0.20 a ~0.80
 * - Section3 actúa de ~0.55 a ~1.00
 * Esto permite ver “la anterior” un poco mientras entra la nueva.
 */
const SEG = 1 / 3;
const clamp = true;

const Section1 = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const reduce = useReducedMotion();
  // Ventana principal de S1: [0, SEG]
  // Con rampas suaves que se “extienden” un poco para cruzar con S2
  const scale = reduce
    ? 1
    : useTransform(scrollYProgress, [0.0, SEG * 0.6, SEG], [1, 0.9, 0.85], {
        clamp,
      });
  const rotate = reduce
    ? 0
    : useTransform(scrollYProgress, [0.0, SEG], [0, -5], { clamp });
  const opacity = reduce
    ? 1
    : useTransform(scrollYProgress, [0.0, SEG * 0.75, SEG * 1.35], [1, 1, 0], {
        clamp,
      });

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="sticky top-0 h-screen bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] z-[30]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4 items-center">
        <p>Section</p>
        <div className="relative w-[12.5vw] h-[12.5vw] bg-white/10 rounded-lg grid place-items-center">
          {/* <Image src={Pic1} alt="img" placeholder="blur" fill /> */}
          Content
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section2 = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const reduce = useReducedMotion();
  // Ventana principal de S2: [SEG, 2*SEG]
  // Entra desde atrás (scale más pequeño) y crece a 1, luego sale
  const scale = reduce
    ? 1
    : useTransform(
        scrollYProgress,
        [SEG * 0.6, SEG, SEG * 1.5, SEG * 2],
        [0.9, 0.95, 1, 0.92],
        { clamp }
      );
  const rotate = reduce
    ? 0
    : useTransform(
        scrollYProgress,
        [SEG * 0.7, SEG * 1.5, SEG * 2],
        [5, 0, -3],
        { clamp }
      );
  const opacity = reduce
    ? 1
    : useTransform(
        scrollYProgress,
        [SEG * 0.5, SEG, SEG * 1.6, SEG * 2.1],
        [0, 1, 1, 0],
        { clamp }
      );

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="sticky top-0 h-screen bg-[#316767] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh] z-[40]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4 items-center">
        <p>Section</p>
        <div className="relative w-[12.5vw] h-[12.5vw] bg-white/10 rounded-lg grid place-items-center">
          {/* <Image src={Pic2} alt="img" placeholder="blur" fill /> */}
          Content
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section3 = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const reduce = useReducedMotion();
  // Ventana principal de S3: [2*SEG, 1]
  // Entra y termina dominante
  const scale = reduce
    ? 1
    : useTransform(
        scrollYProgress,
        [SEG * 1.5, SEG * 2, 1.0],
        [0.88, 0.95, 1],
        { clamp }
      );
  const rotate = reduce
    ? 0
    : useTransform(scrollYProgress, [SEG * 1.7, SEG * 2, 1.0], [3, 0, 0], {
        clamp,
      });
  const opacity = reduce
    ? 1
    : useTransform(scrollYProgress, [SEG * 1.6, SEG * 2, 1.0], [0, 1, 1], {
        clamp,
      });

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
};
