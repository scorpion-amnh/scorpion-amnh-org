import Image, { type ImageProps } from "next/image";
import type { ComponentType, ReactNode } from "react";

type FigureProps = {
  src: string;
  alt: string;
  caption?: ReactNode;
  width: number;
  height: number;
  className?: string;
  figureClassName?: string;
  captionClassName?: string;
  imageClassName?: string;
  aspectRatioClassName?: string;
  imageObjectPosition?: string;
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
  captionClassName = "text-meta mt-2 text-left",
  imageClassName = "w-full h-auto rounded-sm",
  captionStyle,
  aspectRatioClassName,
  imageObjectPosition,
  ImageComponent = Image,
}: FigureProps) => {
  const image = (
    <ImageComponent
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={aspectRatioClassName ? "w-full h-full object-cover" : imageClassName}
      style={aspectRatioClassName && imageObjectPosition ? { objectPosition: imageObjectPosition } : undefined}
    />
  );

  return (
    <figure className={className ?? figureClassName}>
      {aspectRatioClassName ? (
        <div className={`${aspectRatioClassName} overflow-hidden rounded-sm bg-gray-100`}>{image}</div>
      ) : (
        image
      )}
      {caption ? (
        <figcaption className={captionClassName} style={captionStyle}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
