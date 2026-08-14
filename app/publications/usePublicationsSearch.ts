import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMultiWordFuzzyScore, normalizeSearchText } from "@/lib/search/fuzzyMatch";

export type PublicationIndexItem = {
  id: string;
  title: string;
  journal: string;
  year: number;
  /** Combined, normalized text (authors, title, journal, volume, pages, year, DOI) used for matching. */
  searchText: string;
};

export const usePublicationsSearch = (publicationIndex: PublicationIndexItem[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const filteredResults = useMemo(() => {
    const query = normalizeSearchText(searchQuery.trim());
    if (!query) {
      return [] as PublicationIndexItem[];
    }

    return publicationIndex
      .map((item) => {
        const score = getMultiWordFuzzyScore(query, item.searchText);
        return score === null ? null : { item, score };
      })
      .filter((entry): entry is { item: PublicationIndexItem; score: number } => entry !== null)
      .sort((a, b) => a.score - b.score || a.item.title.localeCompare(b.item.title))
      .map((entry) => entry.item)
      .slice(0, 12);
  }, [publicationIndex, searchQuery]);

  const handlePublicationSelect = useCallback((item: PublicationIndexItem) => {
    setIsSearchOpen(false);

    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchContainerRef.current) {
        return;
      }

      if (!searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    searchContainerRef,
    searchQuery,
    isSearchOpen,
    filteredResults,
    setSearchQuery,
    setIsSearchOpen,
    handlePublicationSelect,
  };
};
