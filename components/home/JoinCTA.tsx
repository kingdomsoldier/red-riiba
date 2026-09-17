import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default async function JoinCTA() {
  const t = await getTranslations("HomePage");

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
            {t("joinBadge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-6 leading-tight">
            {t("joinTitle")}
          </h2>
          <p className="text-lg text-riiba-green-dark/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("joinSubtitle")}
          </p>

          <Button href="/unete" variant="primary">
            {t("joinCta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}