import Image from "next/image";

/** Reference portrait proportions (Gertsch) — used to cap Lorenzo's taller crop. */
const REFERENCE_PORTRAIT_CLASS = "aspect-[666/833]";

type Curator = {
  src: string;
  alt: string;
  name: string;
  width: number;
  height: number;
  grayscale?: boolean;
  matchReferenceHeight?: boolean;
};

const curators: Curator[] = [
  {
    src: "/images/people/Willis-Gertsch.jpg",
    alt: "Willis J. Gertsch",
    name: "Willis J. Gertsch",
    width: 666,
    height: 833,
  },
  {
    src: "/images/people/John-Cooke.jpg",
    alt: "John L. Cooke",
    name: "John L. Cooke",
    width: 586,
    height: 733,
  },
  {
    src: "/images/people/Norman-Platnick.jpg",
    alt: "Norman I. Platnick",
    name: "Norman I. Platnick",
    width: 487,
    height: 610,
  },
  {
    src: "/images/people/Lorenzo-Prendini.jpg",
    alt: "Lorenzo Prendini",
    name: "Lorenzo Prendini",
    width: 250,
    height: 326,
    grayscale: true,
    matchReferenceHeight: true,
  },
];

export const CuratorPortraits = () => (
  <section aria-label="Curators of Arachnida" className="mb-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {curators.map((curator) => (
        <figure key={curator.name}>
          <div
            className={`overflow-hidden rounded-sm bg-gray-100${
              curator.matchReferenceHeight ? ` ${REFERENCE_PORTRAIT_CLASS}` : ""
            }`}
          >
            <Image
              src={curator.src}
              alt={curator.alt}
              width={curator.width}
              height={curator.height}
              className={
                curator.matchReferenceHeight
                  ? `w-full h-full object-cover object-top${curator.grayscale ? " grayscale" : ""}`
                  : `w-full h-auto${curator.grayscale ? " grayscale" : ""}`
              }
            />
          </div>
          <figcaption className="text-meta mt-3">{curator.name}</figcaption>
        </figure>
      ))}
    </div>
  </section>
);
