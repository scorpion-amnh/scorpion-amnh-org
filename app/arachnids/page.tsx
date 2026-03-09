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
          <p className="text-lg leading-8 text-gray-700 mb-8">
            There are many compelling reasons to study arachnids. They are ancient arthropods of great ecological, morphological, and taxonomic diversity. Distributed across nearly every terrestrial habitat and elevation, arachnids inhabit every continent except Antarctica. The group as a whole inspires fear and fascination, and some species are of significant economic or medical importance. Many arachnid species are threatened yet little is known about their biology, many new taxa remain to be discovered, and there is a shortage of experts for many taxa. The world’s arachnid fauna will remain poorly understood until more specialists are trained and prospects for their employment improve.
          </p>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Diversity</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              The Class Arachnida includes megadiverse orders, like mites and ticks (Acari) with over 60,000 species and spiders (Araneae), with over 53,000; mesodiverse orders, like harvestmen (Opiliones), with 6,650, pseudoscorpions (Pseudoscorpiones), with 4,100, scorpions, with 3,050, and Solifugae, with over 1,200; and microdiverse orders like Amblypygi (~300), Palpigradi (~140), Ricinulei (~130), Schizomida (~395), Thelyphonida (~140).
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
              Arachnids enjoy widespread public appeal (much of it based on fear). Their antiquity, combined with a sense of mystery, toxicity, and fearsome appearance, contributes to a fascination that continues to surround them. Among the most ancient arthropods, arachnids evolved from amphibious ancestors that lived up to 400 million years ago. The arachnid ground plan, developed so long ago, is remarkably effective. Paleozoic arachnids closely resemble their modern descendants in basic anatomical details (e.g., number of body segments), except that some were considerably larger. For example, the fossil scorpion <em>Brontoscorpio anglicus</em> is estimated to have measured approximately 1 meter in length, an order of magnitude greater than the largest extant <em>Pandinus</em> from tropical contributed greatly to their evolutionary success.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 items-start max-w-full">
              <div className="w-fit">
                <Image
                  src="/images/fossil1.jpg"
                  alt="Fossil scorpion"
                  width={247}
                  height={163}
                  className="h-auto rounded-sm"
                />
              </div>
              <div className="w-fit">
                <Image
                  src="/images/fossil2.jpg"
                  alt="Fossil scorpion"
                  width={247}
                  height={163}
                  className="h-auto rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Notoriety</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Arachnids are notorious. The venoms of some spider and scorpion taxa contain multiple low molecular weight proteinaceous neurotoxins that block sodium and potassium channels, preventing the transmission of nerve impulses across synapses. In regions where envenomation represents a significant cause of morbidity and mortality, spiders and scorpions are justifiably feared. Some 100,000 scorpion stings occur annually in Mexico and as many as 800 people (mostly young children and the elderly) die as a result. The figures may be even higher in North Africa and the Middle East. Nevertheless, most arachnids are harmless. The bite or sting of most arachnids, if able to pierce the skin, may be painful, but is not life-threatening. Only about 25 scorpion species, representing less than 1% of the known scorpion fauna, are considered medically important. In the U.S., the average number of deaths per year from spider bites is estimated to be around 3 to 7. The most significant risk comes from black widow or brown recluse spiders, but even with these, the mortality rate is primarily for the very young, the elderly, or those with compromised immune systems. For context, the risk of death from an arachnid encounter in the U.S. is significantly lower than that from stinging insects (bees, wasps, and hornets), which average around 72 deaths per year, mainly due to anaphylactic shock (severe allergic reaction).
            </p>
            <div className="flex flex-wrap gap-4 mb-8 items-start max-w-full">
              <div className="w-fit">
                <Image
                  src="/images/venom.gif"
                  alt="Venom drop coming out of the aculeus"
                  width={478}
                  height={317}
                  className="h-auto rounded-sm"
                />
              </div>
              <div className="w-fit">
                <Image
                  src="/images/redtelson.jpg"
                  alt="Red telson"
                  width={434}
                  height={223}
                  className="h-auto rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Distribution</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Arachnids occur on all continents except Antarctica but most orders are more abundant and diverse in tropical and subtropical regions. Many arachnid orders are restricted to humid habitats, like caves (some scorpions have been collected nearly 1 km below the surface) or forest leaf litter. Others are more widespread, however. For example, the greatest abundance and diversity of scorpions occurs in desert and semi-desert habitats, but they may also be found in savannas and grasslands, coniferous, deciduous, and tropical forests, on high mountain slopes (up to 4,900 m elevation), and even in the intertidal zone. Although most species are terrestrial, many inhabit the forest canopy. Favored habitats include spaces under tree bark, logs, stones, and in rock crevices, burrows or interstitial spaces in the soil or litter. Many spiders inhabit webs or silken retreats. Some arachnids adapt well to human environments. Arachnids are often abundant in suitable habitat. For example, densities of 8-12 individuals per square meter were reported for the scorpion, <em>Serradigitus littoralis</em>, from Baja California. Given their high densities in some areas, the importance of arachnids in ecological food webs, particularly with respect to helping control insect populations, is considerable. Many are sensitive to environmental degradation and are considered equilibrium species.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ecology</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Arachnids are primarily nocturnal. Several orders (e.g., scorpions, solifuges and opilionids) fluoresce under long-wave ultraviolet light, facilitating their collection and observation at night. The simple eyes of arachnids detect luminosity, but little else. Prey are detected by a variety of sensory organs, e.g., slit sensilla in the tarsi, sensory setae (trichobothria) on the pedipalps, and specialized structures like malleoli in solifuges or pectines in scorpions, and attacked with the pedipalps, chelicerae or, in the case of scorpions, the sting. Spiders are unique among arachnids in the ability to use silk to capture prey in webs or snares. Although many arachnid orders rely on mechanical means to subdue prey, several orders, notably spiders, scorpions and pseudoscorpions, employ venom. Many arachnids use the pedipalps to manipulate captured prey, tearing pieces off with the chelicerae to be digested in a pre-oral cavity before being sucked into the gut. Arachnids are the primary consumers of other terrestrial arthropods, keeping insect populations in check. For example, <em>Scorpio maurus</em> was reported to eat an annual average of 11% of the Israeli isopod population, whereas <em>Urodacus yaschenkoi</em> 7.9 kg/ha of invertebrate prey in Australia. Cannibalism and intraguild predation by other arachnid taxa are important sources of arachnid mortality, as is predation by other invertebrates (e.g., centipedes) and vertebrates (e.g., birds, lizards, and insectivorous mammals). Arachnid mortality is highest immediately after birth, lower for individuals of intermediate age, and high for adults. Mortality is particularly high among males due to increased mobility during breeding season and cannibalism by females. Biased adult sex ratios are typical of arachnids. Social behavior occurs in some spiders, scorpions and whip spiders, in which family groups with overlapping generations cooperate to construct and occupy communal nests or burrows, inhabited by individuals of various ages.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 items-start max-w-full">
              <figure className="w-fit inline-flex flex-col items-start">
                <Image
                  src="/images/cannibalism.jpg"
                  alt="Scorpion predating on another scorpion species"
                  width={271}
                  height={196}
                  className="h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2 text-left" style={{ width: 271 }}>
                  Scorpion predating on another scorpion species
                </figcaption>
              </figure>
              <figure className="w-fit inline-flex flex-col items-start">
                <Image
                  src="/images/scorpionmite.jpg"
                  alt="Mites on a scorpion"
                  width={272}
                  height={196}
                  className="h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2 text-left" style={{ width: 272 }}>
                  Mites on a scorpion
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Life History</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Arachnids have a remarkable life history. Many arachnids exhibit an elaborate, ritualized, species-specific courtship prior to insemination, such as the mating dance or <em>promenade-à-deux</em> of scorpions. Sperm transfer is usually indirect, occurring via a spermatophore or insertion using modified pedipalps (spiders) or chelicerae (solifuges). However, intromission is direct in harvestmen (Opiliones), where the male inserts a chitinized penis into the female genital opening during mating. Scorpions are unusual among arachnids in that all are viviparous: embryos develop in the reproductive tract and receive nourishment from yolk or maternal tissues. Several species are parthenogenic. Unlike most other terrestrial arthropods, many arachnids (especially the large-bodied arachnid taxa, like mygalomorph spiders, scorpions, whip spiders and vinegaroons) resemble vertebrates in life history traits and are considered K-selected. They have low reproductive rates compared to other terrestrial arthropods and are among the most long-lived. Gestation times are long (several months to more than a year) and litter sizes often small (1-100). Young are often large at birth and altricial, clinging to the mother or remaining in the nest or burrow for the first few molts before dispersing. Time to sexual maturity varies from 2-8 years, depending on the species. Average longevity is around 4 years, but larger species may live up to 30 years (e.g., in some scorpions).
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4 w-full items-start sm:inline-grid sm:w-auto sm:justify-start">
              <div className="w-full">
                <Image
                  src="/images/scorpionbabies1.jpg"
                  alt="Scorpion with offspring"
                  width={270}
                  height={195}
                  className="w-full h-auto rounded-sm sm:w-auto"
                  style={{ maxWidth: 270 }}
                />
              </div>
              <div className="w-full">
                <Image
                  src="/images/scorpionbabies2.jpg"
                  alt="Scorpion with offspring"
                  width={270}
                  height={195}
                  className="w-full h-auto rounded-sm sm:w-auto"
                  style={{ maxWidth: 270 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 w-full items-start sm:inline-grid sm:w-auto sm:justify-start">
              <figure className="w-full inline-flex flex-col items-start">
                <Image
                  src="/images/spermatophore.jpg"
                  alt="Scorpion spermatophore"
                  width={250}
                  height={250}
                  className="w-full h-auto rounded-sm sm:w-auto"
                  style={{ maxWidth: 250 }}
                />
                <figcaption className="text-sm text-gray-600 mt-2 text-left" style={{ width: "100%", maxWidth: 250 }}>
                  Scorpion spermatophore
                </figcaption>
              </figure>
              <figure className="w-full inline-flex flex-col items-start">
                <Image
                  src="/images/capsule.jpg"
                  alt="Scorpion capsule"
                  width={188}
                  height={250}
                  className="w-full h-auto rounded-sm sm:w-auto"
                  style={{ maxWidth: 188 }}
                />
                <figcaption className="text-sm text-gray-600 mt-2 text-left" style={{ width: "100%", maxWidth: 188 }}>
                  Scorpion capsule
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Conservation</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Urgency for the study of any taxonomic group can be argued based on prevailing ignorance about the world's biota. However, arachnids warrant more attention than they receive. As the primary group of predatory arthropods, arachnids are responsible for controlling insect populations in terrestrial ecosystems. Many of the large-bodied arachnid taxa, e.g., mygalomorph spiders, scorpions, whip spiders and vinegaroons, are K-selected, equilibrium species, and represent indicators of ecosystem health. Their disappearance signals habitat degradation. Small litter sizes, long generation times and low survivorship among sexually immature females contribute to a low rate of population growth for these taxa. Most species are also extremely habitat specific and range-restricted, exacerbating their risk of extinction due to human activities. Increasingly threatened by climate change, habitat destruction and harvesting for the venom, souvenir and exotic pet trades, few species are officially protected, and many may disappear before being described. For example, ca. 105,000 live <em>Pandinus imperator</em> are exported annually from three West African countries to pet shops in Europe, the United States and Japan, indicating the magnitude of trade in this species, which is now CITES-listed. Many other species of spiders (especially mygalomorphs like tarantulas), scorpions, solifuges, whip scorpions and whip spiders, originating from various African, Asian, and Latin American countries, are offered for sale on the exotic pet market; the most sought-after specimens fetch up to $500 each. The many threats faced by many arachnid taxa renders the task of inventorying their diversity and distribution a priority if steps towards their conservation are to be implemented.
            </p>
            <div className="mb-8">
              <figure className="w-fit inline-flex flex-col items-start">
                <Image
                  src="/images/beachleft.jpg"
                  alt="Coastal habitat, CA, USA"
                  width={238}
                  height={164}
                  className="h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2 text-left" style={{ width: 238 }}>
                  Coastal habitat, CA, USA
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Dwindling Expertise</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Despite their notoriety, worldwide distribution, medical, ecological and conservation importance, the taxonomy of many arachnid orders remains neglected. Numerous families and genera have never been revised and recent inventories of arachnid diversity, even in relatively well-surveyed regions (e.g. Australia, southern Africa, and the United States), continue to uncover new species and distribution records. Several minor orders (e.g., Palpigradi, Ricinulei) have few living specialists. Given the paucity of active taxonomists and, in some cases, an aging demographic, it is unlikely that the world arachnid fauna will become better known until more specialists are trained and the prospects for their employment improve. Our lab is addressing this shortfall by developing expertise and training new specialists in the systematics and morphology of scorpions and understudied arachnid orders like Amblypygi (whip spiders), Ricinulei (hooded tick-spiders or ricinuleids), Schizomida (schizomids), Solifugae (camel-spiders, solifuges or solpugids), and Thelyphonida (vinegaroons or whip scorpions).
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Model System</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Many arachnids are easy to find in reasonable numbers and thus conducive to the collection of specimens for systematic research and observational data for ecological analyses. As representatives of an ancient lineage, they are also appropriate for studies of evolutionary processes. The similarity in body form between many fossil and modern arachnids suggests that their basic habits and habitats remain largely unchanged since the Paleozoic. Therefore, knowledge about the ecology and life history of extant arachnids allows us to test hypotheses about processes and events that may have caused arachnid speciation in the past. Except for some spiders, which can disperse by ballooning, most extant arachnid taxa have limited dispersal abilities that restrict their patterns of distribution, making them amenable to biogeographical analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
