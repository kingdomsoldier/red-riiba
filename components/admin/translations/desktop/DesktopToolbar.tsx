"use client";

import type { AdminLocale, TranslationSchemaSummary } from "@/lib/admin/types";
import type { Editor } from "./DesktopEditor";
import type { StatusFilter } from "@/lib/admin/hooks/useTranslationEditor";
import ProgressBar from "../shared/ProgressBar";

interface Props {
  editor: Editor;
  schemas: TranslationSchemaSummary[];
  locales: AdminLocale[];
}

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "PENDING", label: "Pendientes" },
  { value: "OUTDATED", label: "Desactualizadas" },
  { value: "TRANSLATED", label: "Traducidas" },
  { value: "ALL", label: "Todas" },
];

export default function DesktopToolbar({ editor, schemas, locales }: Props) {
  const translated = editor.queue.filter(
    (k) => k.values[editor.targetCode ?? ""]?.status === "TRANSLATED",
  ).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Esquema */}
        <div className="min-w-[200px]">
          <label
            htmlFor="desktop-schema"
            className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50"
          >
            Esquema
          </label>
          <select
            id="desktop-schema"
            value={editor.schemaId ?? ""}
            onChange={(e) => editor.setSchemaId(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-riiba-green-dark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
          >
            {schemas.map((s) => (
              <option key={s.id} value={s.id}>
                {s.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Idioma destino */}
        <div className="min-w-[180px]">
          <label
            htmlFor="desktop-locale"
            className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50"
          >
            Idioma destino
          </label>
          <select
            id="desktop-locale"
            value={editor.localeId ?? ""}
            onChange={(e) => editor.setLocaleId(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-riiba-green-dark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
          >
            {locales
              .filter((l) => !l.isDefault)
              .map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nativeName} ({l.codeIso.toUpperCase()})
                </option>
              ))}
          </select>
        </div>

        {/* Búsqueda */}
        <div className="min-w-[240px] flex-1">
          <label
            htmlFor="desktop-search"
            className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50"
          >
            Buscar
          </label>
          <input
            id="desktop-search"
            type="search"
            value={editor.query}
            onChange={(e) => editor.setQuery(e.target.value)}
            placeholder="Clave o valor…"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-riiba-green-dark placeholder:text-riiba-green-dark/40 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
          />
        </div>

        {/* Sync */}
        {editor.pendingSync > 0 && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-full bg-riiba-orange/10 px-3 py-1.5 text-xs font-semibold text-riiba-orange"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-riiba-orange" />
            {editor.pendingSync} sincronizando…
          </div>
        )}
      </div>

      {/* Filtros de estado + progreso */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = editor.filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => editor.setFilter(f.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-riiba-orange bg-riiba-orange text-white"
                    : "border-gray-200 bg-white text-riiba-green-dark/70 hover:border-riiba-orange/40"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="min-w-[260px] flex-1">
          <ProgressBar current={translated} total={editor.queue.length} />
        </div>
      </div>
    </div>
  );
}