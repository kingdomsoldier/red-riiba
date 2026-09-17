import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FiExternalLink } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { memberCountries, type Institution } from "@/lib/data/memberCountries";

interface InstitutionCardProps {
  institution: Institution;
  visitLabel: string;
}

function InstitutionCard({ institution, visitLabel }: InstitutionCardProps) {
  const initials = institution.name
    .split(" ")
    .filter((w) => w.length > 3)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const inner = (
    <>
      <div className="relative aspect-[3/2] rounded-lg bg-riiba-green-bg mb-4 overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-riiba-green-dark/20"
        >
          {initials}
        </span>
        <Image
          src={institution.logo}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 relative"
        />
      </div>

      <p className="text-sm font-medium text-riiba-green-dark text-center leading-snug">
        {institution.name}
      </p>
    </>
  );

  if (institution.website) {
    return (
      <a
        href={institution.website}
        target="_blank"
        rel="noopener noreferrer"
        title={visitLabel}
        className="group block p-4 rounded-xl bg-white border border-riiba-green/5 hover:border-riiba-orange/40 transition-colors"
      >
        {inner}
        <span className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-riiba-orange opacity-0 group-hover:opacity-100 transition-opacity">
          {visitLabel}
          <FiExternalLink size={12} />
        </span>
      </a>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-white border border-riiba-green/5">
      {inner}
    </div>
  );
}

export default async function MemberInstitutions() {
  const t = await getTranslations("MembersPage");

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
            {t("introBadge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-4 leading-tight">
            {t("introTitle")}
          </h2>
          <p className="text-riiba-green-dark/70 leading-relaxed">
            {t("introSubtitle")}
          </p>
        </div>

        <div className="space-y-16">
          {memberCountries.map((country) => (
            <div key={country.country}>
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