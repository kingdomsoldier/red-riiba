"use client";

import {
  FiChevronLeft,
  FiChevronRight,
  FiSkipForward,
  FiCpu,
  FiCheck,
} from "react-icons/fi";
import type { Editor } from "@/lib/admin/hooks/useTranslationEditor";

interface Props {
  editor: Editor;
}

export default function MobileActionBar({ editor }: Props) {
  const active = editor.activeKey;
  const isDirty = active ? editor.pending.has(active.id) : false;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-1 px-2 py-2">
        <button
          type="button"
          onClick={editor.goPrev}
          disabled={editor.activeIndex === 0}
          aria-label="Anterior"
          className="flex h-12 w-12 items-center justify-center rounded-xl text-riiba-green-dark/70 hover:bg-gray-100 disabled:opacity-30"
        >
          <FiChevronLeft size={22} />
        </button>

        <button
          type="button"
          aria-label="Sugerir con IA"
          className="flex h-12 w-12 items-center justify-center rounded-xl text-riiba-orange hover:bg-riiba-orange/10"
        >
          <FiCpu size={20} />
        </button>

        <button
          type="button"
          onClick={editor.skip}
          aria-label="Saltar"
          className="flex h-12 items-center gap-1 rounded-xl px-3 text-sm font-medium text-riiba-green-dark/70 hover:bg-gray-100"
        >
          <FiSkipForward size={18} />
          Saltar
        </button>

        <button
          type="button"
          onClick={editor.saveAndNext}
          disabled={!isDirty}
          aria-label="Guardar y siguiente"
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-riiba-orange text-sm font-semibold text-white transition-colors hover:bg-riiba-orange-light disabled:opacity-40"
        >
          <FiCheck size={18} />
          Guardar
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}