const STORAGE_KEY = "publications-list-scroll";

export type PublicationsScrollState = {
  scrollY: number;
};

export const savePublicationsScrollPosition = () => {
  if (typeof window === "undefined") {
    return;
  }

  const state: PublicationsScrollState = { scrollY: window.scrollY };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const readPublicationsScrollPosition = (): PublicationsScrollState | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PublicationsScrollState;
    if (typeof parsed.scrollY !== "number" || Number.isNaN(parsed.scrollY)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const clearPublicationsScrollPosition = () => {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(STORAGE_KEY);
};

export const restorePublicationsScrollPosition = (scrollY: number) => {
  window.scrollTo({ top: scrollY, behavior: "instant" });

  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: "instant" });
  });
};
