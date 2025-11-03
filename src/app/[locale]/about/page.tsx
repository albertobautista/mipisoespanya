import { use } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("about.title"),
    description: t("about.description"),
    openGraph: {
      title: t("about.ogTitle"),
      description: t("about.ogDescription"),
      type: "article",
      images: [
        {
          url: "/images/og-about.jpg",
          width: 1200,
          height: 630,
          alt: t("about.ogImageAlt"),
        },
      ],
    },
    alternates: {
      canonical: `https://mipisoespana.com/${locale}/about`,
      languages: {
        es: "/es/about",
        en: "/en/about",
      },
    },
  };
}

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about"); // 👈 namespace para About

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            {t("content")}
          </p>
        </div>
      </article>

      {/* Structured Data para About */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: t("title"),
            description: t("content"),
            url: `https://mipisoespana.com/${locale}/about`,
            mainEntity: {
              "@type": "RealEstateAgent",
              name: "Mi Piso España",
              description: t("content"),
            },
          }),
        }}
      />
    </div>
  );
}
