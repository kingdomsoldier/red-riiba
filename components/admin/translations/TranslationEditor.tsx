"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  AdminLocale,
  BulkUpdateResponse,
  TranslationKeyEntry,
  TranslationKeysResponse,
  TranslationSchemaSummary,
} from "@/lib/admin/types";
import { adminFetch } from "@/lib/admin/api-client";
import { t } from "@/lib/admin/i18n";
import SchemaSelector from "./SchemaSelector";
import LocaleSelector from "./LocaleSelector";
import TranslationRow from "./TranslationRow";

interface TranslationEditorProps {
  schemas: TranslationSchemaSummary[];
  locales: AdminLocale[];
}

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function TranslationEditor({
  schemas,
  locales,
}: TranslationEditorProps) {
  const defaultLocale = locales.find((l) => l.isDefault);
  const firstEditable = locales.find((l) => !l.isDefault) ?? defaultLocale;

  const [schemaId, setSchemaId] = useState<number | null>(
    schemas[0]?.id ?? null,
  );
  const [localeId, setLocaleId] = useState<number | null>(
    firstEditable?.id ?? null,
  );

  const [keys, setKeys] = useState<TranslationKeyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // valueId → nuevo valor (sin guardar todavía)
  const [pending, setPending] = useState<Map<number, string>>(new Map());

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const targetLocale = locales.find((l) => l.id === localeId);
  const referenceLocale = defaultLocale;

  // Deps primitivas para evitar re-runs por identidad de objetos derivados
  const targetCode = targetLocale?.codeIso;
  const referenceCode = referenceLocale?.codeIso;

  // ─── Carga de claves ──────────────────────────────────────
  useEffect(() => {
    if (!schemaId || !targetCode || !referenceCode) return;

    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setLoadError(null);
      setKeys([]);
      setPending(new Map());
      setSaveStatus("idle");

      try {
        const query = `?locales=${referenceCode},${targetCode}`;
        const data = await adminFetch<TranslationKeysResponse>(
          `/admin/translation-schemas/${schemaId}/keys${query}`,
        );
        if (!cancelled) setKeys(data.keys);
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Error");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [schemaId, targetCode, referenceCode]);

  // ─── Aviso al cerrar/recargar con cambios sin guardar ─────
  useEffect(() => {
    if (pending.size === 0) return;

    function handler(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [pending.size]);

  // ─── Auto-dismiss del toast de éxito ──────────────────────
  useEffect(() => {
    if (saveStatus !== "success") return;
    const timer = setTimeout(() => setSaveStatus("idle"), 3000);
    return () => clearTimeout(timer);
  }, [saveStatus]);

  // ─── Handlers ─────────────────────────────────────────────
  const handleChange = useCallback((valueId: number, value: string) => {
    setPending((prev) => {
      const next = new Map(prev);
      next.set(valueId, value);
      return next;
    });
    setSaveStatus("idle");
    setSaveError(null);
  }, []);

  const handleDiscard = useCallback(() => {
    setPending(new Map());
    setSaveStatus("idle");
    setSaveError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (pending.size === 0) return;

    // Snapshot: si el usuario escribe mientras se guarda, no lo perdemos
    const snapshot = new Map(pending);

    setSaveStatus("saving");
    setSaveError(null);

    try {
      const updates = Array.from(snapshot.entries()).map(([id, value]) => ({
        id,
        value,
      }));

      await adminFetch<BulkUpdateResponse>("/admin/translation-values/bulk", {
        method: "PATCH",
        body: JSON.stringify({ updates }),
      });

      // Limpiamos solo lo que coincida con el snapshot
      setPending((prev) => {
        const next = new Map(prev);
        for (const [id, value] of snapshot) {
          if (next.get(id) === value) next.delete(id);
        }
        return next;
      });

      // Refetch para obtener los nuevos status (PENDING → TRANSLATED)
      if (schemaId && targetCode && referenceCode) {
        const query = `?locales=${referenceCode},${targetCode}`;
        const data = await adminFetch<TranslationKeysResponse>(
          `/admin/translation-schemas/${schemaId}/keys${query}`,
        );
        setKeys(data.keys);
      }

      setSaveStatus("success");
    } catch (e) {
      setSaveStatus("error");
      setSaveError(e instanceof Error ? e.message : "Error desconocido");
    }
  }, [pending, schemaId, targetCode, referenceCode]);

  // ─── Render ───────────────────────────────────────────────
  const hasPending = pending.size > 0;

  return (
    <div className="space-y-6 pb-28">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SchemaSelector
          schemas={schemas}
          value={schemaId}
          onChange={setSchemaId}
        />
        <LocaleSelector
          locales={locales}
          value={localeId}
          onChange={setLocaleId}
        />
      </div>

      {isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-riiba-green-dark/60">
          {t("translations.loading")}
        </div>
      )}

      {!isLoading && loadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">{t("translations.loadError")}</p>
          <p>{loadError}</p>
        </div>
      )}

      {!isLoading && !loadError && keys.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-riiba-green-dark/60">
          {t("translations.noKeys")}
        </div>
      )}

      {!isLoading &&
        !loadError &&
        keys.length > 0 &&
        targetLocale &&
        referenceLocale && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="grid grid-cols-1 gap-3 border-b border-gray-200 bg-gray-50 p-4 text-xs font-semibold uppercase tracking-wider text-riiba-green-dark/60 md:grid-cols-12">
              <div className="md:col-span-3">{t("translations.keyLabel")}</div>
              <div className="md:col-span-4">
                {t("translations.referenceLabel")} ({referenceLocale.codeIso})
              </div>
              <div className="md:col-span-4">
                {t("translations.localeLabel")} ({targetLocale.codeIso})
              </div>
              <div className="md:col-span-1 md:text-right">
                {t("translations.statusLabel")}
              </div>
            </div>

            {keys.map((entry) => {
              const refVal = entry.values[referenceLocale.codeIso];
              const targetVal = entry.values[targetLocale.codeIso];
              const valueId = targetVal?.id;

              const isEditable = typeof valueId === "number";
              const currentValue = isEditable
                ? (pending.get(valueId) ?? targetVal?.value ?? "")
                : (targetVal?.value ?? "");
              const isDirty = isEditable && pending.has(valueId);

              return (
                <TranslationRow
                  key={entry.id}
                  keyName={entry.key}
                  referenceValue={refVal?.value ?? null}
                  targetStatus={targetVal?.status ?? "PENDING"}
                  isAiGenerated={targetVal?.isAiGenerated ?? false}
                  currentValue={currentValue}
                  isDirty={isDirty}
                  isEditable={isEditable}
                  onChange={(v) => isEditable && handleChange(valueId, v)}
                />
              );
            })}
          </div>
        )}

      {/* Barra sticky de acciones */}
      {hasPending && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-riiba-orange" />
              <span className="text-sm font-medium text-riiba-green-dark">
                {pending.size} {t("translations.pendingChanges")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saveStatus === "saving"}
                className="rounded-lg px-4 py-2 text-sm font-medium text-riiba-green-dark/70 transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                {t("translations.discardButton")}
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="rounded-lg bg-riiba-orange px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-riiba-orange-light disabled:opacity-60"
              >
                {saveStatus === "saving"
                  ? t("translations.savingButton")
                  : t("translations.saveButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      {saveStatus === "success" && !hasPending && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 shadow-lg">
          {t("translations.saveSuccess")}
        </div>
      )}

      {saveStatus === "error" && saveError && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg">
          <p className="font-semibold">{t("translations.saveError")}</p>
          <p className="mt-1 text-xs">{saveError}</p>
        </div>
      )}
    </div>
  );
}