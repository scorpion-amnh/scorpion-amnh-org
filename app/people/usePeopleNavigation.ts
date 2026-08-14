import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_ACTIVE_SECTION,
  applyTabQueryToState,
  defaultSectionTabs,
  isTabSectionId,
  pushPeoplePageUrl,
  readNavigationStateFromUrl,
  replacePeoplePageUrl,
  resolvePersonHashNavigation,
  type SectionTab,
  type TabSectionId,
} from "@/lib/people/peoplePageUrl";
import { scrollToPersonAnchorWhenReady } from "@/lib/people/scrollToPersonAnchor";
import { syncPersonAnchorIds } from "@/lib/people/syncPersonAnchorIds";
import { useScrollToSectionOnSelect } from "@/lib/useScrollToSectionOnSelect";
import { getFuzzyScore, normalizeSearchText } from "@/lib/search/fuzzyMatch";
import type { Person } from "@/lib/content/schema";
import type { PeopleSection } from "./sections";

export type { SectionTab, TabSectionId };

export type PeopleIndexItem = {
  name: string;
  id: string;
  sectionId: string;
  sectionLabel: string;
  tab?: SectionTab;
};

export const usePeopleNavigation = (sections: PeopleSection[], people: Person[]) => {
  const sectionIdSet = useMemo(() => new Set(sections.map((section) => section.id)), [sections]);

  const [activeSection, setActiveSection] = useState(DEFAULT_ACTIVE_SECTION);
  const [sectionTabs, setSectionTabs] = useState<Record<TabSectionId, SectionTab>>(defaultSectionTabs);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const pendingPersonScrollId = useRef<string | null>(null);
  const hasRestoredFromUrl = useRef(false);
  const sectionTabsRef = useRef(sectionTabs);
  const { requestSectionScroll, cancelSectionScroll } = useScrollToSectionOnSelect(activeSection, {
    contentRef,
    useDataSection: true,
    sideNavRef,
  });

  useEffect(() => {
    sectionTabsRef.current = sectionTabs;
  }, [sectionTabs]);

  const sectionLabelMap = useMemo(
    () => Object.fromEntries(sections.map((section) => [section.id, section.label])),
    [sections]
  );

  const peopleIndex = useMemo<PeopleIndexItem[]>(
    () =>
      people.map((person) => ({
        name: person.name,
        id: person.id,
        sectionId: person.sectionId,
        sectionLabel: sectionLabelMap[person.sectionId] ?? person.sectionId,
        tab: person.tab,
      })),
    [people, sectionLabelMap]
  );

  const getGlobalTab = useCallback(
    (tabs: Record<TabSectionId, SectionTab>): SectionTab => tabs["graduate-students"] ?? "current",
    []
  );

  const syncUrlFromState = useCallback(
    (options: {
      section: string;
      tabs: Record<TabSectionId, SectionTab>;
      hash?: string | null;
      history?: "push" | "replace";
    }) => {
      if (typeof window === "undefined") {
        return;
      }

      const urlOptions = {
        section: options.section,
        tab: getGlobalTab(options.tabs),
        hash: options.hash ?? null,
      };

      if (options.history === "replace") {
        replacePeoplePageUrl(urlOptions);
      } else {
        pushPeoplePageUrl(urlOptions);
      }
    },
    [getGlobalTab]
  );

  const applyNavigationFromUrl = useCallback(
    (options: { allowPersonScroll: boolean }) => {
      const { activeSection: sectionFromUrl, sectionTabs: tabsFromUrl, hash } = readNavigationStateFromUrl(
        sectionIdSet
      );

      setActiveSection(sectionFromUrl);
      setSectionTabs(tabsFromUrl);
      pendingPersonScrollId.current = null;

      const hashNavigation = resolvePersonHashNavigation(hash, sectionIdSet, people);
      if (!hashNavigation) {
        return;
      }

      setActiveSection(hashNavigation.activeSection);
      setSectionTabs(hashNavigation.sectionTabs);

      if (hashNavigation.shouldScroll && options.allowPersonScroll && hashNavigation.personId) {
        pendingPersonScrollId.current = hashNavigation.personId;
      }
    },
    [people, sectionIdSet]
  );

  const setTabForSection = useCallback(
    (sectionId: string, tab?: SectionTab | null) => {
      if (!tab || !isTabSectionId(sectionId)) {
        return;
      }

      const nextTabs = applyTabQueryToState(tab);
      setSectionTabs(nextTabs);
      syncUrlFromState({ section: sectionId, tabs: nextTabs, hash: null });
    },
    [syncUrlFromState]
  );

  const queuePersonScroll = useCallback((targetId: string) => {
    pendingPersonScrollId.current = targetId;
  }, []);

  const runPendingPersonScroll = useCallback(() => {
    const targetId = pendingPersonScrollId.current;
    if (!targetId) {
      return;
    }

    pendingPersonScrollId.current = null;

    if (contentRef.current) {
      syncPersonAnchorIds(contentRef.current, people);
    }

    scrollToPersonAnchorWhenReady(targetId, sideNavRef.current, { smooth: false });
  }, [people]);

  const filteredResults = useMemo(() => {
    const query = normalizeSearchText(searchQuery.trim());
    if (!query) {
      return [] as PeopleIndexItem[];
    }

    return peopleIndex
      .map((person) => {
        const normalizedName = normalizeSearchText(person.name);
        const score = getFuzzyScore(query, normalizedName);
        return score === null ? null : { person, score };
      })
      .filter((item): item is { person: PeopleIndexItem; score: number } => item !== null)
      .sort((a, b) => a.score - b.score || a.person.name.localeCompare(b.person.name))
      .map((item) => item.person)
      .slice(0, 12);
  }, [peopleIndex, searchQuery]);

  const handlePersonSelect = useCallback(
    (id: string, name: string, sectionId: string, tab?: SectionTab) => {
      const resolvedTab = tab ?? defaultSectionTabs[sectionId as TabSectionId] ?? "current";
      const nextTabs = applyTabQueryToState(resolvedTab);

      setSearchQuery(name);
      setIsSearchOpen(false);
      setSectionTabs(nextTabs);
      setActiveSection(sectionId);
      queuePersonScroll(id);

      syncUrlFromState({
        section: sectionId,
        tabs: nextTabs,
        hash: id,
        history: "replace",
      });
    },
    [queuePersonScroll, syncUrlFromState]
  );

  const handleSectionSelect = useCallback(
    (id: string) => {
      requestSectionScroll();
      setActiveSection(id);

      const nextTabs = isTabSectionId(id)
        ? applyTabQueryToState("current")
        : sectionTabsRef.current;

      if (isTabSectionId(id)) {
        setSectionTabs(nextTabs);
      }

      syncUrlFromState({ section: id, tabs: nextTabs, hash: null });
    },
    [requestSectionScroll, syncUrlFromState]
  );

  useLayoutEffect(() => {
    if (hasRestoredFromUrl.current) {
      return;
    }

    hasRestoredFromUrl.current = true;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const navigationState = readNavigationStateFromUrl(sectionIdSet);
    const personHashNavigation = resolvePersonHashNavigation(navigationState.hash, sectionIdSet, people);
    const shouldScrollToPerson = Boolean(
      personHashNavigation?.shouldScroll && personHashNavigation.personId
    );

    // Restore section/tab from the URL before first paint on refresh.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only URL hydration
    applyNavigationFromUrl({ allowPersonScroll: shouldScrollToPerson });
    setIsNavigationReady(true);

    if (!shouldScrollToPerson) {
      window.scrollTo(0, 0);
    }
  }, [applyNavigationFromUrl, people, sectionIdSet]);

  useLayoutEffect(() => {
    if (!isNavigationReady || !pendingPersonScrollId.current) {
      return;
    }

    runPendingPersonScroll();
  }, [activeSection, sectionTabs, isNavigationReady, runPendingPersonScroll]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (contentRef.current) {
        syncPersonAnchorIds(contentRef.current, people);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [activeSection, sectionTabs, people]);

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

  useEffect(() => {
    const handlePopState = () => {
      cancelSectionScroll();
      applyNavigationFromUrl({ allowPersonScroll: false });
    };

    const handleHashChange = () => {
      applyNavigationFromUrl({ allowPersonScroll: true });
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [applyNavigationFromUrl, cancelSectionScroll]);

  return {
    activeSection,
    contentRef,
    filteredResults,
    handlePersonSelect,
    handleSectionSelect,
    isNavigationReady,
    isSearchOpen,
    searchContainerRef,
    searchQuery,
    sectionTabs,
    setIsSearchOpen,
    setSearchQuery,
    setTabForSection,
    sideNavRef,
  };
};
