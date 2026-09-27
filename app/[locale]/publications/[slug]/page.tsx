import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FiArrowLeft } from "react-icons/fi";
import Container from "@/components/ui/Container";
import PublicationHeader from "@/components/publications/PublicationHeader";
import PublicationContent from "@/components/publications/PublicationContent";
import { Link } from "@/i18n/navigation";
import { getPublicationBySlug } from "@/lib/api/publications";
import { mockPublications } from "@/lib/data/mockPublications";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return mockPublications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const publication = await getPublicationBySlug(slug, locale);

  if (!publication) {
    return {};
  }

  return {
    title: publication.title,
    description: publication.excerpt,
    openGraph: {
      title: publication.title,
      description: publication.excerpt,
      images: publication.coverImage ? [publication.coverImage] : undefined,
    },
  };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const publication = await getPublicationBySlug(slug, locale);

  if (!publication) {
    notFound();
  }

  const t = await getTranslations("PublicationsPage.detail");

  return (
    <article className="pt-16 lg:pt-24">
      <PublicationHeader publication={publication} locale={locale} />

      <section className="pb-16 lg:pb-24 bg-white">
        <Container size="sm">
          <PublicationContent content={publication.content} />

          {/* Enlace de vuelta */}
          <div className="mt-16 pt-8 border-t border-riiba-green/10">
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 text-sm font-semibold text-riiba-orange hover:text-riiba-orange-light transition-colors"
            >
              <FiArrowLeft size={16} />
              {t("backToList")}
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}