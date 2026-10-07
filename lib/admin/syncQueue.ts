import { adminFetch } from "./api-client";
import type { BulkUpdateResponse } from "./types";

export interface SyncItem {
  keyId: number;
  valueId: number | null;
  localeId: number;
  value: string;
  attempts: number;
}

const STORAGE_KEY = "riiba:translations:sync-queue";
const MAX_ATTEMPTS = 5;
const BATCH_SIZE = 20;

type Listener = (pendingCount: number, lastError: string | null) => void;

class SyncQueue {
  private items: SyncItem[] = [];
  private listeners = new Set<Listener>();
  private flushing = false;

  constructor() {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.items = JSON.parse(raw) as SyncItem[];
    } catch {
      /* ignore */
    }
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    fn(this.items.length, null);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify(lastError: string | null = null) {
    this.persist();
    for (const fn of this.listeners) fn(this.items.length, lastError);
  }

  private persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch {
      /* ignore */
    }
  }

  enqueue(item: Omit<SyncItem, "attempts">) {
    this.items = this.items.filter(
      (i) => !(i.keyId === item.keyId && i.localeId === item.localeId),
    );
    this.items.push({ ...item, attempts: 0 });
    this.notify();
    void this.flush();
  }

  async flush() {
    if (this.flushing || this.items.length === 0) return;
    this.flushing = true;

    try {
      while (this.items.length > 0) {
        const batch = this.items.slice(0, BATCH_SIZE);
        try {
          await adminFetch<BulkUpdateResponse>("/admin/translation-values/bulk", {
            method: "PATCH",
            body: JSON.stringify({
              updates: batch.map((i) => ({ id: i.valueId, value: i.value })),
            }),
          });

          const sent = new Set(batch.map((i) => `${i.keyId}:${i.localeId}`));
          this.items = this.items.filter((i) => !sent.has(`${i.keyId}:${i.localeId}`));
          this.notify();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Sync error";
          for (const i of batch) {
            const found = this.items.find(
              (x) => x.keyId === i.keyId && x.localeId === i.localeId,
            );
            if (found) found.attempts += 1;
          }
          this.items = this.items.filter((i) => i.attempts < MAX_ATTEMPTS);
          this.notify(message);

          const delay = Math.min(2 ** (batch[0]?.attempts ?? 0) * 500, 8000);
          await new Promise((r) => setTimeout(r, delay));
        }
      }
    } finally {
      this.flushing = false;
    }
  }

  clear() {
    this.items = [];
    this.notify();
  }
}

export const syncQueue = new SyncQueue();