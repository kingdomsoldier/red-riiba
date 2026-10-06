"use client";

import type {
  AdminLocale,
  TranslationSchemaSummary,
} from "@/lib/admin/types";
import { t } from "@/lib/admin/i18n";
import { useTranslationEditor } from "@/lib/admin/hooks/useTranslationEditor";
import SchemaSelector from "./SchemaSelector";
import LocaleSelector from "./LocaleSelector";
import TranslationSearchBar from "./TranslationSearchBar";
import TranslationTable from "./TranslationTable";
import TranslationSaveBar from "./TranslationSaveBar";
import TranslationToasts from "./TranslationToasts";

interface TranslationEditorProps {
  schemas: TranslationSchemaSummary[];
  locales: AdminLocale[];
}

export default function TranslationEditor({
  schemas,
  locales,
}: TranslationEditorProps) {
  const editor = useTranslationEditor(schemas, locales);

  const showEmptyState =
    !editor.isLoading && !editor.loadError && editor.keys.length === 0;

  const showNoMatches =
    !editor.isLoading &&
    !editor.loadError &&
    editor.keys.length > 0 &&
    editor.isFiltering &&
    editor.filteredKeys.length === 0;

  const showTable =
    !editor.isLoading &&
    !editor.loadError &&
    editor.filteredKeys.length > 0 &&
    editor.targetLocale &&
    editor.referenceLocale;

  return (
    <div className="space-y-6 pb-28">
      {/* Selectores */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SchemaSelector
          schemas={schemas}
          value={editor.schemaId}
          onChange={editor.setSchemaId}
        />
        <LocaleSelector
          locales={locales}
          value={editor.localeId}
          onChange={editor.setLocaleId}
        />
      </div>

      {/* Loading */}
      {editor.isLoading && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-sm text-riiba-green-dark/60">
          {t("translations.loading")}
        </div>
      )}

      {/* Error */}
      {!editor.isLoading && editor.loadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">{t("translations.loadError")}</p>
          <p>{editor.loadError}</p>
        </div>
      )}

      {/* Sin claves */}
      {showEmptyState && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-riiba-green-dark/60">
          {t("translations.noKeys")}
        </div>
      )}

      {/* Búsqueda + tabla */}
      {!editor.isLoading && !editor.loadError && editor.keys.length > 0 && (
        <>
          <TranslationSearchBar
            query={editor.query}
            onChange={editor.setQuery}
            matchCount={editor.filteredKeys.length}
            totalCount={editor.keys.length}
            isFiltering={editor.isFiltering}
          />

          {showNoMatches && (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-riiba-green-dark/60">
              {t("translations.noMatches")}
            </div>
          )}

          {showTable && (
            <TranslationTable
              entries={editor.filteredKeys}
              referenceCode={editor.referenceLocale!.codeIso}
              targetCode={editor.targetLocale!.codeIso}
              pending={editor.pending}
              onChange={editor.handleChange}
            />
          )}
        </>
      )}

      {/* Barra sticky */}
      {editor.hasPending && (
        <TranslationSaveBar
          pendingCount={editor.pending.size}
          saveStatus={editor.saveStatus}
          onSave={editor.handleSave}
          onDiscard={editor.handleDiscard}
        />
      )}

      {/* Toasts */}
      <TranslationToasts
        saveStatus={editor.saveStatus}
        saveError={editor.saveError}
        hasPending={editor.hasPending}
      />
    </div>
  );
}