import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import FeatureStack from "../components/FeatureStack";

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
      <section
        style={{
          position: "relative",
          height: "80vh",
          minHeight: 520,
          overflow: "hidden",
        }}
      >
        <video
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            background: "rgba(0,0,0,.3)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 16px",
              color: "#fff",
            }}
          >
            <h1 style={{ fontSize: 48, fontWeight: 600, lineHeight: 1.1 }}>
              {t("title")}
            </h1>
            <p style={{ marginTop: 12, maxWidth: 640, opacity: 0.9 }}>
              {t("subtitle")}
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <a
                href="#como-funciona"
                style={{
                  background: "#fff",
                  color: "#111",
                  padding: "10px 16px",
                  borderRadius: 999,
                }}
              >
                {t("ctaPrimary")}
              </a>
              <a
                href="#beneficios"
                style={{
                  border: "1px solid #fff",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: 999,
                }}
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona">
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>
          {t("how.title")}
        </h2>
        <FeatureStack />
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
