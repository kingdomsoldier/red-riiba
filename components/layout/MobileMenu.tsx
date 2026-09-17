"use client";

import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useTranslations } from "next-intl";
import NavLinks from "./NavLinks";
import Button from "@/components/ui/Button";

export default function MobileMenu() {
  const t = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-riiba-green-dark hover:text-riiba-orange transition-colors"
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isOpen}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-6 px-6">
          <NavLinks
            className="flex-col items-start gap-4"
            onLinkClick={() => setIsOpen(false)}
          />

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
            <Button href="/unete" className="flex-1">
              {t("join")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}