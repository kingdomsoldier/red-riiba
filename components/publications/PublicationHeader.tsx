import Image from "next/image";
import { FiCalendar, FiUser, FiImage } from "react-icons/fi";
import Container from "@/components/ui/Container";
import type { Publication } from "@/lib/types/publication";

interface PublicationHeaderProps {
  publication: Publication;
  locale: string;
}

export default function PublicationHeader({
  publication,
  locale,
}: PublicationHeaderProps) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publication.date));

  return (
    <header className="pb-10 lg:pb-14 bg-white">
      <Container size="md">
        {/* Portada */}
        {publication.coverImage ? (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 lg:mb-10 shadow-lg">
            <Image
              src={publication.coverImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 lg:mb-10 bg-riiba-green-bg flex items-center justify-center">
            <FiImage size={48} className="text-riiba-green-dark/20" />
          </div>
        )}

        {/* Tags */}
        {publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {publication.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-riiba-orange bg-riiba-orange/10 border border-riiba-orange/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Título */}
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-riiba-green-dark leading-tight mb-6">
          {publication.title}
        </h1>

        {/* Metadatos */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-riiba-green-dark/60">
          <span className="inline-flex items-center gap-2">
            <FiUser size={14} className="shrink-0" />
            <span>{publication.author}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <FiCalendar size={14} className="shrink-0" />
            <time dateTime={publication.date}>{formattedDate}</time>
          </span>
        </div>
      </Container>
    </header>
  );
}