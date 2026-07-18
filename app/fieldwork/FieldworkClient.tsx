'use client';

import Image from "next/image";
import { useMemo } from "react";
import type { GalleryImage } from "@/lib/content/schema";
import { deterministicShuffle } from "@/lib/shuffle";

type FieldworkClientProps = {
  gallery: GalleryImage[];
};

export function FieldworkClient({ gallery }: FieldworkClientProps) {
  const shuffledImages = useMemo(() => deterministicShuffle(gallery), [gallery]);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-bold mb-8">Fieldwork</h1>

        <p className="text-xl mb-8 leading-relaxed">
          The Arachnology Lab has travelled extensively to do fieldwork around the world, and has funded the
          collections trips of many other researchers and students.
        </p>

        <div className="columns-2 sm:columns-3 md:columns-4 gap-4 mb-8 [column-fill:_balance]">
          {shuffledImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="mb-4 break-inside-avoid"
            >
              <div
                className={`overflow-hidden rounded-sm bg-gray-100 ${
                  image.orientation === "portrait"
                    ? "aspect-[3/4]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.orientation === "portrait" ? 300 : 400}
                  height={image.orientation === "portrait" ? 400 : 300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-bold mb-3">Locations</h2>
        <p className="mb-8">
          A map showing where fieldwork had been conducted and a detailed list of locations is available upon request.
        </p>

      </div>
    </div>
  );
}
