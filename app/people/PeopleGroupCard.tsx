import { PeopleImage } from "./PeopleImage";

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
}: PeopleGroupCardProps) => {
  return (
    <figure className="mb-8">
      <PeopleImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded-sm"
      />
      <figcaption className="text-sm text-gray-600 mt-3 italic">{caption}</figcaption>
    </figure>
  );
};
