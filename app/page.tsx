import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGallery } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { HomeGallery } from "@/app/components/HomeGallery";

export const metadata: Metadata = createPageMetadata(
  "Arachnology at AMNH",
  "Scorpion Systematics Research Group at the American Museum of Natural History."
);

export default function Home() {
  const galleryImages = getGallery("home").map((entry) => entry.src);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        {/* Main Content */}
        <div className="mb-8">
          <h1 className="font-bold mb-2">Arachnology at AMNH</h1>
          <h2 className="font-semibold mb-4">Scorpion Systematics Research Group</h2>
          <h3 className="mb-8">Division of Invertebrate Zoology at the American Museum of Natural History</h3>
          
          {/* <p className="mb-8">
            The Arachnology Lab at the AMNH focuses on the taxonomy, phylogeny and biogeography of scorpions and related arachnid orders. There are many compelling reasons to study these organisms. Arachnids are ancient, ecologically, morphologically and taxonomically diverse, distributed in most terrestrial habitats and elevations on all continents except Antarctica, and some are economically or medically important. Arachnids inspire fear and fascination. Many species are threatened yet little is known about their biology, new species remain to be discovered, and there are few experts globally. The world arachnid fauna will remain poorly known until more specialists are trained and prospects for their employment improve.
          </p> */}
          <p className="mb-8">Arachnology at the AMNH spans nearly a century. It began with Willis J. Gertsch, the first Curator of Arachnida, who served for 36 years, from his appointment in 1933 until his retirement in 1968. Gertsch was briefly succeeded by John L. Cooke, from 1969 to 1972, who was in turn succeeded by Norman I. Platnick, Curator of Arachnida from 1973 until his retirement, 41 years later, in 2014. From 2002 onwards, when Lorenzo Prendini was appointed Curator of non-spider arachnids and myriapods, Platnick curated the collections of Araneae (spiders) and Ricinulei (hooded tick-spiders). Prendini assumed responsibility for all Arachnida and Myriapoda after Platnick’s retirement.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Collections Section */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <h4 className="font-bold mb-6">Collections</h4>
            
            <div className="grid gap-6 mb-6">
              <div>
                <h5 className="font-semibold mb-3">Chelicerata</h5>
                <h6 className="font-semibold mb-1">Arachnida</h6>
                <ul className="list-disc list-inside mb-3 space-y-1">
                  <li>Acari (mites and ticks)</li>
                  <li>Amblypygi (whip spiders)</li>
                  <li>Araneae (spiders)</li>
                  <li>Opiliones (harvestmen or opilionids)</li>
                  <li>Palpigradi (palpigrades)</li>
                  <li>Pseudoscorpiones (false scorpions)</li>
                  <li>Ricinulei (hooded tick-spiders or ricinuleids)</li>
                  <li>Schizomida (short-tailed whipscorpions or schizomids)</li>
                  <li>Scorpiones (scorpions)</li>
                  <li>Solifugae (camel-spiders, solifuges or solpugids)</li>
                  <li>Thelyphonida (vinegaroons or whip scorpions)</li>
                </ul>
                <h6 className="font-semibold">Xiphosura</h6>
                <p className="mb-3">Horseshoe crabs</p>
                <h6 className="font-semibold">Pycnogonida</h6>
                <p>Sea spiders</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">Myriapoda</h5>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chilopoda (centipedes)</li>
                  <li>Diplopoda (millipedes)</li>
                  <li>Pauropoda (pauropods)</li>
                  <li>Symphyla (garden centipedes or symphylans)</li>
                </ul>
              </div>
            </div>
            
            <p className="mb-6">
              See <Link href="/collections" className="text-color-link hover:text-color-link-hover underline">Collections</Link> for more information.
            </p>

            <h4 className="font-bold mb-2">Visits and Requests</h4>
            <p>Queries regarding visits to the collections, loan requests, and/or specimen donations should be addressed to <Link href="/people#principal-investigator" className="text-color-link hover:text-color-link-hover underline">Lorenzo Prendini</Link>, Curator of Arachnida and Myriapoda, and <Link href="/people#museum-specialists" className="text-color-link hover:text-color-link-hover underline">Pío Colmenares</Link>, Museum Specialist responsible for management of the collections, processing loan requests, and assisting visitors.</p>
          </div>

          {/* Image Gallery */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <figure>
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/images/people/Willis-Gertsch.jpg"
                    alt="Willis J. Gertsch"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-meta mt-3">
                  Willis J. Gertsch
                </figcaption>
              </figure>
              <figure>
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/images/people/John-Cooke.jpg"
                    alt="John L. Cooke"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-meta mt-3">
                  John L. Cooke
                </figcaption>
              </figure>
              <figure>
                <div className="overflow-hidden rounded-sm bg-gray-100">
                  <Image
                    src="/images/people/Norman-Platnick.jpg"
                    alt="Norman I. Platnick"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-meta mt-3">
                  Norman I. Platnick
                </figcaption>
              </figure>
            </div>
            <div className="h-px w-full bg-gray-200 mb-5" />
            <HomeGallery images={galleryImages} />
          </div>
        </div>
      </div>
    </div>
  );
}
