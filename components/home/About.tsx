import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";

export default async function About() {
  const t = await getTranslations("HomePage");

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Imagen */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/image_aboutHome.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
              {t("aboutBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-6 leading-tight">
              {t("aboutTitle")}
            </h2>
            <p className="text-riiba-green-dark/80 leading-relaxed mb-4">
              {t("aboutDescription1")}
            </p>
            <p className="text-riiba-green-dark/80 leading-relaxed mb-6">
              {t("aboutDescription2")}
            </p>

            <div className="border-l-4 border-riiba-orange pl-4 py-1">
              <p className="text-sm italic text-riiba-green-dark/70">
                {t("aboutQuote")}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}