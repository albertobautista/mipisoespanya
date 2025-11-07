import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mipisoespana.com"), // Cambia por tu dominio
  title: {
    template: "%s | Mi Piso España",
    default: "Mi Piso España - Agencia de Reubicación en Madrid y Barcelona",
  },
  description:
    "Agencia de reubicación especializada en encontrar el hogar perfecto en Madrid y Barcelona. Servicios personalizados para expatriados y familias.",
  keywords: [
    "reubicación España",
    "alquiler Madrid",
    "alquiler Barcelona",
    "agencia inmobiliaria",
    "expatriados España",
    "mudanza España",
    "vivienda Madrid",
    "apartamentos Barcelona",
  ],
  authors: [{ name: "Mi Piso España" }],
  creator: "Mi Piso España",
  publisher: "Mi Piso España",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: "https://mipisoespana.com",
    siteName: "Mi Piso España",
    title: "Mi Piso España - Tu Agencia de Reubicación de Confianza",
    description:
      "Encuentra tu hogar ideal en Madrid y Barcelona con nuestra ayuda especializada. Servicios completos de reubicación para expatriados.",
    images: [
      {
        url: "/opengraph-image", // Next.js generará automáticamente
        width: 1200,
        height: 630,
        alt: "Mi Piso España - Agencia de Reubicación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Piso España - Agencia de Reubicación",
    description:
      "Encuentra tu hogar ideal en Madrid y Barcelona. Servicios especializados de reubicación.",
    images: ["/twitter-image"], // Next.js generará automáticamente
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Agrega tu código de verificación
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Structured Data - Organización */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Mi Piso España",
              description:
                "Agencia de reubicación especializada en Madrid y Barcelona",
              url: "https://mipisoespana.com",
              telephone: "+34658509768",
              email: "mipisorelocation@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES",
                addressRegion: "Madrid",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Madrid",
                  addressCountry: "ES",
                },
                {
                  "@type": "City",
                  name: "Barcelona",
                  addressCountry: "ES",
                },
              ],
              serviceType: "Real Estate Services",
              sameAs: ["https://www.instagram.com/mipiso_es/"],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
      <Analytics />
    </html>
  );
}
