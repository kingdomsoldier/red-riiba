"use client";

import { memo, useEffect, useRef } from "react";
import type { Editor } from "@/lib/admin/hooks/useTranslationEditor";
import type { TranslationStatus } from "@/lib/admin/types";
import TranslationStatusBadge from "../shared/TranslationStatusBadge";

interface QueueItemProps {
  keyName: string;
  status: TranslationStatus;
  isActive: boolean;
  isDirty: boolean;
  index: number;
  onSelect: (index: number) => void;
}

const QueueItem = memo(function QueueItem({
  keyName,
  status,
  isActive,
  isDirty,
  index,
  onSelect,
}: QueueItemProps) {
  return (
    <li>
      <button
        type="button"
        data-active={isActive}
        onClick={() => onSelect(index)}
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
            {keyName}
          </code>
        </div>
        <TranslationStatusBadge status={status} compact />
      </button>
    </li>
  );
});

interface Props {
  editor: Editor;
}

export default function DesktopQueue({ editor }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const targetCode = editor.targetCode ?? "";

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
        {editor.queue.map((entry, index) => (
          <QueueItem
            key={entry.id}
            keyName={entry.key}
            status={entry.values[targetCode]?.status ?? "PENDING"}
            isActive={index === editor.activeIndex}
            isDirty={editor.pending.has(entry.id)}
            index={index}
            onSelect={editor.goTo}
          />
        ))}
      </ul>
    </aside>
  );
}