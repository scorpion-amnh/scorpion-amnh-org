import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import type { PeopleIndexItem, SectionTab } from "./usePeopleNavigation";

type PeopleSearchProps = {
  searchContainerRef: RefObject<HTMLDivElement | null>;
  searchQuery: string;
  isSearchOpen: boolean;
  filteredResults: PeopleIndexItem[];
  setSearchQuery: (value: string) => void;
  setIsSearchOpen: (value: boolean) => void;
  onPersonSelect: (id: string, name: string, sectionId: string, tab?: SectionTab) => void;
};

export const PeopleSearch = ({
  searchContainerRef,
  searchQuery,
  isSearchOpen,
  filteredResults,
  setSearchQuery,
  setIsSearchOpen,
  onPersonSelect,
}: PeopleSearchProps) => {
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
      <label className="sr-only" htmlFor="people-search">
        Search people
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
            id="people-search"
            type="text"
            inputMode="search"
            enterKeyHint="search"
            placeholder="Search people"
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
                setSearchQuery("");
                setIsSearchOpen(false);
                event.currentTarget.blur();
              }
            }}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isSearchOpen}
            aria-controls="people-search-results"
            className="w-full rounded-md border border-gray-300 bg-white py-3 pl-11 pr-4 text-base text-gray-900 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          {isSearchOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
              {filteredResults.length > 0 ? (
                <ul
                  id="people-search-results"
                  role="listbox"
                  className="max-h-72 overflow-auto py-2"
                >
                  {filteredResults.map((person) => (
                    <li key={`${person.sectionId}-${person.id}`} role="option" aria-selected={false}>
                      <button
                        type="button"
                        onClick={() => onPersonSelect(person.id, person.name, person.sectionId, person.tab)}
                        className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      >
                        <span className="text-gray-900">{person.name}</span>
                        <span className="ml-4 text-sm text-gray-500">{person.sectionLabel}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">No matches found.</div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
