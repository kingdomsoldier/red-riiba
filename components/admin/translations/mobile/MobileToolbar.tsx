"use client";

import Link from "next/link";
import { FiMenu, FiChevronLeft } from "react-icons/fi";
import ProgressBar from "../shared/ProgressBar";
import type { Editor } from "./MobileEditor";

interface Props {
  editor: Editor;
  onOpenMenu: () => void;
}

export default function MobileToolbar({ editor, onOpenMenu }: Props) {
  const translated = editor.queue.filter(
    (k) => k.values[editor.targetCode ?? ""]?.status === "TRANSLATED",
  ).length;

  return (
    <header
      className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex h-14 items-center gap-2 px-3">
        <Link
          href="/admin"
          aria-label="Volver al panel"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-riiba-green-dark/70 hover:bg-gray-100"
        >
          <FiChevronLeft size={20} />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-riiba-green-dark">
            {editor.targetLocale?.nativeName ?? "Traducciones"}
          </p>
          <p className="truncate text-[11px] text-riiba-green-dark/50">
            {editor.targetCode?.toUpperCase()} · {editor.queue.length} claves
          </p>
        </div>

        {editor.pendingSync > 0 && (
          <span
            role="status"
            aria-label={`${editor.pendingSync} cambios pendientes de sincronizar`}
            className="flex h-6 items-center gap-1 rounded-full bg-riiba-orange/10 px-2 text-[10px] font-semibold text-riiba-orange"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-riiba-orange" />
            {editor.pendingSync}
          </span>
        )}

        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menú"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-riiba-green-dark/70 hover:bg-gray-100"
        >
          <FiMenu size={20} />
        </button>
      </div>

      <div className="px-3 pb-2">
        <ProgressBar current={translated} total={editor.queue.length} />
      </div>
    </header>
  );
}