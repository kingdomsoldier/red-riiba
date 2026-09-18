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

  return (
    <>
      <section className="pb-16 lg:pb-24 bg-white">
        <Container size="sm">
          <MDXContent file="about" locale={locale} />
        </Container>
      </section>

      <ResearchAreas />
    </>
  );
}