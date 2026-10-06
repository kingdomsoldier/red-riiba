"use client";

import { useLayoutEffect, useRef } from "react";
import type { TranslationStatus } from "@/lib/admin/types";
import { t } from "@/lib/admin/i18n";

interface TranslationRowProps {
  keyName: string;
  referenceValue: string | null;
  targetStatus: TranslationStatus;
  isAiGenerated: boolean;
  currentValue: string;
  isDirty: boolean;
  isEditable: boolean;
  onChange: (value: string) => void;
}

const statusStyles: Record<TranslationStatus, string> = {
  PENDING: "bg-gray-100 text-gray-600 border-gray-200",
  TRANSLATED: "bg-green-50 text-green-700 border-green-200",
  OUTDATED: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function TranslationRow({
  keyName,
  referenceValue,
  targetStatus,
  isAiGenerated,
  currentValue,
  isDirty,
  isEditable,
  onChange,
}: TranslationRowProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize: mide el scrollHeight real y ajusta la altura.
  // useLayoutEffect para que ocurra antes del paint (sin flash visual).
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [currentValue]);

  return (
    <div
      className={`grid grid-cols-1 gap-3 border-b border-gray-100 p-4 last:border-0 md:grid-cols-12 md:items-start ${
        isDirty ? "bg-riiba-orange/5" : ""
      }`}
    >
      {/* Col 1: clave + dot de dirty */}
      <div className="md:col-span-2">
        <div className="flex items-start gap-2">
          {isDirty && (
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-riiba-orange"
              aria-label={t("translations.dirtyRow")}
            />
          )}
          <code className="break-all text-xs font-semibold text-riiba-orange">
            {keyName}
          </code>
        </div>
      </div>

      {/* Col 2: valor de referencia (solo lectura) */}
      <div className="md:col-span-4">
        <div className="rounded-lg bg-gray-50 p-3 text-sm text-riiba-green-dark/70">
          {referenceValue ?? (
            <span className="italic text-riiba-green-dark/40">
              {t("translations.emptyValue")}
            </span>
          )}
        </div>
      </div>

      {/* Col 3: textarea auto-resize */}
      <div className="md:col-span-5">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditable}
          placeholder={t("translations.emptyValue")}
          className="block min-h-[3rem] w-full resize-none overflow-hidden rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-riiba-green-dark transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-riiba-green-dark/40"
        />
      </div>

      {/* Col 4: estado + badge IA */}
      <div className="md:col-span-1 md:text-right">
        <div className="inline-flex flex-col items-end gap-1">
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[targetStatus]}`}
          >
            {t(`translations.statuses.${targetStatus}`)}
          </span>
          {isAiGenerated && (
            <span
              title="Generado por IA"
              className="text-[10px] font-semibold text-riiba-orange"
            >
              🤖 IA
            </span>
          )}
        </div>
      </div>
    </div>
  );
}