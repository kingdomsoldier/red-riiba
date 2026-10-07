"use client";

import { useEffect, useRef } from "react";
import type { Editor } from "./DesktopEditor";
import TranslationStatusBadge from "../shared/TranslationStatusBadge";

interface Props {
  editor: Editor;
}

export default function DesktopQueue({ editor }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  // Auto-scroll a la clave activa cuando cambia por teclado
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [editor.activeIndex]);

  return (
    <aside className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-riiba-green-dark/60">
          Cola ({editor.queue.length})
        </p>
      </div>

      <ul
        ref={listRef}
        className="max-h-[calc(100vh-6rem)] overflow-y-auto py-1"
      >
        {editor.queue.map((entry, index) => {
          const isActive = index === editor.activeIndex;
          const status = entry.values[editor.targetCode ?? ""]?.status ?? "PENDING";
          const isDirty = editor.pending.has(entry.id);

          return (
            <li key={entry.id}>
              <button
                type="button"
                data-active={isActive}
                onClick={() => editor.goTo(index)}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left transition-colors ${
                  isActive ? "bg-riiba-orange/10" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2">
                  {isDirty && (
                    <span
                      aria-label="Modificado"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-riiba-orange"
                    />
                  )}
                  <code
                    className={`truncate text-xs ${
                      isActive
                        ? "font-semibold text-riiba-orange"
                        : "text-riiba-green-dark/80"
                    }`}
                  >
                    {entry.key}
                  </code>
                </div>
                <TranslationStatusBadge status={status} compact />
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}