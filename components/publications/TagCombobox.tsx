"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

interface TagComboboxProps {
  allTags: string[];
  value?: string;
  onChange: (tag: string | undefined) => void;
  labels: {
    placeholder: string;
    clear: string;
    noResults: string;
  };
}

export default function TagCombobox({
  allTags,
  value,
  onChange,
  labels,
}: TagComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Tags filtradas por el texto escrito
  const filteredTags = useMemo(() => {
    if (!query.trim()) return allTags;
    const q = query.toLowerCase();
    return allTags.filter((tag) => tag.toLowerCase().includes(q));
  }, [allTags, query]);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll automático hacia la opción resaltada (esto sí es una sincronización con el DOM)
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-option]");
    const active = items[highlightedIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen]);

  function handleSelect(tag: string | undefined) {
    onChange(tag);
    setIsOpen(false);
    setQuery("");
    setHighlightedIndex(0);
  }

  function handleInputFocus() {
    setIsOpen(true);
    setHighlightedIndex(0);
  }

  // Cambio de texto: actualizamos query Y reseteamos el índice de una vez
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setHighlightedIndex(0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setHighlightedIndex((prev) =>
        prev < filteredTags.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && filteredTags[highlightedIndex]) {
        handleSelect(filteredTags[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(undefined);
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(0);
  }

  // Valor mostrado en el input
  const displayValue = isOpen ? query : value ?? "";

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={labels.placeholder}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="tag-listbox"
          aria-autocomplete="list"
          className="w-full pl-4 pr-20 py-3 rounded-xl border border-riiba-green/15 bg-white text-riiba-green-dark placeholder:text-riiba-green-dark/40 focus:outline-none focus:ring-2 focus:ring-riiba-orange focus:border-transparent transition-all cursor-pointer"
        />

        {/* Botón limpiar (solo si hay valor seleccionado) */}
        {value && !isOpen && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={labels.clear}
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-riiba-green-dark/40 hover:text-riiba-orange transition-colors"
          >
            <FiX size={16} />
          </button>
        )}

        {/* Icono chevron */}
        <button
          type="button"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              setQuery("");
            } else {
              inputRef.current?.focus();
            }
          }}
          aria-label={labels.placeholder}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-riiba-green-dark/40 hover:text-riiba-orange transition-colors pointer-events-auto"
        >
          <FiChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul
          ref={listRef}
          id="tag-listbox"
          role="listbox"
          className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto rounded-xl bg-white border border-riiba-green/10 shadow-lg py-1"
        >
          {/* Opción "Todas" para limpiar el filtro */}
          <li>
            <button
              type="button"
              data-option
              onClick={() => handleSelect(undefined)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                !value
                  ? "bg-riiba-orange/10 text-riiba-orange font-semibold"
                  : "text-riiba-green-dark hover:bg-riiba-green-bg"
              }`}
            >
              {labels.placeholder}
            </button>
          </li>

          {filteredTags.length === 0 ? (
            <li className="px-4 py-3 text-sm text-riiba-green-dark/50 italic">
              {labels.noResults}
            </li>
          ) : (
            filteredTags.map((tag, index) => {
              const isSelected = tag === value;
              const isHighlighted = index === highlightedIndex;
              return (
                <li key={tag}>
                  <button
                    type="button"
                    data-option
                    onClick={() => handleSelect(tag)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      isSelected
                        ? "bg-riiba-orange text-white font-semibold"
                        : isHighlighted
                          ? "bg-riiba-orange/10 text-riiba-orange"
                          : "text-riiba-green-dark hover:bg-riiba-green-bg"
                    }`}
                  >
                    {tag}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}