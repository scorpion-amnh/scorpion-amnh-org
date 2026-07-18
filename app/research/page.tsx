import { ExternalLink } from "@/app/components/ExternalLink";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Research | Arachnology at AMNH",
  "Research areas of the Scorpion Systematics Research Group at the American Museum of Natural History."
);

export default function ResearchPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="mb-12">
          <h1 className="font-bold mb-8">Research</h1>
          <p className="mb-8">
            The Arachnology Lab at the AMNH focuses on the systematics and biogeography of scorpions (Scorpiones) and various understudied lineages, especially Pedipalpi, comprising the orders Amblypygi (whip spiders), Schizomida (short-tailed whip scorpions) and Thelyphonida (vinegaroons or whip scorpions). Our research also includes Ricinulei (hooded tick-spiders or ricinuleids), and Solifugae (camel-spiders, solifuges or solpugids), with additional contributions on spiders (Araneae) and harvestmen (Opiliones). Broad areas of research listed below.</p>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Scorpion Phylogeny and Higher Classification</h2>
            <p className="mb-6">
              The framework for our current research on scorpions is a global phylogeny of the Order Scorpiones, using exemplar species as terminal taxa, and morphological data, together with genomic data, as characters, supported by several sources, including National Science Foundation grant, <ExternalLink href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1655050&HistoricalAwards=false">Living Fossils: Integrating Phylogenomics and Comparative Morphology to Assemble the Scorpion Tree of Life</ExternalLink>. When a comprehensive phylogeny of the order is established, it will be possible to revise the contentious familial classification, investigate biogeographical patterns at the continental and intracontinental levels, and test adaptational hypotheses, e.g. concerning the evolution of scorpion venom.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Minor Arachnid Orders</h2>
            <p className="mb-6">
              We are also interested in the systematics of other smaller arachnid orders, notably Pedipalpi (Amblypygi, Thelyphonida and Schizomida), Ricinulei, and Solifugae, all of which are poorly understood. Our research on these taxa has been supported by several National Science Foundation grants: <ExternalLink href="https://research.amnh.org/atol/files/">Assembling the Tree of Life: Phylogeny of Spiders, Global Survey and Inventory of Solifugae, Systematics and Evolution of Pedipalpi (Whip Spiders and Whip Scorpions): Phylogenomics and Morphology of Understudied Arachnids</ExternalLink>. We are particularly interested in taxonomic revisions and phylogenetic analyses of southern African Solifugae, which comprise nearly one quarter of the world solifuge diversity. As patterns of solifuge distribution in southern Africa mirror those of the scorpions, research into their systematics will facilitate the study of congruent biogeographical patterns.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Revisionary Systematics</h2>
            <p className="mb-6">
              Besides investigating phylogenetic relationships among the major lineages of scorpions and other arachnids, we are interested in revisionary systematics, particularly of the North American, Afrotropical, and Asian scorpion faunas, including world revisions and biogeographical analyses of the Gondwana families Bothriuridae, Hormuridae and Scorpionidae, comprising several paraphyletic genera. This research has been supported among others by grants from the <ExternalLink href="https://www.dcceew.gov.au/science-research/abrs">Australian Biological Resources Study (ABRS) - DCCEEW</ExternalLink>, the <ExternalLink href="https://www.nationalgeographic.org/society/grants-and-investments/">National Geographic Society</ExternalLink>, the <ExternalLink href="https://www.bsf.org.il/">U.S.-Israel Binational Science Foundation (BSF)</ExternalLink>, and an award from the <ExternalLink href="https://www.nsf.gov/awardsearch/show-award/?AWD_ID=0413453">U.S. National Science Foundation: Revisionary Systematics of the North American Scorpion Family Vaejovidae</ExternalLink>.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Adaptational and Biogeographical Hypotheses</h2>
            <p className="mb-6">
              Phylogenetic analysis precedes the testing of adaptational and biogeographical hypotheses involving arachnids. Our research on scorpions, schizomids, and whip spiders and ricinuleids tested hypotheses about dispersal, vicariance, adaptation, and diversification in Africa, Asia, Europe, North and South America. Some of this work has also been supported by the U.S. National Science Foundation, e.g., STAR: Phylogenomics and Biogeography of Neotropical Tityus: The World’s Most Speciose Scorpion Genus.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Comparative Morphology and Anatomy</h2>
            <p className="mb-6">
              Our work on the systematics and evolution of arachnids relies heavily on their external morphology and internal anatomy, yet many character systems have not been studied in over a century and never in a comparative framework. We have published comparative studies on the eyes, pedipalp carinae and trichobothria, mesosomal organs, circulatory system and sperm packages of scorpions, the chelicerae, pedipalp papillae, and tracheal system of camel spiders (Solifugae), and the pedipalp spination of whip spiders (Amblypygi).
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Distribution and Conservation</h2>
            <p className="mb-6">
              Many range-restricted scorpions and other arachnids are threatened by current land-use practices, climate change, and harvesting for the venom and/or exotic pet trades, yet few are afforded any official protection. Atlasing arachnid distributions, based on historical material contained in natural history collections and new material collected during ongoing expeditions, is important for inventorying their diversity and understanding their distributions. When arachnid distributions have been accurately mapped, assessments of their conservation status can be undertaken. Grants from the Foundational Biodiversity Information Program of the National Research Foundation, South Africa, assisted us with field inventories of arachnid diversity and distribution in the <ExternalLink href="https://fbip.co.za/biogaps-project/">Karoo</ExternalLink> and the <ExternalLink href="https://fbip.co.za/news/waterberg-mountain-complex-in-focus-as-fbip-awards-large-grant/">Waterberg</ExternalLink> of South Africa. Grants (<ExternalLink href="http://jrsbiodiversity.org/grant/national-museum-bloemfontein/">Improvement and Integration of Arachnid Biodiversity Information in South Africa</ExternalLink>) and the SYNTHESYS+ Transnational Access program (<ExternalLink href="https://www.synthesys.info/access/transnational-access.html">SYNTHESYS - an integrated European infrastructure for researchers in the natural sciences</ExternalLink>) of the European Union, enabled us to identify and digitize the scorpion holdings of major natural history collections in sub-Saharan Africa, Europe, and the U.K., as part of ongoing taxon inventories.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Behavior</h2>
            <p className="mb-6">
              We are interested in several aspects of arachnid behavior. We have publications and/or ongoing projects on burrowing biology, defense behavior and sound production in scorpions; defense secretions of Uropygi (schizomids and thelyphonids); and courtship and mating in scorpions, camel spiders (Solifugae), and whip spiders (Amblypygi).
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Paleontology</h2>
            <p className="mb-6">
              An understanding of arachnid phylogeny and evolution requires knowledge of extinct lineages. We have published on fossil scorpions, hooded tick spiders (Ricinulei) and whip spiders (Amblypygi) and are interested in the evolution of terrestrialization.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Theory and Practice of Systematics</h2>
            <p className="mb-6">
              Although our research is empirically focused, empirical research is no better than the theory on which it is based. Nowhere is this more evident than in the field of systematics. Our research is grounded in phylogenetic theory. We advocate a holistic, monographic approach to systematics, combining species-level taxonomy, phylogenetic and biogeographical analysis, and integrating morphological, genomic and geographical data. Our research keeps pace with current methods and philosophy in morphology and genomics. We are equally interested in developing new paradigms in the homology of morphological character systems and exploring cutting-edge approaches to phylogenomics and biogeographical analysis.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Insect-Plant Associations</h2>
            <p className="mb-6">
              Besides arachnids, we are interested in the evolution of insect-plant associations and have studied parallel cladogenesis between cephaleline leaf hoppers (Cicadellidae) and Restionaceae as well as between <i>Tetraopes</i> beetles (Cerambycidae) and <i>Asclepias</i> milkweeds.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-4">Funding</h2>
            <p className="mb-6">
              We acknowledge the past and ongoing support of the following organizations, foundations and funding agencies for our research:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><ExternalLink href="http://www.americanarachnology.org/">American Arachnological Society</ExternalLink></li>
              <li><ExternalLink href="https://www.amnh.org/">American Museum of Natural History</ExternalLink></li>
              <li><ExternalLink href="http://www.environment.gov.au/science/abrs">Australian Biological Resources Study</ExternalLink></li>
              <li><ExternalLink href="https://eseb.org/">ESEB | European Society for Evolutionary Biology</ExternalLink></li>
              <li><ExternalLink href="https://www.synthesys.info/access/transnational-access.html">European Union SYNTHESYS+ Transnational Access program</ExternalLink> (an integrated European infrastructure for researchers in the natural sciences)</li>
              <li><ExternalLink href="https://explorers.org/">Explorers Club</ExternalLink></li>
              <li><ExternalLink href="https://www.hec.gov.pk/english/pages/home.aspx">Higher Education Commission of Pakistan</ExternalLink></li>
              <li><ExternalLink href="https://arachnology.org/">International Society of Arachnology</ExternalLink></li>
              <li><ExternalLink href="http://jrsbiodiversity.org/">JRS Biodiversity Fund</ExternalLink></li>
              <li><ExternalLink href="https://www.maxkadefoundation.org/grants">Max Kade Foundation</ExternalLink></li>
              <li><ExternalLink href="http://www.speciesconservation.org/">Mohammad bin Zayed Species Conservation Fund</ExternalLink></li>
              <li><ExternalLink href="http://www.mcz.harvard.edu/">Museum of Comparative Zoology, Harvard University</ExternalLink></li>
              <li><ExternalLink href="http://nationalgeographic.org/">National Geographic Society</ExternalLink></li>
              <li><ExternalLink href="http://www.nrf.ac.za/">National Research Foundation of South Africa</ExternalLink></li>
              <li><ExternalLink href="http://skyefoundation.co.za/">Skye Foundation and Charitable Trust</ExternalLink></li>
              <li><ExternalLink href="https://www.snf.org/">Stavros Niarchos Foundation</ExternalLink></li>
              <li><ExternalLink href="https://www.bsf.org.il/">U.S.-Israel Binational Science Foundation</ExternalLink></li>
              <li><ExternalLink href="http://www.nsf.gov/">U.S. National Science Foundation</ExternalLink></li>
              <li><ExternalLink href="https://www.rlounsbery.org/">Richard Lounsbery Foundation</ExternalLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
