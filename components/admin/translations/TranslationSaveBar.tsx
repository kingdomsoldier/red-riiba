import { t } from "@/lib/admin/i18n";

type SaveStatus = "idle" | "saving" | "success" | "error";

interface TranslationSaveBarProps {
  pendingCount: number;
  saveStatus: SaveStatus;
  onSave: () => void;
  onDiscard: () => void;
}

export default function TranslationSaveBar({
  pendingCount,
  saveStatus,
  onSave,
  onDiscard,
}: TranslationSaveBarProps) {
  const isSaving = saveStatus === "saving";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-riiba-orange" />
          <span className="text-sm font-medium text-riiba-green-dark">
            {pendingCount} {t("translations.pendingChanges")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
            className="rounded-lg px-4 py-2 text-sm font-medium text-riiba-green-dark/70 transition-colors hover:bg-gray-100 disabled:opacity-50"
          >
            {t("translations.discardButton")}
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-lg bg-riiba-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-riiba-orange-light disabled:opacity-60"
          >
            {isSaving
              ? t("translations.savingButton")
              : t("translations.saveButton")}
          </button>
        </div>
      </div>
    </div>
  );
}