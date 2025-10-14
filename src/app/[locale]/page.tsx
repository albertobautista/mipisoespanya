import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import FeatureStack from "../components/FeatureStack";
import { Hero } from "../components/Hero";
import { StickyMobileBar } from "../components/StickyMobileBar";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <main>
      {/* HERO con video */}
      <StickyMobileBar title="Mi piso" />
      <Hero
        logoText="mipiso"
        title={t("title")}
        subtitle={t("subtitle")}
        logoSubtitle={t("logoSubtitle")}
        videoSrc="https://www.datocms-assets.com/49893/1755596941-2025_numa_berlin-rome_homepage_1440x607_v3.mp4"
      />

      {/* Cómo funciona */}
      <section id="como-funciona">
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>
          {t("how.title")}
        </h2>
        {/* <FeatureStack /> */}
      </section>

      {/* Beneficios */}
      <section id="beneficios" style={{ background: "#fafafa" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "64px 16px",
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {(["benefit1", "benefit2", "benefit3"] as const).map((k) => (
            <div
              key={k}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 1px 2px rgba(0,0,0,.03)",
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 600 }}>
                {t(`benefits.${k}.title`)}
              </h3>
              <p style={{ marginTop: 8, color: "#555" }}>
                {t(`benefits.${k}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
