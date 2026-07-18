import { hasScrolledPastSideNavTop } from "@/lib/scrollToSectionContent";

export const getSectionNavScrollBehavior = (sideNavElement: HTMLElement | null): ScrollBehavior =>
  hasScrolledPastSideNavTop(sideNavElement) ? "instant" : "smooth";

export const getSideNavElement = (sideNavRef?: { current: HTMLElement | null }) => {
  if (sideNavRef?.current) {
    return sideNavRef.current;
  }

  const sideNavFromDom = document.querySelector(".side-nav");
  return sideNavFromDom instanceof HTMLElement ? sideNavFromDom : null;
};
