"use client";
import Image from "next/image";
import React from "react";

type LogoItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type Column = {
  heading: string;
  items: LogoItem[];
};

interface PartnersGridProps {
  title?: string; // ← nuevo
  left: Column;
  right: Column;
  logoMaxH?: number;
  dense?: boolean;
  className?: string;
}

export default function PartnersGrid({
  title = "Some of the partners who trust us",
  left,
  right,
  logoMaxH = 64,
  dense = false,
  className,
}: PartnersGridProps) {
  return (
    <section className={`relative w-full text-white ${className ?? ""}`}>
      {/* Título centrado */}
      {title && (
        <h2
          className="text-center font-montserratSemibold text-black uppercase tracking-wide"
          style={{
            fontSize: "clamp(30px, 3vw, 36px)",
            lineHeight: "1.15",
          }}
        >
          {title}
        </h2>
      )}

      {/* Grid de dos columnas */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <ColumnBlock data={left} logoMaxH={logoMaxH} dense={dense} />
        <ColumnBlock data={right} logoMaxH={logoMaxH} dense={dense} />
      </div>
    </section>
  );
}

function ColumnBlock({
  data,
  logoMaxH,
  dense,
}: {
  data: Column;
  logoMaxH: number;
  dense: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="uppercase font-montserratSemibold text-black text-3xl sm:text-4xl mb-6">
        {data.heading}
      </h3>

      <ul
        className={`flex flex-col items-center ${
          dense ? "gap-4" : "gap-6 sm:gap-8"
        }`}
      >
        {data.items.map((logo, idx) => (
          <li key={logo.src + idx} className="flex justify-center w-full">
            <LogoBox item={logo} maxH={logoMaxH} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LogoBox({ item, maxH }: { item: LogoItem; maxH: number }) {
  const h = item.height ?? maxH;

  return (
    <div
      className="relative w-[260px] max-w-full flex justify-center"
      style={{ height: h }}
      aria-label={item.alt}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width:1024px) 260px, 50vw"
        className="object-contain opacity-95 transition-opacity duration-200 ease-out hover:opacity-100"
      />
    </div>
  );
}
