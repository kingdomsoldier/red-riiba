"use client";

import { useState } from "react";
import PublicationFilters from "./PublicationFilters";
import PublicationList from "./PublicationList";
import LoadMoreButton from "./LoadMoreButton";
import type {
  PublicationPreview,
  PaginatedPublications,
} from "@/lib/types/publication";

interface PublicationsExplorerProps {
  initialData: PaginatedPublications;
  allTags: string[];
  currentTag?: string;
  currentQuery?: string;
  locale: string;
  labels: {
    noImage: string;
    emptyTitle: string;
    emptyMessage: string;
    loadMore: string;
    loading: string;
    searchPlaceholder: string;
    allTags: string;
    clear: string;
    noResults: string;
  };
}

export default function PublicationsExplorer({
  initialData,
  allTags,
  currentTag,
  currentQuery,
  locale,
  labels,
}: PublicationsExplorerProps) {
  const [publications, setPublications] = useState(initialData.data);
  const [page, setPage] = useState(initialData.page);
  const [hasMore, setHasMore] = useState(initialData.hasMore);

  function handleLoadMore({
    items,
    hasMore: moreAvailable,
  }: {
    items: unknown[];
    hasMore: boolean;
  }) {
    const newItems = items as PublicationPreview[];
    setPublications((prev) => {
      const existingSlugs = new Set(prev.map((p) => p.slug));
      const unique = newItems.filter((p) => !existingSlugs.has(p.slug));
      return [...prev, ...unique];
    });
    setPage((prev) => prev + 1);
    setHasMore(moreAvailable);
  }

  return (
    <div className="space-y-10">
      <PublicationFilters
        allTags={allTags}
        currentTag={currentTag}
        currentQuery={currentQuery}
        labels={{
          searchPlaceholder: labels.searchPlaceholder,
          allTags: labels.allTags,
          clear: labels.clear,
          noResults: labels.noResults,
        }}
      />

      <PublicationList
        publications={publications}
        locale={locale}
        noImageLabel={labels.noImage}
        emptyTitle={labels.emptyTitle}
        emptyMessage={labels.emptyMessage}
      />

      {hasMore && (
        <LoadMoreButton
          currentPage={page}
          filters={{ tag: currentTag, q: currentQuery }}
          locale={locale}
          label={labels.loadMore}
          loadingLabel={labels.loading}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}