import { adminFetch } from "@/lib/admin/api-client";
import type {
  AdminLocale,
  TranslationSchemaSummary,
} from "@/lib/admin/types";
import TranslationEditor from "@/components/admin/translations/TranslationEditor";
import { t } from "@/lib/admin/i18n";

export const instant = false;

export default async function AdminTranslationsPage() {
  let schemas: TranslationSchemaSummary[] = [];
  let locales: AdminLocale[] = [];
  let error: string | null = null;

  try {
    [schemas, locales] = await Promise.all([
      adminFetch<TranslationSchemaSummary[]>("/admin/translation-schemas"),
      adminFetch<AdminLocale[]>("/admin/locales"),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido";
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold text-riiba-green-dark">
          {t("translations.title")}
        </h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">{t("translations.errorLoading")}</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-2 text-2xl font-bold text-riiba-green-dark">
        {t("translations.title")}
      </h1>
      <p className="mb-8 text-riiba-green-dark/70">
        {t("translations.subtitle")}
      </p>

      <TranslationEditor schemas={schemas} locales={locales} />
    </div>
  );
}