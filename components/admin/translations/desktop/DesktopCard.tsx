"use client";

import {
  FiCopy,
  FiCpu,
  FiCheck,
  FiChevronRight,
  FiSkipForward,
} from "react-icons/fi";
import type { Editor } from "./DesktopEditor";
import TranslationInput from "../shared/TranslationInput";
import TranslationStatusBadge from "../shared/TranslationStatusBadge";
import CharacterCounter from "../shared/CharacterCounter";

interface Props {
  editor: Editor;
}

export default function DesktopCard({ editor }: Props) {
  const active = editor.activeKey;
  if (!active || !editor.targetCode || !editor.referenceCode) return null;

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
  };

  return (
    <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <code className="break-all text-sm font-semibold text-riiba-orange">
            {active.key}
          </code>
          <p className="mt-1 text-xs text-riiba-green-dark/50">
            {editor.activeIndex + 1} de {editor.queue.length}
          </p>
        </div>
        <TranslationStatusBadge status={targetStatus} />
      </div>

      {/* Referencia */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50">
            Referencia ({editor.referenceCode.toUpperCase()})
          </span>
          {refValue && (
            <button
              type="button"
              onClick={handleCopyReference}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-riiba-orange hover:bg-riiba-orange/10"
            >
              <FiCopy size={12} />
              Copiar a traducción
            </button>
          )}
        </div>
        <div className="rounded-xl bg-gray-100 p-4 text-sm leading-relaxed text-riiba-green-dark/80">
          {refValue || (
            <span className="italic text-riiba-green-dark/40">—</span>
          )}
        </div>
      </div>

      {/* Traducción */}
      <div>
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50">
          Traducción ({editor.targetCode.toUpperCase()})
        </span>
        <TranslationInput
          value={currentValue}
          onChange={handleChange}
          placeholder="Escribe la traducción…"
          autoFocus
        />
        <div className="mt-2 flex items-center justify-between">
          <CharacterCounter current={currentValue.length} />
          {isDirty && (
            <span className="text-[11px] font-medium text-riiba-orange">
              Sin guardar
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Sugerir con IA"
            className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-riiba-orange transition-colors hover:bg-riiba-orange/10"
          >
            <FiCpu size={16} />
            Sugerir IA
          </button>

          <button
            type="button"
            onClick={editor.skip}
            aria-label="Saltar esta clave"
            className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-riiba-green-dark/70 transition-colors hover:bg-gray-100"
          >
            <FiSkipForward size={16} />
            Saltar
          </button>
        </div>

        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              type="button"
              onClick={editor.handleDiscardActive}
              className="rounded-lg px-3 py-2 text-sm font-medium text-riiba-green-dark/70 transition-colors hover:bg-gray-100"
            >
              Descartar
            </button>
          )}
          <button
            type="button"
            onClick={editor.saveAndNext}
            disabled={!isDirty}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-riiba-orange px-4 text-sm font-semibold text-white transition-colors hover:bg-riiba-orange-light disabled:opacity-40"
          >
            <FiCheck size={16} />
            Guardar
            <FiChevronRight size={14} />
            <span className="text-[11px] opacity-70">Ctrl+↵</span>
          </button>
        </div>
      </div>
    </section>
  );
}