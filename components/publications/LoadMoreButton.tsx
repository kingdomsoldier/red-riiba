"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { FiPlusCircle, FiLoader } from "react-icons/fi";

interface LoadMoreButtonProps {
  currentPage: number;
  filters: { tag?: string; q?: string };
  locale: string;
  label: string;
  loadingLabel: string;
  onLoadMore: (data: { items: unknown[]; hasMore: boolean }) => void;
}

export default function LoadMoreButton({
  currentPage,
  filters,
  locale,
  label,
  loadingLabel,
  onLoadMore,
}: LoadMoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const nextPage = currentPage + 1;

  // URL real para el enlace (crawlers la siguen, usuarios con JS son interceptados)
  const params = new URLSearchParams();
  params.set("page", nextPage.toString());
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.q) params.set("q", filters.q);
  const href = `/publications?${params.toString()}`;

  async function handleLoadMore(e: React.MouseEvent) {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const apiParams = new URLSearchParams({
        page: nextPage.toString(),
        limit: "12",
        locale,
      });
      if (filters.tag) apiParams.set("tag", filters.tag);
      if (filters.q) apiParams.set("q", filters.q);

      const res = await fetch(`/api/publications?${apiParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load more");

      const data = await res.json();
      onLoadMore({ items: data.data, hasMore: data.hasMore });
    } catch (error) {
      console.error("Error loading more:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-12">
      <Link
        href={href}
        onClick={handleLoadMore}
        scroll={false}
        className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-riiba-orange border-2 border-riiba-orange hover:bg-riiba-orange hover:text-white transition-all duration-200"
        aria-label={label}
      >
        {isLoading ? (
          <>
            {loadingLabel}
            <FiLoader size={16} className="animate-spin" />
          </>
        ) : (
          <>
            {label}
            <FiPlusCircle size={16} />
          </>
        )}
      </Link>
    </div>
  );
}