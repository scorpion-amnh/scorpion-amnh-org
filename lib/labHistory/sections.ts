import { getLabHistory } from "@/lib/content";

export type LabHistoryCardView = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

export type LabHistorySectionView = {
  year?: string;
  subtitle?: string;
  cards: [LabHistoryCardView, ...LabHistoryCardView[]];
};

export const getLabHistorySections = (): LabHistorySectionView[] =>
  getLabHistory().map((section) => ({
    year: section.year,
    subtitle: section.subtitle,
    cards: section.cards as [LabHistoryCardView, ...LabHistoryCardView[]],
  }));

const HOME_LAB_HISTORY_TEASER_IMAGE_SRCS = [
  "/images/people/2025-lab-outside-guilder-center--Nick-Cazzaniga--William-Phillips--Jose-Barba-Montoya--Jairo-A-Moreno-Gonzalez--Drusilla-Sheridan--Lorenzo-Prendini--Pio-Colmenares--Javier-Blasco-Arostegui--Colby-Sain.jpg",
  "/images/people/2017-lab-outside-AMNH.jpg",
  "/images/people/2006-lab-outside-AMNH.jpg",
] as const;

/** Standard 4:3 crop for a uniform, slightly taller homepage teaser frame. */
export const HOME_LAB_HISTORY_TEASER_ASPECT_CLASS = "aspect-[4/3]";
export const HOME_LAB_HISTORY_TEASER_IMAGE_WIDTH = 800;
export const HOME_LAB_HISTORY_TEASER_IMAGE_HEIGHT = 600;

export const HOME_LAB_HISTORY_TEASER_OBJECT_POSITIONS: Partial<
  Record<(typeof HOME_LAB_HISTORY_TEASER_IMAGE_SRCS)[number], string>
> = {
  [HOME_LAB_HISTORY_TEASER_IMAGE_SRCS[0]]: "center 42%",
};

export const getHomeLabHistoryTeaserObjectPosition = (src: string) =>
  HOME_LAB_HISTORY_TEASER_OBJECT_POSITIONS[src as (typeof HOME_LAB_HISTORY_TEASER_IMAGE_SRCS)[number]];

export const getHomeLabHistoryTeaserSections = (): LabHistorySectionView[] => {
  const sections = getLabHistorySections();

  return HOME_LAB_HISTORY_TEASER_IMAGE_SRCS.map((src) =>
    sections.find((section) => section.cards[0].src === src)
  ).filter((section): section is LabHistorySectionView => section !== undefined);
};
