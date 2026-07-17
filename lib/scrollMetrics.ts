const parseCssLength = (value: string) => {
  const rootStyles = getComputedStyle(document.documentElement);
  if (value.endsWith("rem")) {
    const rem = parseFloat(value);
    const fontSize = parseFloat(rootStyles.fontSize) || 16;
    return rem * fontSize;
  }
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const getHeaderHeight = () => {
  const header = document.querySelector("header");
  if (header instanceof HTMLElement) {
    return header.getBoundingClientRect().height;
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const value = rootStyles.getPropertyValue("--header-height").trim();
  return parseCssLength(value);
};

export const getScrollGap = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const value = rootStyles.getPropertyValue("--section-scroll-gap").trim();
  return parseCssLength(value);
};
