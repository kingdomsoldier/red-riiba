"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FiGrid,
  FiGlobe,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import { t } from "@/lib/admin/i18n";
import { adminNavItems } from "@/lib/navigation";

const iconByHref: Record<string, IconType> = {
  "/admin": FiGrid,
  "/admin/locales": FiGlobe,
  "/admin/translations": FiMessageSquare,
  "/admin/settings": FiSettings,
};

interface AdminSidebarProps {
  isOpen: boolean;
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`shrink-0 overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-in-out ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      {/* Ancho fijo interno: evita reflow durante la transición de width */}
      <div className="flex h-full w-64 flex-col">
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/images/red-riiba_logo.png"
              alt="RED RIIBA"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-sm font-bold text-riiba-green-dark">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {adminNavItems.map((item) => {
            const Icon = iconByHref[item.href];
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-riiba-orange/10 text-riiba-orange"
                    : "text-riiba-green-dark/70 hover:bg-gray-100 hover:text-riiba-green-dark"
                }`}
              >
                {Icon && <Icon size={18} />}
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}