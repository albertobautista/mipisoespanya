"use client";
import Link from "next/link";

type LinkItem = { label: string; href: string };

interface FooterProps {
  contact?: LinkItem[];
  discover?: LinkItem[];
  about?: LinkItem[];
  social?: {
    icon: "instagram" | "tiktok" | "facebook" | "linkedin";
    href: string;
  }[];
  bigLogoText?: string;
  claimLine1?: string;
  claimLine2?: string;
  legal?: LinkItem[];
  bg?: string; // tailwind color class para fondo
}

export default function Footer({
  contact = [
    { label: "FAQ", href: "#" },
    { label: "Chatea por WhatsApp (asistencia 24/7)", href: "#" },
    { label: "Llamar al +49 30 3119 6117", href: "#" },
    { label: "Reservar una estancia de negocios o de grupo", href: "#" },
  ],
  discover = [
    { label: "Viaje de Negocios", href: "#" },
    { label: "Beneficios para los miembros", href: "#" },
    { label: "Mejor precio garantizado", href: "#" },
    { label: "Sostenibilidad", href: "#" },
  ],
  about = [
    { label: "Nuestra historia", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  social = [
    { icon: "instagram", href: "#" },
    { icon: "tiktok", href: "#" },
    { icon: "facebook", href: "#" },
    { icon: "linkedin", href: "#" },
  ],
  bigLogoText = "MiPiso",
  claimLine1 = "We do the room.",
  claimLine2 = "You do the city.",
  legal = [
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Imprint", href: "#" },
    { label: "Configuración de privacidad", href: "#" },
  ],
  bg = "bg-green",
}: FooterProps) {
  return (
    <footer className={`${bg} text-[#0f0f0f]`}>
      {/* Top grid */}
      <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Contacto y ayuda */}
          <div>
            <h3 className="mb-4 font-semibold text-lg font-cocomat">
              Contacto y Ayuda
            </h3>
            <ul className="space-y-3">
              {contact.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Descubrir */}
          <div>
            <h3 className="mb-4 font-semibold text-lg font-cocomat">
              Descubrir
            </h3>
            <ul className="space-y-3">
              {discover.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Numa */}
          <div>
            <h3 className="mb-4 font-semibold text-lg font-cocomat">Mi piso</h3>
            <ul className="space-y-3">
              {about.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-semibold text-lg font-cocomat">
                Stay social
              </h3>
              <div className="flex items-center gap-4">
                {social.map((s, idx) => (
                  <Link
                    key={idx}
                    href={s.href}
                    className="grid h-12 w-12 place-items-center rounded-full bg-black/10 hover:bg-black/20 transition"
                    aria-label={s.icon}
                  >
                    {getSocialIcon(s.icon)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Big logo + claim */}
        <div className="mt-16 grid grid-cols-1 items-end gap-8 md:mt-20 md:grid-cols-4">
          {/* Logo ocupa las tres primeras columnas */}
          <div className="md:col-span-3">
            <h1
              className=" select-none uppercase whitespace-pre-wrap font-poiret leading-none font-extrabold tracking-tight text-[#121212] drop-shadow-sm"
              style={{
                fontSize: "clamp(120px, 18vw, 250px)",
                lineHeight: "1.05",
              }}
            >
              {bigLogoText}
            </h1>
          </div>

          {/* Claim alineado con la columna Stay social */}
          <div className="md:col-span-1 items-center flex flex-col gap-1 text-right">
            <p className="text-3xl font-extrabold tracking-tight font-cocomat">
              {claimLine1}
            </p>
            <p className="text-3xl font-extrabold tracking-tight font-cocomat">
              {claimLine2}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-black/10 py-6 text-sm text-black/70">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {legal.map((l, i) => (
                <span key={l.label} className="flex items-center">
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                  {i !== legal.length - 1 && (
                    <span className="mx-3 opacity-60">|</span>
                  )}
                </span>
              ))}
            </div>
            <p>© Mi Piso Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------- helpers --------- */
function getSocialIcon(kind: "instagram" | "tiktok" | "facebook" | "linkedin") {
  const cls = "h-5 w-5 text-black";
  switch (kind) {
    case "instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 3h3a5 5 0 004 4v3a8 8 0 01-7-3v7a6 6 0 11-6-6h1v3h-1a3 3 0 103 3V3z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 3a2 2 0 110 4 2 2 0 010-4zM3 8h3v13H3zM9 8h3v2a4 4 0 013-1c3 0 5 2 5 6v6h-3v-6c0-2-1-3-3-3s-2 .9-2 3v6H9z" />
        </svg>
      );
  }
}
