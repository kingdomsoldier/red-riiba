import type {
  TranslationKeyEntry,
} from "@/lib/admin/types";
import { t } from "@/lib/admin/i18n";
import TranslationRow from "./TranslationRow";

interface TranslationTableProps {
  entries: TranslationKeyEntry[];
  referenceCode: string;
  targetCode: string;
  pending: Map<number, string>;
  onChange: (valueId: number, value: string) => void;
}

export default function TranslationTable({
  entries,
  referenceCode,
  targetCode,
  pending,
  onChange,
}: TranslationTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header de columnas */}
      <div className="grid grid-cols-1 gap-3 border-b border-gray-200 bg-gray-50 p-4 text-xs font-semibold uppercase tracking-wider text-riiba-green-dark/60 md:grid-cols-12">
        <div className="md:col-span-2">{t("translations.keyLabel")}</div>
        <div className="md:col-span-4">
          {t("translations.referenceLabel")} ({referenceCode})
        </div>
        <div className="md:col-span-5">
          {t("translations.localeLabel")} ({targetCode})
        </div>
        <div className="md:col-span-1 md:text-right">
          {t("translations.statusLabel")}
        </div>
      </div>

      {/* Filas */}
      {entries.map((entry) => {
        const refVal = entry.values[referenceCode];
        const targetVal = entry.values[targetCode];
        const valueId = targetVal?.id;

        const isEditable = typeof valueId === "number";
        const currentValue = isEditable
          ? (pending.get(valueId) ?? targetVal?.value ?? "")
          : (targetVal?.value ?? "");
        const isDirty = isEditable && pending.has(valueId);

        return (
          <TranslationRow
            key={entry.id}
            keyName={entry.key}
            referenceValue={refVal?.value ?? null}
            targetStatus={targetVal?.status ?? "PENDING"}
            isAiGenerated={targetVal?.isAiGenerated ?? false}
            currentValue={currentValue}
            isDirty={isDirty}
            isEditable={isEditable}
            onChange={(v) => isEditable && onChange(valueId, v)}
          />
        );
      })}
    </div>
  );
}