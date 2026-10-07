"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  AdminLocale,
  TranslationKeyEntry,
  TranslationKeysResponse,
  TranslationSchemaSummary,
  TranslationStatus,
} from "@/lib/admin/types";
import { adminFetch } from "@/lib/admin/api-client";
import { revalidateTranslations } from "@/lib/admin/actions";
import { syncQueue } from "@/lib/admin/syncQueue";

export type StatusFilter = TranslationStatus | "ALL";

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
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [activeIndex, setActiveIndex] = useState(0);

  const [pending, setPending] = useState<
    Map<number, { valueId: number | null; value: string }>
  >(new Map());

  const [pendingSync, setPendingSync] = useState(0);
  const [syncError, setSyncError] = useState<string | null>(null);

  const targetLocale = locales.find((l) => l.id === localeId);
  const referenceLocale = defaultLocale;
  const targetCode = targetLocale?.codeIso;
  const referenceCode = referenceLocale?.codeIso;

  // Trackea si ha ocurrido al menos un flush desde que se montó el editor.
  // Sin esto, la revalidación se dispara en el mount inicial sin que
  // el usuario haya guardado nada.
  const hasSyncedRef = useRef(false);

  // Suscripción a la cola de sync
  useEffect(() => {
    return syncQueue.subscribe((count, err) => {
      setPendingSync(count);
      setSyncError(err);
    });
  }, []);

  // Carga de claves
  useEffect(() => {
    if (!schemaId || !targetCode || !referenceCode) return;

    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setLoadError(null);
      setKeys([]);
      setPending(new Map());
      setQuery("");
      setActiveIndex(0);

      try {
        // Dedupe: si el destino es el idioma por defecto, no pedir dos veces
        const codes = Array.from(new Set([referenceCode, targetCode]));
        const q = `?locales=${codes.join(",")}`;
        const data = await adminFetch<TranslationKeysResponse>(
          `/admin/translation-schemas/${schemaId}/keys${q}`,
        );
        if (!cancelled) setKeys(data.keys);
      } catch (e) {
        if (!cancelled) setLoadError(e instanceof Error ? e.message : "Error");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [schemaId, targetCode, referenceCode]);

  // Cola filtrada
  const queue = useMemo(() => {
    if (!targetCode) return [];
    const q = query.trim().toLowerCase();

    return keys.filter((entry) => {
      const status: TranslationStatus =
        entry.values[targetCode]?.status ?? "PENDING";

      if (filter !== "ALL" && status !== filter) return false;
      if (!q) return true;

      if (entry.key.toLowerCase().includes(q)) return true;
      const refVal = entry.values[referenceCode ?? ""]?.value;
      if (refVal?.toLowerCase().includes(q)) return true;
      const targetVal = entry.values[targetCode]?.value;
      if (targetVal?.toLowerCase().includes(q)) return true;

      return false;
    });
  }, [keys, query, filter, targetCode, referenceCode]);

  // Índice clampeado durante el render (sin effect).
  // React 19 prohíbe setState sincrónico en useEffect.
  const clampedIndex =
    queue.length === 0 ? 0 : Math.min(activeIndex, queue.length - 1);

  const activeKey = queue[clampedIndex] ?? null;

  const handleChange = useCallback(
    (keyId: number, value: string) => {
      const entry = keys.find((k) => k.id === keyId);
      const valueId = entry?.values[targetCode ?? ""]?.id ?? null;
      setPending((prev) => {
        const next = new Map(prev);
        next.set(keyId, { valueId, value });
        return next;
      });
    },
    [keys, targetCode],
  );

  const handleDiscardActive = useCallback(() => {
    if (!activeKey) return;
    setPending((prev) => {
      const next = new Map(prev);
      next.delete(activeKey.id);
      return next;
    });
  }, [activeKey]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => {
      if (queue.length === 0) return 0;
      const current = Math.min(i, queue.length - 1);
      return Math.min(current + 1, queue.length - 1);
    });
  }, [queue.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => {
      if (queue.length === 0) return 0;
      const current = Math.min(i, queue.length - 1);
      return Math.max(current - 1, 0);
    });
  }, [queue.length]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const skip = useCallback(() => {
    setActiveIndex((i) => {
      if (queue.length === 0) return 0;
      const current = Math.min(i, queue.length - 1);
      return current < queue.length - 1 ? current + 1 : 0;
    });
  }, [queue.length]);

  const saveActive = useCallback(() => {
    if (!activeKey || !targetCode || !localeId) return;
    const entry = pending.get(activeKey.id);
    if (!entry) return;

    // Guard defensivo: si no hay valueId, el backend no puede hacer PATCH
    // (su DTO exige `id: number`). Esto solo debería ocurrir si se crea
    // un locale sin correr el seed, algo que en Fase 1 no está permitido.
    if (entry.valueId === null) {
      console.warn(
        `[i18n] No se puede guardar "${activeKey.key}": valueId es null. ` +
          `Ejecuta el seed del locale o crea el value antes de editar.`,
      );
      return;
    }

    syncQueue.enqueue({
      keyId: activeKey.id,
      valueId: entry.valueId,
      localeId,
      value: entry.value,
    });

    // Optimistic UI
    setKeys((prev) =>
      prev.map((k) =>
        k.id === activeKey.id
          ? {
              ...k,
              values: {
                ...k.values,
                [targetCode]: {
                  id: entry.valueId,
                  value: entry.value,
                  status: "TRANSLATED" as TranslationStatus,
                  isAiGenerated: false,
                },
              },
            }
          : k,
      ),
    );

    setPending((prev) => {
      const next = new Map(prev);
      next.delete(activeKey.id);
      return next;
    });
  }, [activeKey, pending, targetCode, localeId]);

  const saveAndNext = useCallback(() => {
    saveActive();
    goNext();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(10);
    }
  }, [saveActive, goNext]);

  // Revalidación de cache del sitio público.
  // Solo cuando una tanda de sync termina (pendingSync pasa de >0 a 0).
  useEffect(() => {
    if (pendingSync > 0) {
      hasSyncedRef.current = true;
      return;
    }
    if (!hasSyncedRef.current) return;

    hasSyncedRef.current = false;

    const codes = [targetCode, referenceCode].filter(
      (c): c is string => typeof c === "string",
    );
    if (codes.length === 0) return;

    void revalidateTranslations(codes).catch(() => {});
  }, [pendingSync, targetCode, referenceCode]);

  return {
    schemaId,
    setSchemaId,
    localeId,
    setLocaleId,
    targetLocale,
    referenceLocale,
    targetCode,
    referenceCode,
    keys,
    queue,
    activeKey,
    activeIndex: clampedIndex,
    isLoading,
    loadError,
    query,
    setQuery,
    filter,
    setFilter,
    pending,
    hasPending: pending.size > 0,
    pendingSync,
    syncError,
    handleChange,
    handleDiscardActive,
    saveActive,
    saveAndNext,
    goNext,
    goPrev,
    goTo,
    skip,
  };
}

export type Editor = ReturnType<typeof useTranslationEditor>;
