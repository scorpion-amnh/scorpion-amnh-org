import Link from "next/link";
import { PeopleGroupCard } from "@/app/people/PeopleGroupCard";
import { formatLabHistoryCaption } from "@/lib/labHistory/formatLabHistoryCaption";
import {
  HOME_LAB_HISTORY_TEASER_ASPECT_CLASS,
  HOME_LAB_HISTORY_TEASER_IMAGE_HEIGHT,
  HOME_LAB_HISTORY_TEASER_IMAGE_WIDTH,
  getHomeLabHistoryTeaserObjectPosition,
  type LabHistorySectionView,
} from "@/lib/labHistory/sections";

type LabThroughTheYearsTeaserProps = {
  sections: LabHistorySectionView[];
};

export const LabThroughTheYearsTeaser = ({ sections }: LabThroughTheYearsTeaserProps) => {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="font-bold mb-6">Lab Through the Years</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sections.map((section, index) => {
          const card = section.cards[0];

          return (
            <PeopleGroupCard
              key={`${card.src}-${index}`}
              src={card.src}
              alt={card.alt}
              caption={formatLabHistoryCaption(section.year, card.caption, section.subtitle)}
              width={HOME_LAB_HISTORY_TEASER_IMAGE_WIDTH}
              height={HOME_LAB_HISTORY_TEASER_IMAGE_HEIGHT}
              aspectRatioClassName={HOME_LAB_HISTORY_TEASER_ASPECT_CLASS}
              imageObjectPosition={getHomeLabHistoryTeaserObjectPosition(card.src)}
              figureClassName="mb-0"
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/lab-through-the-years"
          className="inline-block rounded-sm bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition-colors"
        >
          View all group photos
        </Link>
        <Link
          href="/people"
          className="inline-block rounded-sm border border-gray-300 bg-white px-4 py-2 text-color-primary hover:bg-gray-50 transition-colors"
        >
          Search lab members
        </Link>
      </div>
    </section>
  );
};
