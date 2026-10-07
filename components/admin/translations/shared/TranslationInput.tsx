"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface TranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  autoFocus?: boolean;
}

const SINGLE_LINE_MAX = 60;

export default function TranslationInput({
  value,
  onChange,
  disabled,
  placeholder,
  maxLength,
  multiline = false,
  autoFocus = false,
}: TranslationInputProps) {
  const [expanded, setExpanded] = useState(multiline || value.length > SINGLE_LINE_MAX);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [value, expanded]);

  useEffect(() => {
    if (!autoFocus) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) return;
    (expanded ? textareaRef : inputRef).current?.focus();
  }, [autoFocus, expanded]);

  const base =
    "w-full rounded-xl border bg-white text-riiba-green-dark placeholder:text-riiba-green-dark/40 transition-colors focus:outline-none focus:ring-2 focus:ring-riiba-orange focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-riiba-green-dark/40";

  if (expanded) {
    return (
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={3}
          className={`${base} block resize-none overflow-hidden border-gray-200 px-4 py-3 text-base leading-relaxed`}
        />
        {!multiline && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Contraer"
            className="absolute right-2 top-2 rounded-md p-1.5 text-riiba-green-dark/40 hover:bg-gray-100 hover:text-riiba-orange"
          >
            <FiChevronUp size={14} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${base} border-gray-200 py-3 pl-4 pr-10 text-base`}
      />
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label="Expandir"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-riiba-green-dark/40 hover:bg-gray-100 hover:text-riiba-orange"
      >
        <FiChevronDown size={14} />
      </button>
    </div>
  );
}