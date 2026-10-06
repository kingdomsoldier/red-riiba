import { FiSearch, FiX } from "react-icons/fi";
import { t } from "@/lib/admin/i18n";

interface TranslationSearchBarProps {
  query: string;
  onChange: (value: string) => void;
  matchCount: number;
  totalCount: number;
  isFiltering: boolean;
}

export default function TranslationSearchBar({
  query,
  onChange,
  matchCount,
  totalCount,
  isFiltering,
}: TranslationSearchBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full max-w-md">
        {/* Icono: wrapper a altura completa + flex-center */}
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch size={16} className="text-riiba-green-dark/40" />
        </span>

        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("translations.searchPlaceholder")}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-9 text-sm text-riiba-green-dark transition-colors placeholder:text-riiba-green-dark/40 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-riiba-orange"
        />

        {isFiltering && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={t("translations.searchClear")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-riiba-green-dark/40 transition-colors hover:text-riiba-orange"
          >
            <FiX size={14} />
          </button>
        )}
      </div>

      {isFiltering && (
        <span className="shrink-0 text-xs font-medium text-riiba-green-dark/60">
          {matchCount} / {totalCount}
        </span>
      )}
    </div>
  );
}