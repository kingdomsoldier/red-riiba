"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

  const [schemaId, setSchemaId] = useState<number | null>(schemas[0]?.id ?? null);
  const [localeId, setLocaleId] = useState<number | null>(firstEditable?.id ?? null);

  const [keys, setKeys] = useState<TranslationKeyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("PENDING");
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
        const q = `?locales=${referenceCode},${targetCode}`;
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

  const activeKey = queue[activeIndex] ?? null;

  useEffect(() => {
    if (activeIndex >= queue.length) {
      setActiveIndex(Math.max(0, queue.length - 1));
    }
  }, [queue.length, activeIndex]);

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
    setActiveIndex((i) => Math.min(i + 1, Math.max(0, queue.length - 1)));
  }, [queue.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const skip = useCallback(() => {
    if (queue.length === 0) return;
    setActiveIndex((i) => (i < queue.length - 1 ? i + 1 : 0));
  }, [queue.length]);

  const saveActive = useCallback(() => {
    if (!activeKey || !targetCode || !localeId) return;
    const entry = pending.get(activeKey.id);
    if (!entry) return;

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

  // Autoguardado a 3s
  useEffect(() => {
    if (!activeKey) return;
    if (!pending.has(activeKey.id)) return;
    const timer = setTimeout(() => saveActive(), 3000);
    return () => clearTimeout(timer);
  }, [pending, activeKey, saveActive]);

  // Revalidación de cache del sitio público
  useEffect(() => {
    if (pendingSync > 0) return;
    const codes = [targetCode, referenceCode].filter(
      (c): c is string => typeof c === "string",
    );
    if (codes.length === 0) return;
    void revalidateTranslations(codes).catch(() => {});
  }, [pendingSync, targetCode, referenceCode]);

  return {
    schemaId, setSchemaId,
    localeId, setLocaleId,
    targetLocale, referenceLocale, targetCode, referenceCode,
    keys, queue, activeKey, activeIndex,
    isLoading, loadError,
    query, setQuery,
    filter, setFilter,
    pending, hasPending: pending.size > 0,
    pendingSync, syncError,
    handleChange, handleDiscardActive,
    saveActive, saveAndNext,
    goNext, goPrev, goTo, skip,
  };
}