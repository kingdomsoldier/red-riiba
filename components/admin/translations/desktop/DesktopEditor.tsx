"use client";

import { useEffect, useState } from "react";
import type { AdminLocale, TranslationSchemaSummary } from "@/lib/admin/types";
import type { useTranslationEditor } from "@/lib/admin/hooks/useTranslationEditor";
import DesktopToolbar from "./DesktopToolbar";
import DesktopQueue from "./DesktopQueue";
import DesktopCard from "./DesktopCard";

export type Editor = ReturnType<typeof useTranslationEditor>;

interface Props {
  editor: Editor;
  schemas: TranslationSchemaSummary[];
  locales: AdminLocale[];
}

export default function DesktopEditor({ editor, schemas, locales }: Props) {
  // Atajos: Alt+← / Alt+→ navegan, Ctrl/Cmd+Enter guarda y avanza
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const inInput = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        editor.goNext();
      } else if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        editor.goPrev();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        editor.saveAndNext();
      } else if (e.key === "Escape" && inInput) {
        target?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editor]);

  if (editor.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-riiba-green-dark/60">
        Cargando traducciones…
      </div>
    );
  }

  if (editor.loadError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <p className="font-semibold">Error al cargar</p>
        <p>{editor.loadError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DesktopToolbar editor={editor} schemas={schemas} locales={locales} />

      {editor.queue.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-base font-semibold text-riiba-green-dark">
            No hay claves para este filtro
          </p>
          <p className="mt-2 text-sm text-riiba-green-dark/60">
            Ajusta los filtros o el idioma para ver otras claves.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[300px_minmax(0,1fr)] gap-6">
          <DesktopQueue editor={editor} />
          <DesktopCard editor={editor} />
        </div>
      )}
    </div>
  );
}