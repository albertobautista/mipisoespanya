import "../globals.css";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LocaleSwitcher } from "@/app/components/LocaleSwitcher";

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
                <a href={`/${locale}/about`}>About</a>
                <LocaleSwitcher locale={locale as "es" | "en"} />
              </nav>
            </div>
          </header>

          {children}

          {/* Evita Date() dinámico en el markup que se hidrata */}
          <footer
            style={{
              borderTop: "1px solid #eee",
              marginTop: 64,
              padding: "24px 16px",
              color: "#666",
            }}
          >
            © 2025 Numa-like
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
