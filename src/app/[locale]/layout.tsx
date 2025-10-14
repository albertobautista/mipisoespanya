import "../globals.css";
import { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LocaleSwitcher } from "@/app/components/LocaleSwitcher";
import "@fontsource/poiret-one";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Mi Piso España",
  description:
    "We are Ana and Paloma, two Mexicans who turned our own housing challenges in Spain into a mission to help others.",
  icons: {
    icon: "/images/logos/logo.webp",
    apple: "/images/logos/logo.webp",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    // 4) Evita mismatches si el cliente tarda en hidratar
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <a href={`/${locale}`} style={{ fontWeight: 600 }}>
                Numa-like
              </a>
              <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <a href={`/${locale}/about`}>Cocomat Pro</a>
                <a href={`/${locale}/about`}>
                  <h1 className="font-poiret">POIRET</h1>
                </a>
                <LocaleSwitcher locale={locale as "es" | "en"} />
              </nav>
            </div>
          </header>
          <body>{children}</body>

          {/* Evita Date() dinámico en el markup que se hidrata */}
          <footer>
            <Footer />
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
