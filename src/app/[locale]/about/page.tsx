import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about"); // 👈 namespace para About

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "64px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 600, marginBottom: 24 }}>
        {t("title")}
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.6 }}>{t("content")}</p>
    </main>
  );
}
