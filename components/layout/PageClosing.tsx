import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export default async function PageClosing() {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-10">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent to-riiba-green/30" />
            <span className="block w-2 h-2 rounded-full bg-riiba-orange" />
            <span className="block w-16 h-px bg-gradient-to-l from-transparent to-riiba-green/30" />
          </div>

          <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-6">
            <Image
              src="/images/red-riiba_logo.png"
              alt={siteConfig.name}
              fill
              className="object-contain"
            />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-riiba-orange mb-2">
            {t("closingTagline")}
          </p>

          <p className="text-2xl lg:text-3xl font-bold text-riiba-green-dark tracking-tight">
            {siteConfig.name}
          </p>
        </div>
      </Container>
    </section>
  );
}