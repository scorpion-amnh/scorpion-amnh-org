import type { Person } from "@/lib/content/schema";

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

export const DEFAULT_ACTIVE_SECTION = "principal-investigator";

export const defaultSectionTabs: Record<TabSectionId, SectionTab> = {
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

export const isTabSectionId = (value: string): value is TabSectionId => value in defaultSectionTabs;

export const isSectionTab = (value: string | null): value is SectionTab =>
  value === "current" || value === "alumni";

export const applyTabQueryToState = (tab: SectionTab) =>
  Object.fromEntries(
    Object.keys(defaultSectionTabs).map((sectionId) => [sectionId, tab])
  ) as Record<TabSectionId, SectionTab>;

type PeoplePageUrlOptions = {
  section: string;
  tab: SectionTab;
  hash?: string | null;
};

export const readUrlSearchParams = () => {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
};

export const readNavigationStateFromUrl = (sectionIds: Set<string>) => {
  const params = readUrlSearchParams();
  const sectionParam = params.get("section");
  const tabParam = params.get("tab");

  return {
    activeSection:
      sectionParam && sectionIds.has(sectionParam) ? sectionParam : DEFAULT_ACTIVE_SECTION,
    sectionTabs: isSectionTab(tabParam) ? applyTabQueryToState(tabParam) : defaultSectionTabs,
    hash: typeof window === "undefined" ? "" : window.location.hash.replace("#", ""),
  };
};

export const buildPeoplePageUrl = ({ section, tab, hash = null }: PeoplePageUrlOptions) => {
  const url = new URL(window.location.href);
  url.searchParams.set("section", section);
  url.searchParams.set("tab", tab);

  if (hash) {
    url.hash = hash;
  } else {
    url.hash = "";
  }

  return url;
};

const notifyPeoplePageUrlChange = () => {
  window.dispatchEvent(new Event("people-page-url-change"));
};

export const pushPeoplePageUrl = (options: PeoplePageUrlOptions) => {
  window.history.pushState(null, "", buildPeoplePageUrl(options));
  notifyPeoplePageUrlChange();
};

export const replacePeoplePageUrl = (options: PeoplePageUrlOptions) => {
  window.history.replaceState(null, "", buildPeoplePageUrl(options));
  notifyPeoplePageUrlChange();
};

export const subscribePeoplePageUrl = (onStoreChange: () => void) => {
  const handleChange = () => onStoreChange();

  window.addEventListener("popstate", handleChange);
  window.addEventListener("hashchange", handleChange);
  window.addEventListener("people-page-url-change", handleChange);

  return () => {
    window.removeEventListener("popstate", handleChange);
    window.removeEventListener("hashchange", handleChange);
    window.removeEventListener("people-page-url-change", handleChange);
  };
};

export type PersonHashNavigation = {
  shouldScroll: boolean;
  personId: string | null;
  activeSection: string;
  sectionTabs: Record<TabSectionId, SectionTab>;
};

export const resolvePersonHashNavigation = (
  hash: string,
  sectionIds: Set<string>,
  people: Person[]
): PersonHashNavigation | null => {
  if (!hash) {
    return null;
  }

  if (sectionIds.has(hash)) {
    const tabParam = readUrlSearchParams().get("tab");
    return {
      shouldScroll: false,
      personId: null,
      activeSection: hash,
      sectionTabs: isSectionTab(tabParam) ? applyTabQueryToState(tabParam) : defaultSectionTabs,
    };
  }

  const person = people.find((entry) => entry.id === hash);
  if (person) {
    const tabParam = readUrlSearchParams().get("tab");
    const tab = isSectionTab(tabParam) ? tabParam : person.tab;

    return {
      shouldScroll: !isSectionTab(tabParam) || person.tab === tabParam,
      personId: hash,
      activeSection: person.sectionId,
      sectionTabs: applyTabQueryToState(tab),
    };
  }

  return null;
};
