'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const galleryImages: Array<{ src: string; orientation: "landscape" | "portrait" }> = [
  { src: "00050.jpg", orientation: "landscape" },
  { src: "00101.jpg", orientation: "landscape" },
  { src: "00240.jpg", orientation: "landscape" },
  { src: "00474.jpg", orientation: "landscape" },
  { src: "07915.jpg", orientation: "landscape" },
  { src: "cricket1.jpg", orientation: "landscape" },
  { src: "cricket2.jpg", orientation: "landscape" },
  { src: "cricket3.jpg", orientation: "landscape" },
  { src: "cricket4.jpg", orientation: "landscape" },
  { src: "DSC_0001.jpg", orientation: "landscape" },
  { src: "DSC_0002.jpg", orientation: "landscape" },
  { src: "DSC_0003.jpg", orientation: "landscape" },
  { src: "DSC_0005.jpg", orientation: "landscape" },
  { src: "DSC_0006.jpg", orientation: "landscape" },
  { src: "DSC_0008.jpg", orientation: "landscape" },
  { src: "DSC_0009.jpg", orientation: "landscape" },
  { src: "DSC_0010.jpg", orientation: "landscape" },
  { src: "DSC_0011.jpg", orientation: "landscape" },
  { src: "DSC_0012.jpg", orientation: "landscape" },
  { src: "DSC_0013.jpg", orientation: "landscape" },
  { src: "DSC_0014.jpg", orientation: "landscape" },
  { src: "DSC_0015.jpg", orientation: "landscape" },
  { src: "DSC_0016.jpg", orientation: "landscape" },
  { src: "DSC_0017.jpg", orientation: "landscape" },
  { src: "DSC_0018.jpg", orientation: "landscape" },
  { src: "DSC_0019.jpg", orientation: "landscape" },
  { src: "DSC_0020.jpg", orientation: "landscape" },
  { src: "DSC_0021.jpg", orientation: "landscape" },
  { src: "DSC_0022.jpg", orientation: "landscape" },
  { src: "DSC_0023.jpg", orientation: "landscape" },
  { src: "DSC_0024.jpg", orientation: "landscape" },
  { src: "DSC_0025.jpg", orientation: "landscape" },
  { src: "DSC_0026.jpg", orientation: "landscape" },
  { src: "DSC_0027.jpg", orientation: "landscape" },
  { src: "DSC_0028.jpg", orientation: "landscape" },
  { src: "DSC_0029.jpg", orientation: "landscape" },
  { src: "DSC_0030.jpg", orientation: "landscape" },
  { src: "DSC_0031.jpg", orientation: "landscape" },
  { src: "DSC_0032.jpg", orientation: "landscape" },
  { src: "Hexisopodid1.jpg", orientation: "landscape" },
  { src: "Hexisopodid2.gif", orientation: "landscape" },
  { src: "Hexisopodid3.gif", orientation: "landscape" },
  { src: "blind1.jpg", orientation: "landscape" },
  { src: "blind2.gif", orientation: "landscape" },
  { src: "Pterygocercus.jpg", orientation: "landscape" },
  { src: "Rhagodid1.jpg", orientation: "landscape" },
  { src: "Rhagodid2.jpg", orientation: "landscape" },
  { src: "Solipugid1.jpg", orientation: "landscape" },
  { src: "Opisthacanthus.jpg", orientation: "landscape" },
  { src: "pectines.jpg", orientation: "landscape" },
] ;

type GalleryImage = (typeof galleryImages)[number];

export default function Home() {
  const [randomImages, setRandomImages] = useState<GalleryImage[]>([...galleryImages]);

  useEffect(() => {
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">Arachnology at AMNH</h1>
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Scorpion Systematics Research Group</h2>
          <h3 className="text-xl text-gray-600 mb-8">Division of Invertebrate Zoology at the American Museum of Natural History</h3>
          
          {/* <p className="text-lg leading-8 text-gray-700 mb-8">
            The Arachnology Lab at the AMNH focuses on the taxonomy, phylogeny and biogeography of scorpions and related arachnid orders. There are many compelling reasons to study these organisms. Arachnids are ancient, ecologically, morphologically and taxonomically diverse, distributed in most terrestrial habitats and elevations on all continents except Antarctica, and some are economically or medically important. Arachnids inspire fear and fascination. Many species are threatened yet little is known about their biology, new species remain to be discovered, and there are few experts globally. The world arachnid fauna will remain poorly known until more specialists are trained and prospects for their employment improve.
          </p> */}
          <p className="text-lg leading-8 text-gray-700 mb-8">Arachnology at the AMNH spans nearly a century. It began with Willis J. Gertsch, the first Curator of Arachnida, who served for 36 years, from his appointment in 1933 until his retirement in 1968. Gertsch was briefly succeeded by John L. Cooke, from 1969 to 1972, who was in turn succeeded by Norman I. Platnick, Curator of Arachnida from 1973 until his retirement, 41 years later, in 2014. From 2002 onwards, when Lorenzo Prendini was appointed Curator of non-spider arachnids and myriapods, Platnick curated the collections of Araneae (spiders) and Ricinulei (hooded tick-spiders). Prendini assumed responsibility for all Arachnida and Myriapoda after Platnick’s retirement.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Collections Section */}
          <div className="lg:col-span-1">
            <h4 className="text-2xl font-bold mb-6 text-gray-900">Collections</h4>
            
            <div className="grid gap-6 mb-6">
              <div>
                <h6 className="text-lg font-semibold mb-3 text-gray-900">Chelicerata</h6>
                <h6 className="text-lg font-semibold mb-1 text-gray-900">Arachnida</h6>
                <ul className="list-disc list-inside text-gray-700 mb-3 space-y-1">
                  <li>Acari (mites and ticks)</li>
                  <li>Amblypygi (whip spiders)</li>
                  <li>Araneae (spiders)</li>
                  <li>Opiliones (harvestmen or opilionids)</li>
                  <li>Palpigradi (palpigrades)</li>
                  <li>Pseudoscorpiones (false scorpions)</li>
                  <li>Ricinulei (hooded tick-spiders or ricinuleids)</li>
                  <li>Schizomida (schizomids)</li>
                  <li>Scorpiones (scorpions)</li>
                  <li>Solifugae (camel-spiders, solifuges or solpugids)</li>
                  <li>Thelyphonida (vinegaroons or whip scorpions)</li>
                </ul>
                <h6 className="text-lg font-semibold text-gray-900">Xiphosura</h6>
                <p className="mb-3">Horseshoe crabs</p>
                <h6 className="text-lg font-semibold text-gray-900">Pycnogonida</h6>
                <p>Sea spiders</p>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-gray-900 mb-3">Myriapods</h6>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Chilopoda (centipedes)</li>
                  <li>Diplopoda (millipedes)</li>
                  <li>Pauropoda (pauropods)</li>
                  <li>Symphyla (garden centipedes or symphylans)</li>
                </ul>
              </div>
            </div>
            
            <p className="text-gray-700">
              See our <Link href="/collections" className="text-blue-600 hover:text-blue-800 underline">Collections Page</Link> for more information.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 grid-flow-dense auto-rows-[70px] sm:auto-rows-[90px] md:auto-rows-[110px]">
              {randomImages.map((image, index) => {
                const isFeatured = index === 0 || (index + 1) % 14 === 0;
                const sizeClass = isFeatured
                  ? "col-span-2 row-span-2"
                  : image.orientation === "portrait"
                    ? "col-span-1 row-span-3"
                    : "col-span-1 row-span-1";

                return (
                  <div
                    key={`${image.src}-${index}`}
                    className={`overflow-hidden rounded-sm bg-gray-100 ${sizeClass}`}
                  >
                    <Image
                      src={`/images/${image.src}`}
                      alt={`Gallery image ${index + 1}`}
                      width={isFeatured ? 800 : 400}
                      height={isFeatured ? 600 : 300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
