import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import { formatInlineEmphasis } from "@/app/components/InlineEmphasis";
import type { PublicationIndexItem } from "./usePublicationsSearch";

type PublicationsSearchProps = {
  searchContainerRef: RefObject<HTMLDivElement | null>;
  searchQuery: string;
  isSearchOpen: boolean;
  filteredResults: PublicationIndexItem[];
  setSearchQuery: (value: string) => void;
  setIsSearchOpen: (value: boolean) => void;
  onPublicationSelect: (item: PublicationIndexItem) => void;
};

export const PublicationsSearch = ({
  searchContainerRef,
  searchQuery,
  isSearchOpen,
  filteredResults,
  setSearchQuery,
  setIsSearchOpen,
  onPublicationSelect,
}: PublicationsSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/") {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const tagName = target.tagName;
      if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || target.isContentEditable) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mb-10" ref={searchContainerRef}>
      <label className="sr-only" htmlFor="publications-search">
        Search publications
      </label>
      <form
        autoComplete="off"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            id="publications-search"
            type="text"
            inputMode="search"
            enterKeyHint="search"
            placeholder="Search publications"
            value={searchQuery}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(event) => {
              const nextValue = event.target.value;
              setSearchQuery(nextValue);
              setIsSearchOpen(Boolean(nextValue.trim()));
            }}
            onFocus={() => {
              if (searchQuery.trim()) {
                setIsSearchOpen(true);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.stopPropagation();
                setSearchQuery("");
                setIsSearchOpen(false);
                event.currentTarget.blur();
              }
            }}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isSearchOpen}
            aria-controls="publications-search-results"
            className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-4 text-base shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          {isSearchOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
              {filteredResults.length > 0 ? (
                <ul
                  id="publications-search-results"
                  role="listbox"
                  className="max-h-72 overflow-auto py-2"
                >
                  {filteredResults.map((publication) => (
                    <li key={publication.id} role="option" aria-selected={false}>
                      <button
                        type="button"
                        onClick={() => onPublicationSelect(publication)}
                        className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        <span>{formatInlineEmphasis(publication.title)}</span>
                        {publication.journal ? (
                          <span className="ml-4 text-meta">{publication.journal}</span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-meta">No matches found.</div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
