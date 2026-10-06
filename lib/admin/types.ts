// ─────────────────────────────────────────────
// Locales
// ─────────────────────────────────────────────

export interface AdminLocale {
  id: number;
  codeIso: string;
  nativeName: string;
  englishName: string;
  flag: string | null;
  isDefault: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────

export interface TranslationSchemaSummary {
  id: number;
  namespace: string;
  displayName: string;
  totalKeys: number;
  completionByLocale: Record<string, number>;
}

// ─────────────────────────────────────────────
// Keys y Values
// ─────────────────────────────────────────────

export type TranslationStatus = "PENDING" | "TRANSLATED" | "OUTDATED";

export interface TranslationValueEntry {
  id: number | null;
  value: string | null;
  status: TranslationStatus;
  isAiGenerated: boolean;
}

export interface TranslationKeyEntry {
  id: number;
  key: string;
  values: Record<string, TranslationValueEntry>;
}

export interface TranslationKeysResponse {
  schema: {
    id: number;
    namespace: string;
    displayName: string;
  };
  keys: TranslationKeyEntry[];
}

// ─────────────────────────────────────────────
// Bulk updates
// ─────────────────────────────────────────────

export interface TranslationValueUpdate {
  id: number;
  value: string;
}

export interface BulkUpdateRequest {
  updates: TranslationValueUpdate[];
}

export interface BulkUpdateResponse {
  updated: number;
}