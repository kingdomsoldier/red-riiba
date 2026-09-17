import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default async function Hero() {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative bg-riiba-green-dark text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-riiba-green-dark via-riiba-green-dark/95 to-riiba-green-dark/70" />
      </div>

      <Container className="relative py-24 lg:py-36">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-riiba-orange/20 border border-riiba-orange/40 text-riiba-orange-light text-xs font-semibold uppercase tracking-wider mb-6">
            {t("heroBadge")}
          </span>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            {t("heroTitleLine1")}
            <span className="block text-riiba-orange">
              {t("heroTitleLine2")}
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/about" variant="primary">
              {t("heroCtaPrimary")}
            </Button>
            <Button
              href="/unete"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-riiba-green-dark"
            >
              {t("heroCtaSecondary")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}