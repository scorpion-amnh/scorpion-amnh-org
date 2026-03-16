import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PeopleSection } from "./sections";

export type SectionTab = "current" | "alumni";

export type TabSectionId =
  | "museum-specialists"
  | "technical-staff"
  | "research-affiliates"
  | "postdocs"
  | "graduate-students"
  | "undergraduate-students"
  | "high-school-students"
  | "volunteers"
  | "visiting-students";

export type PeopleIndexItem = {
  name: string;
  id: string;
  sectionId: string;
  sectionLabel: string;
  tab?: SectionTab;
};

const defaultSectionTabs: Record<TabSectionId, SectionTab> = {
  "museum-specialists": "current",
  "technical-staff": "current",
  "research-affiliates": "current",
  postdocs: "current",
  "graduate-students": "alumni",
  "undergraduate-students": "alumni",
  "high-school-students": "alumni",
  volunteers: "current",
  "visiting-students": "alumni",
};

const isTabSectionId = (value: string): value is TabSectionId => value in defaultSectionTabs;

const ignoredPersonHeadingLabels = new Set([
  "Contact",
  "CV and Online Profiles",
  "Alumni",
  "Current",
  "Former",
  "Additional Alumni - Condensed",
  "CV",
]);

const toPersonAnchorId = (name: string) => {
  const slug = name
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `person-${slug}`;
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

export const usePeopleNavigation = (sections: PeopleSection[]) => {
  const [activeSection, setActiveSection] = useState("lab-evolution");
  const [sectionTabs, setSectionTabs] = useState<Record<TabSectionId, SectionTab>>(defaultSectionTabs);
  const [peopleIndex, setPeopleIndex] = useState<PeopleIndexItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const shouldScrollOnSectionChange = useRef(false);
  const pendingPersonScrollId = useRef<string | null>(null);

  const sectionLabelMap = useMemo(
    () => Object.fromEntries(sections.map((section) => [section.id, section.label])),
    [sections]
  );

  const sectionIdSet = useMemo(() => new Set(sections.map((section) => section.id)), [sections]);

  const getHeaderHeight = useCallback(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const value = rootStyles.getPropertyValue("--header-height").trim();
    if (value.endsWith("rem")) {
      const rem = parseFloat(value);
      const fontSize = parseFloat(rootStyles.fontSize) || 16;
      return rem * fontSize;
    }
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, []);

  const getScrollGap = useCallback(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const value = rootStyles.getPropertyValue("--section-scroll-gap").trim();
    if (value.endsWith("rem")) {
      const rem = parseFloat(value);
      const fontSize = parseFloat(rootStyles.fontSize) || 16;
      return rem * fontSize;
    }
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }, []);

  const getSideNavOffset = useCallback(() => {
    if (window.innerWidth >= 1024) {
      return 0;
    }

    return sideNavRef.current?.getBoundingClientRect().height ?? 0;
  }, []);

  const setTabForSection = useCallback((sectionId: string, tab?: SectionTab | null) => {
    if (!tab || !isTabSectionId(sectionId)) {
      return;
    }

    setSectionTabs((current) => {
      if (current[sectionId] === tab) {
        return current;
      }

      return {
        ...current,
        [sectionId]: tab,
      };
    });
  }, []);

  const runPendingPersonScroll = useCallback(() => {
    const targetId = pendingPersonScrollId.current;
    if (!targetId) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 12;

    const tryScroll = () => {
      const target = document.getElementById(targetId);
      if (!target || target.offsetParent === null) {
        attempts += 1;
        if (attempts < maxAttempts) {
          requestAnimationFrame(tryScroll);
          return;
        }

        pendingPersonScrollId.current = null;
        return;
      }

      pendingPersonScrollId.current = null;
      const headerHeight = getHeaderHeight();
      const scrollGap = getScrollGap();
      const sideNavOffset = getSideNavOffset();
      const yOffset = target.getBoundingClientRect().top + window.scrollY - headerHeight - scrollGap - sideNavOffset;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    };

    requestAnimationFrame(tryScroll);
  }, [getHeaderHeight, getScrollGap, getSideNavOffset]);

  const buildPeopleIndex = useCallback(() => {
    if (!contentRef.current) {
      setPeopleIndex([]);
      return;
    }

    const headings = Array.from(contentRef.current.querySelectorAll("h3, h4, h5"));
    const seen = new Set<string>();
    const index: PeopleIndexItem[] = [];

    headings.forEach((heading) => {
      const rawName = heading.textContent?.replace(/\s+/g, " ").trim() ?? "";
      const section = heading.closest("[data-section]");
      const sectionId = section?.getAttribute("data-section") ?? "";
      const tab = (heading.closest("[data-tab]") as HTMLElement | null)?.getAttribute("data-tab") as
        | SectionTab
        | null;
      if (!rawName || ignoredPersonHeadingLabels.has(rawName)) {
        return;
      }

      if (!sectionId) {
        return;
      }

      if (rawName.length < 2) {
        return;
      }

      const headingId = heading.id || toPersonAnchorId(rawName);
      if (!heading.id) {
        heading.id = headingId;
      }

      const card = heading.closest(".grid");
      const cardWrapper = (card?.parentElement as HTMLElement | null) ?? null;
      const cardId = cardWrapper?.id ? cardWrapper.id : `${headingId}-card`;
      if (cardWrapper && !cardWrapper.id) {
        cardWrapper.id = cardId;
      }

      heading.setAttribute("data-person-name", rawName);

      const normalizedName = normalizeSearchText(rawName).replace(/\s+/g, " ").trim();
      const key = `${sectionId}:${normalizedName}`;
      if (!seen.has(key)) {
        seen.add(key);
        index.push({
          name: rawName,
          id: cardWrapper ? cardId : headingId,
          sectionId,
          sectionLabel: sectionLabelMap[sectionId] ?? sectionId,
          tab: tab ?? undefined,
        });
      }
    });

    setPeopleIndex(index);
  }, [sectionLabelMap]);

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

  const handlePersonSelect = useCallback((id: string, name: string, sectionId: string, tab?: SectionTab) => {
    setSearchQuery(name);
    setIsSearchOpen(false);
    setTabForSection(sectionId, tab);
    setActiveSection(sectionId);
    shouldScrollOnSectionChange.current = false;
    pendingPersonScrollId.current = id;

    runPendingPersonScroll();

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [runPendingPersonScroll, setTabForSection]);

  const handleSectionSelect = useCallback((id: string) => {
    setActiveSection(id);
    shouldScrollOnSectionChange.current = true;

    if (isTabSectionId(id)) {
      setSectionTabs((current) => {
        if (current[id] === "current") {
          return current;
        }

        return {
          ...current,
          [id]: "current",
        };
      });
    }
  }, []);

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
  }, [activeSection, getHeaderHeight, getScrollGap, getSideNavOffset]);

  useEffect(() => {
    runPendingPersonScroll();
  }, [activeSection, sectionTabs, runPendingPersonScroll]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      buildPeopleIndex();
    });

    return () => cancelAnimationFrame(frame);
  }, [activeSection, sectionTabs, buildPeopleIndex]);

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
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        return;
      }

      if (sectionIdSet.has(hash)) {
        pendingPersonScrollId.current = null;
        shouldScrollOnSectionChange.current = true;
        setActiveSection(hash);
        return;
      }

      const target = document.getElementById(hash);
      if (!target) {
        return;
      }

      const sectionElement = target.closest("[data-section]") as HTMLElement | null;
      const sectionId = sectionElement?.getAttribute("data-section");
      if (!sectionId || !sectionIdSet.has(sectionId)) {
        return;
      }

      const tab = (target.closest("[data-tab]") as HTMLElement | null)?.getAttribute("data-tab") as SectionTab | null;
      setTabForSection(sectionId, tab);
      setActiveSection(sectionId);
      shouldScrollOnSectionChange.current = false;
      pendingPersonScrollId.current = hash;
      requestAnimationFrame(() => {
        runPendingPersonScroll();
      });
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [sectionIdSet, setTabForSection, runPendingPersonScroll]);

  return {
    activeSection,
    contentRef,
    filteredResults,
    handlePersonSelect,
    handleSectionSelect,
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
