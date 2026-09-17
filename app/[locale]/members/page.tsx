import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MemberInstitutions from "@/components/members/MemberInstitutions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MembersPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function MembersPage() {
  return <MemberInstitutions />;
}