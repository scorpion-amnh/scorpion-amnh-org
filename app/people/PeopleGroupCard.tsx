import { PeopleImage } from "@/app/people/PeopleImage";
import { Figure } from "@/app/components/Figure";
import type { ReactNode } from "react";

export type PeopleGroupCardProps = {
  src: string;
  alt: string;
  caption: ReactNode;
  width?: number;
  height?: number;
  figureClassName?: string;
  aspectRatioClassName?: string;
  imageObjectPosition?: string;
};

export const PeopleGroupCard = ({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
  figureClassName,
  aspectRatioClassName,
  imageObjectPosition,
}: PeopleGroupCardProps) => (
  <Figure
    src={src}
    alt={alt}
    caption={caption}
    width={width}
    height={height}
    ImageComponent={PeopleImage}
    captionClassName="text-meta mt-3"
    figureClassName={figureClassName}
    aspectRatioClassName={aspectRatioClassName}
    imageObjectPosition={imageObjectPosition}
  />
);
