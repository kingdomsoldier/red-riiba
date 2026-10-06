import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PoliciesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

type SectionWithItems = {
  title: string;
  body: string;
  items: Record<string, string>;
  footer?: string;
};

export default async function PoliciesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PoliciesPage" });

  const sectionsWithItems: SectionWithItems[] = [
    {
      title: t("sections.dataProtection.title"),
      body: t("sections.dataProtection.body"),
      items: {
        noSharing: t("sections.dataProtection.items.noSharing"),
        userRights: t("sections.dataProtection.items.userRights"),
        retention: t("sections.dataProtection.items.retention"),
      },
    },
    {
      title: t("sections.contentUse.title"),
      body: t("sections.contentUse.body"),
      items: {
        code: t("sections.contentUse.items.code"),
        editorial: t("sections.contentUse.items.editorial"),
      },
      footer: t("sections.contentUse.footer"),
    },
    {
      title: t("sections.publicationPolicy.title"),
      body: t("sections.publicationPolicy.body"),
      items: {
        topic: t("sections.publicationPolicy.items.topic"),
        value: t("sections.publicationPolicy.items.value"),
        responsibility: t("sections.publicationPolicy.items.responsibility"),
        reservation: t("sections.publicationPolicy.items.reservation"),
      },
    },
    {
      title: t("sections.userResponsibilities.title"),
      body: t("sections.userResponsibilities.body"),
      items: {
        legalUse: t("sections.userResponsibilities.items.legalUse"),
        noOffensive: t("sections.userResponsibilities.items.noOffensive"),
        intellectualProperty: t(
          "sections.userResponsibilities.items.intellectualProperty"
        ),
        security: t("sections.userResponsibilities.items.security"),
      },
    },
  ];

  return (
    <section className="pb-16 lg:pb-24 bg-white">
      <Container size="sm">
        <article
          className="
            prose prose-lg max-w-none
            prose-headings:text-riiba-green-dark prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-riiba-green-dark/80 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:text-riiba-green-dark/80 prose-ul:my-4
            prose-li:my-1
            prose-strong:text-riiba-green-dark prose-strong:font-semibold
            prose-a:text-riiba-orange prose-a:font-medium hover:prose-a:underline
          "
        >
          {/* Presentación */}
          <h2>{t("sections.presentation.title")}</h2>
          <p>{t("sections.presentation.body")}</p>

          {/* Resto de secciones con lista */}
          {sectionsWithItems.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul>
                {Object.entries(section.items).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
              {section.footer && <p>{section.footer}</p>}
            </div>
          ))}

          {/* Contacto */}
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.body")}</p>
          <p>
            <strong>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </strong>
          </p>
          <p>{t("contact.footer")}</p>
        </article>
      </Container>
    </section>
  );
}