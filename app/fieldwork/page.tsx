'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const fieldworkImages = [
  { src: "DSCN7139.jpg", orientation: "portrait" },
  { src: "DSCN1182.jpg", orientation: "landscape" },
  { src: "IMG_2488.jpg", orientation: "portrait" },
  { src: "IMG_0237.jpg", orientation: "landscape" },
  { src: "Malawi443.jpg", orientation: "landscape" },
  { src: "IMG_2261.jpg", orientation: "landscape" },
  { src: "IMG_0823.jpg", orientation: "landscape" },
  { src: "DSCF5506.jpg", orientation: "landscape" },
  { src: "Mozambique041.jpg", orientation: "landscape" },
  { src: "DSCN0023.jpg", orientation: "landscape" },
  { src: "DSCN0494.jpg", orientation: "portrait" },
  { src: "D.mexicanus.ElMoral.jpg", orientation: "landscape" },
  { src: "IMG_0684.jpg", orientation: "landscape" },
  { src: "DSCN6382.jpg", orientation: "portrait" },
  { src: "IMG_2478.jpg", orientation: "landscape" },
  { src: "Edmund%20blacklightingZimapan.jpg", orientation: "portrait" },
  { src: "DSCN0089.jpg", orientation: "portrait" },
  { src: "Jose.and.Camillo.jpg", orientation: "landscape" },
  { src: "DSCN2068.jpg", orientation: "portrait" },
  { src: "DSCN0020.jpg", orientation: "landscape" },
  { src: "LitterWPark.jpg", orientation: "landscape" },
  { src: "DSCN0188.jpg", orientation: "landscape" },
  { src: "DSCN1207.jpg", orientation: "landscape" },
  { src: "IMG_2559.jpg", orientation: "landscape" },
  { src: "DSCN0255.jpg", orientation: "landscape" },
  { src: "IMG_0487.jpg", orientation: "landscape" },
  { src: "DSCN0039.jpg", orientation: "landscape" },
  { src: "DSCN0092.jpg", orientation: "landscape" },
  { src: "Jeremy-Valerio_Senegal.jpg", orientation: "landscape" },
] as const;

export default function Fieldwork() {
  const [shuffledImages, setShuffledImages] = useState([...fieldworkImages]);

  useEffect(() => {
    const shuffled = [...fieldworkImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">Fieldwork</h1>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
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
                  src={`/images/${image.src}`}
                  alt={`Fieldwork image ${index + 1}`}
                  width={image.orientation === "portrait" ? 300 : 400}
                  height={image.orientation === "portrait" ? 400 : 300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-3 text-gray-900">Locations</h2>
        <p className="text-lg text-gray-700 mb-8">
          A map showing where fieldwork had been conducted and a detailed list of locations is available upon request.
        </p>

      </div>
    </div>
  );
}
