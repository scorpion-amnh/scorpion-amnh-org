'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomImages, setRandomImages] = useState<string[]>([]);

  useEffect(() => {
    const images = [
      "00050.jpg", "00101.jpg", "00240.jpg", "00474.jpg", "07915.jpg",
      "cricket1.jpg", "cricket2.jpg", "cricket3.jpg", "cricket4.jpg",
      "DSC_0001.jpg", "DSC_0002.jpg", "DSC_0003.jpg", "DSC_0005.jpg",
      "DSC_0006.jpg", "DSC_0008.jpg", "DSC_0009.jpg", "DSC_0010.jpg",
      "DSC_0011.jpg", "DSC_0012.jpg", "DSC_0013.jpg", "DSC_0014.jpg",
      "DSC_0015.jpg", "DSC_0016.jpg", "DSC_0017.jpg", "DSC_0018.jpg",
      "DSC_0019.jpg", "DSC_0020.jpg", "DSC_0021.jpg", "DSC_0022.jpg",
      "DSC_0023.jpg", "DSC_0024.jpg", "DSC_0025.jpg", "DSC_0026.jpg",
      "DSC_0027.jpg", "DSC_0028.jpg", "DSC_0029.jpg", "DSC_0030.jpg",
      "DSC_0031.jpg", "DSC_0032.jpg", "Hexisopodid1.jpg", "Hexisopodid2.gif",
      "Hexisopodid3.gif", "blind1.jpg", "blind2.gif", "Pterygocercus.jpg",
      "Rhagodid1.jpg", "Rhagodid2.jpg", "Solipugid1.jpg", "Opisthacanthus.jpg",
      "pectines.jpg"
    ];

    // Shuffle and select images
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        {/* Main Content */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">Arachnology at AMNH</h1>
          <h2 className="text-3xl font-semibold mb-4 text-gray-700">Scorpion Systematics Research Group</h2>
          <h3 className="text-xl text-gray-600 mb-8">Division of Invertebrate Zoology at the American Museum of Natural History</h3>
          
          <p className="text-lg leading-8 text-gray-700 mb-8">
            The Arachnology Lab at the AMNH focuses on the taxonomy, phylogeny and biogeography of scorpions and related arachnid orders. There are many compelling reasons to study these organisms. Arachnids are ancient, ecologically, morphologically and taxonomically diverse, distributed in most terrestrial habitats and elevations on all continents except Antarctica, and some are economically or medically important. Arachnids inspire fear and fascination. Many species are threatened yet little is known about their biology, new species remain to be discovered, and there are few experts globally. The world arachnid fauna will remain poorly known until more specialists are trained and prospects for their employment improve.
          </p>
        </div>

        {/* Collections Section */}
        <div className="mb-12 border-t pt-8">
          <h4 className="text-2xl font-bold mb-6 text-gray-900">Collections</h4>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h6 className="text-lg font-semibold mb-3 text-gray-900">Arachnids</h6>
              <p className="text-gray-700">Acari (mites and ticks), Amblypygi (whip spiders), Araneae (spiders), Opiliones (harvestmen), Palpigradi (palpigrades), Pseudoscorpiones (false scorpions), Ricinulei (hooded tick-spiders or ricinuleids), Schizomida (schizomids), Scorpiones (scorpions), Solifugae (solifuges, solpugids or camel-spiders), Uropygi (vinegaroons or whip scorpions)</p>
            </div>
            <div>
              <h6 className="text-lg font-semibold mb-3 text-gray-900">Myriapods</h6>
              <p className="text-gray-700">Chilopoda (centipedes), Diplopoda (millipedes), Pauropoda (pauropods), Symphyla (garden centipedes or symphylans)</p>
            </div>
          </div>
          
          <p className="text-gray-700">
            See our <Link href="/collections" className="text-blue-600 hover:text-blue-800 underline">Collections Page</Link> for more information.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="border-t pt-8">
          <h4 className="text-2xl font-bold mb-4 text-gray-900">Image Gallery</h4>
          <p className="text-gray-700 mb-8">A selection of images from our work in the field and in the lab.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {randomImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={`/images/${image}`}
                  alt={`Gallery image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
