"use client";

import { FiX, FiCheck } from "react-icons/fi";
import type { AdminLocale, TranslationSchemaSummary } from "@/lib/admin/types";
import type { Editor } from "./MobileEditor";
import type { StatusFilter } from "@/lib/admin/hooks/useTranslationEditor";

interface Props {
  open: boolean;
  onClose: () => void;
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

export default function MobileBottomSheet({
  open,
  onClose,
  editor,
  schemas,
  locales,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Menú del editor de traducciones"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* Sheet */}
      <div
        className="relative max-h-[85dvh] overflow-y-auto overscroll-contain rounded-t-2xl bg-white shadow-2xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Handle + header */}
        <div className="sticky top-0 z-10 rounded-t-2xl bg-white">
          <div className="flex justify-center pt-3">
            <span className="h-1 w-10 rounded-full bg-gray-300" />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-bold text-riiba-green-dark">
              Ajustes
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-riiba-green-dark/70 hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6 px-4 pb-6">
          {/* Búsqueda */}
          <section>
            <label
              htmlFor="mobile-search"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50"
            >
              Buscar
            </label>
            <input
              id="mobile-search"
              type="search"
              value={editor.query}
              onChange={(e) => editor.setQuery(e.target.value)}
              placeholder="Clave o valor…"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-riiba-green-dark placeholder:text-riiba-green-dark/40 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
            />
          </section>

          {/* Filtros de estado */}
          <section>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50">
              Estado
            </span>
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
          </section>

          {/* Esquema */}
          <section>
            <label
              htmlFor="mobile-schema"
              className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50"
            >
              Esquema
            </label>
            <select
              id="mobile-schema"
              value={editor.schemaId ?? ""}
              onChange={(e) => editor.setSchemaId(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-riiba-green-dark focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
            >
              {schemas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.displayName} ({s.namespace})
                </option>
              ))}
            </select>
          </section>

          {/* Locale destino */}
          <section>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-riiba-green-dark/50">
              Idioma destino
            </span>
            <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
              {locales.map((l) => {
                const active = l.id === editor.localeId;
                const isDefault = l.isDefault;
                return (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isDefault) return;
                        editor.setLocaleId(l.id);
                        onClose();
                      }}
                      disabled={isDefault}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                        active
                          ? "bg-riiba-orange/10"
                          : "bg-white hover:bg-gray-50 disabled:opacity-40"
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            active
                              ? "text-riiba-orange"
                              : "text-riiba-green-dark"
                          }`}
                        >
                          {l.nativeName}
                        </p>
                        <p className="text-xs text-riiba-green-dark/50">
                          {l.codeIso.toUpperCase()}
                          {isDefault && " · por defecto"}
                        </p>
                      </div>
                      {active && <FiCheck size={18} className="text-riiba-orange" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Sync status */}
          {editor.pendingSync > 0 && (
            <div className="rounded-xl border border-riiba-orange/30 bg-riiba-orange/5 p-3">
              <p className="text-xs font-semibold text-riiba-orange">
                {editor.pendingSync} cambio(s) pendiente(s) de sincronizar
              </p>
              {editor.syncError && (
                <p className="mt-1 text-[11px] text-red-600">{editor.syncError}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}