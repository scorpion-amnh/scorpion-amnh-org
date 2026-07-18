import { useCallback, useEffect, useRef, type RefObject } from "react";
import { getSideNavElement } from "@/lib/sectionNavScrollBehavior";
import { getHeaderHeight, getScrollGap } from "@/lib/scrollMetrics";

type UseSectionScrollSpyOptions = {
  sectionIds: readonly string[];
  contentRef: RefObject<HTMLElement | null>;
  onActiveSectionChange: (sectionId: string) => void;
  sideNavRef?: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

const getSideNavElementFromRef = (sideNavRef?: RefObject<HTMLElement | null>) => getSideNavElement(sideNavRef);

export const useSectionScrollSpy = ({
  sectionIds,
  contentRef,
  onActiveSectionChange,
  sideNavRef,
  enabled = true,
}: UseSectionScrollSpyOptions) => {
  const suppressScrollSpy = useRef(true);
  const resumeTimeout = useRef<number | null>(null);
  const settleFrame = useRef<number | null>(null);
  const settleCleanup = useRef<(() => void) | null>(null);

  const getScrollOffset = useCallback(() => {
    const headerHeight = getHeaderHeight();
    const scrollGap = getScrollGap();
    const sideNavElement = getSideNavElementFromRef(sideNavRef);

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

  const clearScrollSpyPauseTimers = useCallback(() => {
    if (resumeTimeout.current !== null) {
      window.clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }

    if (settleFrame.current !== null) {
      window.cancelAnimationFrame(settleFrame.current);
      settleFrame.current = null;
    }

    settleCleanup.current?.();
    settleCleanup.current = null;
  }, []);

  const pauseScrollSpy = useCallback(
    (durationMs = 800) => {
      suppressScrollSpy.current = true;
      clearScrollSpyPauseTimers();

      resumeTimeout.current = window.setTimeout(() => {
        suppressScrollSpy.current = false;
        resumeTimeout.current = null;
      }, durationMs);
    },
    [clearScrollSpyPauseTimers]
  );

  const pauseScrollSpyUntilScrollSettles = useCallback(() => {
    suppressScrollSpy.current = true;
    clearScrollSpyPauseTimers();

    let lastScrollY = window.scrollY;
    let stableFrames = 0;

    const finish = () => {
      suppressScrollSpy.current = false;
      clearScrollSpyPauseTimers();
    };

    const watchSettle = () => {
      if (window.scrollY === lastScrollY) {
        stableFrames += 1;
        if (stableFrames >= 4) {
          finish();
          return;
        }
      } else {
        stableFrames = 0;
        lastScrollY = window.scrollY;
      }

      settleFrame.current = window.requestAnimationFrame(watchSettle);
    };

    const onScrollEnd = () => {
      finish();
    };

    settleCleanup.current = () => {
      window.removeEventListener("scrollend", onScrollEnd);
    };

    window.addEventListener("scrollend", onScrollEnd, { once: true });
    settleFrame.current = window.requestAnimationFrame(watchSettle);

    resumeTimeout.current = window.setTimeout(finish, 3000);
  }, [clearScrollSpyPauseTimers]);

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
      clearScrollSpyPauseTimers();
    };
  }, [clearScrollSpyPauseTimers, enabled, getActiveSectionFromScroll, onActiveSectionChange]);

  return {
    pauseScrollSpy,
    pauseScrollSpyUntilScrollSettles,
    enableScrollSpy,
    getActiveSectionFromScroll,
  };
};
