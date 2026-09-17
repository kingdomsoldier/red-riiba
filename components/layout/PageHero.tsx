"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function PageHero() {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const t = useTranslations("PageHeroes");

  // La home tiene su propio Hero grande → nunca renderizar este
  if (pathname === "/") return null;

  // Sin segmento válido → no renderizar
  if (!segment) return null;

  // Si la página no declara hero en pageHero.json → no renderizar
  if (!t.has(`${segment}.title`)) return null;

  return (
    <section className="bg-riiba-green-dark text-white border-b border-white/5">
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="w-fit mx-auto text-3xl lg:text-4xl font-bold leading-tight mb-3">
            {t(`${segment}.title`)}
            <span className="block w-full h-1 bg-riiba-orange rounded-full mt-5" />
          </h1>
          <p className="text-base lg:text-lg text-white/70 leading-relaxed">
            {t(`${segment}.subtitle`)}
          </p>
        </div>
      </Container>
    </section>
  );
}