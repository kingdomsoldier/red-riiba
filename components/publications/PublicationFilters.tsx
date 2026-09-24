"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTransition, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import TagCombobox from "./TagCombobox";

interface PublicationFiltersProps {
  allTags: string[];
  currentTag?: string;
  currentQuery?: string;
  labels: {
    searchPlaceholder: string;
    allTags: string;
    clear: string;
    noResults: string;
  };
}

export default function PublicationFilters({
  allTags,
  currentTag,
  currentQuery,
  labels,
}: PublicationFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParams(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(url, { scroll: false });
    });
  }

  function handleSearchChange(value: string) {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      updateParams("q", value.trim() || undefined);
    }, 1000);
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {/* Búsqueda por título */}
      <div className="relative">
        <FiSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-riiba-green-dark/40"
        />
        <input
          type="text"
          defaultValue={currentQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={labels.searchPlaceholder}
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-riiba-green/15 bg-white text-riiba-green-dark placeholder:text-riiba-green-dark/40 focus:outline-none focus:ring-2 focus:ring-riiba-orange focus:border-transparent transition-all"
        />
        {currentQuery && (
          <button
            onClick={() => updateParams("q", undefined)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-riiba-green-dark/40 hover:text-riiba-orange transition-colors"
            aria-label={labels.clear}
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Combobox de etiquetas */}
      <TagCombobox
        allTags={allTags}
        value={currentTag}
        onChange={(tag) => updateParams("tag", tag)}
        labels={{
          placeholder: labels.allTags,
          clear: labels.clear,
          noResults: labels.noResults,
        }}
      />
    </div>
  );
}