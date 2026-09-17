import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export default async function Stats() {
  const t = await getTranslations("HomePage");

  const stats = [
    { value: "6", label: t("statsCountries") },
    { value: "12+", label: t("statsInstitutions") },
    { value: "10", label: t("statsLines") },
    { value: siteConfig.founded.toString(), label: t("statsFounded") },
  ];

  return (
    <section className="py-16 bg-riiba-green-bg">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-riiba-orange mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-riiba-green-dark/70 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}