import { ExternalLink } from "@/app/components/ExternalLink";
import { Figure } from "@/app/components/Figure";
import type { Metadata } from "next";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Facilities | Arachnology at AMNH",
  "Research facilities available to the Arachnology Lab at the American Museum of Natural History."
);

export default function FacilitiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">Facilities</h1>
        <p className="text-xl text-gray-700 mb-12">The Arachnology Lab has access to multiple research facilities in the Division of Invertebrate Zoology and associated facilities in the American Museum of Natural History.</p>

        <h2 className="text-3xl font-bold mb-6 text-gray-900">Scorpion Research Laboratory</h2>
        <p className="text-lg leading-8 text-gray-700 mb-8">
          The Scorpion Research Laboratory is situated in the Division of Invertebrate Zoology, in Section 13 (old Entomology Department) on the fifth floor of the AMNH. There you can find the offices of Lorenzo Prendini and the Museum Specialists. Student offices are located on the sixth floor. The collection is located in the Natural Sciences Building (NSB). We have a separate Molecular Lab and access to other facilities and laboratories at the AMNH.
        </p>

        <h2 className="text-3xl font-bold mb-6 text-gray-900">Research Laboratory Facilities</h2>
        
        <h3 className="text-xl font-bold mb-4 text-gray-900">Natural Sciences Building Optical Equipment</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The Arachnology Lab in the Division of Invertebrate Zoology, AMNH, is equipped with one Leica MZ16 and five Nikon SMZ1500 dissection microscopes with drawing attachments. Another Nikon stereomicroscope is available in the Natural Sciences Building for use by visitors to the <ExternalLink href="https://www.amnh.org/research/invertebrate-zoology/collections/arachnida--myriapoda">Arachnid and Myriapod Collections.</ExternalLink>
        </p>
        <Figure
          src="/images/museum/leica.jpg"
          alt="Leica MZ16"
          width={600}
          height={400}
          imageClassName="w-full h-auto rounded-lg"
          caption="Leica MZ16"
        />

        <p className="text-lg leading-8 text-gray-700 mb-6">
          A Microptics™ ML1000 system, in the Arachnology Lab, allows digital photomicrography of dry and wet (ethanol submerged) as well as large to small specimens under visible and long-wave ultraviolet light (the latter exploiting the fluorescence property of the scorpion epicuticle).
        </p>
        <Figure
          src="/images/museum/microptics_area.jpg"
          alt="Lab area with Microptics™ ML1000 system"
          width={600}
          height={400}
          imageClassName="w-full h-auto rounded-lg"
          caption="Microptics™ ML1000 system"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Image
            src="/images/research/carapace.jpg"
            alt="Scorpion carapace"
            width={400}
            height={400}
            className="w-full h-auto rounded-lg"
          />
          <Image
            src="/images/research/chela.jpg"
            alt="Scorpion chela"
            width={400}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-900">Molecular Systematics Laboratory</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The <ExternalLink href="https://www.amnh.org/research/institute-comparative-genomics/molecular-labs">Molecular Systematics Laboratory</ExternalLink> contains equipment for high throughput Sanger DNA sequencing, including an Applied Biosystems Inc. Prism™ 3730xl automated DNA sequencer, a Biomek NX sequencing robot for automated PCR and sequence purification and several Eppendorf Mastercyclers. Facilities for next generation sequencing are available in the <ExternalLink href="https://www.amnh.org/our-research/sackler-institute-for-comparative-genomics">Sackler Institute for Comparative Genomics</ExternalLink> and our partner institution <ExternalLink href="http://www.nygenome.org">The New York Genome Center.</ExternalLink>
        </p>
        <Image
          src="/images/people/Ofelia-Delgado.jpg"
          alt="Ofelia Delgado working in the molecular lab"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h2 className="text-3xl font-bold mb-6 text-gray-900">Associated AMNH Facilities</h2>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          Lorenzo Prendini's Arachnology Lab has access to the parallel virtual supercomputer clusters, the Invertebrate Zoology Histological Laboratory, the GIS Laboratory of the Center for Biodiversity and Conservation, the Microscopy and Imaging Facility, and the AMNH Library. Other services and facilities of the AMNH are also available.
        </p>
        <Image
          src="/images/research/chelicerae.jpg"
          alt="Scorpion chelicerae"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">Parallel Virtual Supercomputer Cluster</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The AMNH <ExternalLink href="https://www.amnh.org/research/computational-sciences">science computing cluster,</ExternalLink> designed especially for phylogenetic analysis of genomic data, comprises 560 Pentium III processors (432 Gflop peak performance). Built with 'off-the-shelf' components, it is the fastest parallel computing cluster installed in an evolutionary biology laboratory and one of the fastest in a non-defense environment. Its size is presently being doubled and its capacity tripled. An AMNH staff member attends to the upkeep of the cluster, technical assistance and training of users.
        </p>
        <Image
          src="/images/museum/beowulf.jpg"
          alt="Beowulf supercomputer cluster at the American Museum of Natural History"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">Histological Laboratory</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The Histological Laboratory of the Division of Invertebrate Zoology is fully equipped for anatomical work. It includes automated embedding facilities, paraffin and plastic serial thick and semi-thin sectioning equipment (including microtome, glass knife maker, etc.) as well as standard laboratory equipment. If required for the analysis of histological slides, 3-D reconstruction software and digitizing hardware are available.
        </p>
        <Image
          src="/images/research/circulatory.gif"
          alt="Scorpion circulatory system"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">Scientific Illustration</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The staff of the Division of Invertebrate Zoology includes <a href="/people/staff" className="text-blue-600 hover:text-blue-800 underline">Steve Thurston,</a> a scientific illustrator, proficient in graphical software techniques as well as traditional scientific illustration.
        </p>
        <Image
          src="/images/research/drawing.jpg"
          alt="Illustration of Amblypygi by Steve Thurston"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">Remote Sensing & GIS Laboratory</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          A Remote Sensing and GIS laboratory, with UNIX workstations, digitizers and site licenses for ArcView GIS, ARC/INFO, and ArcUSA, is available at the <ExternalLink href="https://cbc.amnh.org">Center for Biodiversity and Conservation</ExternalLink> (CBC). The CBC has also produced a <ExternalLink href="https://www.amnh.org/our-research/center-for-biodiversity-conservation/biodiversity-informatics">website</ExternalLink> to promote the use of remotely sensed imagery (such as satellite imagery and aerial photography). The site provides remote sensing guides to locate, download, and view satellite imagery; material and information for remote sensing training courses and workshops offered by the CBC and other organizations; interactive tools to illustrate fundamental remote sensing concepts; and links to an array of remote sensing information available on the Internet.
        </p>
        <Image
          src="/images/field/giscbc.jpg"
          alt="Satellite image of immediate and board views of targeted areas over time. Biodiversity informatics from the Center for Biodiversity and Conservation"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">Microscopy and Imaging Facility</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The AMNH <ExternalLink href="https://www.amnh.org/research/microscopy-and-imaging-facility">Microscopy and Imaging Facility</ExternalLink> has a state-of-the-art Hitachi Scanning Electron Microscope and a Zeiss Variable Pressure SEM, including all peripherals (e.g. critical point dryer, sputter coater and darkroom). The SEMs are equipped for standard photography, as well as electronic image capture and handling. The facility is also equipped with a GE PHOENIX CT Scanner and a Zeiss ConFocal Laser Scanning Microscope for 3-D reconstruction. X-ray microanalysis (EDS) and cathodoluminescence techniques are also available. Two AMNH staff members are devoted exclusively to upkeep of the facility, technical assistance and training of users.
        </p>
        <Image
          src="/images/research/heart.gif"
          alt="Scorpion heart"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">AMNH Library</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The AMNH <ExternalLink href="https://www.amnh.org/research/research-library">Research Library and Learning Center</ExternalLink> maintains and develops a collection of 450,000 volumes of books and bound journals, as well as electronic and microform materials essential to the scientific, exhibition and educational missions of the AMNH. The library currently receives more than 4,360 journals from sources worldwide. The library is one of the best in the USA for biosystematic studies and contains a range of periodicals relevant to systematics and phylogenetics in general, as well as journals relevant to taxonomic groups under study by AMNH researchers. The library also contains an extensive collection of old literature, essential for nomenclatural purposes. AMNH staff, visiting researchers, postdoctoral fellows, students, and volunteers have ready access to the library collections and to varied services offered by library staff, from reference and bibliographic assistance to interlibrary loans.
        </p>
        <Image
          src="/images/museum/amnh_library.jpg"
          alt="Library at the American Museum of Natural History"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg mb-8"
        />

        <h3 className="text-xl font-bold mb-4 text-gray-900">AMNH Publications</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The AMNH publishes several peer-reviewed journals, two of which are world-renowned for the publication of empirical research in systematics: <ExternalLink href="http://digitallibrary.amnh.org/handle/2246/9">American Museum Novitates</ExternalLink> for short papers and <ExternalLink href="http://digitallibrary.amnh.org/handle/2246/7">Bulletin of the American Museum of Natural History</ExternalLink> for monographs. Further information is available at the <ExternalLink href="https://www.amnh.org/research/scientific-publications">Office of Scientific Publications website.</ExternalLink>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Image
            src="/images/publications/AMNH_Novitates.jpg"
            alt="Cover of the journal American Museum Novitates"
            width={400}
            height={500}
            className="w-full h-auto rounded-lg"
          />
          <Image
            src="/images/publications/AMNH_Bulletin.jpg"
            alt="Cover of the journal Bulletin of the American Museum of Natural History"
            width={400}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-900">Southwestern Research Station (SWRS)</h3>
        <p className="text-lg leading-8 text-gray-700 mb-6">
          The <ExternalLink href="https://research.amnh.org/swrs">SWRS</ExternalLink> is a biological field station owned and operated by the AMNH. Since 1955, it has served biologists, geologists, and anthropologists interested in studying the diverse environments and biota of the Chiricahua Mountains in southeastern Arizona. The Station welcomes scientists and advanced students from all parts of the USA and abroad to carry out their research projects. Investigators live in comfortable cabins provided with linens and blankets, and take their meals, cafeteria-style, in a common dining room. The main house contains a dining room, library, lounge with fireplace, ping-pong room, and laundry room. Outside is a large swimming pool, volleyball court, and horseshoe pit. The area is laced with trails for hiking and climbing amongst spectacular scenery. The Station is open all year but scientists must cook for themselves from early November through early March. Facilities in the Osborn Memorial Laboratory include library, insect collection, herbarium, vertebrate collections, photography laboratory, etc. Completed in 1992, the Technical Equipment Laboratory provides excellent microscopic facilities, constant temperature chambers, chemical hood, low-temperature freezer, precision balances, centrifuges, etc. Recent additions of outdoor aviary complexes and an Animal Behavior Observatory afford outstanding facilities for ethological and behavioral ecological studies.
        </p>
        <Image
          src="/images/field/swrs.jpg"
          alt="American Museum of Natural History Southwestern Research Station (SWRS)"
          width={600}
          height={400}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}
