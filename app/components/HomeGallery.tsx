'use client';

import Image from "next/image";
import { useMemo } from "react";

type HomeGalleryProps = {
  images: string[];
};

const hashText = (value: string) =>
  value.split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);

const deterministicShuffle = <T extends string>(items: T[]) =>
  [...items].sort((a, b) => hashText(a) - hashText(b));

export function HomeGallery({ images }: HomeGalleryProps) {
  const randomImages = useMemo(() => deterministicShuffle(images), [images]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 grid-flow-dense auto-rows-[70px] sm:auto-rows-[90px] md:auto-rows-[110px]">
      {randomImages.map((src, index) => {
        const isFeatured = index === 0 || (index + 1) % 14 === 0;
        const sizeClass = isFeatured ? "col-span-2 row-span-2" : "col-span-1 row-span-1";

        return (
          <div
            key={`${src}-${index}`}
            className={`overflow-hidden rounded-sm bg-gray-100 ${sizeClass}`}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={isFeatured ? 800 : 400}
              height={isFeatured ? 600 : 300}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
