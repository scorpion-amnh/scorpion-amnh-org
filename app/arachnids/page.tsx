'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Arachnids() {
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

    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        {/* Main Content */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Biology</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Diversity</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              As listed in the Synopsis of Described Scorpions of the World and the Scorpion Files, approximately 2259 extant species in 209 genera and, depending on the authority, between 13 and 20 families (depending on the authority), as well as 92 extinct species in 71 genera and 42 families, are recognized in the arachnid order Scorpiones. This is an almost fourfold increase in the number of species listed a century ago in Kraepelin's (1899) Revision der Skorpione. Although comprising only a small component of arthropod diversity, scorpions are of considerable interest to scientist and layman alike.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {randomImages.slice(0, 20).map((image, index) => (
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

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Antiquity</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions enjoy widespread public appeal (much of it based on fear). Their toxicity, relatively large size and fearsome appearance, notwithstanding the great age of their lineage, contribute to a fascination that has always and continues to surround them. Among the most ancient arthropods, derived from amphibious ancestors that lived in the Silurian, more than 400 million years ago, scorpions have earned the title of 'living fossils'. The scorpion ground plan, developed so long ago, is highly successful. Paleozoic scorpions closely resemble their modern descendants in basic anatomical details, except that some were considerably larger. <i>Brontoscorpio anglicus</i> measured approximately 1 meter in length-an order of magnitude greater than the largest extant <i>Pandinus</i> from tropical Africa, which average about 20 cm. Scorpions were formerly considered the sister group of other arachnids because they closely resemble extinct marine eurypterids (the sister group of arachnids) but recent data suggest that scorpions are embedded in the arachnid lineage, and merely retain primitive features.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Notoriety</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions are notorious worldwide. Scorpion venoms contain multiple low molecular weight proteinaceous neurotoxins that block sodium and potassium channels, preventing the transmission of nerve impulses across synapses. In regions where scorpion envenomation represents a significant cause of morbidity and mortality (e.g. Mexico, North Africa and the Middle East), scorpions are justifiably feared. Some 100 000 scorpion stings occur annually in Mexico and as many as 800 people (mostly young children and the elderly) die as a result. The figures may be even higher in North Africa and the Middle East. Nevertheless, most scorpions are harmless. The sting may be painful, but not dangerous. Only about 25 species, all in family Buthidae, are considered medically important worldwide. Most of these occur in the New World genera <i>Centruroides</i> and <i>Tityus</i>, and the Old World genera <i>Androctonus</i>, <i>Buthus</i>, <i>Leiurus</i>, <i>Mesobuthus</i> and <i>Parabuthus</i>. <i>Centruroides exilicauda</i>, from Arizona, California, and New Mexico, is the only species known to be lethal in the U.S.A. The venom of these scorpions has proved fatal to healthy children up to 16 years of age and to adults suffering from hypertension and general debility.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Distribution</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions occur on all continents except Antarctica, but are most abundant and diverse in tropical and subtropical regions. The greatest abundance and diversity of scorpions occurs in desert and semi-desert habitats, but they may also be found in savannas and grasslands, in deciduous, coniferous, and tropical rainforests, on high mountain slopes (above 5500 m elevation) in the Alps, Himalayas and Andes, in some of the deepest caves (nearly 1 km below the surface), and even in the intertidal zone. Although most scorpions are terrestrial, some are arboreal. Favored habitats include burrows (up to 1 m deep, to escape hot diurnal temperatures), spaces under tree bark, logs, stones, and in rock crevices. Some species adapt well to human environments. Scorpions are often abundant in suitable habitat. Densities of 1 per square meter were reported for the Middle Eastern <i>Leiurus quinquestriatus</i> and of 8-12 per square meter for the intertidal <i>Serradigitus littoralis</i> from Baja California.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
