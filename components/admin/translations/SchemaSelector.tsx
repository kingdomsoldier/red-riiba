"use client";

import { t } from "@/lib/admin/i18n";
import type { TranslationSchemaSummary } from "@/lib/admin/types";

interface SchemaSelectorProps {
  schemas: TranslationSchemaSummary[];
  value: number | null;
  onChange: (id: number) => void;
}

export default function SchemaSelector({
  schemas,
  value,
  onChange,
}: SchemaSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-riiba-green-dark">
        {t("translations.schemaLabel")}
      </label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-riiba-green-dark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
      >
        <option value="" disabled>
          {t("translations.selectSchema")}
        </option>
        {schemas.map((s) => (
          <option key={s.id} value={s.id}>
            {s.displayName} ({s.namespace})
          </option>
        ))}
      </select>
    </div>
  );
}