'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const fieldworkImages = [
  "DSCN7139.jpg",
  "DSCN1182.jpg",
  "IMG_2488.jpg",
  "IMG_0237.jpg",
  "Malawi443.jpg",
  "IMG_2261.jpg",
  "IMG_0823.jpg",
  "DSCF5506.jpg",
  "Mozambique041.jpg",
  "DSCN0023.jpg",
  "DSCN0494.jpg",
  "D.mexicanus.ElMoral.jpg",
  "IMG_0684.jpg",
  "DSCN6382.jpg",
  "IMG_2478.jpg",
  "Edmund%20blacklightingZimapan.jpg",
  "DSCN0089.jpg",
  "Jose.and.Camillo.jpg",
  "DSCN2068.jpg",
  "DSCN0020.jpg",
  "LitterWPark.jpg",
  "DSCN0188.jpg",
  "DSCN1207.jpg",
  "IMG_2559.jpg",
  "DSCN0255.jpg",
  "IMG_0487.jpg",
  "DSCN0039.jpg",
  "DSCN0092.jpg",
  "Jeremy-Valerio_Senegal.jpg",
];

export default function Fieldwork() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {shuffledImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={`/images/${image}`}
                alt={`Fieldwork image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-900">Locations</h2>
        <p className="text-lg text-gray-700 mb-8">
          A map showing where fieldwork had been conducted and a detailed list of locations is available upon request.
        </p>

      </div>
    </div>
  );
}
