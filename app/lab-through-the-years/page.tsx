import type { Metadata } from "next";
import { PeopleGroupCard } from "@/app/people/PeopleGroupCard";
import { formatLabHistoryCaption } from "@/lib/labHistory/formatLabHistoryCaption";
import { getLabHistorySections } from "@/lib/labHistory/sections";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Lab Through the Years | Arachnology at AMNH",
  "Group photos from the Arachnology Lab at the American Museum of Natural History over the years."
);

export default function LabThroughTheYearsPage() {
  const labHistorySections = getLabHistorySections();

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-bold mb-12">Lab Through the Years</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {labHistorySections.map((section, index) => {
            const card = section.cards[0];

            return (
              <PeopleGroupCard
                key={`${card.src}-${index}`}
                src={card.src}
                alt={card.alt}
                caption={formatLabHistoryCaption(section.year, card.caption, section.subtitle, {
                  breakAtOrientation: true,
                })}
                width={card.width}
                height={card.height}
                figureClassName="mb-0"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
