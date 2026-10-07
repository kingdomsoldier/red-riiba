"use client";

import { useEffect, useState } from "react";
import type { AdminLocale, TranslationSchemaSummary } from "@/lib/admin/types";
import type { Editor } from "@/lib/admin/hooks/useTranslationEditor";
import MobileToolbar from "./MobileToolbar";
import MobileCard from "./MobileCard";
import MobileActionBar from "./MobileActionBar";
import MobileBottomSheet from "./MobileBottomSheet";

interface Props {
  editor: Editor;
  schemas: TranslationSchemaSummary[];
  locales: AdminLocale[];
}

export default function MobileEditor({ editor, schemas, locales }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      const kb = Math.max(0, window.innerHeight - vv.height);
      setKeyboardHeight(kb);
    };
    vv.addEventListener("resize", handler);
    vv.addEventListener("scroll", handler);
    return () => {
      vv.removeEventListener("resize", handler);
      vv.removeEventListener("scroll", handler);
    };
  }, []);

  const keyboardOpen = keyboardHeight > 100;

  if (editor.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-riiba-green-dark/60">
        Cargando traducciones…
      </div>
    );
  }

  if (editor.loadError) {
    return (
      <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <p className="font-semibold">Error al cargar</p>
        <p>{editor.loadError}</p>
      </div>
    );
  }

  if (editor.queue.length === 0) {
    return (
      <>
        <MobileToolbar editor={editor} onOpenMenu={() => setSheetOpen(true)} />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
          <p className="text-base font-semibold text-riiba-green-dark">
            No hay claves para este filtro
          </p>
          <p className="mt-2 text-sm text-riiba-green-dark/60">
            Prueba a cambiar el filtro o el idioma desde el menú.
          </p>
        </div>
        <MobileBottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          editor={editor}
          schemas={schemas}
          locales={locales}
        />
      </>
    );
  }

  return (
    <div
      className="flex min-h-[100dvh] flex-col bg-gray-50"
      style={{
        paddingBottom: keyboardOpen ? keyboardHeight : 0,
        transition: "padding-bottom 200ms ease-out",
      }}
    >
      <MobileToolbar editor={editor} onOpenMenu={() => setSheetOpen(true)} />
      <MobileCard editor={editor} hideReference={keyboardOpen} />
      <MobileActionBar editor={editor} />
      <MobileBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        editor={editor}
        schemas={schemas}
        locales={locales}
      />
    </div>
  );
}