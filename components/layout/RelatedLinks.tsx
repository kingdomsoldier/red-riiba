"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FiExternalLink } from "react-icons/fi";
import { relatedLinks } from "@/lib/navigation";

export default function RelatedLinks() {
  const t = useTranslations("Footer.links");

  return (
    <ul className="space-y-2">
      {relatedLinks.map((link) => {
        const linkClasses =
          "inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-riiba-orange transition-colors";

        if (link.external) {
          return (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                {t(link.key)}
                <FiExternalLink size={12} className="shrink-0" />
              </a>
            </li>
          );
        }

        return (
          <li key={link.key}>
            <Link href={link.href} className={linkClasses}>
              {t(link.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}