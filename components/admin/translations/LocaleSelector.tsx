"use client";

import { t } from "@/lib/admin/i18n";
import type { AdminLocale } from "@/lib/admin/types";

interface LocaleSelectorProps {
  locales: AdminLocale[];
  value: number | null;
  onChange: (id: number) => void;
}

export default function LocaleSelector({
  locales,
  value,
  onChange,
}: LocaleSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-riiba-green-dark">
        {t("translations.localeLabel")}
      </label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-riiba-green-dark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
      >
        <option value="" disabled>
          {t("translations.selectLocale")}
        </option>
        {locales.map((l) => (
          <option key={l.id} value={l.id}>
            {l.nativeName} ({l.codeIso})
            {l.isDefault ? " — por defecto" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}