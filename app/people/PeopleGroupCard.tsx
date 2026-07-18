import { PeopleImage } from "@/app/people/PeopleImage";
import { Figure } from "@/app/components/Figure";

export type PeopleGroupCardProps = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

export const PeopleGroupCard = ({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
}: PeopleGroupCardProps) => (
  <Figure
    src={src}
    alt={alt}
    caption={caption}
    width={width}
    height={height}
    ImageComponent={PeopleImage}
    captionClassName="text-meta mt-3"
  />
);
