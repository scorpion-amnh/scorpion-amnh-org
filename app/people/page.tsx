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
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Principal Investigator</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
        </div>
        )}

        {activeSection === 'staff' && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Staff</h2>
          <p className="text-lg leading-8 text-gray-700">Content coming soon.</p>
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
