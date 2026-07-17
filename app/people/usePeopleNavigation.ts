import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getHeaderHeight, getScrollGap } from "@/lib/scrollMetrics";
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

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const getEditDistance = (a: string, b: string) => {
  const aLen = a.length;
  const bLen = b.length;
  if (!aLen) return bLen;
  if (!bLen) return aLen;

  const dp = Array.from({ length: aLen + 1 }, () => new Array(bLen + 1).fill(0));
  for (let i = 0; i <= aLen; i += 1) dp[i][0] = i;
  for (let j = 0; j <= bLen; j += 1) dp[0][j] = j;

  for (let i = 1; i <= aLen; i += 1) {
    for (let j = 1; j <= bLen; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[aLen][bLen];
};

const getFuzzyScore = (query: string, name: string) => {
  if (!query) return null;
  if (name.includes(query)) return 0;

  const nameTokens = name.split(/\s+/g).filter(Boolean);
  const tokenDistances = nameTokens.map((token) => getEditDistance(query, token));
  const bestTokenDistance = tokenDistances.length ? Math.min(...tokenDistances) : getEditDistance(query, name);
  const nameDistance = getEditDistance(query, name);
  const bestDistance = Math.min(bestTokenDistance, nameDistance);

  const maxDistance = Math.max(1, Math.floor(query.length * 0.35));
  if (bestDistance <= maxDistance) {
    return bestDistance + 1;
  }

  return null;
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
  const shouldScrollOnSectionChange = useRef(false);
  const pendingPersonScrollId = useRef<string | null>(null);
  const hasRestoredFromUrl = useRef(false);

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

  const getSideNavOffset = useCallback(() => {
    if (window.innerWidth >= 1024) {
      return 0;
    }

    return sideNavRef.current?.getBoundingClientRect().height ?? 0;
  }, []);

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
      shouldScrollOnSectionChange.current = false;

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

      setSectionTabs(() => {
        const nextTabs = applyTabQueryToState(tab);
        syncUrlFromState({ section: sectionId, tabs: nextTabs, hash: null });
        return nextTabs;
      });
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
      shouldScrollOnSectionChange.current = false;
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
      setActiveSection(id);
      shouldScrollOnSectionChange.current = true;

      if (isTabSectionId(id)) {
        setSectionTabs(() => {
          const nextTabs = applyTabQueryToState("current");
          syncUrlFromState({ section: id, tabs: nextTabs, hash: null });
          return nextTabs;
        });
        return;
      }

      setSectionTabs((current) => {
        syncUrlFromState({ section: id, tabs: current, hash: null });
        return current;
      });
    },
    [syncUrlFromState]
  );

  useLayoutEffect(() => {
    if (hasRestoredFromUrl.current) {
      return;
    }

    hasRestoredFromUrl.current = true;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Restore section/tab from the URL before first paint on refresh.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only URL hydration
    applyNavigationFromUrl({ allowPersonScroll: false });
    setIsNavigationReady(true);
    window.scrollTo(0, 0);
  }, [applyNavigationFromUrl]);

  useEffect(() => {
    if (!shouldScrollOnSectionChange.current) {
      return;
    }

    shouldScrollOnSectionChange.current = false;

    if (contentRef.current) {
      const headerHeight = getHeaderHeight();
      const scrollGap = getScrollGap();
      const sideNavOffset = getSideNavOffset();
      const activeSectionElement = contentRef.current.querySelector(
        `[data-section="${activeSection}"]`
      ) as HTMLElement | null;
      const activeHeading = activeSectionElement?.querySelector("h2") ?? null;
      if (window.innerWidth >= 1024) {
        if (activeHeading) {
          const yOffset = activeHeading.getBoundingClientRect().top + window.scrollY - headerHeight - scrollGap;
          window.scrollTo({ top: yOffset, behavior: "smooth" });
          return;
        }

        const yOffset = activeSectionElement
          ? activeSectionElement.getBoundingClientRect().top + window.scrollY - headerHeight - scrollGap
          : contentRef.current.offsetTop - headerHeight - scrollGap;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
        return;
      }

      if (activeHeading) {
        const yOffset = activeHeading.getBoundingClientRect().top + window.scrollY - headerHeight - sideNavOffset;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
        return;
      }

      const yOffset = activeSectionElement
        ? activeSectionElement.getBoundingClientRect().top + window.scrollY - headerHeight - sideNavOffset
        : contentRef.current.offsetTop - headerHeight - sideNavOffset;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  }, [activeSection, getSideNavOffset]);

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
  }, [applyNavigationFromUrl]);

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
