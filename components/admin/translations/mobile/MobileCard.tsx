"use client";

import { useRef } from "react";
import { FiCopy } from "react-icons/fi";
import TranslationInput from "../shared/TranslationInput";
import TranslationStatusBadge from "../shared/TranslationStatusBadge";
import CharacterCounter from "../shared/CharacterCounter";
import type { Editor } from "@/lib/admin/hooks/useTranslationEditor";

interface Props {
  editor: Editor;
  hideReference: boolean;
}

const SWIPE = 60;

export default function MobileCard({ editor, hideReference }: Props) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const active = editor.activeKey;

  if (!active || !editor.targetCode || !editor.referenceCode) return null;

  const isEditingDefault = editor.targetCode === editor.referenceCode;
  const showReference = !hideReference && !isEditingDefault;

  const refValue = active.values[editor.referenceCode]?.value ?? "";
  const targetValue = active.values[editor.targetCode]?.value ?? "";
  const currentValue = editor.pending.get(active.id)?.value ?? targetValue;
  const isDirty = editor.pending.has(active.id);
  const targetStatus = active.values[editor.targetCode]?.status ?? "PENDING";

  const handleChange = (v: string) => editor.handleChange(active.id, v);

  const handleCopyReference = () => {
    if (!refValue) return;
    void navigator.clipboard.writeText(refValue);
    editor.handleChange(active.id, refValue);
    if ("vibrate" in navigator) navigator.vibrate?.(10);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) < SWIPE) return;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if ((e.target as HTMLElement).closest("input, textarea, button")) return;

    if (dx < 0) editor.goNext();
    else editor.goPrev();
  };

  return (
    <div
      className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-40 pt-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <code className="break-all text-sm font-semibold text-riiba-orange">
          {active.key}
        </code>
        <TranslationStatusBadge status={targetStatus} compact />
      </div>

      {showReference && (
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50">
              Referencia ({editor.referenceCode.toUpperCase()})
            </span>
            {refValue && (
              <button
                type="button"
                onClick={handleCopyReference}
                aria-label="Copiar referencia"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-riiba-orange hover:bg-riiba-orange/10"
              >
                <FiCopy size={12} />
                Copiar
              </button>
            )}
          </div>
          <div className="rounded-xl bg-gray-100 p-3 text-sm leading-relaxed text-riiba-green-dark/80">
            {refValue || (
              <span className="italic text-riiba-green-dark/40">—</span>
            )}
          </div>
        </div>
      )}

      <div>
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50">
          {isEditingDefault ? "Original" : "Traducción"} (
          {editor.targetCode.toUpperCase()})
        </span>
        <TranslationInput
          value={currentValue}
          onChange={handleChange}
          placeholder={
            isEditingDefault
              ? "Escribe el texto original…"
              : "Escribe la traducción…"
          }
        />
        <div className="mt-2 flex items-center justify-between">
          <CharacterCounter current={currentValue.length} />
          {isDirty && (
            <span className="text-[11px] font-medium text-riiba-orange">
              Modificado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}