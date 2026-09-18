import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import InstitutionCard from "@/components/members/InstitutionCard";
import { memberCountries } from "@/lib/data/memberCountries";
import { slugify } from "@/lib/utils";

export default async function MemberInstitutions() {
  const t = await getTranslations("MembersPage");

  return (
    <section className="pb-16 lg:pb-24 bg-white">
      <Container>
        <div className="space-y-16">
          {memberCountries.map((country) => (
            <div
              key={country.country}
              id={slugify(country.country)}
              className="scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-riiba-green-dark">
                  {country.country}
                </h3>
                <span className="flex-1 h-px bg-riiba-green/15" />
                <span className="text-xs font-medium text-riiba-green-dark/50 uppercase tracking-wider">
                  {t("institutionsCount", { count: country.institutions.length })}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {country.institutions.map((institution) => (
                  <InstitutionCard
                    key={institution.name}
                    institution={institution}
                    visitLabel={t("visitWebsite")}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}