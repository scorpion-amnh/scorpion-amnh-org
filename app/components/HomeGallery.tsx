'use client';

import Image from "next/image";
import { useMemo } from "react";
import { deterministicShuffleStrings } from "@/lib/shuffle";

const SMALL_PER_SEGMENT = 12;

/** Minimum small images required beside a featured photo for a flat 4-row segment. */
const MIN_SMALL_FOR_FEATURED_SEGMENT = SMALL_PER_SEGMENT + 1;

type GallerySegment = {
  featured: string | null;
  small: string[];
};

type HomeGalleryProps = {
  images: string[];
};

type RenderSegment = GallerySegment & {
  featuredNumber?: number;
  smallNumbers: number[];
};

function assignImageNumbers(segments: GallerySegment[]): RenderSegment[] {
  let imageCounter = 0;

  return segments.map((segment) => {
    if (segment.featured) {
      imageCounter += 1;
      const featuredNumber = imageCounter;
      const smallNumbers = segment.small.map(() => {
        imageCounter += 1;
        return imageCounter;
      });

      return { ...segment, featuredNumber, smallNumbers };
    }

    const smallNumbers = segment.small.map(() => {
      imageCounter += 1;
      return imageCounter;
    });

    return { ...segment, smallNumbers };
  });
}

function buildSegments(images: string[]): GallerySegment[] {
  const segments: GallerySegment[] = [];
  let index = 0;

  while (index < images.length) {
    const remaining = images.length - index;

    // A featured photo needs all 12 companion cells filled or the segment bottom is uneven.
    if (remaining < MIN_SMALL_FOR_FEATURED_SEGMENT) {
      segments.push({ featured: null, small: images.slice(index) });
      break;
    }

    segments.push({
      featured: images[index],
      small: images.slice(index + 1, index + 1 + SMALL_PER_SEGMENT),
    });
    index += MIN_SMALL_FOR_FEATURED_SEGMENT;
  }

  return segments;
}

function getFeaturedPlacement(isLeft: boolean): string {
  if (isLeft) {
    return "col-span-2 row-span-2 col-start-1 row-start-1 sm:col-start-1 md:col-start-1";
  }

  return "col-span-2 row-span-2 col-start-1 row-start-1 sm:col-start-2 md:col-start-3";
}

const MD_COL_START = {
  1: "md:col-start-1",
  2: "md:col-start-2",
  3: "md:col-start-3",
  4: "md:col-start-4",
} as const;

const MD_ROW_START = {
  1: "md:row-start-1",
  2: "md:row-start-2",
  3: "md:row-start-3",
  4: "md:row-start-4",
} as const;

function getSmallPlacement(index: number, isLeft: boolean): string {
  if (index < 4) {
    if (isLeft) {
      const placements = [
        `${MD_COL_START[3]} ${MD_ROW_START[1]}`,
        `${MD_COL_START[4]} ${MD_ROW_START[1]}`,
        `${MD_COL_START[3]} ${MD_ROW_START[2]}`,
        `${MD_COL_START[4]} ${MD_ROW_START[2]}`,
      ];
      return placements[index];
    }

    const placements = [
      `${MD_COL_START[1]} ${MD_ROW_START[1]}`,
      `${MD_COL_START[2]} ${MD_ROW_START[1]}`,
      `${MD_COL_START[1]} ${MD_ROW_START[2]}`,
      `${MD_COL_START[2]} ${MD_ROW_START[2]}`,
    ];
    return placements[index];
  }

  const fullRowIndex = index - 4;
  const column = ((fullRowIndex % 4) + 1) as keyof typeof MD_COL_START;
  const row = (3 + Math.floor(fullRowIndex / 4)) as keyof typeof MD_ROW_START;

  return `${MD_COL_START[column]} ${MD_ROW_START[row]}`;
}

export function HomeGallery({ images }: HomeGalleryProps) {
  const segments = useMemo(
    () => assignImageNumbers(buildSegments(deterministicShuffleStrings(images))),
    [images]
  );

  return (
    <div className="flex flex-col gap-4">
      {segments.map((segment, segmentIndex) => {
        const isLeft = segmentIndex % 2 === 0;

        if (!segment.featured) {
          return (
            <div
              key={`segment-${segmentIndex}-small-only`}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[70px] sm:auto-rows-[90px] md:auto-rows-[110px]"
            >
              {segment.small.map((src, smallIndex) => (
                <div
                  key={`${src}-${smallIndex}`}
                  className="col-span-1 row-span-1 overflow-hidden rounded-sm bg-gray-100"
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${segment.smallNumbers[smallIndex]}`}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          );
        }

        return (
          <div
            key={`segment-${segmentIndex}-${segment.featured}`}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[70px] sm:auto-rows-[90px] md:auto-rows-[110px]"
          >
            <div className={`overflow-hidden rounded-sm bg-gray-100 ${getFeaturedPlacement(isLeft)}`}>
              <Image
                src={segment.featured}
                alt={`Gallery image ${segment.featuredNumber}`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            {segment.small.map((src, smallIndex) => (
              <div
                key={`${src}-${smallIndex}`}
                className={`col-span-1 row-span-1 overflow-hidden rounded-sm bg-gray-100 ${getSmallPlacement(
                  smallIndex,
                  isLeft
                )}`}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${segment.smallNumbers[smallIndex]}`}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
