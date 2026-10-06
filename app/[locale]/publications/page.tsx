import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PublicationsExplorer from "@/components/publications/PublicationsExplorer";
import { getPublications } from "@/lib/api/publications";
import { mockPublications } from "@/lib/data/mockPublications";

//export const instant = false;

const PAGE_SIZE = 12;
const INDEXABLE_TAGS = ["news"];

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string; q?: string; page?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "PublicationsPage" });

  // Política SEO: solo indexar si no hay búsqueda de texto y el tag es "indexable"
  const isSearchQuery = !!sp.q;
  const isIndexableTag = !sp.tag || INDEXABLE_TAGS.includes(sp.tag);
  const shouldIndex = !isSearchQuery && isIndexableTag;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: shouldIndex ? undefined : { index: false, follow: true },
  };
}

export default async function PublicationsPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "PublicationsPage" });

  const page = Math.max(1, Number(sp.page) || 1);

  const publicationsData = await getPublications({
    page,
    limit: PAGE_SIZE,
    tag: sp.tag,
    q: sp.q,
    locale,
  });

  // Si piden una página > 1 sin resultados, es 404
  if (publicationsData.data.length === 0 && page > 1) {
    notFound();
  }

  // Tags únicos extraídos del mock (en backend real, esto vendría del endpoint)
  const allTags = Array.from(
    new Set(mockPublications.flatMap((p) => p.tags)),
  ).sort();

  return (
    <section className="pb-16 lg:pb-24 bg-white">
      <Container>
        <PublicationsExplorer
          key={`${sp.tag ?? "all"}-${sp.q ?? ""}-${page}`}
          initialData={publicationsData}
          allTags={allTags}
          currentTag={sp.tag}
          currentQuery={sp.q}
          locale={locale}
          labels={{
            noImage: t("card.noImage"),
            emptyTitle: t("list.emptyTitle"),
            emptyMessage: t("list.emptyMessage"),
            loadMore: t("list.loadMore"),
            loading: t("list.loading"),
            searchPlaceholder: t("filters.searchPlaceholder"),
            allTags: t("filters.allTags"),
            clear: t("filters.clear"),
            noResults: t("filters.noResults"), // ← añadir
          }}
        />
      </Container>
    </section>
  );
}
