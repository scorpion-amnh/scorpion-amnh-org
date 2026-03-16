import type { RefObject } from "react";
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
  return (
    <div className="mb-10" ref={searchContainerRef}>
      <label className="sr-only" htmlFor="people-search">
        Search people
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          id="people-search"
          name="people-search"
          type="search"
          placeholder="Search people"
          value={searchQuery}
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
              setIsSearchOpen(false);
            }
          }}
          aria-autocomplete="list"
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
    </div>
  );
};
