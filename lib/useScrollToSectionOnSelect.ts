import { useCallback, useEffect, useRef, type RefObject } from "react";
import { getSectionNavScrollBehavior, getSideNavElement } from "@/lib/sectionNavScrollBehavior";
import { hasScrolledPastSideNavTop, scrollToSectionContent } from "@/lib/scrollToSectionContent";

type UseScrollToSectionOnSelectOptions = {
  /** Scroll to the `[data-section]` wrapper matching `activeSection`. */
  useDataSection?: boolean;
  /** Skip the "only scroll if past side nav top" guard (for long anchor pages). */
  alwaysScroll?: boolean;
  /** Smooth from page top; instant once the side nav is sticky. */
  adaptiveScroll?: boolean;
  sideNavRef?: RefObject<HTMLElement | null>;
  contentRef?: RefObject<HTMLDivElement | null>;
};

export const useScrollToSectionOnSelect = (
  activeSection: string,
  options: UseScrollToSectionOnSelectOptions = {}
) => {
  const internalContentRef = useRef<HTMLDivElement>(null);
  const contentRef = options.contentRef ?? internalContentRef;
  const shouldScrollOnSectionChange = useRef(false);

  const requestSectionScroll = useCallback(() => {
    shouldScrollOnSectionChange.current = true;
  }, []);

  const cancelSectionScroll = useCallback(() => {
    shouldScrollOnSectionChange.current = false;
  }, []);

  useEffect(() => {
    if (!shouldScrollOnSectionChange.current || !contentRef.current) {
      return;
    }

    shouldScrollOnSectionChange.current = false;

    const sideNavElement = getSideNavElement(options.sideNavRef);

    if (!options.alwaysScroll && !hasScrolledPastSideNavTop(sideNavElement)) {
      return;
    }

    const mobileSideNavOffset =
      window.innerWidth >= 1024 || !sideNavElement ? 0 : sideNavElement.getBoundingClientRect().height;

    const behavior = options.adaptiveScroll
      ? getSectionNavScrollBehavior(sideNavElement)
      : "smooth";

    scrollToSectionContent({
      contentElement: contentRef.current,
      sectionId: options.useDataSection ? activeSection : undefined,
      mobileSideNavOffset,
      behavior,
    });
  }, [activeSection, options.adaptiveScroll, options.alwaysScroll, options.contentRef, options.sideNavRef, options.useDataSection]);

  return { contentRef, requestSectionScroll, cancelSectionScroll };
};
