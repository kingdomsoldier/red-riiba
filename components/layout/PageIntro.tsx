"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

type IntroNamespace = "AboutPage" | "MembersPage" | "ContactPage";

const namespaceBySegment: Record<string, IntroNamespace> = {
  about: "AboutPage",
  members: "MembersPage",
  contact: "ContactPage",
};

export default function PageIntro() {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (!segment) return null;

  const ns = namespaceBySegment[segment];
  if (!ns) return null;

  return <IntroContent ns={ns} />;
}

function IntroContent({ ns }: { ns: IntroNamespace }) {
  const t = useTranslations(ns);

  if (!t.has("introTitle")) return null;

  return (
    <section className="pt-16 lg:pt-24 bg-white">
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
      </Container>
    </section>
  );
}