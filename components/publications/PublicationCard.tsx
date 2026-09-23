import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { FiCalendar, FiUser, FiImage } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import type { PublicationPreview } from "@/lib/types/publication";

interface PublicationCardProps {
  publication: PublicationPreview;
}

export default async function PublicationCard({
  publication,
}: PublicationCardProps) {
  const t = await getTranslations("PublicationsPage.card");
  const locale = await getLocale();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publication.date));

  return (
    <Link
      href={`/publications/${publication.slug}`}
      className="group flex flex-col h-full rounded-xl bg-white border border-riiba-green/5 hover:border-riiba-orange/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Portada */}
      <div className="relative aspect-[16/9] bg-riiba-green-bg overflow-hidden">
        {publication.coverImage ? (
          <Image
            src={publication.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-riiba-green-dark/30">
            <FiImage size={28} />
            <span className="text-xs font-medium uppercase tracking-wider">
              {t("noImage")}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-6">
        {/* Etiquetas */}
        {publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {publication.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider text-riiba-orange"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Título */}
        <h3 className="text-lg font-bold text-riiba-green-dark mb-3 leading-snug group-hover:text-riiba-orange transition-colors">
          {publication.title}
        </h3>

        {/* Resumen */}
        <p className="text-sm text-riiba-green-dark/70 leading-relaxed mb-4 line-clamp-3 flex-1">
          {publication.excerpt}
        </p>

        {/* Metadatos: autor y fecha */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-riiba-green/10 text-xs text-riiba-green-dark/60">
          <span className="inline-flex items-center gap-1.5">
            <FiUser size={12} className="shrink-0" />
            <span className="truncate">{publication.author}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar size={12} className="shrink-0" />
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
}