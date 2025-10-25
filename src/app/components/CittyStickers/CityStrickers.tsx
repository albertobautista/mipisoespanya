"use client";
import React, { CSSProperties, useMemo } from "react";

export type StickerItem = {
  label: string;
  bg: string;
  fg?: string;
};

type Props = {
  items: StickerItem[];
  height?: number | string;
  fontSize?: "sm" | "md" | "lg";
  bold?: boolean;
  className?: string;
};

export default function CityStickersCloud({
  items,
  height = 360,
  fontSize = "md",
  bold = true,
  className,
}: Props) {
  const layout = useMemo(() => {
    return items.map((it, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      let x = 20 + col * 21;
      let y = 50 + row * 13;
      // subtle horizontal/vertical offsets
      if (i % 2 === 0) x += 2;
      if (i % 3 === 0) y -= 3;
      if (i % 4 === 0) x -= 3;
      const rot = i % 3 === 0 ? -15 : i % 3 === 1 ? 10 : -6;
      return { x, y, rot, z: i, it };
    });
  }, [items]);

  const sizeClass =
    fontSize === "sm"
      ? "text-base"
      : fontSize === "lg"
      ? "text-3xl"
      : "text-3xl";
  const fontWeight = bold ? "font-black" : "font-semibold";

  return (
    <div
      className={"relative  w-full overflow-hidden p-4 " + (className ?? "")}
      style={{ height: typeof height === "number" ? height : height }}
      aria-label="City stickers collage"
      role="img"
    >
      <span className="sr-only">{items.map((i) => i.label).join(", ")}</span>
      {layout.map(({ x, y, rot, z, it }, idx) => {
        const stickerStyle: CSSProperties = {
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          zIndex: 10 + z,
          background: it.bg,
          color: it.fg ?? "#0a0a0a",
          boxShadow: "0 6px 18px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.12)",
        };
        return (
          <div
            key={idx}
            className={
              "absolute inline-flex select-none uppercase font-poiret items-center whitespace-nowrap rounded-md px-3 py-2 " +
              `${sizeClass} ${fontWeight} tracking-tight`
            }
            style={stickerStyle}
          >
            <span aria-hidden>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}
