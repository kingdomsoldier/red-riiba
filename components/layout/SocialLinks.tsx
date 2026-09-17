"use client";

import { useTranslations } from "next-intl";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { socialLinks } from "@/lib/navigation";

const iconMap = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaTwitter,
};

export default function SocialLinks() {
  const t = useTranslations("Social");

  return (
    <ul className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const Icon = iconMap[social.key as keyof typeof iconMap];
        const networkName = t(social.key);
        return (
          <li key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ariaLabel", { network: networkName })}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-riiba-orange transition-colors"
            >
              <Icon size={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}