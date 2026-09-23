import { getTranslations } from "next-intl/server";
import { FiInbox } from "react-icons/fi";
import PublicationCard from "./PublicationCard";
import type { PublicationPreview } from "@/lib/types/publication";

interface PublicationListProps {
  publications: PublicationPreview[];
}

export default async function PublicationList({
  publications,
}: PublicationListProps) {
  const t = await getTranslations("PublicationsPage.list");

  // ─── Estado vacío ────────────────────────────────────────
  if (publications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-2xl bg-riiba-green-bg border border-riiba-green/10">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-riiba-green-dark/40 mb-5">
          <FiInbox size={28} />
        </span>
        <h3 className="text-lg font-bold text-riiba-green-dark mb-2">
          {t("emptyTitle")}
        </h3>
        <p className="text-sm text-riiba-green-dark/60 max-w-md leading-relaxed">
          {t("emptyMessage")}
        </p>
      </div>
    );
  }

  // ─── Grid de tarjetas ────────────────────────────────────
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {publications.map((publication) => (
        <PublicationCard
          key={publication.slug}
          publication={publication}
        />
      ))}
    </div>
  );
}