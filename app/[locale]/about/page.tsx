import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ResearchAreas from "@/components/about/ResearchAreas";
import MDXContent from "@/components/content/MDXContent";
import Container from "@/components/ui/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("AboutPage");

  return (
    <>
      {/* Intro: badge + título + subtítulo */}
      <section className="pt-16 lg:pt-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
              {t("introBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-4 leading-tight">
              {t("introTitle")}
            </h2>
            <p className="text-riiba-green-dark/70 leading-relaxed">
              {t("introSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Contenido MDX */}
      <section className="pb-16 lg:pb-24 bg-white">
        <Container size="sm">
          <MDXContent file="about" locale={locale} />
        </Container>
      </section>

      <ResearchAreas />
    </>
  );
}