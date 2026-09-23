import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import PublicationList from "@/components/publications/PublicationList";
import type { PublicationPreview } from "@/lib/types/publication";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PublicationsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PublicationsPage() {
  // ─────────────────────────────────────────────────────────────
  // TODO: Reemplazar por el fetch real al backend.
  //
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications`, {
  //   next: { revalidate: 3600, tags: ["publications"] },
  // });
  // const { data: publications } = (await res.json()) as PublicationsListResponse;
  //
  // Mientras tanto, usamos un array vacío para ver el estado vacío
  // funcionando con los componentes reales.
  // ─────────────────────────────────────────────────────────────
  const publications: PublicationPreview[] = [];

  return (
    <section className="pb-16 lg:pb-24 bg-white">
      <Container>
        <PublicationList publications={publications} />
      </Container>
    </section>
  );
}