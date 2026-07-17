import { getHeaderHeight, getScrollGap } from "@/lib/scrollMetrics";

const getSideNavOffset = (sideNav: HTMLElement | null) => {
  if (window.innerWidth >= 1024 || !sideNav) {
    return 0;
  }

  return sideNav.getBoundingClientRect().height;
};

const getScrollPadding = (sideNav: HTMLElement | null) =>
  getHeaderHeight() + getScrollGap() + getSideNavOffset(sideNav);

const getScrollTopForTarget = (target: HTMLElement, sideNav: HTMLElement | null) => {
  const padding = getScrollPadding(sideNav);
  return target.getBoundingClientRect().top + window.scrollY - padding;
};

const alignPersonAnchor = (target: HTMLElement, sideNav: HTMLElement | null) => {
  const desiredTop = getScrollTopForTarget(target, sideNav);
  if (Math.abs(window.scrollY - desiredTop) > 2) {
    window.scrollTo({ top: desiredTop, behavior: "instant" });
  }
};

export const scrollToPersonAnchor = (
  targetId: string,
  sideNav: HTMLElement | null,
  options: { smooth?: boolean } = {}
): boolean => {
  const target = document.getElementById(targetId);
  if (!target || target.offsetParent === null) {
    return false;
  }

  const top = getScrollTopForTarget(target, sideNav);
  window.scrollTo({ top, behavior: options.smooth ? "smooth" : "instant" });

  if (!options.smooth) {
    alignPersonAnchor(target, sideNav);
  }

  return true;
};

const realignAfterLayout = (target: HTMLElement, sideNav: HTMLElement | null) => {
  requestAnimationFrame(() => {
    alignPersonAnchor(target, sideNav);
    requestAnimationFrame(() => {
      alignPersonAnchor(target, sideNav);
    });
  });
};

const realignAfterImages = (target: HTMLElement, sideNav: HTMLElement | null) => {
  const images = target.querySelectorAll("img");
  if (images.length === 0) {
    return;
  }

  let pendingImages = 0;
  const realign = () => {
    pendingImages -= 1;
    if (pendingImages <= 0) {
      alignPersonAnchor(target, sideNav);
    }
  };

  for (const image of images) {
    if (!(image instanceof HTMLImageElement) || image.complete) {
      continue;
    }

    pendingImages += 1;
    image.addEventListener("load", realign, { once: true });
    image.addEventListener("error", realign, { once: true });
  }
};

export const scrollToPersonAnchorWhenReady = (
  targetId: string,
  sideNav: HTMLElement | null,
  options: { smooth?: boolean; maxAttempts?: number } = {}
) => {
  const maxAttempts = options.maxAttempts ?? 20;
  let attempts = 0;

  const finishScroll = (target: HTMLElement) => {
    if (options.smooth && "onscrollend" in window) {
      const handleScrollEnd = () => {
        window.removeEventListener("scrollend", handleScrollEnd);
        alignPersonAnchor(target, sideNav);
        realignAfterLayout(target, sideNav);
        realignAfterImages(target, sideNav);
      };

      window.addEventListener("scrollend", handleScrollEnd, { once: true });
      return;
    }

    realignAfterLayout(target, sideNav);
    realignAfterImages(target, sideNav);
  };

  const tryScroll = () => {
    const didScroll = scrollToPersonAnchor(targetId, sideNav, {
      smooth: options.smooth && attempts === 0,
    });

    if (!didScroll) {
      attempts += 1;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryScroll);
      }
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    finishScroll(target);
  };

  requestAnimationFrame(tryScroll);
};
