"use client";

import { FiMenu } from "react-icons/fi";
import { t } from "@/lib/admin/i18n";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={t("sidebar.toggle")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-riiba-green-dark/70 transition-colors hover:bg-gray-100 hover:text-riiba-green-dark"
        >
          <FiMenu size={20} />
        </button>

        <span className="text-sm text-riiba-green-dark/60">
          {t("header.adminPanel")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-riiba-green-dark">
          {t("header.user")}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-riiba-orange/10 text-sm font-semibold text-riiba-orange">
          A
        </div>
      </div>
    </header>
  );
}