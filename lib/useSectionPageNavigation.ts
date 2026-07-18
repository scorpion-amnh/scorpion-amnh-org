import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { getSectionNavScrollBehavior, getSideNavElement } from "@/lib/sectionNavScrollBehavior";
import { useScrollToSectionOnSelect } from "@/lib/useScrollToSectionOnSelect";
import { useSectionScrollSpy } from "@/lib/useSectionScrollSpy";

type UseSectionPageNavigationOptions<T extends string> = {
  sectionIds: readonly T[];
  defaultSection: T;
  isSectionId: (value: string) => value is T;
  readSectionFromUrl: () => T;
  pushSectionToUrl: (section: T) => void;
  sideNavRef?: RefObject<HTMLElement | null>;
};

export const useSectionPageNavigation = <T extends string>({
  sectionIds,
  defaultSection,
  isSectionId,
  readSectionFromUrl,
  pushSectionToUrl,
  sideNavRef,
}: UseSectionPageNavigationOptions<T>) => {
  const [activeSection, setActiveSection] = useState<T>(defaultSection);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const hasRestoredFromUrl = useRef(false);
  const pendingInitialScroll = useRef(false);
  const { contentRef, requestSectionScroll, cancelSectionScroll } = useScrollToSectionOnSelect(
    activeSection,
    { useDataSection: true, alwaysScroll: true, adaptiveScroll: true, sideNavRef }
  );

  const handleScrollSpySectionChange = useCallback(
    (sectionId: string) => {
      if (!isSectionId(sectionId)) {
        return;
      }

      setActiveSection(sectionId);
    },
    [isSectionId]
  );

  const { pauseScrollSpy, pauseScrollSpyUntilScrollSettles } = useSectionScrollSpy({
    sectionIds,
    contentRef,
    onActiveSectionChange: handleScrollSpySectionChange,
    sideNavRef,
    enabled: isNavigationReady,
  });

  const pauseScrollSpyForNav = useCallback(() => {
    const behavior = getSectionNavScrollBehavior(getSideNavElement(sideNavRef));
    if (behavior === "smooth") {
      pauseScrollSpyUntilScrollSettles();
      return;
    }

    pauseScrollSpy(150);
  }, [pauseScrollSpy, pauseScrollSpyUntilScrollSettles, sideNavRef]);

  const handleSectionSelect = useCallback(
    (sectionId: string) => {
      if (!isSectionId(sectionId)) {
        return;
      }

      pauseScrollSpyForNav();
      setActiveSection(sectionId);
      requestSectionScroll();
      pushSectionToUrl(sectionId);
    },
    [isSectionId, pauseScrollSpyForNav, pushSectionToUrl, requestSectionScroll]
  );

  useLayoutEffect(() => {
    if (hasRestoredFromUrl.current) {
      return;
    }

    hasRestoredFromUrl.current = true;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const sectionFromUrl = readSectionFromUrl();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only URL hydration
    setActiveSection(sectionFromUrl);
    pendingInitialScroll.current = window.location.search.includes("section=");
    setIsNavigationReady(true);
    window.scrollTo(0, 0);
  }, [readSectionFromUrl]);

  useLayoutEffect(() => {
    if (!isNavigationReady || !pendingInitialScroll.current || !contentRef.current) {
      return;
    }

    pendingInitialScroll.current = false;
    pauseScrollSpyForNav();
    requestSectionScroll();
  }, [contentRef, isNavigationReady, pauseScrollSpyForNav, requestSectionScroll]);

  useEffect(() => {
    const handlePopState = () => {
      cancelSectionScroll();
      pauseScrollSpyForNav();
      setActiveSection(readSectionFromUrl());
      requestSectionScroll();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [cancelSectionScroll, pauseScrollSpyForNav, readSectionFromUrl, requestSectionScroll]);

  return {
    activeSection,
    contentRef,
    handleSectionSelect,
    isNavigationReady,
  };
};
