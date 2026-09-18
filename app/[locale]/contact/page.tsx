import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        {/* Intro */}
<div className="max-w-3xl mx-auto text-center mb-16">
  <span className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-3 block">
    {t("headerBadge")}
  </span>
  <h2 className="text-3xl lg:text-4xl font-bold text-riiba-green-dark mb-4 leading-tight">
    {t("headerTitle")}
  </h2>
  <p className="text-riiba-green-dark/70 leading-relaxed">
    {t("headerSubtitle")}
  </p>
</div>

        {/* Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </section>
  );
}