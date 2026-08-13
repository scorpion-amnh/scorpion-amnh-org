import type { Metadata } from "next";
import Link from "next/link";
import { getGallery } from "@/lib/content";
import { getHomeLabHistoryTeaserSections } from "@/lib/labHistory/sections";
import { createPageMetadata } from "@/lib/metadata";
import { BackToTop } from "@/app/components/BackToTop";
import { CuratorPortraits } from "@/app/components/CuratorPortraits";
import { HomeGallery } from "@/app/components/HomeGallery";
import { LabThroughTheYearsTeaser } from "@/app/components/LabThroughTheYearsTeaser";

export const metadata: Metadata = createPageMetadata(
  "Arachnology at AMNH",
  "Scorpion Systematics Research Group at the American Museum of Natural History."
);

export default function Home() {
  const galleryImages = getGallery("home").map((entry) => entry.src);
  const labHistoryTeaserSections = getHomeLabHistoryTeaserSections();

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6">
          <h1 className="font-bold mb-2">Arachnology at AMNH</h1>
          <h2 className="font-semibold mb-4">Scorpion Systematics Research Group</h2>
          <h3 className="mb-8">Lorenzo Prendini, Curator of Arachnida and Myriapoda</h3>
          <p className="text-lead">
            In the division of Invertebrate Zoology at the American Museum of Natural History, Arachnology spans nearly a century. It began with Willis J. Gertsch, the first Curator of
            Arachnida, who served for 36 years, from his appointment in 1933 until his retirement in 1968. Gertsch was
            briefly succeeded by John L. Cooke, from 1969 to 1972, who was in turn succeeded by Norman I. Platnick,
            Curator of Arachnida from 1973 until his retirement, 41 years later, in 2014. From 2002 onwards, when
            Lorenzo Prendini was appointed Curator of non-spider arachnids and myriapods, Platnick curated the
            collections of Araneae (spiders) and Ricinulei (hooded tick-spiders). Prendini assumed responsibility for all
            Arachnida and Myriapoda after Platnick’s retirement.
          </p>
        </div>

        <CuratorPortraits />

        <LabThroughTheYearsTeaser sections={labHistoryTeaserSections} />

        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-6 lg:gap-x-10">
            <h2 className="font-bold sm:col-span-1 lg:col-span-7">Collections</h2>

            <div className="grid gap-6 sm:col-span-1 sm:row-start-2 lg:col-span-7 lg:row-start-2 lg:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">Chelicerata</h3>
                <h4 className="font-semibold mb-1">Arachnida</h4>
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
                <h4 className="font-semibold">Xiphosura</h4>
                <p className="mb-3">Horseshoe crabs</p>
                <h4 className="font-semibold">Pycnogonida</h4>
                <p>Sea spiders</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Myriapoda</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chilopoda (centipedes)</li>
                  <li>Diplopoda (millipedes)</li>
                  <li>Pauropoda (pauropods)</li>
                  <li>Symphyla (garden centipedes or symphylans)</li>
                </ul>
              </div>
            </div>

            <div className="sm:col-span-1 sm:row-start-3 lg:col-span-7 lg:row-start-3">
              <Link
                href="/collections"
                className="inline-block rounded-sm bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition-colors"
              >
                View collections Information
              </Link>
            </div>

            <aside className="rounded-sm bg-gray-90 p-6 text-color-light sm:col-span-1 sm:row-start-2 lg:col-span-5 lg:row-start-2 lg:row-span-2 self-start">
              <h3 className="font-semibold mb-2 text-color-light">Visits and Requests</h3>
              <p className="text-color-light">
                Queries regarding visits to the collections, loan requests, and/or specimen donations should be addressed
                to{" "}
                <Link
                  href="/people#principal-investigator"
                  className="text-color-link-on-dark hover:text-color-link-on-dark-hover underline"
                >
                  Lorenzo Prendini
                </Link>
                , Curator of Arachnida and Myriapoda, and{" "}
                <Link
                  href="/people#museum-specialists"
                  className="text-color-link-on-dark hover:text-color-link-on-dark-hover underline"
                >
                  Pío Colmenares
                </Link>
                , Museum Specialist responsible for management of the collections, processing loan requests, and
                assisting visitors.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-12" aria-labelledby="research-specimens-heading">
          <h2 id="research-specimens-heading" className="font-bold mb-7">
            Research Specimens
          </h2>
          <HomeGallery images={galleryImages} />
          <Link
            href="/research"
            className="mt-10 inline-block rounded-sm bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 transition-colors"
          >
            View research areas
          </Link>
        </section>
      </div>
      <BackToTop />
    </div>
  );
}
