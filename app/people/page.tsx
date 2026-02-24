'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SideNav } from "../components/SideNav";

export default function People() {
  const [activeSection, setActiveSection] = useState('lab-evolution');
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'lab-evolution', label: 'Lab Evolution' },
    { id: 'principal-investigator', label: 'Principal Investigator' },
    { id: 'staff', label: 'Staff' },
    { id: 'postdocs', label: 'Postdocs' },
    { id: 'graduate-students', label: 'Graduate Students' },
    { id: 'undergraduate-students', label: 'Undergraduate Students' },
    { id: 'high-school-students', label: 'High School Students' },
    { id: 'volunteers', label: 'Volunteers' },
    { id: 'visiting-students', label: 'Visiting Students' },
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
        <h1 className="text-5xl font-bold mb-8 text-gray-900">People</h1>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          The Arachnology Lab, headed by Lorenzo Prendini, Associate Curator (Arachnids and Myriapods), 
          includes permanent specialists, various laboratory assistants, postdoctoral fellows, and PhD students. 
          Every year, the Group accommodates several visiting scientists, undergraduate students, high school students, and volunteers.
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
        {activeSection === 'lab-evolution' && (
        <div>
          {/* Fall 2019 */}
          <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Fall 2019</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/labfall2019_p08qpk.jpg"
              alt="Fall 2019 Arachnology Lab at AMNH. Left to Right: George Tsinias, Jairo Moreno, Lorenzo Prendini, Stephanie Loria, Valentin Ehrenthal, Eleanor Goetz, Pio Colmenares, Miryam Trujillo, Ricardo Botero-Trujillo."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: George Tsinias, Jairo Moreno, Lorenzo Prendini, Stephanie Loria, 
              Valentin Ehrenthal, Eleanor Goetz, Pio Colmenares, Miryam Trujillo, Ricardo Botero-Trujillo.
            </figcaption>
          </figure>
        </div>

        {/* July 2019 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">July 2019</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/summer2019.jpg"
              alt="July 2019 Arachnology Lab at AMNH. Left to Right: Elena Babicz, Andria Santos da Silva, Stephanie Loria, Pio Colmenares, Colby Sain, Lorenzo Prendini, Jairo Andres Moreno, Ricardo Botero-Trujillo."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Elena Babicz, Andria Santos da Silva, Stephanie Loria, Pio Colmenares, 
              Colby Sain, Lorenzo Prendini, Jairo Andres Moreno, Ricardo Botero-Trujillo.
            </figcaption>
          </figure>
        </div>

        {/* August 2018 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">August 2018</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/Prendini_Lab_Summer2018.jpg"
              alt="August 2018 Arachnology Lab at AMNH. Left to Right: Stephanie Loria, Max Roppo, Lorenzo Prendini, Diogo Casellato, Lou Sorkin, Pio Colmenares, Deborah Chin, Victoria Long, Jayson Slovak."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Stephanie Loria, Max Roppo, Lorenzo Prendini, Diogo Casellato, Lou Sorkin, 
              Pio Colmenares, Deborah Chin, Victoria Long, Jayson Slovak.
            </figcaption>
          </figure>
        </div>

        {/* September 2017 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">September 2017</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/PrendiniLabSeptember2017.jpg"
              alt="September 2017 Arachnology Lab at AMNH. Left to Right: Pio Colmenares, Ivan Magalhães, Lorenzo Prendini, Tebogo Lebwada, Lou Sorkin, Gerardo Contreras, Rodrigo Monjaraz-Ruedas."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Pio Colmenares, Ivan Magalhães, Lorenzo Prendini, Tebogo Lebwada, 
              Lou Sorkin, Gerardo Contreras, Rodrigo Monjaraz-Ruedas.
            </figcaption>
          </figure>
        </div>

        {/* August 2017 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">August 2017</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/PrendiniLabAugust2017.jpg"
              alt="August 2017 Arachnology Lab at AMNH. Left to Right: Stephanie Loria, Lorenzo Prendini, Pio Colmenares, Jayson Slovak, Deborah Chin."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Stephanie Loria, Lorenzo Prendini, Pio Colmenares, Jayson Slovak, Deborah Chin.
            </figcaption>
          </figure>
        </div>

        {/* August 2015 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">August 2015</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/PrendiniLabAugust2015.jpg"
              alt="August 2015 Arachnology Lab at AMNH. Left to Right: Lorenzo Prendini, Gustavo Miranda, Debbie Alwill, Diogo Casellato (back), Stephanie Loria, Bastian-Jesper Klüßmann-Fricke (back), Michelle Locke, Chelsea Silva, Billy Conlan."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Lorenzo Prendini, Gustavo Miranda, Debbie Alwill, Diogo Casellato (back), 
              Stephanie Loria, Bastian-Jesper Klüßmann-Fricke (back), Michelle Locke, Chelsea Silva, Billy Conlan.
            </figcaption>
          </figure>
        </div>

        {/* January 2015 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">January 2015</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/PrendiniLabJan2015.jpg"
              alt="January 2015 Arachnology Lab at AMNH. Left to Right: Michelle Locke, Lorenzo Prendini, Stephanie Loria."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Michelle Locke, Lorenzo Prendini, Stephanie Loria.
            </figcaption>
          </figure>
        </div>

        {/* August 2013 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">August 2013</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/scorpiongroups2013.jpg"
              alt="August 2013 Arachnology Lab at AMNH. Left to Right: Pam Horsely, Stephanie Loria, Lorenzo Prendini, Massimiliano Roppo, Muhammad Tahir."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Pam Horsely, Stephanie Loria, Lorenzo Prendini, Massimiliano Roppo, Muhammad Tahir.
            </figcaption>
          </figure>
        </div>

        {/* August 2011 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">August 2011</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/scorpiongroups.jpg"
              alt="August 2011 Arachnology Lab at AMNH. Left to Right: Stephanie Loria, Adam Getzler, Ofelia Delgado, Edmundo Gonzalez, Carlos Santibanez, Lorenzo Prendini, Randy Mercurio."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Stephanie Loria, Adam Getzler, Ofelia Delgado, Edmundo Gonzalez, 
              Carlos Santibanez, Lorenzo Prendini, Randy Mercurio.
            </figcaption>
          </figure>
        </div>

        {/* 2006 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">2006</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/scorpiongroup.jpg"
              alt="2006 Arachnology Lab at AMNH Left to Right: (Back Row) Jeremy Huff, Erich Volschenk, Lionel Monod, Edmundo Gonzalez, (Front Row) Randy Mercurio, Camilo Mattoni, Lauren Esposito, Monica Mosier, Ofelia Delgado, Valerio Vignoli, Lorenzo Prendini."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: (Back Row) Jeremy Huff, Erich Volschenk, Lionel Monod, Edmundo Gonzalez, 
              (Front Row) Randy Mercurio, Camilo Mattoni, Lauren Esposito, Monica Mosier, Ofelia Delgado, 
              Valerio Vignoli, Lorenzo Prendini.
            </figcaption>
          </figure>
        </div>

        {/* 2007 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">2007</h2>
          <h6 className="text-lg text-gray-600 mb-6">Scorpion Biologists ICA</h6>
          <figure className="mb-8">
            <Image
              src="/images/ica.jpg"
              alt="2007 Scorpion Biologists ICA Left to Right: (Back Row) Carsten Kamenz, Mingsheng Zhu, Edmundo Gonzalez, Roger Farley, Erich Volschenk, Lauren Esposito, Camilo Mattoni, (Front Row) Jason Dunlop, Jeremy Huff, Warren Savary, Ricardo Pinto-da-Rocha, Oscar Francke, Lorenzo Prendini."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: (Back Row) Carsten Kamenz, Mingsheng Zhu, Edmundo Gonzalez, Roger Farley, 
              Erich Volschenk, Lauren Esposito, Camilo Mattoni, (Front Row) Jason Dunlop, Jeremy Huff, 
              Warren Savary, Ricardo Pinto-da-Rocha, Oscar Francke, Lorenzo Prendini.
            </figcaption>
          </figure>
        </div>

        {/* October 2007 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">October 2007</h2>
          <h6 className="text-lg text-gray-600 mb-6">BSI Solifugae Meeting at DMNS</h6>
          <figure className="mb-8">
            <Image
              src="/images/Solifugae_2007.jpg"
              alt="October 2007 BSI Solifugae Meeting at DMNS. Left to Right: Kristie Reddick (TAMU), Bob Wharton (TAMU), Warren Savary (CAS), Aaron Spriggs (DMNS), Tharina Bird (NMNW/CSU), Paula Cushing (DMNS), Lorenzo Prendini (AMNH), Sasha Gromov (IZAK), Jack Brookhart (DMNS)."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Kristie Reddick (TAMU), Bob Wharton (TAMU), Warren Savary (CAS), Aaron Spriggs (DMNS), 
              Tharina Bird (NMNW/CSU), Paula Cushing (DMNS), Lorenzo Prendini (AMNH), Sasha Gromov (IZAK), 
              Jack Brookhart (DMNS).
            </figcaption>
          </figure>
        </div>

        {/* December 2008 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">December 2008</h2>
          <h6 className="text-lg text-gray-600 mb-6">AToL Morphology Scoring Party at Smithsonian USNM</h6>
          <figure className="mb-8">
            <Image
              src="/images/Atol_2008.jpg"
              alt="December 2008 AToL Morphology Scoring Party at Smithsonian USNM. Left to Right: Petra Sierwald (FMNH), Jonathan Coddington (USNM), Lorenzo Prendini (AMNH), Gustavo Hormiga (GWU), Charles Griswold (CAS)."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: Petra Sierwald (FMNH), Jonathan Coddington (USNM), Lorenzo Prendini (AMNH), 
              Gustavo Hormiga (GWU), Charles Griswold (CAS).
            </figcaption>
          </figure>
        </div>
        </div>
        )}

        {activeSection === 'principal-investigator' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Principal Investigator</h2>
          <p className="text-xl text-gray-600 mb-8">Curator of The Arachnology Lab at AMNH</p>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold mb-1 text-gray-900">Lorenzo Prendini</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Head of the Arachnology Lab at AMNH, Curator of Arachnids and Myriapods in the Division of Invertebrate Zoology
                </p>
                
                <div className="space-y-3 mb-8">
                  <p>
                    <a 
                      href="https://www.researchgate.net/profile/Lorenzo-Prendini" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Research Gate
                    </a>
                  </p>
                  <p>
                    <a 
                      href="/documents/PrendiniCV2020_jyaiq9.pdf" 
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Curriculum Vitae (PDF)
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://www.amnh.org/explore/videos/research-and-collections/profile-lorenzo-prendini" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      AMNH Meet the Scientists Video
                    </a>
                  </p>
                  <p>
                    <a 
                      href="https://scholar.google.com/citations?user=fU0VpL0AAAAJ&hl=en&oi=ao" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Google Scholar
                    </a>
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-bold mb-4 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>Curator of Arachnida and Myriapoda</p>
                    <p>Division of Invertebrate Zoology</p>
                    <p>American Museum of Natural History</p>
                    <p>Central Park West at 79th Street</p>
                    <p>New York, NY 10024-5192</p>
                    <p>USA</p>
                    <p className="mt-3">Email: lorenzo@amnh.org</p>
                    <p>Phone: (212) 769-5843</p>
                    <p>Fax: (212) 769-5277</p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <figure>
                  <Image
                    src="/images/prendini.jpg"
                    alt="Lorenzo Prendini"
                    width={500}
                    height={750}
                    className="w-full h-auto rounded-lg"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeSection === 'staff' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Staff</h2>
          <p className="text-xl text-gray-600 mb-8">Current staff of Arachnology at AMNH</p>
          
          {/* Pio Colmenares */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Pio.jpg"
                  alt="Pío A. Colmenares"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Pío A. Colmenares</h3>
                <p className="text-lg text-gray-600 mb-4">Museum Specialist, Arachnid and Myriapod Collections</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Pio_Colmenares" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Pío is an arachnologist with experience in taxonomy and ecology. His main research interests are the taxonomy, systematics, ecology, conservation and biogeography of Opiliones. In addition to working with Opiliones, he also has experience in the taxonomy of other arachnid orders, such as Amblypygi, Schizomida, Solifugae, and spiders of the family Pholcidae. Pío joined the AMNH staff in 2016 and is currently in charge of the Arachnid and Myriapod Collections.
                </p>
                <p className="text-gray-700 mb-6">
                  Pío began his studies at the University of Zulia (LUZ) in Maracaibo, Venezuela, where he received his undergraduate degree in biology in 2008. During his time as a student, he worked in the Museum of Biology at La Universidad del Zulia (MBLUZ). Upon graduating, he started working as a research assistant of the Biodiversity Unit at the Instituto Venezolano de Investigaciones Científicas (IVIC) in Caracas, Venezuela. In 2009 he studied at the National Museum of Natural History of the Smithsonian Institution in Washington, DC, where he received training in curatorial techniques and management of various natural history collections. In 2015, he defended his doctoral thesis on Amazonian Harvestmen communities at the Instituto Nacional de Pesquisas da Amazônia (INPA) in Manaus, Brazil.
                </p>
                <div className="mt-6">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>Division of Invertebrate Zoology</p>
                    <p>American Museum of Natural History</p>
                    <p>Central Park West at 79th Street</p>
                    <p>New York, NY 10024-5192</p>
                    <p>USA</p>
                    <p className="mt-2">Email: pcolmenares@amnh.org</p>
                    <p>Phone: (212) 769-5614</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steve Thurston */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/thurston.jpg"
                  alt="Steve Thurston"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Steve Thurston</h3>
                <p className="text-lg text-gray-600 mb-4">Scientific Illustrator</p>
                <p className="text-gray-700 mb-4">
                  While completing his BS in Horticulture at the University of Connecticut (1977), Steve was trained by M.J. Brush in the Biological Illustration studio and began working as a scientific illustrator, drawing bugs for Dr. James A. Slater. He later received his MFA in New Genres/Video at The San Francisco Art Institute and has worked variously as a carpenter, video maker, artist and illustrator. He began full time employment at the AMNH in 1999 as a Scientific Assistant, providing illustration, photo and graphic support to the Division of Invertebrate Zoology.
                </p>
                <Image
                  src="/images/drawing.jpg"
                  alt="Illustration of Amblypygi by Steve Thurston"
                  width={400}
                  height={300}
                  className="mt-4 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Louis Sorkin */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/lou.jpg"
                  alt="Louis Sorkin"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Louis Sorkin</h3>
                <p className="text-lg text-gray-600 mb-4">Visiting Scientist, New York Entomological Society</p>
                <p className="text-gray-700">
                  Lou began his career in arachnid studies during his graduate work at the University of Connecticut where he researched arthropod parasites of spiders. In 1978, Lou began work on spiders and other arachnids under Dr. Norman Platnick, in what was then the Department of Entomology at the AMNH. Over the years he sorted through many spider collections and labeled thousands of vials and worked with many arachnologists, some visiting and examining the museum's collection and sometimes at other institutions during his visits or on excursions from arachnology meetings. He deals with many public inquiries regarding insects and other arthropods. He has interests in entomophagy and forensic entomology (the latter includes stored products, urban, and medico-legal studies). Some of the cases and investigations have been aired online, on television and radio and in the print media. At present, some of his studies include investigations of the common bed bug, <em>Cimex lectularius</em> (Hemiptera: Cimicidae) due to the relatively recent increase in infestations of many homes, business, hotels, by this insect and for which he receives inquiries on their natural history and biology and management. He keeps a few bed bug colonies for study and for educational purposes. After 43 years of dedicated service, Lou retired from his position as Museum Specialist for the Spider Collection in early 2020. He will remain associated with the AMNH Invertebrate Zoology Division to continue with his outreach activities and the organization of the New York Entomological Society.
                </p>
              </div>
            </div>
          </div>

          {/* Vladimir Ovtsharenko */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Vladimir.jpg"
                  alt="Vladimir Ovtsharenko"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Vladimir Ovtsharenko</h3>
                <p className="text-lg text-gray-600 mb-4">Research Associate, Hostos Community College</p>
                <p className="text-gray-700 mb-6">
                  Vladimir is a research associate in the Division of Invertebrate Zoology at the American Museum of Natural History (AMNH), and Curator of the Arachnological Collections at the Zoological Institute of the Russian Academy of Sciences. Dr. Ovtsharenko's research is on spider taxonomy: the science of identifying and classifying species according to their evolutionary relationships. Since the AMNH houses the largest spider collection in the world, with over a million spider specimens, and the arachnological research carried out there is among the best in the world, it is an ideal place for Vlad to work.
                </p>
                <div className="mt-6">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>Email: ovtshare@amnh.org</p>
                    <p>Phone: (212) 769-5618</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boris Zakharov */}
          <div className="mb-12 pb-12 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Boris.jpg"
                  alt="Boris Zakharov"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold mb-1 text-gray-900">Boris Zakharov</h3>
                <p className="text-lg text-gray-600 mb-4">Research Associate, La Guardia Community College</p>
                <p className="text-gray-700 mb-6">
                  Boris has a wide range of research experiences and interests, primary within the fields of Invertebrate Zoology, Biogeography, Evolution and System Theory approach in Biology. His Master's project in Arachnology (1979) was performed at Far East State University at city Vladivostok (Russia) and dedicated to orb-weaving spiders Family Araneidae of South East Russia. In 1989, he earned his PhD in Entomology from Novosibirsk Biological Institute and it was dedicated to horse flies and deer-flies (Insecta, Diptera, Tabanidae) of South-East Transbaikalia. Currently, Boris am working in collaboration with Vladimir Ovtcharenko on the study of the ground spiders of Australia and New Zealand and the study of invertebrate dynamics in the Black Rock Forest.
                </p>
                <div className="mt-6">
                  <h4 className="text-base font-bold mb-3 text-gray-900">Contact</h4>
                  <div className="text-gray-700 space-y-1">
                    <p>Email: zakharov@amnh.org</p>
                    <p>Phone: (212) 769-5609</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alumni Section */}
          <h3 className="text-2xl font-bold mt-12 mb-2 text-gray-900">Alumni</h3>
          <p className="text-xl text-gray-600 mb-8">Former staff of Arachnology at AMNH</p>

          {/* Eleanor Goetz */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Eleanor1_blmjit.jpg"
                  alt="Eleanor Goetz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-bold mb-1 text-gray-900">Eleanor Goetz</h4>
                <p className="text-base text-gray-600 mb-1">Lab Technician</p>
                <p className="text-sm text-gray-500 mb-3">Staff from 2019 to 2021</p>
                <p className="text-gray-700">
                  Eleanor graduated from Smith College in 2019 with a BA in Biological Sciences, where she was a member of the Katz Lab and focussed on the lifecycles of foraminifera. She started in the Prendini lab as a Science Research Mentoring Program student in 2013 and continued to volunteer before starting as a Lab Technician in the fall of 2019. Eleanor currently works in the molecular lab doing DNA extractions, PCRs, Sanger Sequencing preparations, and generating molecular data.
                </p>
              </div>
            </div>
          </div>

          {/* Michelle Locke */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/MichelleLockeField.jpg"
                  alt="Michelle Locke"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-bold mb-1 text-gray-900">Michelle Locke</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Staff from 2015 to 2016</p>
                <p className="text-gray-700">
                  Michelle Locke completed her MSc at Carleton University, in Ottawa ON. Michelle's MSc thesis was a revision of the flower fly genus <em>Dasysyrphus</em> (Diptera: Syrphidae) under the supervision of Dr. Jeff Skevington of Agriculture and Agri-Food Canada. before coming to the AMNH she worked as a contract Research Technician at the Canadian National Collection of Insects, Arachnids and Nematodes in Ottawa, ON. Her contract work focused on the Syrphidae collection, doing identifications, curation, databasing, species level conservation assessments, macro photography of specimens and work on a field guide to the Syrphidae. She came to the Division of Invertebrate Zoology, AMNH in 2014.
                </p>
              </div>
            </div>
          </div>

          {/* Pamela Horsley */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Pam.jpg"
                  alt="Pamela Horsley"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-bold mb-1 text-gray-900">Pamela Horsley</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Staff from 2013 to 2014</p>
                <p className="text-gray-700">
                  Pamela completed her MSc in Entomology at McGill University in 2009 and her thesis research included a systematic revision of the hyper-diverse leaf litter-inhabiting genus <em>Trachyphloeomimus</em> (Curculionidae, Entiminae). In 2009, she was hired through an NSF grant as the Entomology Collection Manager at the San Diego Natural History Museum. Her research and work experience has allowed her to do field work in central and northeast Mexico, as well as the south-western United States. She is heavily involved with the Entomological Collections Network (ECN), <a href="http://www.ecnweb.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Entomological Collections Network</a>, serving as president and assisting with coordination of the annual meetings.
                </p>
              </div>
            </div>
          </div>

          {/* Ofelia Delgado */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/ofelialab.jpg"
                  alt="Ofelia Delgado"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-bold mb-1 text-gray-900">Ofelia Delgado</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Staff from 2010 to 2012</p>
                <p className="text-gray-700">
                  Ofelia completed her BSc in Biology at the Facultad de Ciencias, Universidad Nacional Autónoma de México (UNAM) in 2000, based on a floristic survey of tropical dry forest. After graduating, she assisted in the curation of the Section of Odonata in the Insects National Collection, Instituto de Biología, UNAM, focusing on the Odonata of Jalisco. Her experience in the field includes collecting arachnids, insects and plants in Central and Southern Mexico. After volunteering in Lorenzo Prendini's molecular lab for several years, she came to work as a Scientific Assistant in January 2010, spending much time working on solifuges and scorpions in the molecular lab.
                </p>
              </div>
            </div>
          </div>

          {/* Jeremy Huff */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/huff2.jpg"
                  alt="Jeremy Huff"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h4 className="text-lg font-bold mb-1 text-gray-900">Jeremy Huff</h4>
                <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                <p className="text-sm text-gray-500 mb-3">Staff from 2007 to 2010</p>
                <p className="text-gray-700">
                  Jeremy began working as a Scientific Assistant in the Division of Invertebrate Zoology in 2007. His main research interest is the systematics of the whip scorpions (Thelyphonida). Huff has extensive field experience collecting arachnids in Belize, Cameroon, Costa Rica, Dominican Republic, French Guiana, Grand Cayman, Guatemala, Guinea-Bissau, Guyana, Malaysia, Martinique, Mexico, Senegal, South Africa and the southwestern USA. He did 10 field trips for the AMNH and has collected several thousand specimens and discovered many new species.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Alumni - Condensed */}
          <div className="space-y-6">
            {[
              { name: 'Yili Lim', title: 'Laboratory Technician', years: '2008 to 2009', image: 'yili.jpg' },
              { name: 'Tricia Rubi', title: 'Laboratory Technician', years: '2008 to 2009', image: 'tricia.jpg' },
              { name: 'Kaythi Han', title: 'Laboratory Technician', years: '2008', image: 'kaythi.jpg' },
              { name: 'Allison Kerwin', title: 'Laboratory Technician', years: '2008', image: 'allison.jpg' },
              { name: 'Kanvaly Bamba', title: 'Laboratory Technician', years: '2007 to 2008', image: 'kanvaly.jpg' },
              { name: 'Torsten Dikow', title: 'Laboratory Technician', years: '2007', image: 'torsten.jpg' },
              { name: 'Ligia Benavides', title: 'Laboratory Technician', years: '2006 to 2007', image: 'ligia.jpg' },
              { name: 'Monica Mosier', title: 'Laboratory Technician', years: '2006', image: 'monica.jpg' },
              { name: 'Kenneth "Tripp" MacDonald', title: 'Laboratory Technician', years: '2005', image: 'tripp.jpg' },
              { name: 'Diana Pietri', title: 'Laboratory Technician', years: '2003 to 2005', image: 'diana.jpg' },
              { name: 'Tarang Sharma', title: 'Laboratory Technician', years: '2003 to 2004', image: 'tarang.jpg' },
              { name: 'Rebecca Budinoff', title: 'Laboratory Technician', years: '2004', image: 'rebecca.jpg' },
            ].map((person, index) => (
              <div key={index} className="pb-6 border-b border-gray-200">
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <Image
                      src={`/images/${person.image}`}
                      alt={person.name}
                      width={400}
                      height={533}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <h4 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h4>
                    <p className="text-base text-gray-600 mb-1">{person.title}</p>
                    <p className="text-sm text-gray-500 mb-3">Staff from {person.years}</p>
                    <p className="text-gray-700">
                      {person.title === 'Laboratory Technician' && 
                        `${person.name.split(' ')[0]} worked in the Molecular Systematics Laboratory of the Division of Invertebrate Zoology, AMNH, isolating, amplifying, and sequencing scorpion, spider, amblypygid, solifuge, uropygid and schizomid DNA. ${person.name.split(' ')[0] === 'Kanvaly' ? 'He' : 'She'} assisted with the training of postdoctoral fellows, undergraduate and high school students, and scientists visiting the lab.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Randy Mercurio - Special case with more detail */}
            <div className="pb-6 border-b border-gray-200">
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-2">
                  <Image
                    src="/images/mercurio3.jpg"
                    alt="Randy Mercurio"
                    width={400}
                    height={533}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-lg font-bold mb-1 text-gray-900">Randy Mercurio</h4>
                  <p className="text-base text-gray-600 mb-1">Scientific Assistant</p>
                  <p className="text-sm text-gray-500 mb-3">Staff from 2002 to 2007</p>
                  <p className="text-gray-700">
                    Randy joined the Division of Invertebrate Zoology, AMNH, as a full-time employee in 2002, after completing a B.A. in Biology at New York University. He worked as Scientific Assistant to Lorenzo Prendini and managed the curation of the Arachnid and Myriapod Collections. Randy is a professional photographer and was responsible for producing many of the photographs in publications and the group's website. His other research interests include the taxonomy, natural history, ecology and biogeography of centipedes in North America, as well as their functional morphology. He has collected arachnids and myriapods in Arizona, California, Connecticut, Florida, Massachusetts, New York, Nevada, Rhode Island, and Mexico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeSection === 'postdocs' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Postdocs</h2>
          <p className="text-xl text-gray-600 mb-8">Current and former postdocs at the Arachnology Lab</p>
          
          {/* Ricardo Botero-Trujillo */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Ricardo.jpg"
                  alt="Ricardo Botero-Trujillo"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Ricardo Botero-Trujillo</h3>
                <p className="text-base text-gray-600 mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2018 to 2020</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Ricardo_Botero-Trujillo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Ricardo completed his Biology B.S. at Javeriana University in Bogota. While an undergraduate student, he became interested in arachnids and started working on scorpions from his native country, Colombia. Gradually, hooded thick-spiders (order Ricinulei) and sun-spiders (order Solifugae) became part of his research interests. After a 5-year period working in the pharmaceutical industry, Ricardo moved to Argentina to undertake doctoral studies at the Buenos Aires University. There, he conducted his research at the Division of Arachnology of the Argentinian Museum of Natural Sciences Bernardino Rivadavia. His PhD thesis consisted of a taxonomic revision and phylogenetic analysis of the South American solifuge family Mummuciidae. In 2016, Ricardo visited the AMNH collections, supported by a Theodore Roosevelt Memorial Grant from the AMNH and a Vincent Roth Grant for Systematics Research from the American Arachnological Society. Ricardo is currently a Theodore Roosevelt Postdoctoral Research Fellow from the Richard Gilder Graduate School at the AMNH, and is now working on the evolution of Ricinuleids.
                </p>
              </div>
            </div>
          </div>

          {/* Frederic Schramm */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Frederic_jkwxyd.jpg"
                  alt="Frederic Schramm"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Frederic Schramm</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | <a href="https://www.daad.de/en/study-and-research-in-germany/scholarships/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">DAAD Scholarships</a></p>
                <p className="text-sm text-gray-500 mb-3">Postdoc in 2020</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Frederic_Schramm2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Fred got his Masters degree in molecular and cellular biology from the Philipps University of Marburg, Germany in 2013. In 2019 he obtained his PhD in molecular biosciences from Stockholm University, Sweden for his work investigating how bacteria fulfill the basic cellular need of maintaining a functional proteome. In his research, Frederic has always been keen on comparative approaches that incorporate the evolutionary perspective enabling a broader and functionally relevant understanding of fundamental biological processes. Becoming convinced of the importance of the evolutionary perspective of his research during his PhD, combined with a long-standing passion for arachnids, he began collaborating on arachnological research projects aimed at enhancing the knowledge of Caribbean arachnid diversity. In February of 2020 he joined the AMNH for a six-months short-term postdoctoral research stay. In his research project funded by the German Academic Exchange Service and a Theodore Roosevelt Memorial Grant he investigates the evolution of Mexican whip spiders.
                </p>
              </div>
            </div>
          </div>

          {/* Stephanie F. Loria */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Loria2.jpg"
                  alt="Stephanie F. Loria"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Stephanie F. Loria</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2018 to 2020</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Stephanie_Loria2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Stephanie first came to the AMNH as a high school student participating in the High School Science Research Program of the Center for Biodiversity and Conservation with Felicity Arengo. In 2011, she completed her B.S. at Sewanee University in TN. During her B.S. she spent a summer working at the Field Museum of Natural History in Chicago as an NSF REU intern studying the evolution and biogeography of the Malagasy giant pill-millipedes, genus <em>Sphaeromimus</em>, under the guidance of Thomas Wesener and Petra Sierwald. Stephanie entered the Comparative Biology PhD program at the AMNH Richard Gilder Graduate School in 2011 and graduated in 2015. Her dissertation focused on the evolution and biogeography of Southeast Asian scorpions, particularly the family Chaerilidae.
                </p>
              </div>
            </div>
          </div>

          {/* Muhammad Tahir */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Tahir.jpg"
                  alt="Muhammad Tahir"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Muhammad Tahir</h3>
                <p className="text-base text-gray-600 mb-1">Higher Education Commission, Pakistan</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2013 to 2014</p>
                <p className="mb-3">
                  <a href="https://www.researchgate.net/profile/Stephanie_Loria2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Gate</a>
                </p>
                <p className="text-gray-700">
                  Tahir received his PhD from University of the Punjab, Lahore, with a dissertation on the "Biodiversity and predatory efficacy of spiders inhabiting the rice fields of central Punjab, Pakistan". He also worked on the scorpions of Pakistan in collaboration with Lorenzo Prendini. He came to the AMNH, in May 2013 for postdoc supported by a Postdoctoral Fellowship by the Higher Education Commission of Pakistan, which focused on the molecular systematics of the medically important scorpions in the family Buthidae occurring in Pakistan. He is currently working as Assistant Professor of Zoology at the University of Sargodha, Pakistan.
                </p>
              </div>
            </div>
          </div>

          {/* Carsten Kamenz */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/carstenk.jpg"
                  alt="Carsten Kamenz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Carsten Kamenz</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Kalbfleisch Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2009 to 2011</p>
                <p className="text-gray-700">
                  Carsten received his PhD at the Humboldt-Universität zu Berlin, Germany, during which he visited the AMNH on an Annette Kade Fellowship. His research interest comprises the evolution of Arachnida with the focus on terrestrial adaptations. Carsten's PhD thesis was a comprehensive study of the morphology of fully land-adapted book lungs from extant and extinct arachnids. During the course of his post-doctoral research at the AMNH, Carsten examined the Palaeozoic scorpions, testing them for the purported aquatic life. The methodological spectrum he applied for revealing the morphological and anatomical characters, reaches from classical microscopy, through electron microscopy, to cutting-edge microtomographical techniques.
                </p>
              </div>
            </div>
          </div>

          {/* José Antonio Ochoa */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/jose.jpg"
                  alt="José Antonio Ochoa"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">José Antonio Ochoa</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Kalbfleisch Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2007 to 2009</p>
                <p className="text-gray-700">
                  José completed his PhD at the Universidad Nacional de Cordoba, Argentina. His dissertation reviewed the systematics and biogeography of the scorpions of southern Peru. Jose's research interests include the systematics of the Andean scorpion genera <em>Orobothriurus</em> (Bothriuridae) and <em>Hadruroides</em> (Iuridae). He moved to the AMNH, supported by a Postdoctoral Research Fellowship in 2007. His postdoctoral research project was the first attempt to study the phylogeny of the Neotropical family Chactidae using morphological and genetic data.
                </p>
              </div>
            </div>
          </div>

          {/* Dana Price */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/dana.jpg"
                  alt="Dana Price"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Dana Price</h3>
                <p className="text-base text-gray-600 mb-1">NSF-BS&I Solifugae Grant | NSF-AToL Spider Phylogeny Grant</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2007 to 2008</p>
                <p className="text-gray-700">
                  Dana completed her PhD at Rutgers University in the Graduate Program of Ecology and Evolution. The title of her dissertation was Phylogeny, Biogeography and Behavior of the Dung Beetle Genus <em>Phanaeus</em> (Scarabaeidae: Scarabaeinae). In 2007 Dana worked with Lorenzo Prendini as a Postdoctoral Researcher at the AMNH (Division of Invertebrate Zoology) on sun spiders (Solifugae) and scorpions (Vaejovidae) supported by Prendini's NSF BS&I and RevSys grants; she worked for the NSF AToL Spider Phylogeny grant in 2008. Her interests include systematics, behavior, ecology and conservation biology.
                </p>
              </div>
            </div>
          </div>

          {/* Camilo I. Mattoni */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/camilo.jpg"
                  alt="Camilo I. Mattoni"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Camilo I. Mattoni</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Postdoctoral Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2004 to 2006</p>
                <p className="text-gray-700">
                  Camilo completed his PhD at the Universidad Nacional de Córdoba. His dissertation involved a systematic revision of the South American scorpion genus <em>Bothriurus</em>. He moved to the AMNH, supported by a Postdoctoral Research Fellowship in Genomics, in 2004. The aim of Camilo's postdoctoral research was to produce a robust phylogenetic hypothesis of relationships in the diverse Gondwana scorpion family Bothriuridae, using morphological and genetic data, and a sampling of as many bothriurid species as possible. He is also interested in scorpion ecology, behavior and reproduction, and in theoretical aspects of cladistics. One of his most recent contributions provides the first detailed description and comparison of the genital plugs in scorpions.
                </p>
              </div>
            </div>
          </div>

          {/* Erich S. Volschenk */}
          <div className="mb-8 pb-8">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/erich.jpg"
                  alt="Erich S. Volschenk"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Erich S. Volschenk</h3>
                <p className="text-base text-gray-600 mb-1">American Museum of Natural History, New York | Postdoctoral Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Postdoc from 2003 to 2006</p>
                <p className="text-gray-700">
                  Erich completed his PhD at Curtin University, Perth. His PhD dissertation involved a systematic revision of the Australian buthid genera. He began a Postdoctoral Research Fellowship in Genomics at the AMNH in 2003. His postdoctoral research project is the first serious attempt to investigate the phylogeny of the cosmopolitan scorpion family Buthidae, using molecular and morphological data and a broad sample of exemplar species. Erich's research interests include the systematics of Buthidae and the Australian endemic scorpion genus <em>Urodacus</em>, the homology of scorpion hemispermatophores, and the biology of troglobitic arachnids. He pioneered the use of ultraviolet light in scorpion photomicrography.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeSection === 'graduate-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Graduate Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Several graduate students worked in the Arachnology lab in past years. These students were funded from various sources including grants from the <a href="http://www.nsf.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">National Science Foundation</a> and the AMNH (graduate student fellowships and the Comparative Biology Program of the Richard Gilder Graduate School). If you are interested graduate study in the Arachnology lab, please visit the website of the <a href="https://www.amnh.org/our-research/richard-gilder-graduate-school" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Richard Gilder Graduate School</a> to apply to the RGGS for a graduate student fellowship for study at a partner programs (e.g., City University of New York).
          </p>
          
          {/* Jayson Slovak */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/jayson.jpg"
                  alt="Jayson Slovak"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Jayson Slovak</h3>
                <p className="text-base text-gray-600 mb-1">City University of New York</p>
                <p className="text-sm text-gray-500 mb-3">Graduate student in 2016</p>
                <p className="text-gray-700">
                  Jayson Slovak graduated with a BA in Biology from Queens College, CUNY. During his undergraduate studies he worked under Dr. Stephane Boissinot to see how population size affected abundance of Transposable Elements in the Threespine Stickleback. During his leap year he accompanied an expedition with Dr. Boissinot to Ethiopia to frog collect samples for his lab. He is currently a master student from City College working under Dr. Lorenzo Prendini since June 2016. His work will involve studying how the Great Rift Valley of Ethiopia affects Scorpion distribution and speciation in the region.
                </p>
              </div>
            </div>
          </div>

          {/* Stephanie F. Loria */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Loria.jpg"
                  alt="Stephanie F. Loria"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Stephanie F. Loria</h3>
                <p className="text-base text-gray-600 mb-1">Richard Gilder Graduate School, American Museum of Natural History</p>
                <p className="text-sm text-gray-500 mb-3">Graduate student from 2011 to 2016</p>
                <p className="text-gray-700">
                  Stephanie first came to the AMNH as a high school student participating in the High School Science Research Program of the Center for Biodiversity and Conservation with Felicity Arengo. In 2011, she completed her B.S. at Sewanee University in TN. During her B.S. she spent a summer working at the Field Museum of Natural History in Chicago as an NSF REU intern studying the evolution and biogeography of the Malagasy giant pill-millipedes, genus <em>Sphaeromimus</em>, under the guidance of Thomas Wesener and Petra Sierwald. Stephanie entered the Comparative Biology PhD program at the AMNH Richard Gilder Graduate School in 2011 and graduated in 2015. Her dissertation focused on the evolution and biogeography of Southeast Asian scorpions, particularly the family Chaerilidae.
                </p>
              </div>
            </div>
          </div>

          {/* Tharina Bird */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/tharina.jpg"
                  alt="Tharina Bird"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Tharina Bird</h3>
                <p className="text-base text-gray-600 mb-1">Colorado State University, Fort Collins, CO | NSF BS&I Grant</p>
                <p className="text-sm text-gray-500 mb-3">Graduate student from 2009 to 2014</p>
                <p className="text-gray-700">
                  Tharina holds six degrees including two B.S. degrees, a Masters and a Higher Education Diploma from the University of Pretoria, South Africa. She was funded in part for a PhD at Colorado State University, by a National Science Foundation Biodiversity Surveys and Inventories grant to Paula Cushing and Lorenzo Prendini, graduating in 2014. Tharina visited the AMNH on several occasions to study and image the extensive camel spider collection for her dissertation research on the cheliceral morphology of Solifugae and worked extensively with Prendini. She then returned to the National Museum of Namibia, Windhoek.
                </p>
              </div>
            </div>
          </div>

          {/* Lionel Monod */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/lionel.jpg"
                  alt="Lionel Monod"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Lionel Monod</h3>
                <p className="text-base text-gray-600 mb-1">CUNY, The City College of New York | AMNH Graduate Student Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Graduate student from 2005 to 2011</p>
                <p className="text-gray-700">
                  Lionel completed a B.Sc. at the University of Geneva and an MSc revising the systematics of <em>Liocheles</em> scorpions at the Muséum National d'Histoire Naturelle, Paris, graduating in 2000. Monod subsequently worked at the Muséum d'Histoire Naturelle, Geneva. He visited the AMNH to work in the collections and Molecular Systematics Laboratory in November-December 2002 and, in 2005, Monod was awarded a Graduate Student Fellowship from the AMNH to conduct a PhD thesis on the systematics and biogeography of Indo-Pacific liochelid scorpions, via the PhD program in Ecology and Evolutionary Biology, City University of New York. He completed his PhD in 2011 and now works as a Research Officer at the Muséum d'Histoire Naturelle, Geneva.
                </p>
              </div>
            </div>
          </div>

          {/* Edmundo González Santillan */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/edmundo.jpg"
                  alt="Edmundo González Santillan"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Edmundo González Santillan</h3>
                <p className="text-base text-gray-600 mb-1">CUNY, The City College of New York | NSF REVSYS Grant</p>
                <p className="text-sm text-gray-500 mb-3">Graduate student from 2004 to 2012</p>
                <p className="text-gray-700">
                  Edmundo completed his B.S. and MSc at the Universidad Nacional Autónoma de México (UNAM). In 2004, Edmundo moved to the AMNH, supported by a National Science Foundation REVSYS grant on vaejovid systematics awarded to Lorenzo Prendini. He was accepted into the PhD program in Ecology and Evolutionary Biology, City University of New York, in 2005. For his dissertation he studied the systematic biology of the North American vaejovid scorpion subfamily Syntropinae. After graduating in 2012, he moved to the Laboratorio Nacional de Genómica para la Biodiversidad in Guanajuato, Mexico, where he continues his research on the evolution, phylogeny and biogeography of Mexican scorpions.
                </p>
              </div>
            </div>
          </div>

          {/* Lauren A. Esposito */}
          <div className="mb-8 pb-8">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/lauren.jpg"
                  alt="Lauren A. Esposito"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Lauren A. Esposito</h3>
                <p className="text-base text-gray-600 mb-1">CUNY, The City College of New York | MAGNET-STEM Fellowship | NSF AGEP Fellowship | CUNY College NOW Fellow | CUNY Magnet Dissertation Fellowship | NSF GK-12 Fellowship</p>
                <p className="text-sm text-gray-500 mb-3">Graduate student from 2004 to 2011</p>
                <p className="text-gray-700">
                  Lauren first came to the AMNH in 2002 as an undergraduate intern in the National Science Foundation (NSF) Research Experience for Undergraduates program, for a summer research project on the systematics of medically important African <em>Parabuthus</em> scorpions. After graduating with her B.S. from the University of Texas at El Paso, she was accepted into the PhD program in Ecology and Evolutionary Biology, City University of New York, and returned to the AMNH to continue research on scorpions. She revised the systematics of the medically important North American scorpion genus <em>Centruroides</em> for her PhD dissertation. She completed her doctorate degree in 2011 and is now at the California Academy of Sciences, where she is an Assistant Curator and Schlinger Chair of Arachnology.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeSection === 'undergraduate-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Undergraduate Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Over the years, several undergraduate students have worked in the Arachnology Lab supported by various internships. Most have gone on to graduate school and beyond. We acknowledge and appreciate their work. If you are interested in interning in the Arachnology Lab at the AMNH please visit the <a href="https://www.amnh.org/our-research/richard-gilder-graduate-school/academics-and-research/fellowship-and-grant-opportunities/undergraduate-fellowships/reu-biology-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Research Experiences for Undergraduates Program.</a>
          </p>
          
          <div className="space-y-6">
            {[
              { name: 'Valentin Ehrenthal', affiliation: 'University of Hamburg, Germany', years: '2019 to 2020', image: 'Valentin_r2sqbc.jpg', bio: 'Valentin spent six months at the AMNH working on Southeast Asian scorpions. He generated images and data for a morphological matrix and performed extractions, PCRs and Sanger Sequencing. Additionally, he learned about the biogeography and phylogeny of these scorpions.' },
              { name: 'Diogo Casellato', affiliation: 'CUNY, Baruch College | Brazil Scientific Mobility Program', years: '2015 to 2019', image: 'DiogoCasellato2015.jpg', bio: 'Diogo interned in the molecular lab, learning to extract, amplify, sequence, and edit DNA as part of a variety of scorpion phylogenetics projects.' },
              { name: 'Elena Babicz', affiliation: 'Bridgewater State University', years: '2019', image: 'Elena.jpg', bio: 'Elena spent the summer at the AMNH as an REU intern under the supervision of Stephanie Loria and Pio Colmenares, focusing on Thelyphonids. She was tasked with generating molecular data and images of the specimens, and also learned about the morphology, biogeography and phylogeny of this order of arachnids.' },
              { name: 'Colby Sain', affiliation: 'University of Tennessee', years: '2019', image: 'Colby.jpg', bio: 'Colby came to the AMNH as an REU intern. She worked under the mentorship of Ricardo Botero-Trujillo and Stephanie Loria, primarily on Ricinulei, with a focus on the African genus, <em>Ricinoides</em>. She generated an extensive set of morphological images, and she also generated molecular data. At the University of Tennessee, she studies Geology with a focus on Paleontology. In the future, Colby hopes to do more work in the Arachnology Lab.' },
              { name: 'Deborah Chin', affiliation: 'Fairleigh Dickinson University', years: '2016 to 2018', image: 'deborah.jpg', bio: 'Deborah spent the summer doing extractions and PCRs on scorpions in the AMNH molecular lab.' },
              { name: 'Sasha Mendez', affiliation: 'Rutgers University', years: '2018', image: 'Sasha.jpg', bio: 'Sasha spent the summer obtaining DNA extractions, PCRs and sequences from scorpion samples in the AMNH molecular lab.' },
              { name: 'Lam Ngo', affiliation: 'Sewanee: The University of the South', years: '2018', image: 'Lam.jpg', bio: 'Lam assisted with field work in Asia, surpervised by Stephanie Loria.' },
              { name: 'Massimiliano "Max" Roppo', affiliation: 'Sapienza University of Rome, Italy', years: '2018', image: 'Roppo2.jpg', bio: 'Max came to the AMNH and spent three months adquiring morphological data on some African scorpions.' },
              { name: 'Maggie Ruben', affiliation: 'Sapienza University of Rome, Italy', years: '2018', image: 'Maggie.jpg', bio: 'Maggie spent the summer of 2016 studying cuticular fluorescence in scorpions and other chelicerates including horseshoe crabs, solifuges, opilionids, and extinct eurypterids.' },
              { name: 'Michelle Yun', affiliation: 'CUNY, York College', years: '2010', image: null, bio: 'Michelle took part in an investigation of the phylogeny of the scorpion genus <em>Parabuthus</em> sequencing six different loci from samples collected all over southern Africa.' },
              { name: 'Angela Holuba', affiliation: 'Barnard College', years: '2008', image: 'angela.jpg', bio: 'Angela worked on a project investigating the phylogeny and evolutionary relationships of the scorpion family Buthidae.' },
              { name: 'Sylvia Johnson', affiliation: 'Barnard College | Collegiate Science and Technology Entry Program', years: '2008', image: 'sylvia.jpg', bio: 'Sylvia worked on a project investigating the phylogeny and evolutionary relationships of the scorpion family Diplocentridae.' },
              { name: 'Gena Esposito', affiliation: 'University of Texas at Austin | NSF RevSys Grant', years: '2007', image: 'gena.jpg', bio: 'Gena generated DNA sequence data as part of an investigation of the phylogeny of the scorpion family Buthidae.' },
              { name: 'Sarah Schoenbrun', affiliation: 'Brown University | NSF Research Experiences for Undergraduates Internship', years: '2007', image: 'sarah.jpg', bio: 'Sarah studied the medically important North American scorpion genus, <em>Centruroides</em>, using molecular data from previously unidentified specimens to clarify their phylogenetic placement. Sarah also investigated the relationship between venom genes of <em>Centruroides</em> and other medically important scorpions.' },
              { name: 'Steve Webb', affiliation: 'Muhlenberg College | NSF Research Experiences for Undergraduates Internship', years: '2005', image: 'webb.jpg', bio: 'Steve tested the phylogenetic placement and monophyly of the former scorpion family Microcharmidae, using morphological and molecular data.' },
              { name: 'Kanvaly B. Bamba', affiliation: 'Yale University | NSF Research Experiences for Undergraduates Internship', years: '2004', image: 'bamba.jpg', bio: 'Kanvaly contributed to the first phylogeny for the Gondwana scorpion family Hormuridae, based on a simultaneous analysis six gene loci and morphology.' },
              { name: 'Michelle McCoy', affiliation: 'North Carolina University | NSF Research Experiences for Undergraduates Internship', years: '2004', image: 'mccoy.jpg', bio: 'Michelle contributed to the first phylogeny for the Gondwana scorpion family Hormuridae, based on a simultaneous analysis six gene loci and morphology.' },
              { name: 'Samara Maaliki', affiliation: 'CUNY, City University of New York | NSF Research Experiences for Undergraduates Internship | Undergraduate Mentoring in Evolutionary Biology Internship', years: '2003', image: 'maaliki.jpg', bio: 'Samara studied the morphology of the central Asian scorpion <em>Pseudochactas ovchinnikovi</em> and investigated its phylogenetic position with morphological and molecular data.' },
              { name: 'Lauren Esposito', affiliation: 'University of Texas, El Paso | NSF Research Experiences for Undergraduates Internship', years: '2002', image: 'lauren.jpg', bio: 'Lauren first came to the AMNH for a summer research project on the systematics of medically important African <em>Parabuthus</em> scorpions. She returned to the lab as a graduate student from 2004 to 2011.' },
            ].map((person, index) => (
              <div key={index} className={`pb-6 ${index < 18 ? 'border-b border-gray-200' : ''}`}>
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    {person.image ? (
                      <Image
                        src={`/images/${person.image}`}
                        alt={person.name}
                        width={400}
                        height={533}
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h3>
                    <p className="text-base text-gray-600 mb-1">{person.affiliation}</p>
                    <p className="text-sm text-gray-500 mb-3">Undergraduate student {person.years.includes('to') ? 'from' : 'in'} {person.years}</p>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: person.bio }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {activeSection === 'high-school-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">High School Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Several high school students worked in the Arachnology Lab supported by various internships. Many went on to undergraduate programs. We acknowledge and appreciate their work. If you are interested in interning in the Arachnology Lab at the AMNH please visit the <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program.</a>
          </p>

          {/* Hritwik Paul */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/HPaul_mnmt2g.jpg"
                  alt="Hritwik Paul"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Hritwik Paul</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
                <p className="text-gray-700">
                  Hritwik joined the Arachnology lab in 2019 and is currently involved in curatorial activities, such as the reorganization of the Scorpion collection, sorting, labeling and rehousing, under the supervision of Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Luke Siegel */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Luke Siegel</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
                <p className="text-gray-700">
                  Luke joined the Arachnology lab in 2019 and is currently involved in curatorial activities, such as the reorganization of the Scorpion collection, sorting, labeling and rehousing, under the supervision of Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Cherie Qu */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Cherie.jpg"
                  alt="Cherie Qu"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Cherie Qu</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
                <p className="text-gray-700">
                  Cherie volunteered at the Arachnology lab during the summer of 2019, through the AMNH Lang program. She worked rehousing and organizing spiders and daddy longlegs, under the supervision of Lou Sorkin.
                </p>
              </div>
            </div>
          </div>

          {/* Azmi Anamika */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Azmi.jpg"
                  alt="Azmi Anamika"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Azmi Anamika</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2019</p>
                <p className="text-gray-700">
                  Azmi volunteered at the Arachnology lab during the summer of 2019, through the AMNH Lang program. She worked rehousing and organizing spiders and daddy longlegs, under the supervision of Lou Sorkin.
                </p>
              </div>
            </div>
          </div>

          {/* Nathan Auyeng */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Nathan Auyeng</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
                <p className="text-gray-700">
                  Nathan came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. He assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorking and Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Aleyna Singer */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Aleyna Singer</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
                <p className="text-gray-700">
                  Aleyna came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorking and Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Simon Au */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Simon Au</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
                <p className="text-gray-700">
                  Simon came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. He assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorking and Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Amrita Banerj */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Amrita Banerj</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2018</p>
                <p className="text-gray-700">
                  Amrita came from the AMNH <a href="https://www.amnh.org/learn-teach/grades-9-12/science-research-mentoring-program" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Science Research Mentoring Program,</a> and volunteered at the Arachnida collections during the summer of 2018. She assisted with curatorial activities, helping to curate important collections of spiders and other arachnids, under the supervision of Lou Sorking and Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Geeta Sharma */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Geeta.jpg"
                  alt="Geeta Sharma"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Geeta Sharma</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2017</p>
                <p className="text-gray-700">
                  Geeta volunteered at the AMNH during the summer of 2017. She worked sorting and organizing a scorpion collection from South Africa, under the supervision of Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Sophia Castro */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Sophia.jpg"
                  alt="Sophia Castro"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Sophia Castro</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2017</p>
                <p className="text-gray-700">
                  Sophia volunteered at the AMNH during the summer of 2017. She worked sorting and organizing a scorpion collection from South Africa, under the supervision of Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Tamar Cohen */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/Tamar.jpg"
                  alt="Tamar Cohen"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Tamar Cohen</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2017</p>
                <p className="text-gray-700">
                  Tamar volunteered at the AMNH during the summer of 2017. She worked in the Molecular Systematics Laboratory where they learned lab techniques and to perform PCRs under the supervision of Pío Colmenares.
                </p>
              </div>
            </div>
          </div>

          {/* Chelsea Silva */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/ChelseaSilva2015.jpg"
                  alt="Chelsea Silva"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Chelsea Silva</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2015</p>
                <p className="text-gray-700">
                  Chelsea volunteered at the AMNH during the summer of 2015. She worked in the Molecular Systematics Laboratory where she learned lab techniques and to perform PCRs under the supervision of Michelle Locke and Diogo Casellato.
                </p>
              </div>
            </div>
          </div>

          {/* Billy Conlan */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/BillyConlan2015.jpg"
                  alt="Billy Conlan"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Billy Conlan</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2015</p>
                <p className="text-gray-700">
                  Billy volunteered at the AMNH during the summer of 2015. He worked in the Molecular Systematics Laboratory where he learned lab techniques and to perform PCRs under the supervision of Michelle Locke and Diogo Casellato.
                </p>
              </div>
            </div>
          </div>

          {/* Eleanor Goetz */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/SRMPSashaandEleanor.jpg"
                  alt="Sasha Reiter and Eleanor Goetz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2 italic">Sasha Reiter and Eleanor Goetz</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Eleanor Goetz</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2013 to 2014</p>
                <p className="text-gray-700">
                  Eleanor attended the AMNH Science Research Mentoring Program (SRMP) at the AMNH for the 2013-2014 academic year. She worked in the Molecular Systematics Laboratory where she learned to isolate, amplify, sequence, and edit DNA under the supervision of Stephanie Loria.
                </p>
              </div>
            </div>
          </div>

          {/* Sasha Reiter */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/SRMPSashaandEleanor.jpg"
                  alt="Sasha Reiter and Eleanor Goetz"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2 italic">Sasha Reiter and Eleanor Goetz</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Sasha Reiter</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2013 to 2014</p>
                <p className="text-gray-700">
                  Sasha attended the AMNH Science Research Mentoring Program (SRMP) at the AMNH for the 2013-2014 academic year. They worked in the Molecular Systematics Laboratory where they learned to isolate, amplify, sequence, and edit DNA under the supervision of Stephanie Loria.
                </p>
              </div>
            </div>
          </div>

          {/* Adam Getzler */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/adam.jpg"
                  alt="Adam Getzler"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Adam Getzler</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2011</p>
                <p className="text-gray-700">
                  Adam, a student at Plainview Old-Bethpage JFK High School, volunteered at the AMNH during the summer of 2011, sequencing scorpion DNA to further his interest in genetics. He went on to a Bachelor's degree at the University of Chicago.
                </p>
              </div>
            </div>
          </div>

          {/* Michelle Bayefsky-Anand */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Michelle Bayefsky-Anand</h3>
                <p className="text-sm text-gray-500 mb-3">High school student in 2008</p>
                <p className="text-gray-700">
                  Michelle, a student at Ramaz Upper High School, worked in the Molecular Systematics Laboratory learning to extract, amplify, and sequence scorpion DNA under the supervision of Lauren Esposito and Lorenzo Prendini in 2008.
                </p>
              </div>
            </div>
          </div>

          {/* Jianhua Lin */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/highschool2006.jpg"
                  alt="Jianhua Lin and Qiao Rong Huang"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2 italic">Qiao Rong Huang and Jianhua Lin</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Jianhua Lin</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2006 to 2007</p>
                <p className="text-gray-700">
                  Jianhua attended the NSF High School Research Program in Genetics at the AMNH for two academic years (2005-2007). She learned to conduct measurements and record setal counts under the supervision of Jeremy Huff and Lorenzo Prendini (summer 2006). From fall 2006 she worked in the Molecular Systematics Laboratory extracting, amplifying, and sequencing scorpion DNA.
                </p>
              </div>
            </div>
          </div>

          {/* Qiao Rong Huang */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/highschool2006.jpg"
                  alt="Jianhua Lin and Qiao Rong Huang"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2 italic">Qiao Rong Huang and Jianhua Lin</p>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Qiao Rong Huang</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2006 to 2007</p>
                <p className="text-gray-700">
                  Qiao attended the NSF High School Research Program in Genetics at the AMNH for two academic years (2005-2007). She learned to conduct measurements and record setal counts under the supervision of Jeremy Huff and Lorenzo Prendini (summer 2006). From fall 2006 she worked in the Molecular Systematics Laboratory extracting, amplifying, and sequencing scorpion DNA.
                </p>
              </div>
            </div>
          </div>

          {/* Melanie Ng */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/melanie.jpg"
                  alt="Melanie Ng"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Melanie Ng</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2004 to 2005</p>
                <p className="text-gray-700">
                  Melanie attended the AMNH High School Science Research Program in Biodiversity at the AMNH for 10 months (September 2004-June 2005). She learned to sort, identify and database specimens, prepare labels, conduct measurements, record setal counts, and prepare photographs with visible and UV light, under the supervision of Lorenzo Prendini and Randy Mercurio. Melanie also worked in the Molecular Systematics Laboratory, under the supervision of Rebecca Budinoff and Tripp MacDonald, where she learned to isolate, amplify, sequence, and edit DNA.
                </p>
              </div>
            </div>
          </div>

          {/* Connie Cai */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/cai.jpg"
                  alt="Connie Cai"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Connie Cai</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2004 to 2005</p>
                <p className="text-gray-700">
                  Connie attended the AMNH High School Science Research Program in Biodiversity at the AMNH for 10 months (September 2004-June 2005). She learned to sort, identify and database specimens, prepare labels, conduct measurements, record setal counts, and prepare photographs with visible and UV light, under the supervision of Lorenzo Prendini and Randy Mercurio.
                </p>
              </div>
            </div>
          </div>

          {/* Bernard Laszczower */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/berny.jpg"
                  alt="Bernard Laszczower"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Bernard Laszczower</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2003 to 2004</p>
                <p className="text-gray-700">
                  Bernard attended the NSF After-School Centers in Exploration and New Discovery (ASCEND) program at the AMNH for 8 months (October 2003-May 2004). He worked in the Molecular Systematics Laboratory, under the supervision of Lorenzo Prendini, Diana Pietri and Tarang Sharma, where he learned to isolate, amplify, sequence and edit DNA.
                </p>
              </div>
            </div>
          </div>

          {/* Boitumelo "Tumi" McCallum */}
          <div className="mb-8 pb-8">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <Image
                  src="/images/tumi.jpg"
                  alt="Boitumelo 'Tumi' McCallum"
                  width={400}
                  height={533}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-1 text-gray-900">Boitumelo "Tumi" McCallum</h3>
                <p className="text-sm text-gray-500 mb-3">High school student from 2003 to 2004</p>
                <p className="text-gray-700">
                  Tumi attended the NSF After-School Centers in Exploration and New Discovery (ASCEND) program at the AMNH for 8 months (October 2003-May 2004). She worked in the Molecular Systematics Laboratory, under the supervision of Lorenzo Prendini, Diana Pietri and Tarang Sharma, where she learned to isolate, amplify, sequence and edit DNA.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeSection === 'volunteers' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Volunteers and Field Assistants</h2>
          <p className="text-xl text-gray-600 mb-8">
            The Arachnology Lab at the AMNH has had many dedicated volunteers work with us over the years. With their help we have been able to accomplish a great deal of work. We would like to thank all of our volunteers for their invaluable assistance. If you are interested in volunteering in the Arachnology Lab at the AMNH please visit the <a href="https://www.amnh.org/join-support/volunteer-now" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Volunteer Department.</a>
          </p>

          <h3 className="text-xl font-bold mb-4 text-gray-900">Current Volunteers</h3>

          {/* Victoria Long */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/victoria.jpg"
                  alt="Victoria Long"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Victoria Long</h4>
                <p className="text-sm text-gray-500 mb-2">Current Volunteer</p>
                <p className="text-gray-700">
                  Victoria is currently assisting with DNA extractions and PCR reactions, as well as curatorial tasks in the main collections.
                </p>
              </div>
            </div>
          </div>

          {/* George Tsinias */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/George.jpg"
                  alt="George Tsinias"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">George Tsinias</h4>
                <p className="text-sm text-gray-500 mb-2">Current Volunteer</p>
                <p className="text-gray-700">
                  George helps with curatorial tasks in the main collection, like labeling and rebottling material.
                </p>
              </div>
            </div>
          </div>

          {/* Christian Liriano */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Christian.jpg"
                  alt="Christian Liriano"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Christian Liriano</h4>
                <p className="text-sm text-gray-500 mb-2">Current Volunteer</p>
                <p className="text-gray-700">
                  Christian is currently preparing material for loans in the spider collection. He also showed great interest for harvestmen.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 mt-8 text-gray-900">Former Volunteers</h3>

          {/* Gerbi Carreon */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Gerbi.jpg"
                  alt="Gerbi Carreon"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Gerbi Carreon</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Gerbi performed various curatorial activities in the spider collection. He also received training to do DNA extractions and PCRs in the molecular lab.
                </p>
              </div>
            </div>
          </div>

          {/* Debbie Alwill */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/debbie.jpg"
                  alt="Debbie Alwill"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Debbie Alwill</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Debbie assisted with labeling and rebottling specimens and packing loans.
                </p>
              </div>
            </div>
          </div>

          {/* Jasmine Alim */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Jasmin.jpg"
                  alt="Jasmine Alim"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Jasmine Alim</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Jasmine assisted in the molecular lab with DNA extractions and PCR reactions, also organizing DNA samples.
                </p>
              </div>
            </div>
          </div>

          {/* Adrian Armstrong */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Adrian Armstrong</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Adrian is the Invertebrate Conservation Scientist in the provincial government Nature Conservation body in KwaZulu-Natal, South Africa. He has generously donated material to the AMNH for more than ten years.
                </p>
              </div>
            </div>
          </div>

          {/* Reginald Christiaan */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/ReginaldChristiaan.jpg"
                  alt="Reginald Christiaan"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Reginald Christiaan</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Reginald is a scorpion enthusiast who assisted Prendini with field collections of scorpions in South Africa.
                </p>
              </div>
            </div>
          </div>

          {/* Mark Cooper */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Mark Cooper</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Mark is a myriapodologist who graduated with a Masters from the University of Cape Town. He accompanied Lorenzo Prendini on several expeditions to collect arachnids in South Africa.
                </p>
              </div>
            </div>
          </div>

          {/* Howard W. Fiedler */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/fiedler.jpg"
                  alt="Howard W. Fiedler"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Howard W. Fiedler</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Howard assisted with rebottling specimens, organization of specimen and reprint collections, recording scorpion measurement data and digitizing handwritten catalogs.
                </p>
              </div>
            </div>
          </div>

          {/* Stefan Foord */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Stefan.Foord.jpg"
                  alt="Stefan Foord"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Stefan Foord</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Stefan is an arachnologist and professor at the University of Venda, South Africa who has generously donated material to the AMNH for several years.
                </p>
              </div>
            </div>
          </div>

          {/* Ann Garbacki */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ann Garbacki</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Ann assisted with labeling of specimens and inventorying specimens.
                </p>
              </div>
            </div>
          </div>

          {/* Tom Gartner */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Tom Gartner</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Tom assisted with sorting and labeling the Arachnid and Myriapod Collections and packing and unpacking loans.
                </p>
              </div>
            </div>
          </div>

          {/* Patrick Gildenhuys */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Gildenhuys.Patrick.jpg"
                  alt="Patrick Gildenhuys"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Patrick Gildenhuys</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Patrick is a tarantula enthusiast who accompanied Lorenzo Prendini on several expeditions to collect arachnids in South Africa and neighboring countries, and has generously donated material to the AMNH.
                </p>
              </div>
            </div>
          </div>

          {/* Charles Haddad */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Charles.Haddad.jpg"
                  alt="Charles Haddad"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Charles Haddad</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Charles is an arachnologist and professor at the University of the Free State, Bloemfontein, South Africa who has generously donated material to the AMNH for several years.
                </p>
              </div>
            </div>
          </div>

          {/* Peter Hawkes */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Peter Hawkes</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Peter is an entomologist who runs AfriBugs, an EIA in South Africa. He has generously donated material to the AMNH for several years.
                </p>
              </div>
            </div>
          </div>

          {/* Siegfried Huber */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Huber.jpg"
                  alt="Siegfried Huber"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Siegfried Huber</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Since 2000, Siegfried has conducted expeditions to Oman, Saudi Arabia, Thailand, and New Caledonia, and elsewhere, collecting arachnids. He has generously donated specimens collected during his travels to the AMNH.
                </p>
              </div>
            </div>
          </div>

          {/* Jeremy Huff */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/huff2.jpg"
                  alt="Jeremy Huff"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Jeremy Huff</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Jeremy Huff is a former volunteer and a former employee.
                </p>
              </div>
            </div>
          </div>

          {/* Dawid Jacobs */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Dawid Jacobs</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Dawid is an entomologist who assisted Prendini with fieldwork in South Africa and generously donated material to the AMNH for several years.
                </p>
              </div>
            </div>
          </div>

          {/* Simone Longe */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/simone.jpg"
                  alt="Simone Longe"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Simone Longe</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Simone assisted in the molecular lab with DNA extractions and PCR reactions, also organizing DNA samples.
                </p>
              </div>
            </div>
          </div>

          {/* Allyson Mellone */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Allyson Mellone</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Allyson assisted with labeling and rebottling specimens.
                </p>
              </div>
            </div>
          </div>

          {/* Warren Savary */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/warren.jpg"
                  alt="Warren Savary"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Warren Savary</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Warren Savary, a former compliance officer at the U.S. Food and Drug Administration and Field Associate of the California Academy of Sciences, served as research collaborator and webmaster for the NSF-funded REVSYS Vaejovidae grant and, from 2007-2012, as research collaborator and webmaster for the BS&I Solifugae grant. He visited the AMNH Arachnid and Myriapod Collections on several occasions to sort and identify solifuges and vaejovid scorpions.
                </p>
              </div>
            </div>
          </div>

          {/* Rick West */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/west.jpg"
                  alt="Rick West"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Rick West</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700 mb-2">
                  Rick West, one of the world's authorities on tarantulas (Theraphosidae), has traveled to over 27 countries to study them. Rick has generously donated interesting arachnids to the AMNH for many years.
                </p>
                <p>
                  <a href="http://www.birdspiders.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">BirdSpiders.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Asel Zhetigenova */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Asel Zhetigenova</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Asel assisted with labeling and rebottling specimens.
                </p>
              </div>
            </div>
          </div>

          {/* Howard Bichard */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Howard Bichard</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Howard accompanied Prendini on several expeditions to collect arachnids in South Africa.
                </p>
              </div>
            </div>
          </div>

          {/* Abigail Carlton */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Abigail Carlton</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Abigail assisted with sorting, rebottling, labeling, reorganizing, and databasing specimens and tissue samples in the collection.
                </p>
              </div>
            </div>
          </div>

          {/* Ofelia Delgado */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/ofelialab.jpg"
                  alt="Ofelia Delgado"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ofelia Delgado</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Ofelia Delgado is a former volunteer and a former employee.
                </p>
              </div>
            </div>
          </div>

          {/* David Desoeur */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/desouer.jpg"
                  alt="David Desoeur"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">David Desoeur</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  David graduated with a B.Sc. in Biology from the University of Guelph and was interested in the taxonomy of Florida <em>Centruroides</em>. In 2008, he traveled to Florida and the Keys to collect <em>Centruroides</em> samples for morphology and DNA isolation.
                </p>
              </div>
            </div>
          </div>

          {/* Suzanna Dodd */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Suzanna Dodd</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Suzanna rebottled the type collection, part of the main collection, and assisted with labeling new acquisitions.
                </p>
              </div>
            </div>
          </div>

          {/* Ian Engelbrecht */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Engelbrecht.jpg"
                  alt="Ian Engelbrecht"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ian Engelbrecht</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Ian was the Invertebrate Conservation Scientist in the provincial government Nature Conservation body in Gauteng, South Africa. He started participating in field expeditions for the AMNH in 2005 with an expedition to the Northern Cape and southern Namibia and has since undertaken numerous other trips and generously donated material to the collection.
                </p>
              </div>
            </div>
          </div>

          {/* Carine Galvão */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Carine Galvão</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Carine assisted with the curation of an extensive collection of scorpions extracted from pitfall traps placed across southern California by the U.S. Geological Survey (USGS), San Diego between 1996 and 2006.
                </p>
              </div>
            </div>
          </div>

          {/* Tiffany Gentry */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Tiffany Gentry</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Tiffany assisted with sorting, rebottling, labeling, reorganizing, and databasing specimens and tissue samples, and with sorting and filing the Arachnid and Myriapod Reprint Collection.
                </p>
              </div>
            </div>
          </div>

          {/* Ilsa Kaim */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/ilsa.jpg"
                  alt="Ilsa Kaim"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ilsa Kaim</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Ilsa volunteered at the AMNH for over 20 years. Between 2004-2011, she worked with the Arachnology Group to database the reprint collection in Endnote, and she also databased the type collection.
                </p>
              </div>
            </div>
          </div>

          {/* Sergios-Orestis Kolokotronis */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/sergios.jpg"
                  alt="Sergios-Orestis Kolokotronis"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Sergios-Orestis Kolokotronis</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Sergios holds a PhD in Ecology and Evolutionary Biology from Columbia University and had a <a href="https://research.amnh.org/users/koloko" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">postdoc</a> in the AMNH Sackler Institute for Comparative Genomics and Center for Conservation Genetics, where he coordinated the DNA Barcoding Initiative for Conservation. He created and maintained the lab website from 2006 until 2008.
                </p>
              </div>
            </div>
          </div>

          {/* Sulata Maity */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/sulata.jpg"
                  alt="Sulata Maity"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Sulata Maity</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Sulata volunteered in the Molecular Systematics Laboratory checking DNA concentration with nanodrop.
                </p>
              </div>
            </div>
          </div>

          {/* Kari McWest */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/kari.jpg"
                  alt="Kari McWest"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Kari McWest</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700 mb-2">
                  Kari received his Master's from West Texas A&M University, Canyon, where he studied scorpions under David Sissom. He assisted the NSF-REVSYS Vaejovidae project with fieldwork in Mexico and the U.S.
                </p>
                <p>
                  <a href="http://angelfire.com/tx4/scorpiones" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Kari's Scorpion Pages</a>
                </p>
              </div>
            </div>
          </div>

          {/* Randy Mercurio */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/mercurio3.jpg"
                  alt="Randy Mercurio"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Randy Mercurio</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Randy Mercurio is a former volunteer and former employee.
                </p>
              </div>
            </div>
          </div>

          {/* Israel Na'aman */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Israel Na'aman</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Israel received his Masters from the Hebrew University of Jerusalem. During a short visit to the AMNH, he digitized part of the former Lorenzo Prendini scorpion collection, now incorporated into the AMNH collections of Arachnida and Myriapoda.
                </p>
              </div>
            </div>
          </div>

          {/* Danielle Parsons */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Danielle Parsons</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Danielle assisted with sorting, rebottling, labeling, reorganizing, and databasing the arachnid collection.
                </p>
              </div>
            </div>
          </div>

          {/* Fabienne Paumet */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Fabienne Paumet</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Fabienne assisted with sorting, rebottling, labeling, reorganizing, and databasing the arachnid collection.
                </p>
              </div>
            </div>
          </div>

          {/* Warren Schmidt */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Warren Schmidt</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Warren accompanied Lorenzo Prendini on an expedition to collect arachnids in Malawi.
                </p>
              </div>
            </div>
          </div>

          {/* Susan Tosier */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Susan Tosier</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Susan assisted with sorting, rebottling, labeling, and reorganizing, and databasing the arachnid collection.
                </p>
              </div>
            </div>
          </div>

          {/* Zach Valois */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/zach.jpg"
                  alt="Zach Valois"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Zach Valois</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Zach assisted the NSF-REVSYS Vaejovidae project with fieldwork throughout Arizona, Nevada, and Utah. Zach is currently studying scorpion biogeography at the Utah State University.
                </p>
              </div>
            </div>
          </div>

          {/* John Visser */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Visser.jpg"
                  alt="John Visser"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">John Visser</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  John Visser was a retired herpetologist with a fascination for scorpions. John's association with the AMNH went back to the time of the herpetologist Charles Mitchell Bogert. He assisted the AMNH with donations of arachnids for several years before he passed away.
                </p>
              </div>
            </div>
          </div>

          {/* Peg Werns */}
          <div className="mb-6 pb-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Peg Werns</h4>
                <p className="text-sm text-gray-500 mb-2">Former Volunteer</p>
                <p className="text-gray-700">
                  Peg assisted with sorting, rebottling, labeling, reorganizing, and databasing specimens and tissue samples.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeSection === 'visiting-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Visiting Students</h2>
          <p className="text-xl text-gray-600 mb-8">
            Many graduate students from other institutions in the U.S. and abroad have visited the AMNH Arachnology Lab in the past, often funded in part by the AMNH Small Grants program (Annette Kade Fellowships, Collections Study Grants and Theodore Roosevelt Memorial Fund). If you are interested in applying for small grants to visit the AMNH, please visit the <a href="https://www.amnh.org/our-research/richard-gilder-graduate-school/academics-and-research/fellowship-and-grant-opportunities/research-grants-and-student-exchange-fellowships" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Richard Gilder Graduate School.</a>
          </p>

          {/* Jairo A. Moreno-González */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Jairo.jpg"
                  alt="Jairo A. Moreno-González"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Jairo A. Moreno-González</h4>
                <p className="text-sm text-gray-600 mb-1">Museu de Zoologia, Universidade de Sao Paulo, Brasil</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
                <p className="text-gray-700">
                  Jairo is a PhD candidate at the Instituto de Biociencias, Universidad de Sao Paulo, Sao Paulo, Brazil. His research interests are focused on systematics and evolution of some arachnid orders such as Scorpiones (Buthidae: <em>Tityus</em>), and Pedipalpi (Schizomida, Uropygi and Amblypygi). His PhD project deals with the systematic revision of <em>Tityus</em> (<em>Archaeotityus</em>) using phenotypic and genetic evidence. He visited the AMNH for six months to examine material and score morphological characters for his thesis disseration.
                </p>
              </div>
            </div>
          </div>

          {/* Andria de Paula Santos da Silva */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Andria.jpg"
                  alt="Andria de Paula Santos da Silva"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Andria de Paula Santos da Silva</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biociencias, Universidade de Sao Paulo, Brasil</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
                <p className="text-gray-700">
                  Andria's PhD project deals with the systematics of the scorpion genus <em>Ananteris</em> (Buthidae). She visited the AMNH collection to examine a large number of these scorpions and generate morphological data.
                </p>
              </div>
            </div>
          </div>

          {/* Catalina Romero */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Catalina.jpg"
                  alt="Catalina Romero"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Catalina Romero</h4>
                <p className="text-sm text-gray-600 mb-1">Universidad Nacional, Colombia</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
                <p className="text-gray-700">
                  Catalina spent a few months visiting the AMNH collections to examine specimens and collect morphological data for her PhD thesis on pseudoscorpions of the family Whitiidae.
                </p>
              </div>
            </div>
          </div>

          {/* Miguel Medrano */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Miguel.jpg"
                  alt="Miguel Medrano"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Miguel Medrano</h4>
                <p className="text-sm text-gray-600 mb-1">Museu Nacional, Universidade Federal do Rio de Janeiro, Brasil</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student in 2019</p>
                <p className="text-gray-700">
                  Miguel spent a week at the AMNH examining type specimens for his PhD project on systematics of Cosmetidae (Opiliones, Laniatores).
                </p>
              </div>
            </div>
          </div>

          {/* Jahnavi Joshi */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Jahnavi.jpg"
                  alt="Jahnavi Joshi"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Jahnavi Joshi</h4>
                <p className="text-sm text-gray-600 mb-1">Natural History Museum, UK</p>
                <p className="text-sm text-gray-500 mb-2">Post-Doctoral Fellow in 2019</p>
                <p className="text-gray-700">
                  Jahnnavi visited the AMNH to examine a series of old centipedes for an ongoing research project at the Natural History Museum in London.
                </p>
              </div>
            </div>
          </div>

          {/* Aaron Goodman */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Aaron.jpg"
                  alt="Aaron Goodman"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Aaron Goodman</h4>
                <p className="text-sm text-gray-600 mb-1">California Academy of Sciences, USA</p>
                <p className="text-sm text-gray-500 mb-2">Master's Student from 2018 to 2019</p>
                <p className="text-gray-700">
                  Aaron is mainly interested in scorpion systematics. He came to the AMNH to generate morphological data for his master's dissertation on the genus <em>Centruroides</em> (Buthidae).
                </p>
              </div>
            </div>
          </div>

          {/* Stephan Schaffrath */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Stephan_aslq3e.jpg"
                  alt="Stephan Schaffrath"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Stephan Schaffrath</h4>
                <p className="text-sm text-gray-600 mb-1">University of Cologne, Germany</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student from 2014 to 2014 and in 2018</p>
                <p className="text-gray-700">
                  For Stephan's PhD he visited the AMNH to receive training in DNA isolation, amplification and sequencing while investigating the chemical composition of scorpion venoms, with a view to using species-specific signatures for systematics. Later, Stephan returned to spend three months at the AMNH generating DNA and morphological data for his PhD thesis, focused on the scorpion genus <em>Euscorpius</em> (Euscorpiidae).
                </p>
              </div>
            </div>
          </div>

          {/* Carlos Albeto Martinez Muñoz */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/CarlosM.jpg"
                  alt="Carlos Albeto Martinez Muñoz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Carlos Albeto Martinez Muñoz</h4>
                <p className="text-sm text-gray-600 mb-1">University of Turku, Finland</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student from 2018 to 2019</p>
                <p className="text-gray-700">
                  Carlos' main research interest is focused on Myriapods. He came to the AMNH to examine and organize a series of old types described by Chamberlin.
                </p>
              </div>
            </div>
          </div>

          {/* Callum Mclean */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Callum.jpg"
                  alt="Callum Mclean"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Callum Mclean</h4>
                <p className="text-sm text-gray-600 mb-1">Manchester Metropolitan University, UK</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student in 2018</p>
                <p className="text-gray-700">
                  Callum visited the AMNH collections to examine various species of Amblypygi for his doctoral thesis, focused in biomechanics of predatory structures in arthropods.
                </p>
              </div>
            </div>
          </div>

          {/* Shlomo Cain */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Shlomo.jpg"
                  alt="Shlomo Cain"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Shlomo Cain</h4>
                <p className="text-sm text-gray-600 mb-1">University of Haifa, Oranim, Israel</p>
                <p className="text-sm text-gray-500 mb-2">MSc Student in 2018</p>
                <p className="text-gray-700">
                  Shlomo visited the AMNH for three months to examine scorpions of the genus <em>Buthacus</em> (Buthidae) for his master's dissertation.
                </p>
              </div>
            </div>
          </div>

          {/* Ivan Magalhaes */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Ivan.jpg"
                  alt="Ivan Magalhaes"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ivan Magalhaes</h4>
                <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET | Doctoral fellow, Division Aracnologia</p>
                <p className="text-sm text-gray-500 mb-2">PhD Student in 2017</p>
                <p className="text-gray-700">
                  Ivan is a PhD candidate at the Museo Argentino de Ciencias Naturales "Bernardino Rivadavia", Argentina. His research focuses on spider systematics and its interface with their evolution and biogeography. His current project aims at resolving the systematics of crevice weavers (family Filistatidae), a group of shy and little-studied spiders most diverse in dry subtropical areas. His is also interested in the systematics of sand spiders (<em>Sicarius</em>) and spiny orb weavers (<em>Micrathena</em>).
                </p>
              </div>
            </div>
          </div>

          {/* Gerardo Contreras */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/GerardoContreras.jpg"
                  alt="Gerardo Contreras"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Gerardo Contreras</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">Student from 2015 to 2017</p>
                <p className="text-gray-700">
                  Gerardo visited the AMNH to examine the collection of the North American scorpions of the genus <em>Vaejovis</em> and relatives, and score characters for his phylogenetic analysis. He returned a second time to generate DNA sequences in the molecular lab.
                </p>
              </div>
            </div>
          </div>

          {/* Rodrigo Monjáraz Ruedas */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/RodrigoRuedas.jpg"
                  alt="Rodrigo Monjáraz Ruedas"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Rodrigo Monjáraz Ruedas</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2014 and from 2016 to 2017</p>
                <p className="text-gray-700">
                  Rodrigo is studying the Schizomida fauna of Mexico. He visited the AMNH to examine the schizomid holdings of the collection and score morphological characters for his PhD research.
                </p>
              </div>
            </div>
          </div>

          {/* Tebogo Ledwaba */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Tebogo.jpg"
                  alt="Tebogo Ledwaba"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Tebogo Ledwaba</h4>
                <p className="text-sm text-gray-600 mb-1">Ditsong National Museum of Natural History, Pretoria, South Africa</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2017</p>
                <p className="text-gray-700">
                  Tebogo visited the AMNH for 2 months to digitize the AMNH collection of African scorpions and part of the Karoo BioGaps Grant funded by the South African National Research Foundation.
                </p>
              </div>
            </div>
          </div>

          {/* Jesus Alberto Cruz-López */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Jesus.jpg"
                  alt="Jesus Alberto Cruz-López"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Jesus Alberto Cruz-López</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2017</p>
                <p className="text-gray-700">
                  Jesus visited the AMNH to examine the collection of mexican harvestmen (Opiliones) as part of his dissertation research.
                </p>
              </div>
            </div>
          </div>

          {/* Ricardo Botero-Trujillo */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/ric.jpg"
                  alt="Ricardo Botero-Trujillo"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ricardo Botero-Trujillo</h4>
                <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales Bernardino Rivadavia, Argentina | CONICET | Doctoral fellow, Division Aracnologia | Theodore Roosevelt Memorial Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
                <p className="text-gray-700">
                  Ricardo Botero Trujillo earned his biology degree from the Pontificia Universidad Javeriana, Bogotá. While an undergraduate student, he became interested in arachnids and started working on scorpions from his native country, Colombia. Gradually, hooded thick-spider (order Ricinulei) and sun-spiders (order Solifugae) became part of his research interests. After a 5-year period working in the pharmaceutical industry, Ricardo moved to Buenos Aires, Argentina to start his PhD His doctoral thesis consists of a taxonomic revision and phylogenetic analysis of the South American sun-spider family Mummuciidae. After being awarded a Theodore Roosevelt Memorial Grant, Ricardo visited the AMNH to study the collections of the groups he works on.
                </p>
              </div>
            </div>
          </div>

          {/* Dulce Flor Piedra */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Dulce.jpg"
                  alt="Dulce Flor Piedra"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Dulce Flor Piedra</h4>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
                <p className="text-gray-700">
                  Dulce came to examine the collection of Pseudoscorpiones for her dissertation research.
                </p>
              </div>
            </div>
          </div>

          {/* Francisco Salgueiro Sepulveda */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Francisco.jpg"
                  alt="Francisco Salgueiro Sepulveda"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Francisco Salgueiro Sepulveda</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2016</p>
                <p className="text-gray-700">
                  Francisco spent a month at the AMNH to study the collection of tetragnathid spiders for his dissertation.
                </p>
              </div>
            </div>
          </div>

          {/* Diego Barrales */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/diego.jpg"
                  alt="Diego Barrales"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Diego Barrales</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2016</p>
                <p className="text-gray-700">
                  Diego visted the AMNH to examine material belonging to the species <em>Mastigoproctus giganteus</em> especially from localities within the United States. His findings will be incorporated into a morphological analysis used for a species delimitation project.
                </p>
              </div>
            </div>
          </div>

          {/* Samuel Mwangi */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/mwangi.jpg"
                  alt="Samuel Mwangi"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Samuel Mwangi</h4>
                <p className="text-sm text-gray-600 mb-1">West Texas A&M University, Canyon, TX | National Museums of Kenya, Nairobi | Theodore Roosevelt Fellowship, Richard Lounsbery Foundation, Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2005 and 2016</p>
                <p className="text-gray-700">
                  Samuel's MSc research focuses on the diversity of Kenyan scorpions of Kenya. As student at the National Museums of Kenya, Nairobi, he visited the AMNH for training in the Molecular Systematics Laboratory. He later returned to the AMNH to examine and photograph specimens for his Masters research at West Texas A&M University.
                </p>
              </div>
            </div>
          </div>

          {/* Bastian-Jesper Klußmann-Fricke */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/bastian.jpg"
                  alt="Bastian-Jesper Klußmann-Fricke"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Bastian-Jesper Klußmann-Fricke</h4>
                <p className="text-sm text-gray-600 mb-1">University of Rostock, Germany | Annette-Kade Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2015</p>
                <p className="text-gray-700">
                  Bastian visited the AMNH to study the respiratory and circulatory systems of camel spiders (Solifugae) using osmium tetroxide staining, corrosion casting, and microCT.
                </p>
              </div>
            </div>
          </div>

          {/* Gustavo Silva de Miranda */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Gustavo.jpg"
                  alt="Gustavo Silva de Miranda"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Gustavo Silva de Miranda</h4>
                <p className="text-sm text-gray-600 mb-1">Natural History Museum of Denmark, University of Copenhagen</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2014 and 2015</p>
                <p className="text-gray-700">
                  Gustavo visited the AMNH twice during his PhD to work on the collection of whip spiders (Amblypygi) for his revision of the family Charinidae. He was trained and generated DNA sequence data from charinid samples in the AMNH molecular lab.
                </p>
              </div>
            </div>
          </div>

          {/* Ingrid Catalina Romero Ortiz */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Ingrid Catalina Romero Ortiz</h4>
                <p className="text-sm text-gray-600 mb-1">Universidad Nacional de Colombia, Bogotá</p>
                <p className="text-sm text-gray-500 mb-2">Graduate student in 2015</p>
                <p className="text-gray-700">
                  Ingrid Catalina visited the AMNH to study the pseudoscorpion holdings and types as part of her graduate research on their taxonomy and systematics.
                </p>
              </div>
            </div>
          </div>

          {/* Daniela Ramírez */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/DanielaRamirez.jpg"
                  alt="Daniela Ramírez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Daniela Ramírez</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2014</p>
                <p className="text-gray-700">
                  Daniela visited the AMNH to examine the collection of tarantula spiders (Theraphosidae) as part of her PhD research.
                </p>
              </div>
            </div>
          </div>

          {/* Carlos Santibañez-López */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/carlos.jpg"
                  alt="Carlos Santibañez-López"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Carlos Santibañez-López</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City | Collections Study Grant, Theodore Roosevelt Memorial Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2009, from 2011 to 2012, and in 2014</p>
                <p className="text-gray-700">
                  Carlos revised the genus <em>Diplocentrus</em> (Diplocentridae) for his PhD and has studied the taxonomy of other scorpions occurring in Mexico. He first visited the AMNH examine the collection of Diplocentridae and later returned to extract, amplify and sequence DNA from Diplocentridae, and to score a morphological matrix for phylogenetic analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Rene Barba */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/ReneBarba.jpg"
                  alt="Rene Barba"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Rene Barba</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Ecología y Sistemática, Havana, Cuba | Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2019</p>
                <p className="text-gray-700">
                  Rene's research focuses on the pseudoscorpion families Sternophoridae, Olpiidae and Garypinidae. He visited the AMNH collections to examine and image type and nontype material from the Caribbean.
                </p>
              </div>
            </div>
          </div>

          {/* Roberta Engel */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Roberta Engel</h4>
                <p className="text-sm text-gray-600 mb-1">University of Connecticut, Storrs, CT</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2012</p>
                <p className="text-gray-700">
                  Roberta's research focused on the systematics of pseudoscorpions. She visited the AMNH to examine the holdings of Australian pseudoscorpions.
                </p>
              </div>
            </div>
          </div>

          {/* Humberto Yoji Yamaguti */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/humberto.jpg"
                  alt="Humberto Yoji Yamaguti"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Humberto Yoji Yamaguti</h4>
                <p className="text-sm text-gray-600 mb-1">Universidade de São Paulo, Brazil</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2009 and 2011</p>
                <p className="text-gray-700">
                  Humberto conducted a revision and phylogenetic analysis of the scorpion genus <em>Rhopalurus</em> (Buthidae) for his PhD He visited the AMNH to extract, amplify and sequence DNA from Rhopalurus samples and to use materials to score characters.
                </p>
              </div>
            </div>
          </div>

          {/* Patricia Carrera */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Patricia Carrera</h4>
                <p className="text-sm text-gray-600 mb-1">Universidad Nacional de Cordoba, Argentina | Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2009</p>
                <p className="text-gray-700">
                  Patricia studied mating behavior and sexual selection in bothriurid scorpions for her PhD She visited the AMNH to study the structure and homology of the scorpion hemispermatophore.
                </p>
              </div>
            </div>
          </div>

          {/* Jesus Alfonso Ballesteros Chavez */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/jesusb.jpg"
                  alt="Jesus Alfonso Ballesteros Chavez"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Jesus Alfonso Ballesteros Chavez</h4>
                <p className="text-sm text-gray-600 mb-1">Instituto de Biología, Universidad Nacional Autonóma de México (IBUNAM), Mexico City | Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2008</p>
                <p className="text-gray-700">
                  Jesus' MSc research aimed to reconstruct the phylogenetic relationships of the species belonging to the Neotropical whip spider genus <em>Paraphrynus</em> (Amblypygi) and its relationship with the rest of the genera of Phrynidae. He visited the AMNH to study the Neotropical phrynids. He then moved to George Washington University for a PhD on spiders.
                </p>
              </div>
            </div>
          </div>

          {/* Fabio Akashi Hernandes */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/Hernanades.jpg"
                  alt="Fabio Akashi Hernandes"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Fabio Akashi Hernandes</h4>
                <p className="text-sm text-gray-600 mb-1">UNESP: São Paulo State University, Brazil</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2008 and 2016</p>
                <p className="text-gray-700">
                  Fabio's main interests are the taxonomy of plant mites (Bdellidae, Tetranychidae, Raphignathoidea) and feather mites (Astigmata), with an emphasis on the taxonomy and phylogeny of the genus <em>Aponychus</em> and related genera (Acari, Tetranychidae). He visited the AMNH to study mite types from several groups.
                </p>
              </div>
            </div>
          </div>

          {/* Andrés Ojanguren-Affilastro */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/ojanguren.jpg"
                  alt="Andrés Ojanguren-Affilastro"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Andrés Ojanguren-Affilastro</h4>
                <p className="text-sm text-gray-600 mb-1">Museo Argentino de Ciencias Naturales, Buenos Aires, Argentina | AMNH Collections Study Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2005 and 2007</p>
                <p className="text-gray-700">
                  Andrés' PhD research was a revision of the diverse South American bothriurid genus <em>Brachistosternus</em>. He visited the AMNH twice, the first time to extract, amplify and sequence DNA from bothriurid samples and a second time to continue his work on bothriurid systematics.
                </p>
              </div>
            </div>
          </div>

          {/* Alexander V. Gromov */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/gromov.jpg"
                  alt="Alexander V. Gromov"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Alexander V. Gromov</h4>
                <p className="text-sm text-gray-600 mb-1">Institute of Zoology, Almaty, Kazakhstan | Collections Study Grant and NSF BS&I Grant</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2007</p>
                <p className="text-gray-700">
                  Alex is interested in central Asian solifuges and is revising the family Karschiidae. He visited the AMNH to work on the solpugid collections as part of the Global Survey and Inventory of Solifugae.
                </p>
              </div>
            </div>
          </div>

          {/* Carsten Kamenz */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/carstenk.jpg"
                  alt="Carsten Kamenz"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Carsten Kamenz</h4>
                <p className="text-sm text-gray-600 mb-1">Humboldt University, Berlin, Germany | Annette Kade Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">Student from 2005 to 2006</p>
                <p className="text-gray-700">
                  Carsten was a visiting student and a postdoc.
                </p>
              </div>
            </div>
          </div>

          {/* Valerio Vignoli */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/vignoli.jpg"
                  alt="Valerio Vignoli"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Valerio Vignoli</h4>
                <p className="text-sm text-gray-600 mb-1">University of Siena, Italy | Theodore Roosevelt Memorial Grant</p>
                <p className="text-sm text-gray-500 mb-2">PhD student in 2004 and 2006</p>
                <p className="text-gray-700">
                  Valerio revised the taxonomy, ecology and biogeography of <em>Euscorpius</em> for his PhD. He visited the AMNH twice to revise the North American scorpion family Typhlochactidae. He also participated in AMNH trips to Benin, Costa Rica, Morocco, Guinea-Bissau and Senegal.
                </p>
              </div>
            </div>
          </div>

          {/* Christian Wirkner */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/wirkner.jpg"
                  alt="Christian Wirkner"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Christian Wirkner</h4>
                <p className="text-sm text-gray-600 mb-1">Friedrich-Schiller University, Jena, Germany | Annette Kade Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2004</p>
                <p className="text-gray-700">
                  Christian studied the comparative morphology of arthropods from phylogenetic and evolutionary perspectives and, more specifically, organ evolution and transformation, first at Jena University before moving to Rostock University. He visited the AMNH to study the scorpion circulatory system.
                </p>
              </div>
            </div>
          </div>

          {/* Christina Bisulca */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/bisulca.jpg"
                  alt="Christina Bisulca"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Christina Bisulca</h4>
                <p className="text-sm text-gray-600 mb-1">University of Delaware, Newark, DE | Winterthur Art Conservation Fellowship</p>
                <p className="text-sm text-gray-500 mb-2">MSc student in 2003</p>
                <p className="text-gray-700">
                  Christina visited the AMNH during her MSc in Art Conservation at the University of Delaware, working with the Department of Natural Sciences Conservation. Bisulca surveyed the state of curation of the non-spider Arachnid and Myriapod Collection, resulting in upgrades to the glassware and closures housing the collection.
                </p>
              </div>
            </div>
          </div>

          {/* Amazonas Chagas, Jr. */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/chagas.jpg"
                  alt="Amazonas Chagas, Jr."
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Amazonas Chagas, Jr.</h4>
                <p className="text-sm text-gray-600 mb-1">Museu Nacional, Universidade Federal do Rio de Janeiro, Brazil</p>
                <p className="text-sm text-gray-500 mb-2">Postgraduate student in 2003</p>
                <p className="text-gray-700">
                  After his Masters, Amazonas visited the AMNH while in the USA to work at the North Carolina State Museum, Raleigh. At the AMNH, Amazonas studied scolopendromorph centipedes from around the world.
                </p>
              </div>
            </div>
          </div>

          {/* Lionel Monod */}
          <div className="mb-6 pb-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                <Image
                  src="/images/lionel.jpg"
                  alt="Lionel Monod"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold mb-1 text-gray-900">Lionel Monod</h4>
                <p className="text-sm text-gray-600 mb-1">University of Geneva, Switzerland</p>
                <p className="text-sm text-gray-500 mb-2">Student in 2002</p>
                <p className="text-gray-700">
                  Lionel Monod was a visiting student and graduate student.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
