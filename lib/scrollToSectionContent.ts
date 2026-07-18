import { getHeaderHeight, getScrollGap } from "@/lib/scrollMetrics";

export type ScrollToSectionContentOptions = {
  contentElement: HTMLElement;
  /** When set, the scroll target is resolved inside this section wrapper. */
  sectionId?: string;
  /** Sticky side nav height on narrow viewports. */
  mobileSideNavOffset?: number;
};

const resolveStickyTop = (sideNavElement: HTMLElement) => {
  const stickyTop = parseFloat(getComputedStyle(sideNavElement).top);
  if (!Number.isNaN(stickyTop)) {
    return stickyTop;
  }

  return window.innerWidth >= 1024 ? getHeaderHeight() + getScrollGap() : getHeaderHeight();
};

/** True once the user has scrolled far enough that the side nav reaches its sticky position. */
export const hasScrolledPastSideNavTop = (sideNavElement: HTMLElement | null) => {
  if (!sideNavElement) {
    return false;
  }

  const stickyTop = resolveStickyTop(sideNavElement);
  return sideNavElement.getBoundingClientRect().top <= stickyTop + 1;
};

const resolveScrollTarget = (contentElement: HTMLElement, sectionId?: string) => {
  const sectionElement = sectionId
    ? (contentElement.querySelector(`[data-section="${sectionId}"]`) as HTMLElement | null)
    : null;

  const heading = sectionElement?.querySelector("h2") ?? contentElement.querySelector("h2");

  return { sectionElement, heading };
};

export const scrollToSectionContent = ({
  contentElement,
  sectionId,
  mobileSideNavOffset = 0,
}: ScrollToSectionContentOptions) => {
  const { sectionElement, heading } = resolveScrollTarget(contentElement, sectionId);
  const headerHeight = getHeaderHeight();
  const scrollGap = getScrollGap();

  if (window.innerWidth >= 1024) {
    if (heading) {
      const yOffset = heading.getBoundingClientRect().top + window.scrollY - headerHeight - scrollGap;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
      return;
    }

    const target = sectionElement ?? contentElement;
    const yOffset = target.getBoundingClientRect().top + window.scrollY - headerHeight - scrollGap;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
    return;
  }

  if (heading) {
    const yOffset = heading.getBoundingClientRect().top + window.scrollY - headerHeight - mobileSideNavOffset;
    window.scrollTo({ top: yOffset, behavior: "smooth" });
    return;
  }

  const target = sectionElement ?? contentElement;
  const yOffset = target.getBoundingClientRect().top + window.scrollY - headerHeight - mobileSideNavOffset;
  window.scrollTo({ top: yOffset, behavior: "smooth" });
};
