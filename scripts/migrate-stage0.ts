import { promises as fs } from "fs";
import path from "path";
import {
  principalInvestigatorData,
  museumSpecialistsData,
  technicalStaffData,
  researchAffiliatesData,
  postdocsData,
  graduateStudentsData,
  undergraduateStudentsData,
  highSchoolStudentsData,
  volunteersData,
  visitorsData,
} from "../app/people/data";
import type { Person } from "../app/people/types";
import { parsePublications } from "./parse-publications";

const ROOT = path.join(process.cwd());
const CONTENT = path.join(ROOT, "content");

const peopleImageFolderOverrides: Record<string, string> = {
  "2024-fieldwork-Pio-and-Jairo.HEIC": "field",
  "2024-preparing-samples-abroad.JPG": "field",
  "Loria.jpg": "field",
  "drawing.jpg": "research",
};

const peopleImageFilenameAliases: Record<string, string> = {
  "2025-Colmenares-and-visiting-researchers-in-the-collection.jpg":
    "2025-Pio-Colmenares-and-visiting-researchers-in-the-collection.jpg",
  "2025-Molecular-lab-interns-Summer-2025.jpg":
    "2025-molecular-lab-summer-interns--Adithya-Raghunath--Jakub-Minkiewicz--Jack-Coulson--Maxine-Ting.jpg",
  "2025-Group-photp-back-Nick-William-Jose-Jairo-Drusilla-Lorenzo-Pio-front-Javier-Colby.jpg":
    "2025-lab-outside-guilder-center--Nick-Cazzaniga--William-Phillips--Jose-Barba-Montoya--Jairo-A-Moreno-Gonzalez--Drusilla-Sheridan--Lorenzo-Prendini--Pio-Colmenares--Javier-Blasco-Arostegui--Colby-Sain.jpg",
  "highschool2006.jpg": "Jianhua-Lin--and--Qiao-Rong-Huang.jpg",
  "SRMPSashaandEleanor.jpg": "Sasha-Reiter--and--Eleanor-Goetz.jpg",
  "jose_barba_arachnology_lab.jpg": "Jose-Barba-Montoya.jpg",
  "Jesus.jpg": "Jesus-Alberto-Cruz-Lopez.jpg",
  "2024-lunch-Pio-Ricardo-Lorenzo-Colby-Jairo.JPG":
    "2024-lab-lunch--Pio-Colmenares--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Colby-Sain--Jairo-Blasco-Arostegui.JPG",
  "2023-dinner-Left-front-to-back-Pio-Isadora-Stephanie-Lorenzo-Valentin-right-front-to-back-Victoria-Jairo-Javier-Taylor-Colby.JPG":
    "2023-lab-dinner--Pio-Colmenares--Isadora-Colmenares--Stephanie-Loria--Lorenzo-Prendini--Valentin-Ehrenthal--Victoria-Long--Jairo-A-Moreno-Gonzalez--Javier-Blasco-Arostegui--Taylor-Hicks--Colby-Sain.JPG",
  "2023-Kimberly-Russell-and-students-from-Rutgers-University.HEIC":
    "2023-Kimberly-Russell-and-students-from-Rutgers-University.jpg",
  "2022-Lab-end-of-day-Javier-Marcel-Colby-Jairo-Sahibzada-Pio.JPG":
    "2022-lab-in-rose-center--Javier-Blasco-Arostegui--Marcel-Hermes--Colby-Sain--Jairo-A-Moreno-Gonzalez--Sahibzada-M-Jawad--Pio-Colmenares.jpg",
  "2021-lunch-Ricardo-Lorenzo-Lou-Pio.HEIC":
    "2021-lab-lunch--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Lou-Sorkin--Pio-Colmenares.jpg",
  "labfall2019_p08qpk.jpg": "2019-lab-in-NYC-fall.jpg",
  "summer2019.jpg": "2019-lab-in-NYC-summer.jpg",
  "Prendini_Lab_Summer2018.jpg": "2018-lab-outside-AMNH.jpg",
  "PrendiniLabSeptember2017.jpg": "2017-lab-outside-AMNH.jpg",
  "PrendiniLabAugust2017.jpg": "2017-lab-in-NYC.jpg",
  "PrendiniLabAugust2015.jpg": "2015-lab-outside-AMNH.jpg",
  "PrendiniLabJan2015.jpg": "2015-lab-inside-AMNH-paleontology.jpg",
  "scorpiongroups2013.jpg": "2013-lab-outside-AMNH.jpg",
  "scorpiongroups.jpg": "2011-lab-outside-AMNH.jpg",
  "scorpiongroup.jpg": "2006-lab-outside-AMNH.jpg",
  "ica.jpg": "2007-scorpion-biologists-ICA.jpg",
  "Solifugae_2007.jpg": "2007-BSI-solifugae-meeting-at-DMNS.jpg",
  "Atol_2008.jpg": "2008-ATOL-morphology-scroing-party-at-Smithsonian-USNM.jpg",
};

const categoryExports: Array<[string, { current: Person[]; alumni: Person[] }]> = [
  ["principal-investigator", principalInvestigatorData],
  ["museum-specialists", museumSpecialistsData],
  ["technical-staff", technicalStaffData],
  ["research-affiliates", researchAffiliatesData],
  ["postdocs", postdocsData],
  ["graduate-students", graduateStudentsData],
  ["undergraduate-students", undergraduateStudentsData],
  ["high-school-students", highSchoolStudentsData],
  ["volunteers", volunteersData],
  ["visiting-students", visitorsData],
];

const htmlToMarkdown = (html: string): string => {
  const text = html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<div[^>]*>/gi, "")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
};

const resolveImage = (image: string | null | undefined) => {
  if (!image) {
    return null;
  }

  if (image.includes("/")) {
    const [folder, ...rest] = image.split("/");
    const filename = rest.join("/");
    const aliasFilename = peopleImageFilenameAliases[filename] ?? filename;
    return { folder, filename: aliasFilename };
  }

  const overrideFolder = peopleImageFolderOverrides[image];
  const folder = overrideFolder ?? "people";
  const filename = peopleImageFilenameAliases[image] ?? image;
  return { folder, filename };
};

const serializePerson = (
  person: Person,
  sectionId: string,
  tab: "current" | "alumni"
) => {
  const record: Record<string, unknown> = {
    id: person.id,
    name: person.name,
    sectionId,
    tab,
  };

  if (person.affiliation) record.affiliation = person.affiliation;
  if (person.title !== undefined) record.title = person.title;
  if (person.years) record.years = person.years;
  if (person.links) record.links = person.links;

  record.image = resolveImage(
    typeof person.image === "string" ? person.image : person.image ?? null
  );

  if (typeof person.bio === "string" && person.bio.trim()) {
    record.bio = person.bio.includes("<") ? htmlToMarkdown(person.bio) : person.bio;
  } else if (person.bio === null) {
    record.bio = null;
  }

  if (typeof person.contact === "string" && person.contact.trim()) {
    record.contact = person.contact.includes("<")
      ? htmlToMarkdown(person.contact)
      : person.contact;
  }

  return record;
};

const arachnidsImages = [
  "arachnids/00050.jpg", "arachnids/00101.jpg", "arachnids/00240.jpg", "arachnids/00474.jpg", "arachnids/07915.jpg",
  "arachnids/cricket1.jpg", "arachnids/cricket2.jpg", "arachnids/cricket3.jpg", "arachnids/cricket4.jpg",
  "arachnids/DSC_0001.jpg", "arachnids/DSC_0002.jpg", "arachnids/DSC_0003.jpg", "arachnids/DSC_0005.jpg",
  "arachnids/DSC_0006.jpg", "arachnids/DSC_0008.jpg", "arachnids/DSC_0009.jpg", "arachnids/DSC_0010.jpg",
  "arachnids/DSC_0011.jpg", "arachnids/DSC_0012.jpg", "arachnids/DSC_0013.jpg", "arachnids/DSC_0014.jpg",
  "arachnids/DSC_0015.jpg", "arachnids/DSC_0016.jpg", "arachnids/DSC_0017.jpg", "arachnids/DSC_0018.jpg",
  "arachnids/DSC_0019.jpg", "arachnids/DSC_0020.jpg", "arachnids/DSC_0021.jpg", "arachnids/DSC_0022.jpg",
  "arachnids/DSC_0023.jpg", "arachnids/DSC_0024.jpg", "arachnids/DSC_0025.jpg", "arachnids/DSC_0026.jpg",
  "arachnids/DSC_0027.jpg", "arachnids/DSC_0028.jpg", "arachnids/DSC_0029.jpg", "arachnids/DSC_0030.jpg",
  "arachnids/DSC_0031.jpg", "arachnids/DSC_0032.jpg", "arachnids/Hexisopodid1.jpg", "arachnids/Hexisopodid2.gif",
  "arachnids/Hexisopodid3.gif", "arachnids/blind1.jpg", "arachnids/blind2.gif", "arachnids/Pterygocercus.jpg",
  "arachnids/Rhagodid1.jpg", "arachnids/Rhagodid2.jpg", "arachnids/Solipugid1.jpg", "arachnids/Opisthacanthus.jpg",
  "arachnids/pectines.jpg",
];

const fieldworkImages = [
  { src: "DSCN7139.jpg", orientation: "portrait" },
  { src: "DSCN1182.jpg", orientation: "landscape" },
  { src: "IMG_2488.jpg", orientation: "portrait" },
  { src: "IMG_0237.jpg", orientation: "landscape" },
  { src: "Malawi443.jpg", orientation: "landscape" },
  { src: "IMG_2261.jpg", orientation: "landscape" },
  { src: "IMG_0823.jpg", orientation: "landscape" },
  { src: "DSCF5506.jpg", orientation: "landscape" },
  { src: "Mozambique041.jpg", orientation: "landscape" },
  { src: "DSCN0023.jpg", orientation: "landscape" },
  { src: "DSCN0494.jpg", orientation: "portrait" },
  { src: "D.mexicanus.ElMoral.jpg", orientation: "landscape" },
  { src: "IMG_0684.jpg", orientation: "landscape" },
  { src: "DSCN6382.jpg", orientation: "portrait" },
  { src: "IMG_2478.jpg", orientation: "landscape" },
  { src: "Edmund-blacklightingZimapan.jpg", orientation: "portrait" },
  { src: "DSCN0089.jpg", orientation: "portrait" },
  { src: "Jose.and.Camillo.jpg", orientation: "landscape" },
  { src: "DSCN2068.jpg", orientation: "portrait" },
  { src: "DSCN0020.jpg", orientation: "landscape" },
  { src: "LitterWPark.jpg", orientation: "landscape" },
  { src: "DSCN0188.jpg", orientation: "landscape" },
  { src: "DSCN1207.jpg", orientation: "landscape" },
  { src: "IMG_2559.jpg", orientation: "landscape" },
  { src: "DSCN0255.jpg", orientation: "landscape" },
  { src: "IMG_0487.jpg", orientation: "landscape" },
  { src: "DSCN0039.jpg", orientation: "landscape" },
  { src: "DSCN0092.jpg", orientation: "landscape" },
  { src: "Jeremy-Valerio_Senegal.jpg", orientation: "landscape" },
] as const;

const filenameToAlt = (filename: string) => {
  const base = path.basename(filename, path.extname(filename));
  return base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
};

const parseLabHistory = async () => {
  const peopleSource =
    process.env.PEOPLE_SOURCE ?? path.join(ROOT, "scripts/sources/people.page.tsx.txt");
  const source = await fs.readFile(peopleSource, "utf8");
  const cardsStart = source.indexOf("const peopleGroupData:");
  const cardsEnd = source.indexOf("const peopleGroupSectionData:");
  const sectionsEnd = source.indexOf("export default function People()");
  const cardsBlock = source.slice(cardsStart, cardsEnd);
  const sectionsBlock = source.slice(cardsEnd, sectionsEnd);

  const cardRegex =
    /src:\s*"([^"]+)",\s*alt:\s*"((?:\\.|[^"\\])*)",\s*caption:\s*"((?:\\.|[^"\\])*)"(?:,\s*width:\s*(\d+))?(?:,\s*height:\s*(\d+))?\s*,?\s*\}/g;

  const cards: Array<{
    src: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
  }> = [];

  let cardMatch: RegExpExecArray | null;
  while ((cardMatch = cardRegex.exec(cardsBlock)) !== null) {
    cards.push({
      src: cardMatch[1],
      alt: cardMatch[2],
      caption: cardMatch[3],
      ...(cardMatch[4] ? { width: Number(cardMatch[4]) } : {}),
      ...(cardMatch[5] ? { height: Number(cardMatch[5]) } : {}),
    });
  }

  const sectionRegex =
    /\{\s*year:\s*"([^"]*)",\s*subtitle:\s*"([^"]*)",\s*cards:\s*\[peopleGroupData\[(\d+)\]\]\s*\}/g;
  const sections: Array<{ year: string; subtitle: string; cardIndex: number }> = [];
  let sectionMatch: RegExpExecArray | null;
  while ((sectionMatch = sectionRegex.exec(sectionsBlock)) !== null) {
    sections.push({
      year: sectionMatch[1],
      subtitle: sectionMatch[2],
      cardIndex: Number(sectionMatch[3]),
    });
  }

  return { cards, sections };
};

const writeJson = async (filePath: string, data: unknown) => {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

const main = async () => {
  await fs.mkdir(path.join(CONTENT, "people"), { recursive: true });
  await fs.mkdir(path.join(CONTENT, "gallery"), { recursive: true });

  let peopleCount = 0;
  for (const [sectionId, category] of categoryExports) {
    for (const tab of ["current", "alumni"] as const) {
      for (const person of category[tab]) {
        if (!person.id) {
          throw new Error(`Person ${person.name} in ${sectionId}/${tab} is missing id`);
        }
        const record = serializePerson(person, sectionId, tab);
        await writeJson(path.join(CONTENT, "people", `${person.id}.json`), record);
        peopleCount += 1;
      }
    }
  }

  const publications = await parsePublications();
  await writeJson(path.join(CONTENT, "publications.json"), publications);

  const arachnidsDir = path.join(ROOT, "public/images/arachnids");
  const homeEntries = (await fs.readdir(arachnidsDir))
    .filter((entry) => entry !== ".DS_Store")
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => ({
      src: `/images/arachnids/${filename}`,
      alt: filenameToAlt(filename),
    }));

  await writeJson(path.join(CONTENT, "gallery/home.json"), homeEntries);
  await writeJson(
    path.join(CONTENT, "gallery/arachnids.json"),
    arachnidsImages.map((src) => ({
      src: `/images/${src}`,
      alt: filenameToAlt(src),
    }))
  );
  await writeJson(
    path.join(CONTENT, "gallery/fieldwork.json"),
    fieldworkImages.map((image, index) => ({
      src: `/images/field/${image.src}`,
      alt: `Fieldwork photograph ${index + 1}: ${filenameToAlt(image.src)}`,
      orientation: image.orientation,
    }))
  );

  const labHistory = await parseLabHistory();
  await writeJson(path.join(CONTENT, "lab-history.json"), labHistory);

  console.log(
    JSON.stringify(
      {
        peopleCount,
        publicationsCount: publications.length,
        homeGalleryCount: homeEntries.length,
        arachnidsGalleryCount: arachnidsImages.length,
        fieldworkGalleryCount: fieldworkImages.length,
        labHistoryCards: labHistory.cards.length,
        labHistorySections: labHistory.sections.length,
      },
      null,
      2
    )
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
