"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FiGlobe, FiCheck } from "react-icons/fi";
import { routing } from "@/i18n/routing";

const languageNames: Record<string, string> = {
  es: "Español",
  en: "English",
};

interface LanguageSwitcherProps {
  onSelect?: () => void;
  variant?: "default" | "light";
}

export default function LanguageSwitcher({
  onSelect,
  variant = "default",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newLocale: string) => {
    setIsOpen(false);
    onSelect?.();
    router.replace(pathname, { locale: newLocale });
  };

  const textColor =
    variant === "light"
      ? "text-white/80 hover:text-white"
      : "text-riiba-green-dark hover:text-riiba-orange";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("changeLanguage")}
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 p-2 text-sm font-medium uppercase transition-colors ${textColor}`}
      >
        <FiGlobe size={18} />
        <span>{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {routing.locales.map((loc) => {
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => handleSelect(loc)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left transition-colors hover:bg-riiba-green-bg ${
                  isActive
                    ? "text-riiba-orange font-semibold"
                    : "text-riiba-green-dark"
                }`}
              >
                <span>{languageNames[loc] ?? loc.toUpperCase()}</span>
                {isActive && <FiCheck size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}