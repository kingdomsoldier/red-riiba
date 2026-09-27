import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ResearchAreas from "@/components/about/ResearchAreas";
import AboutContent from "@/components/about/AboutContent";
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

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 lg:pb-24 bg-white">
        <Container size="sm">
          <AboutContent />
        </Container>
      </section>

      <ResearchAreas />
    </>
  );
}