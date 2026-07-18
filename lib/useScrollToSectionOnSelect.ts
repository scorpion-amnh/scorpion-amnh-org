import { useCallback, useEffect, useRef, type RefObject } from "react";
import { hasScrolledPastSideNavTop, scrollToSectionContent } from "@/lib/scrollToSectionContent";

type UseScrollToSectionOnSelectOptions = {
  /** Scroll to the `[data-section]` wrapper matching `activeSection`. */
  useDataSection?: boolean;
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

    const sideNavFromDom = document.querySelector(".side-nav");
    const sideNavElement =
      options.sideNavRef?.current ?? (sideNavFromDom instanceof HTMLElement ? sideNavFromDom : null);

    if (!hasScrolledPastSideNavTop(sideNavElement)) {
      return;
    }

    const mobileSideNavOffset =
      window.innerWidth >= 1024 || !(sideNavElement instanceof HTMLElement)
        ? 0
        : sideNavElement.getBoundingClientRect().height;

    scrollToSectionContent({
      contentElement: contentRef.current,
      sectionId: options.useDataSection ? activeSection : undefined,
      mobileSideNavOffset,
    });
  }, [activeSection, options.contentRef, options.sideNavRef, options.useDataSection]);

  return { contentRef, requestSectionScroll, cancelSectionScroll };
};
