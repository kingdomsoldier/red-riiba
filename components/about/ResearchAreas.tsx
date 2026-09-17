import { getTranslations } from "next-intl/server";
import {
  FiActivity,
  FiHeart,
  FiBookOpen,
  FiGlobe,
  FiGitBranch,
  FiZap,
  FiCpu,
  FiDroplet,
  FiRefreshCw,
  FiBarChart2,
  FiTrendingUp,
  FiHome,
  FiPackage,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import Container from "@/components/ui/Container";

const areaIcons = {
  physiologicalDiagnosis: FiActivity,
  animalHealth: FiHeart,
  nutritionEducation: FiBookOpen,
  foodSustainability: FiGlobe,
  geneticImprovement: FiGitBranch,
  reproductionBiotech: FiZap,
  computerEngineering: FiCpu,
  waterManagement: FiDroplet,
  wastewaterManagement: FiRefreshCw,
  predictiveModels: FiBarChart2,
  resourceOptimization: FiTrendingUp,
  infrastructureDesign: FiHome,
  sustainableConstruction: FiPackage,
  socialImpact: FiUsers,
  legislation: FiClipboard,
} as const;

const areaKeys = Object.keys(areaIcons) as Array<keyof typeof areaIcons>;

export default async function ResearchAreas() {
  const t = await getTranslations("AboutPage");

  return (
    <section className="py-20 lg:py-28 bg-riiba-green-bg">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
            {t("areasBadge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-4 leading-tight">
            {t("areasTitle")}
          </h2>
          <p className="text-riiba-green-dark/70 leading-relaxed">
            {t("areasSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areaKeys.map((key) => {
            const Icon = areaIcons[key];
            return (
              <article
                key={key}
                className="p-6 rounded-xl bg-white border border-riiba-green/5"
              >
                <div className="w-12 h-12 rounded-lg bg-riiba-orange/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-riiba-orange" />
                </div>
                <h3 className="text-lg font-semibold text-riiba-green-dark mb-2 leading-snug">
                  {t(`areas.${key}.title`)}
                </h3>
                <p className="text-sm text-riiba-green-dark/70 leading-relaxed">
                  {t(`areas.${key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
