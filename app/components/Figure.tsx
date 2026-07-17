import Image, { type ImageProps } from "next/image";
import type { ComponentType } from "react";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
  figureClassName?: string;
  captionClassName?: string;
  imageClassName?: string;
  captionStyle?: React.CSSProperties;
  ImageComponent?: ComponentType<ImageProps>;
};

export const Figure = ({
  src,
  alt,
  caption,
  width,
  height,
  className,
  figureClassName = "mb-8",
  captionClassName = "text-sm text-gray-600 mt-2",
  imageClassName = "w-full h-auto rounded-sm",
  captionStyle,
  ImageComponent = Image,
}: FigureProps) => (
  <figure className={className ?? figureClassName}>
    <ImageComponent src={src} alt={alt} width={width} height={height} className={imageClassName} />
    {caption ? (
      <figcaption className={captionClassName} style={captionStyle}>
        {caption}
      </figcaption>
    ) : null}
  </figure>
);
