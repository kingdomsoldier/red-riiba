import { getTranslations } from "next-intl/server";
import {
  FiActivity,
  FiBookOpen,
  FiGlobe,
  FiEye,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import Container from "@/components/ui/Container";

const chipIcons = {
  research: FiActivity,
  training: FiBookOpen,
  mobility: FiGlobe,
  visibility: FiEye,
  policy: FiUsers,
  cooperation: FiTrendingUp,
};

export default async function ObjectivesWorkLines() {
  const t = await getTranslations("HomePage");

  const chips = [
    "research",
    "training",
    "mobility",
    "visibility",
    "policy",
    "cooperation",
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto narrativo */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
              {t("workBadge")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-4 leading-tight">
              {t("workTitle")}
            </h2>
            <p className="text-lg text-riiba-green-dark/70 mb-6">
              {t("workSubtitle")}
            </p>
            <p className="text-riiba-green-dark/80 leading-relaxed mb-4">
              {t("workParagraph1")}
            </p>
            <p className="text-riiba-green-dark/80 leading-relaxed">
              {t("workParagraph2")}
            </p>
          </div>

          {/* Chips visuales */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-riiba-green-dark/60 mb-6">
              {t("workChipsLabel")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {chips.map((chip) => {
                const Icon = chipIcons[chip as keyof typeof chipIcons];
                return (
                  <div
                    key={chip}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-riiba-green-bg hover:bg-riiba-orange/10 border border-transparent hover:border-riiba-orange/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-riiba-orange/10 group-hover:bg-riiba-orange flex items-center justify-center shrink-0 transition-colors">
                      <Icon
                        size={18}
                        className="text-riiba-orange group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="text-sm font-semibold text-riiba-green-dark">
                      {t(`workChips.${chip}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}