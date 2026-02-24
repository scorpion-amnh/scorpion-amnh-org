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
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Arachnids</h1>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Diversity</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              As listed in the Synopsis of Described Scorpions of the World and the Scorpion Files, approximately 2259 extant species in 209 genera and, depending on the authority, between 13 and 20 families (depending on the authority), as well as 92 extinct species in 71 genera and 42 families, are recognized in the arachnid order Scorpiones. This is an almost fourfold increase in the number of species listed a century ago in Kraepelin's (1899) Revision der Skorpione. Although comprising only a small component of arthropod diversity, scorpions are of considerable interest to scientist and layman alike.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {randomImages.slice(0, 20).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-sm bg-gray-100">
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
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Antiquity</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions enjoy widespread public appeal (much of it based on fear). Their toxicity, relatively large size and fearsome appearance, notwithstanding the great age of their lineage, contribute to a fascination that has always and continues to surround them. Among the most ancient arthropods, derived from amphibious ancestors that lived in the Silurian, more than 400 million years ago, scorpions have earned the title of 'living fossils'. The scorpion ground plan, developed so long ago, is highly successful. Paleozoic scorpions closely resemble their modern descendants in basic anatomical details, except that some were considerably larger. <i>Brontoscorpio anglicus</i> measured approximately 1 meter in length-an order of magnitude greater than the largest extant <i>Pandinus</i> from tropical Africa, which average about 20 cm. Scorpions were formerly considered the sister group of other arachnids because they closely resemble extinct marine eurypterids (the sister group of arachnids) but recent data suggest that scorpions are embedded in the arachnid lineage, and merely retain primitive features.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Image
                src="/images/fossil1.jpg"
                alt="Fossil scorpion"
                width={300}
                height={300}
                className="w-full h-auto rounded-sm"
              />
              <Image
                src="/images/fossil2.jpg"
                alt="Fossil scorpion"
                width={300}
                height={300}
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Notoriety</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions are notorious worldwide. Scorpion venoms contain multiple low molecular weight proteinaceous neurotoxins that block sodium and potassium channels, preventing the transmission of nerve impulses across synapses. In regions where scorpion envenomation represents a significant cause of morbidity and mortality (e.g. Mexico, North Africa and the Middle East), scorpions are justifiably feared. Some 100 000 scorpion stings occur annually in Mexico and as many as 800 people (mostly young children and the elderly) die as a result. The figures may be even higher in North Africa and the Middle East. Nevertheless, most scorpions are harmless. The sting may be painful, but not dangerous. Only about 25 species, all in family Buthidae, are considered medically important worldwide. Most of these occur in the New World genera <i>Centruroides</i> and <i>Tityus</i>, and the Old World genera <i>Androctonus</i>, <i>Buthus</i>, <i>Leiurus</i>, <i>Mesobuthus</i> and <i>Parabuthus</i>. <i>Centruroides exilicauda</i>, from Arizona, California, and New Mexico, is the only species known to be lethal in the U.S.A. The venom of these scorpions has proved fatal to healthy children up to 16 years of age and to adults suffering from hypertension and general debility.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Image
                src="/images/venom.gif"
                alt="Venom drop coming out of the aculeus"
                width={300}
                height={300}
                className="w-full h-auto rounded-sm"
              />
              <Image
                src="/images/redtelson.jpg"
                alt="Red telson"
                width={300}
                height={300}
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Distribution</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions occur on all continents except Antarctica, but are most abundant and diverse in tropical and subtropical regions. The greatest abundance and diversity of scorpions occurs in desert and semi-desert habitats, but they may also be found in savannas and grasslands, in deciduous, coniferous, and tropical rainforests, on high mountain slopes (above 5500 m elevation) in the Alps, Himalayas and Andes, in some of the deepest caves (nearly 1 km below the surface), and even in the intertidal zone. Although most scorpions are terrestrial, some are arboreal. Favored habitats include burrows (up to 1 m deep, to escape hot diurnal temperatures), spaces under tree bark, logs, stones, and in rock crevices. Some species adapt well to human environments. Scorpions are often abundant in suitable habitat. Densities of 1 per square meter were reported for the Middle Eastern <i>Leiurus quinquestriatus</i> and of 8-12 per square meter for the intertidal <i>Serradigitus littoralis</i> from Baja California.
            </p>
            <div className="mb-8">
              <Image
                src="/images/distribution.jpg"
                alt="Approximate world distribution of scorpions"
                width={600}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ecology</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions are primarily nocturnal. All fluoresce under long-wave ultraviolet light, facilitating their collection and observation at night. Their simple eyes detect luminosity, but little else. Prey are detected with slit sense organs in the tarsi, sensory setae (trichobothria) on the pedipalps, and the pectines, and attacked with the chelate pedipalps or venomous sting. Scorpions with slender pedipalps are prone to sting their prey, those with robust pedipalps to crush prey mechanically, reserving the sting for large or strong prey. All use the pedipalps to manipulate prey, tearing pieces off with the chelicerae to be digested in a pre-oral cavity before being sucked into the gut. Scorpions are important consumers in some communities. <i>Scorpio maurus</i> was reported to eat an annual average of 11% of the Israeli isopod population, <i>Urodacus yaschenkoi</i> 7.9 kg/ha of invertebrate prey in Australia. Cannibalism and predation by other scorpion species may be the most important sources of scorpion mortality but other invertebrate predators (e.g. centipedes) and vertebrates are also important predators. Mortality is highest immediately after birth, lower for individuals of intermediate age, and high for adults. For example, 65%, 30%, and 60% per year for the Australian <i>Urodacus manicatus</i>. Mortality is particularly high among males due to increased mobility during breeding season and cannibalism by females. Biased adult sex ratios of 1.2-1.4:1 are typical. Social behavior occurs rarely in species of <i>Heterometrus</i>, <i>Opisthacanthus</i> and <i>Pandinus</i>, in which family groups with overlapping generations cooperate to construct and occupy communal burrows, inhabited by individuals of various ages.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <figure className="text-center">
                <Image
                  src="/images/cannibalism.jpg"
                  alt="Scorpion predating on another scorpion species"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Scorpion predating on another scorpion species</figcaption>
              </figure>
              <figure className="text-center">
                <Image
                  src="/images/scorpionmite.jpg"
                  alt="Mites on a scorpion"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Mites on a scorpion</figcaption>
              </figure>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Life History</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions have a remarkable life history. Reproduction in scorpions is indirect. Intromission occurs via a spermatophore. The male attaches the spermatophore to the substrate while grasping the female by the pedipalps or chelicerae during a mating dance or "promenade-à-deux". The species-specific spermatophore catapults the sperm mass into the female gonopore when a lever is touched (a lock-and-key mechanism). Scorpions are unusual among arthropods in that all are viviparous-embryos develop in the reproductive tract and receive nourishment from yolk or maternal tissues. Some are parthenogenic. More than most other terrestrial arthropods, scorpions resemble large vertebrates in life history traits and are considered K-selected. They have very low reproductive rates in comparison to other terrestrial arthropods and are among the most long-lived. Gestation times are long (several months to more than a year) and litter sizes often small (1-105). Young are fairly large at birth and altricial, clinging to the mother for the first few molts before dispersing. Time to sexual maturity varying from 2-8 years, depending on the species. Average longevity is around 4 years, but larger species may live 25-30 years. Scorpions do not molt as adults.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Image
                src="/images/scorpionbabies1.jpg"
                alt="Scorpion with offspring"
                width={300}
                height={300}
                className="w-full h-auto rounded-sm"
              />
              <Image
                src="/images/scorpionbabies2.jpg"
                alt="Scorpion with offspring"
                width={300}
                height={300}
                className="w-full h-auto rounded-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <figure className="text-center">
                <Image
                  src="/images/spermatophore.jpg"
                  alt="Scorpion spermatophore"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Scorpion spermatophore</figcaption>
              </figure>
              <figure className="text-center">
                <Image
                  src="/images/capsule.jpg"
                  alt="Scorpion capsule"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Scorpion capsule</figcaption>
              </figure>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Conservation</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Urgency for the study of any taxonomic group can be argued on the basis of prevailing ignorance about the world's biota. However, scorpions warrant more attention than they receive. As K-selected, equilibrium species, and comprising a major group of predatory arthropods in arid ecosystems, scorpions are valuable bio-indicators. Their disappearance signals habitat degradation and they represent charismatic 'flagship' species for programs aimed at conserving terrestrial invertebrates. Small litter sizes, long generation times and low survivorship among sexually immature females contribute to a low rate of population increase for most scorpions. Many scorpion species are also extremely habitat specific and range-restricted, exacerbating their risk of extinction due to human activities. Increasingly threatened by habitat destruction and harvesting for the souvenir and exotic pet trades, few scorpions receive formal protection and many may disappear before being described. For example, ca. 105,000 live <i>Pandinus imperator</i> are exported annually from three West African countries to pet shops in Europe, the USA and Japan, indicating the magnitude of trade in this particular species, which is now CITES-listed. At least 50 other scorpion species, originating from various African, Asian, and American countries, are offered for sale on the exotic pet market; the most sought after fetch up to $300 each. Few scorpions receive formal protection and many may disappear before being described. The threats faced by many scorpion species renders the task of inventorying their diversity and distribution a priority if steps towards their conservation are to be implemented.
            </p>
            <div className="mb-8 text-center">
              <figure>
                <Image
                  src="/images/beachleft.jpg"
                  alt="Coastal habitat, CA, USA"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-sm inline-block"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Coastal habitat, CA, USA</figcaption>
              </figure>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Dwindling Expertise</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Surprisingly, despite their notoriety, worldwide distribution, medical, ecological and conservation importance, scorpions are poorly studied taxonomically. Many families and genera have never been revised and recent inventories of scorpion diversity-even in regions thought to be well-surveyed for scorpions (e.g. Australia, southern Africa, and the USA) continue to uncover new species and distribution records. Given the paucity of active specialists and an aging demographic, it seems unlikely that the world scorpion fauna will become better known until more scorpion specialists are trained and the prospects for their employment improve. Our group is addressing this problem by coordinating existing expertise in North America to undertake a long overdue revision of the North American scorpion family Vaejovidae, and training new specialists in the process.
            </p>
            <div className="mb-8">
              <Image
                src="/images/dropinpubs.gif"
                alt="Drop in publications"
                width={600}
                height={400}
                className="w-full h-auto rounded-sm"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Model System</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Scorpions are easy to find in reasonable numbers and thus conducive to the collection of specimens for systematic studies and observational data for ecological studies. Because they belong to an ancient lineage, they are appropriate for studies of the evolutionary process. The similarity in body form between fossil and modern scorpions suggests that their basic habits and habitats may be virtually unchanged since Silurian times. Therefore, knowledge about the ecology of extant scorpions allows us to make assumptions about processes and events that may have caused scorpion speciation in the past. Most extant scorpions have limited dispersal abilities hence their patterns of distribution are amenable to biogeographical analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
