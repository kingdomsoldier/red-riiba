"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks } from "@/lib/navigation";

interface NavLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

export default function NavLinks({ onLinkClick, className = "" }: NavLinksProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <ul className={`flex items-center gap-6 ${className}`}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.key}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? "text-riiba-orange"
                  : "text-riiba-green-dark hover:text-riiba-orange"
              }`}
            >
              {t(link.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}