import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { memberCountries } from "@/lib/data/memberCountries";
import { slugify } from "@/lib/utils";

export default async function MemberCountries() {
  const t = await getTranslations("HomePage");

  return (
    <section className="py-20 lg:py-28 bg-riiba-green-dark text-white">
      <Container>
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
            {t("membersBadge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t("membersTitle")}
          </h2>
          <p className="text-white/70 leading-relaxed">
            {t("membersSubtitle")}
          </p>
        </div>

        {/* Grid de países */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberCountries.map((country) => (
            <Link
              key={country.country}
              href={`/members#${slugify(country.country)}`}
              className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-riiba-orange/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-riiba-orange">
                  {country.country}
                </h3>
              </div>
              <ul className="space-y-2">
                {country.institutions.map((institution) => (
                  <li
                    key={institution.name}
                    className="flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-riiba-orange mt-2 shrink-0" />
                    <span className="text-sm text-white/70">
                      {institution.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}