'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SideNav } from "../components/SideNav";

export default function Collections() {
  const [activeSection, setActiveSection] = useState('general-information');
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'general-information', label: 'General Information' },
    { id: 'specimens', label: 'Specimens' },
    { id: 'tissue-samples', label: 'Tissue Samples' },
  ];

  useEffect(() => {
    if (contentRef.current) {
      const headerHeight = 96; // Approximate header height in pixels
      const yOffset = contentRef.current.offsetTop - headerHeight;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">Collections</h1>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Arachnid and Myriapod collections at the American Museum of Natural History
        </p>

        {/* Grid Layout with Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <SideNav
              sections={sections}
              activeSection={activeSection}
              onSelect={setActiveSection}
            />
          </div>

          {/* Content Area */}
          <div ref={contentRef} className="lg:col-span-3">
              {activeSection === 'general-information' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">General Information</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Personnel</h3>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              In 2002, <a href="https://www.amnh.org/research/staff-directory/lorenzo-prendini" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Lorenzo Prendini</a> was hired to curate the Arachnid (non-spider) and Myriapod Collections in the <a href="https://research.amnh.org/invertzoo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Division of Invertebrate Zoology</a> at the American Museum of Natural History. The following arachnid orders fall under his jurisdiction: Acari (mites and ticks), Amblypygi (whip spiders), Opiliones (harvestmen), Palpigradi (palpigrades), Pseudoscorpiones (false scorpions), Schizomida (schizomids), Scorpiones (scorpions), Solifugae (solifuges, solpugids or camel-spiders), Uropygi (vinegaroons or whip scorpions).
            </p>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              Upon the retirement of Norman I. Platnick in 2014, Prendini assumed responsibility for the Araneae (spiders) and Ricinulei (hooded tick-spiders or ricinuleids). Queries regarding visits, loan requests, and/or specimen donations concerning any of these groups should be addressed to him.
            </p>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              In addition, Prendini is in charge of the myriapod orders Chilopoda (centipedes), Diplopoda (millipedes), Pauropoda (pauropods), and Symphyla (garden centipedes or symphylans). Pio Colmenares, Museum Specialist, is responsible for management of the Arachnid (non-Araneae) and Myriapod Collections, and for processing loan requests. Due to Lou Sorkin's retirement, all loan requests directed to the Spider and Ricinuleid Collections may suffer significant delays. More information about the personnel in Prendini's research group can be found under the <Link href="/people" className="text-blue-600 hover:text-blue-800 underline">People</Link> section.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <figure className="text-center">
                <Image
                  src="/images/lourandy.jpg"
                  alt="Collections personnel"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Louis Sorkin and Randy Mercurio in the collections</figcaption>
              </figure>
              <Image
                src="/images/collectionssign.jpg"
                alt='Wall signage that says "AMNH CAN #97 ARANEAE FAMILY LINYPHIIDAE"'
                width={300}
                height={300}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="mb-8 border-t pt-8" id="use-of-collections">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Use of Collections</h3>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Incoming and outgoing loans of specimens from the Arachnid and Myriapod Collections are a weekly occurrence, while visits to the collections occur less frequently, averaging once a month. Queries regarding visits, loan requests, specimen donations, and the preservation of tissue samples for molecular analysis should be addressed to <a href="https://www.amnh.org/research/staff-directory/lorenzo-prendini" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Lorenzo Prendini</a>. Anyone interested in the particular protocols used for the preservation and management of the AMNH Arachnid and Myriapod Collections should contact <a href="/people/staff" className="text-blue-600 hover:text-blue-800 underline">Pio Colmenares</a>. Donors should refer to the Division of Invertebrate Zoology <a href="https://www.amnh.org/research/invertebrate-zoology/policies/specimen-collecting-deposition" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">instructions for depositing material.</a> Those interested in management of natural history collections should consult the website for the <a href="http://www.spnhc.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Society for the Preservation of Natural History Collections</a> (SPNHC).
            </p>
          </div>

          <div className="mb-8 border-t pt-8" id="loan-requests">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Loan Requests</h3>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              If you would like to apply for a loan, please complete the following form so we can consider your request: <a href="https://forms.gle/JsH1bysFeFucUyJb6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">AMNH Arachnida and Myriapoda Loan Request Form</a>
            </p>
          </div>

          <div className="mb-8 border-t pt-8" id="visiting-scientists">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Visiting Scientists</h3>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              There are limited funding sources available to support scientists interested in visiting the collections to study material:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li><a href="https://www.amnh.org/research/richard-gilder-graduate-school/grants#3-collection-study-grants" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Collections Study Grants</a></li>
              <li><a href="https://www.amnh.org/research/richard-gilder-graduate-school/grants#1-theodore-roosevelt-memorial-grants" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Theodore Roosevelt Memorial Fund</a></li>
            </ul>
            <Image
              src="/images/nsb_wetlab.jpg"
              alt="NSB wet lab"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
              </div>
              )}

          {activeSection === 'specimens' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Specimens</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              The AMNH contains the second-largest collection of scorpions, and the largest collection of minor arachnid orders, in North America. The myriapod collections are also among the largest in North America. The collections include a worldwide representation of arachnid and myriapod taxa, with a strong emphasis on material from North America and elsewhere in the New World. The majority of specimens are preserved in ethanol, although large collections of slide-mounted Acari and pseudoscorpions are also represented.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Image
                src="/images/nsb_collections.jpg"
                alt="Starr Natural Sciences Building (NSB) collections"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg"
              />
              <Image
                src="/images/collections_edmundo.jpg"
                alt="Edmundo González Santillan searching the collections"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-900" id="scorpions">Scorpions</h3>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              Historically, scorpions comprise the second largest component of the AMNH Arachnid and Myriapod Collections, after spiders. Currently comprising over 30,000 specimen-lots, including several hundred type specimens, the AMNH has the fourth-largest scorpion collection in the world, including a vast array of New and Old World taxa. Particular strengths of the collections are in New World, and especially North American, and southern African families. In addition, there are reasonable holdings of taxa from North and South America, Europe, the Middle East, Southeast Asia, Australia and Oceania. Continuing fieldwork by Prendini and his research group has vastly expanded the AMNH holdings of scorpions, minor arachnid orders and myriapods. Collectively, the ca. 20,000 specimens obtained by Prendini and his research group since 2002 has more than doubled Museum holdings of amblypygids, schizomids, solifuges, and uropygids, and increased Museum holdings of scorpions by more than a third.
            </p>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              The AMNH has one of the two largest collections of vaejovid scorpions in the world (the California Academy of Sciences has the other). It incorporates the Oscar F. Francke collection, rich in vaejovid and iurid material from Mexico and the southwestern USA, and containing many large series collected by UV light detection, but also containing material from elsewhere. It also incorporates the Willis J. Gertsch collection, containing a significant amount of material from Mexico and the southwestern U.S.A.
            </p>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Acquisition of the Alexis Harington collection (ca. 6,500 specimens), the Lorenzo Prendini collection (ca. 2,000 specimens) have greatly increased our holdings of southern African scorpions. The Alexis Harington collection comprises a more representative sample than most southern African collections. All families, genera, and most species of southern African scorpions are represented, including any rare or seldom collected species. Most species are represented by series from multiple localities, many representing new records and/or range extensions.
            </p>
            <Image
              src="/images/scorpionbottles4.jpg"
              alt="Collection storage bottles containing scorpions"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg mb-8"
            />

            <h3 className="text-xl font-bold mb-4 text-gray-900" id="curation">Curation of Collections</h3>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              In May 2002, the Arachnid and Myriapod Collections were transferred from offices in the former Department of Entomology into a new facility within the AMNH, the Natural Sciences building (NSB). In the NSB, specimens are stored in state-of-the-art cabinetry and a climate-controlled environment to ensure their longevity. A long-term plan to upgrade these collections began in 2004. All old, unstandardized bottles and vials, many with bakelite closures or rubber stoppers, were replaced by new glass jars of standardized volumes with polyethylene closures and polypropylene-foam liners. Significant progress has been made but there are still large parts of the collection to be done. After the rebottling process is completed, the entire collection will be databased and catalogued by volunteers, who will also print out new labels for every specimen or specimen-lot.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <figure className="text-center">
                <Image
                  src="/images/collections_old.jpg"
                  alt="Refrigerator with trays of collection bottles in former storage facility"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Former storage facility</figcaption>
              </figure>
              <figure className="text-center">
                <Image
                  src="/images/collections_new.jpg"
                  alt="Refrigerator with trays of collection bottles in new storage facility"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="text-sm text-gray-600 mt-2">New storage facility</figcaption>
              </figure>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-900" id="collecting">Collecting</h3>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              Several (5-20) adult specimens per target taxon should be collected from the same population (locality), if possible. At least one specimen is required for DNA isolation; fewer specimens are required for large species, more for small species. One or more additional specimens are required for future archiving in the <a href="https://www.amnh.org/our-research/sackler-institute-for-comparative-genomics/facilities/amcc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Ambrose Monell Cryo-Collection</a>. At least two specimens (an adult male and female) are required as morphological vouchers, to be deposited in the AMNH Arachnid and Myriapod Collection. When adults are common, these should always be collected preferentially but, when they are not, subadults or juveniles will suffice for DNA isolation provided that the collector is confident that they are conspecific with the adults (which may then be preserved for morphological study). If possible, intact adult specimens from the same population (locality) as the specimens used for tissue samples should be collected as vouchers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Image
                src="/images/randyuv.jpg"
                alt="Randy Mercurio and a colleague using a UV light to look for scorpions in the field"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg"
              />
              <Image
                src="/images/sorting.jpg"
                alt="Lorenzo Prendini and a colleague sorting scorpions in the field"
                width={400}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-900" id="legal-documentation">Legal Documentation</h3>
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2">AMNH Specimen Transfer Form</h4>
              <p className="text-lg leading-8 text-gray-700">
                All specimens and tissue samples collected by non-AMNH staff and deposited into the AMNH collections are considered 'donations'. Non-AMNH staff must provide a signed copy of the <a href="https://research.amnh.org/users/lorenzo/PDF/AMNH_STF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">specimen transfer form (PDF)</a> with other legal documentation (if required) when donating specimens or samples. A completed, signed form must accompany each parcel of specimens received, not each specimen/lot.
              </p>
            </div>
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Specimens Collected in the US</h4>
              <p className="text-lg leading-8 text-gray-700">
                No permits are required if material originates from unprotected lands in the US. Material collected in national parks, reserves, etc. must be accompanied by collecting permits.
              </p>
            </div>
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Specimens Collected Beyond US Borders</h4>
              <p className="text-lg leading-8 text-gray-700 mb-4">
                Specimens or tissue samples collected beyond US borders cannot be deposited in the AMNH unless there is evidence that they were collected, exported and imported legally. The following documents are acceptable:
              </p>
              <p className="text-lg leading-8 text-gray-700 mb-4">
                If specimens were collected in countries that do not require collecting or export permits, a letter on letterhead, stating this fact, and hence that the samples were collected and exported legally, will suffice. A letter from someone in an official position, e.g. museum, in the country from which the specimens originated, attesting to this fact is even better.
              </p>
              <p className="text-lg leading-8 text-gray-700 mb-4">
                If specimens were collected in countries that do require permits, copies of permits issued at national (e.g. in Mexico) or provincial (e.g. in South Africa) levels must accompany the specimens for filing at the AMNH. If collecting permits cannot be obtained or it is unnecessary to do so, a letter on letterhead from someone at an academic institution (museum, university, academy) in the country of origin, stating that the specimens are the property of that institution and are donated (by implication, permanently) to the AMNH will suffice. Alternatively, the letter may be from someone at the donating institution stating that the material was acquired or collected legally (this would usually apply to material that was obtained from a third party). These letters circumvent the need for permits because they imply that the material was collected legally or at least that the burden of proof to demonstrate that rests with the donating individual or institution.
              </p>
              <p className="text-lg leading-8 text-gray-700">
                Permanent loans will be accepted in cases where objects or collections are owned by government agencies or institutions whose own collection policies do not allow for transfer of title. When a permanent loan is required, the custodial arrangements must be documented in writing and signed by the lender.
              </p>
            </div>
          </div>
          )}

          {activeSection === 'tissue-samples' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Tissue Samples</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              As part of our research on the molecular systematics of scorpions, a synoptic collection of scorpion tissues, comprising ca. 2000 tissue samples and associated vouchers (nearly a quarter of all described scorpion species and half of all described genera) has accumulated through fieldwork and donations or exchanges with colleagues around the world.
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-900">The Collection</h3>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              The collection is continually augmented and includes sizable holdings of tissue samples from Araneae (for the ATOL Spider Phylogeny project), Amblypygi, Chilopoda, Diplopoda, Opiliones, Palpigradi, Ricinulei, Schizomida, Solifugae and Uropygi, in addition to Scorpiones. Among other countries, this material originates from Argentina, Australia, Benin, Bolivia, Brazil, Bulgaria, Cameroon, Chile, Dominican Republic, France, French Guiana, Guinea-Bissau, Iran, Israel, Italy, Jamaica, Kazakhstan, Madagascar, Martinique, Mexico, Morocco, Myanmar, Namibia, New Caledonia, New Guinea, New Zealand, Nicaragua, Peru, Philippines, Puerto Rico, Senegal, Seychelles, Taiwan, Tanzania, Thailand, Turkey, South Africa, Uruguay, the U.S.A., Uzbekistan, and Yemen. These collections are currently being stored at -20ºC in large freezers in the Division of Invertebrate Zoology and will eventually be transferred to the <a href="https://www.amnh.org/our-research/sackler-institute-for-comparative-genomics/facilities/amcc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Ambrose Monell Collection for Molecular and Microbial Research</a> of the AMNH for permanent storage.
            </p>
            <Image
              src="/images/scorpionbottles3.jpg"
              alt="Collection storage bottles containing scorpions and labels"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg mb-8"
            />

            <h3 className="text-xl font-bold mb-4 text-gray-900" id="preparing-tissue">Preparing Tissue Samples</h3>
            
            <h4 className="font-bold text-gray-900 mb-2">Tissue samples</h4>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              If refrigeration facilities are available, place each specimen into a separate container of 95-100% ethanol (preferably analytical grade), and place this directly into the freezer (-20ºC). Ensure that the volume of ethanol in the vessel containing each specimen is at least five times the volume of the specimen. Leave the specimens in the freezer for at least 7 days before dispatching. Replace the (now diluted) ethanol before dispatching.
            </p>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              If refrigeration facilities are unavailable, place each specimen into a separate container of 95-100% ethanol (preferably analytical grade) and keep as cool as possible. If specimens are large and/or heavily sclerotized, remove a leg(s) from one side of the specimen and place into a small vial of 95-100% ethanol. Then inject the specimen, or make an incision, allowing the ethanol to diffuse into the tissues. Use a sterile scalpel or needle for each dissection/injection, and clean forceps in ethanol after each dissection. Place the specimen in a large vessel containing at least five times the volume of the specimen. Replace the ethanol in each container within 24 to 48 hours, and thereafter if it appears discolored. Larger samples may require ethanol to be replaced several times. Make sure to use labels to associate the vial with the larger vessel.
            </p>
            <Image
              src="/images/lorenzofixing.jpg"
              alt="Lorenzo Prendini in the field, fixing scorpions via injection"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg mb-8"
            />

            <h4 className="font-bold text-gray-900 mb-2">Vouchers</h4>
            <p className="text-lg leading-8 text-gray-700 mb-6">
              If intact specimens are used as vouchers, preserve these appropriately for morphological examination. If genitalia are used as vouchers, they must be dissected by the individual submitting the sample to the AMNH and placed in a microvial within the same vial as the tissue sample or in a separate, clearly labelled vial.
            </p>
            <Image
              src="/images/scorpionvials.jpg"
              alt="Vials of scorpions with a label on each lid"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg mb-8"
            />

            <h4 className="font-bold text-gray-900 mb-2">Documentation and archiving</h4>
            <p className="text-lg leading-8 text-gray-700 mb-4">
              All specimens and tissue samples must contain a label, indicating the following provenance data: country, state, region or province, district or county, locality, geographical coordinates (degrees and minutes or decimal degrees), collector, date, habitat, collection method. Labels should be typed, printed or legibly written in indelible ink.
            </p>
            <p className="text-lg leading-8 text-gray-700">
              All specimens and tissue samples must be authoritatively identified, preferably to species (if possible) and sexed, with indication whether or not the specimen is adult. If available, the species identification (including authority and date) and sex, as well as the name of the individual responsible for the identification may appear on a separate label in the vial with the specimen/tissue sample. Provenance data and identifications appearing on labels may also be sent to the AMNH in a spreadsheet.
            </p>
          </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
