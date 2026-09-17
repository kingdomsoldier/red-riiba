import { getTranslations } from "next-intl/server";
import { FiMail, FiMapPin } from "react-icons/fi";
import SocialLinks from "@/components/layout/SocialLinks";
import { siteConfig } from "@/lib/config";

export default async function ContactInfo() {
  const t = await getTranslations("ContactPage.info");

  return (
    <aside className="space-y-8">
      {/* Email */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3">
          {t("emailLabel")}
        </h3>
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-3 text-riiba-green-dark hover:text-riiba-orange transition-colors"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-riiba-orange/10 text-riiba-orange shrink-0">
            <FiMail size={18} />
          </span>
          <span className="text-sm font-medium break-all">
            {siteConfig.email}
          </span>
        </a>
      </div>

      {/* Ubicación */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3">
          {t("locationLabel")}
        </h3>
        <div className="flex items-center gap-3 text-riiba-green-dark">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-riiba-orange/10 text-riiba-orange shrink-0">
            <FiMapPin size={18} />
          </span>
          <span className="text-sm font-medium">{t("locationValue")}</span>
        </div>
      </div>

      {/* Redes sociales */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3">
          {t("followLabel")}
        </h3>
        <div className="[&_a]:!bg-riiba-green-dark/5 [&_a]:!text-riiba-green-dark [&_a:hover]:!bg-riiba-orange [&_a:hover]:!text-white">
          <SocialLinks />
        </div>
      </div>

      {/* Nota para instituciones */}
      <div className="p-5 rounded-xl bg-riiba-green-bg border-l-4 border-riiba-orange">
        <p className="text-sm font-semibold text-riiba-green-dark mb-1">
          {t("institutionsLabel")}
        </p>
        <p className="text-sm text-riiba-green-dark/70 leading-relaxed">
          {t("institutionsText")}
        </p>
      </div>
    </aside>
  );
}