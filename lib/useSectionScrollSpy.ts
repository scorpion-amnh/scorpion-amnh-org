import { useCallback, useEffect, useRef, type RefObject } from "react";
import { getHeaderHeight, getScrollGap } from "@/lib/scrollMetrics";

type UseSectionScrollSpyOptions = {
  sectionIds: readonly string[];
  contentRef: RefObject<HTMLElement | null>;
  onActiveSectionChange: (sectionId: string) => void;
  sideNavRef?: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

const getSideNavElement = (sideNavRef?: RefObject<HTMLElement | null>) => {
  if (sideNavRef?.current) {
    return sideNavRef.current;
  }

  const sideNavFromDom = document.querySelector(".side-nav");
  return sideNavFromDom instanceof HTMLElement ? sideNavFromDom : null;
};

export const useSectionScrollSpy = ({
  sectionIds,
  contentRef,
  onActiveSectionChange,
  sideNavRef,
  enabled = true,
}: UseSectionScrollSpyOptions) => {
  const suppressScrollSpy = useRef(true);
  const resumeTimeout = useRef<number | null>(null);

  const getScrollOffset = useCallback(() => {
    const headerHeight = getHeaderHeight();
    const scrollGap = getScrollGap();
    const sideNavElement = getSideNavElement(sideNavRef);

    const mobileSideNavOffset =
      window.innerWidth >= 1024 || !sideNavElement ? 0 : sideNavElement.getBoundingClientRect().height;

    return headerHeight + scrollGap + mobileSideNavOffset;
  }, [sideNavRef]);

  const getActiveSectionFromScroll = useCallback(() => {
    if (!contentRef.current || sectionIds.length === 0) {
      return sectionIds[0] ?? null;
    }

    const offset = getScrollOffset();
    let activeSection = sectionIds[0];

    for (const sectionId of sectionIds) {
      const sectionElement = contentRef.current.querySelector(`[data-section="${sectionId}"]`);
      if (!(sectionElement instanceof HTMLElement)) {
        continue;
      }

      const heading = sectionElement.querySelector("h2") ?? sectionElement;
      if (heading.getBoundingClientRect().top <= offset + 4) {
        activeSection = sectionId;
      }
    }

    return activeSection;
  }, [contentRef, getScrollOffset, sectionIds]);

  const pauseScrollSpy = useCallback((durationMs = 800) => {
    suppressScrollSpy.current = true;

    if (resumeTimeout.current !== null) {
      window.clearTimeout(resumeTimeout.current);
    }

    resumeTimeout.current = window.setTimeout(() => {
      suppressScrollSpy.current = false;
      resumeTimeout.current = null;
    }, durationMs);
  }, []);

  const enableScrollSpy = useCallback(() => {
    suppressScrollSpy.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const updateActiveSection = () => {
      if (suppressScrollSpy.current) {
        return;
      }

      const nextSection = getActiveSectionFromScroll();
      if (nextSection) {
        onActiveSectionChange(nextSection);
      }
    };

    const enableOnUserScroll = () => {
      suppressScrollSpy.current = false;
      updateActiveSection();
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("wheel", enableOnUserScroll, { once: true, passive: true });
    window.addEventListener("touchmove", enableOnUserScroll, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      if (resumeTimeout.current !== null) {
        window.clearTimeout(resumeTimeout.current);
      }
    };
  }, [enabled, getActiveSectionFromScroll, onActiveSectionChange]);

  return { pauseScrollSpy, enableScrollSpy, getActiveSectionFromScroll };
};
