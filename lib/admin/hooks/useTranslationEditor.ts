"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  AdminLocale,
  BulkUpdateResponse,
  TranslationKeyEntry,
  TranslationKeysResponse,
  TranslationSchemaSummary,
} from "@/lib/admin/types";
import { adminFetch } from "@/lib/admin/api-client";
import { revalidateTranslations } from "@/lib/admin/actions";

type SaveStatus = "idle" | "saving" | "success" | "error";

export function useTranslationEditor(
  schemas: TranslationSchemaSummary[],
  locales: AdminLocale[],
) {
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

  const [query, setQuery] = useState("");

  const [pending, setPending] = useState<Map<number, string>>(new Map());
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const targetLocale = locales.find((l) => l.id === localeId);
  const referenceLocale = defaultLocale;

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
      setQuery("");
      setSaveStatus("idle");

      try {
        const queryStr = `?locales=${referenceCode},${targetCode}`;
        const data = await adminFetch<TranslationKeysResponse>(
          `/admin/translation-schemas/${schemaId}/keys${queryStr}`,
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

  // ─── Filtro ───────────────────────────────────────────────
  const filteredKeys = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return keys;
    if (!referenceCode || !targetCode) return keys;

    return keys.filter((entry) => {
      if (entry.key.toLowerCase().includes(q)) return true;

      const refVal = entry.values[referenceCode]?.value;
      if (refVal && refVal.toLowerCase().includes(q)) return true;

      const targetVal = entry.values[targetCode]?.value;
      if (targetVal && targetVal.toLowerCase().includes(q)) return true;

      return false;
    });
  }, [keys, query, referenceCode, targetCode]);

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

      // ─── Invalidar cache del sitio público ────────────────
      // Server Action: corre en el servidor, ejecuta updateTag.
      // Se invalidan el locale destino y el de referencia, porque
      // el backend aplica fallback del default: si una clave en "fr"
      // está vacía, el sitio sirve el valor de "es". Editar "es" por
      // tanto puede cambiar lo que se muestra en "fr".
      const localesToInvalidate = [targetCode, referenceCode].filter(
        (c): c is string => typeof c === "string",
      );

      try {
        await revalidateTranslations(localesToInvalidate);
      } catch (err) {
        // Fallo blando: el save ya está en la DB. Solo logueamos.
        console.warn("[revalidate] Server Action falló:", err);
      }

      setPending((prev) => {
        const next = new Map(prev);
        for (const [id, value] of snapshot) {
          if (next.get(id) === value) next.delete(id);
        }
        return next;
      });

      if (schemaId && targetCode && referenceCode) {
        const q = `?locales=${referenceCode},${targetCode}`;
        const data = await adminFetch<TranslationKeysResponse>(
          `/admin/translation-schemas/${schemaId}/keys${q}`,
        );
        setKeys(data.keys);
      }

      setSaveStatus("success");
    } catch (e) {
      setSaveStatus("error");
      setSaveError(e instanceof Error ? e.message : "Error desconocido");
    }
  }, [pending, schemaId, targetCode, referenceCode]);

  return {
    // Selectores
    schemaId,
    setSchemaId,
    localeId,
    setLocaleId,

    // Locales derivados
    targetLocale,
    referenceLocale,

    // Datos
    keys,
    filteredKeys,
    isLoading,
    loadError,

    // Filtro
    query,
    setQuery,
    isFiltering: query.trim().length > 0,

    // Pending y save
    pending,
    hasPending: pending.size > 0,
    saveStatus,
    saveError,
    handleChange,
    handleDiscard,
    handleSave,
  };
}