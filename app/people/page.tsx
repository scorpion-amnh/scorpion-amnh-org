'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function People() {
  const [activeSection, setActiveSection] = useState('lab-evolution');

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-1">
            <ul className="space-y-2 lg:sticky lg:top-32">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Area */}
          <div className="lg:col-span-3">
        {activeSection === 'lab-evolution' && (
        <div>
          {/* Fall 2019 */}
          <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Fall 2019</h2>
          <h6 className="text-lg text-gray-600 mb-6">Arachnology Lab at AMNH</h6>
          <figure className="mb-8">
            <Image
              src="/images/labfall2019_p08qpk.jpg"
              alt="Fall 2019 Arachnology Lab at AMNH. Left to Right: George Tsinias, Jairo Moreno, Lorenzo Prendini, Stephanie Loria, Valentin Ehrernthal, Eleanor Goetz, Pio Colmenares, Miryam Trujillo, Ricardo Botero-Trujillo."
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <figcaption className="text-sm text-gray-600 mt-3 italic">
              Left to Right: George Tsinias, Jairo Moreno, Lorenzo Prendini, Stephanie Loria, 
              Valentin Ehrernthal, Eleanor Goetz, Pio Colmenares, Miryam Trujillo, Ricardo Botero-Trujillo.
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
              className="w-full h-auto rounded-lg shadow-md"
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
                    className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="mt-4 rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                  className="w-full h-auto rounded-lg shadow-md"
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
                      className="w-full h-auto rounded-lg shadow-md"
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
                    className="w-full h-auto rounded-lg shadow-md"
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
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Postdocs</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}

        {activeSection === 'graduate-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Graduate Students</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}

        {activeSection === 'undergraduate-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Undergraduate Students</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}

        {activeSection === 'high-school-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">High School Students</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}

        {activeSection === 'volunteers' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Volunteers</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}

        {activeSection === 'visiting-students' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Visiting Students</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
