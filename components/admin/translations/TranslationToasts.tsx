import { t } from "@/lib/admin/i18n";

type SaveStatus = "idle" | "saving" | "success" | "error";

interface TranslationToastsProps {
  saveStatus: SaveStatus;
  saveError: string | null;
  hasPending: boolean;
}

export default function TranslationToasts({
  saveStatus,
  saveError,
  hasPending,
}: TranslationToastsProps) {
  if (saveStatus === "success" && !hasPending) {
    return (
      <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 shadow-lg">
        {t("translations.saveSuccess")}
      </div>
    );
  }

  if (saveStatus === "error" && saveError) {
    return (
      <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg">
        <p className="font-semibold">{t("translations.saveError")}</p>
        <p className="mt-1 text-xs">{saveError}</p>
      </div>
    );
  }

  return null;
}