import type { Person } from "@/lib/content/schema";
import { isTabSectionId } from "@/lib/people/peoplePageUrl";

const normalizeHeadingText = (value: string) => value.replace(/\s+/g, " ").trim();

export const syncPersonAnchorIds = (root: HTMLElement, people: Person[]) => {
  for (const person of people) {
    const sectionElement = root.querySelector(`[data-section="${person.sectionId}"]`);
    if (!sectionElement) {
      continue;
    }

    const scopedElement =
      person.tab && isTabSectionId(person.sectionId)
        ? (sectionElement.querySelector(`[data-tab="${person.tab}"]`) ?? sectionElement)
        : sectionElement;
    if (!scopedElement) {
      continue;
    }

    const existingTarget = scopedElement.querySelector(`#${CSS.escape(person.id)}`);
    if (existingTarget instanceof HTMLElement) {
      continue;
    }

    const headings = scopedElement.querySelectorAll("h3, h4, h5");
    for (const heading of headings) {
      const headingName = normalizeHeadingText(heading.textContent ?? "");
      if (headingName !== person.name) {
        continue;
      }

      const cardWrapper =
        heading.closest(".people-card") ??
        heading.closest(".grid")?.parentElement ??
        heading.parentElement;

      if (cardWrapper instanceof HTMLElement && !cardWrapper.id) {
        cardWrapper.id = person.id;
        cardWrapper.classList.add("person-anchor");
      }

      break;
    }
  }
};
