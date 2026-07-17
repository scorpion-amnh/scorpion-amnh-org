import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

const labHistorySrcMap: Record<string, string> = {
  "/images/2025-Molecular-lab-interns-Summer-2025.jpg":
    "/images/people/2025-molecular-lab-summer-interns--Adithya-Raghunath--Jakub-Minkiewicz--Jack-Coulson--Maxine-Ting.jpg",
  "/images/2025-Pio-Colmenares-and-visiting-researchers-in-the-collection.jpg":
    "/images/people/2025-Pio-Colmenares-and-visiting-researchers-in-the-collection.jpg",
  "/images/2025-Group-photp-back-Nick-William-Jose-Jairo-Drusilla-Lorenzo-Pio-front-Javier-Colby.jpg":
    "/images/people/2025-lab-outside-guilder-center--Nick-Cazzaniga--William-Phillips--Jose-Barba-Montoya--Jairo-A-Moreno-Gonzalez--Drusilla-Sheridan--Lorenzo-Prendini--Pio-Colmenares--Javier-Blasco-Arostegui--Colby-Sain.jpg",
  "/images/2024-lunch-Pio-Ricardo-Lorenzo-Colby-Jairo.JPG":
    "/images/people/2024-lab-lunch--Pio-Colmenares--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Colby-Sain--Jairo-Blasco-Arostegui.JPG",
  "/images/2023-dinner-Left-front-to-back-Pio-Isadora-Stephanie-Lorenzo-Valentin-right-front-to-back-Victoria-Jairo-Javier-Taylor-Colby.JPG":
    "/images/people/2023-lab-dinner--Pio-Colmenares--Isadora-Colmenares--Stephanie-Loria--Lorenzo-Prendini--Valentin-Ehrenthal--Victoria-Long--Jairo-A-Moreno-Gonzalez--Javier-Blasco-Arostegui--Taylor-Hicks--Colby-Sain.JPG",
  "/images/2023-Kimberly-Russell-and-students-from-Rutgers-University.HEIC":
    "/images/people/2023-Kimberly-Russell-and-students-from-Rutgers-University.jpg",
  "/images/2022-Lab-end-of-day-Javier-Marcel-Colby-Jairo-Sahibzada-Pio.JPG":
    "/images/people/2022-lab-in-rose-center--Javier-Blasco-Arostegui--Marcel-Hermes--Colby-Sain--Jairo-A-Moreno-Gonzalez--Sahibzada-M-Jawad--Pio-Colmenares.jpg",
  "/images/2021-lunch-Ricardo-Lorenzo-Lou-Pio.HEIC":
    "/images/people/2021-lab-lunch--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Lou-Sorkin--Pio-Colmenares.jpg",
  "/images/labfall2019_p08qpk.jpg": "/images/people/2019-lab-in-NYC-fall.jpg",
  "/images/summer2019.jpg": "/images/people/2019-lab-in-NYC-summer.jpg",
  "/images/Prendini_Lab_Summer2018.jpg": "/images/people/2018-lab-outside-AMNH.jpg",
  "/images/PrendiniLabSeptember2017.jpg": "/images/people/2017-lab-outside-AMNH.jpg",
  "/images/PrendiniLabAugust2017.jpg": "/images/people/2017-lab-in-NYC.jpg",
  "/images/PrendiniLabAugust2015.jpg": "/images/people/2015-lab-outside-AMNH.jpg",
  "/images/PrendiniLabJan2015.jpg": "/images/people/2015-lab-inside-AMNH-paleontology.jpg",
  "/images/scorpiongroups2013.jpg": "/images/people/2013-lab-outside-AMNH.jpg",
  "/images/scorpiongroups.jpg": "/images/people/2011-lab-outside-AMNH.jpg",
  "/images/scorpiongroup.jpg": "/images/people/2006-lab-outside-AMNH.jpg",
  "/images/ica.jpg": "/images/people/2007-scorpion-biologists-ICA.jpg",
  "/images/Solifugae_2007.jpg": "/images/people/2007-BSI-solifugae-meeting-at-DMNS.jpg",
  "/images/Atol_2008.jpg": "/images/people/2008-ATOL-morphology-scroing-party-at-Smithsonian-USNM.jpg",
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

const buildImageIndex = async () => {
  const publicImages = path.join(ROOT, "public", "images");
  const index = new Map<string, { folder: string; filename: string }>();

  const walk = async (dir: string, folderParts: string[] = []) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath, [...folderParts, entry.name]);
        continue;
      }

      if (entry.name === ".DS_Store") {
        continue;
      }

      const folder = folderParts.join("/");
      const normalizedName = normalize(path.parse(entry.name).name);
      index.set(`${folder}/${normalizedName}`, { folder, filename: entry.name });
      index.set(normalizedName, { folder, filename: entry.name });
    }
  };

  await walk(publicImages);
  return index;
};

const resolveImageRecord = (
  image: { folder: string; filename: string } | null,
  index: Map<string, { folder: string; filename: string }>
) => {
  if (!image) {
    return null;
  }

  const currentPath = `/images/${image.folder}/${image.filename}`;
  const normalizedFilename = normalize(path.parse(image.filename).name);
  const candidates = [
    `${image.folder}/${normalizedFilename}`,
    normalizedFilename,
  ];

  for (const key of candidates) {
    const match = index.get(key);
    if (match) {
      return match;
    }
  }

  for (const [key, match] of index.entries()) {
    if (key.includes(normalizedFilename) || normalizedFilename.includes(key)) {
      return match;
    }
  }

  console.warn(`No image match found for ${currentPath}; clearing image field.`);
  return null;
};

const fixLabHistory = async () => {
  const filePath = path.join(CONTENT, "lab-history.json");
  const labHistory = JSON.parse(await fs.readFile(filePath, "utf8")) as {
    cards: Array<{ src: string; alt: string; caption: string }>;
    sections: unknown[];
  };

  labHistory.cards = labHistory.cards.map((card) => ({
    ...card,
    src: labHistorySrcMap[card.src] ?? card.src,
  }));

  await fs.writeFile(filePath, `${JSON.stringify(labHistory, null, 2)}\n`, "utf8");
};

const fixPeople = async (index: Map<string, { folder: string; filename: string }>) => {
  const peopleDir = path.join(CONTENT, "people");
  const files = (await fs.readdir(peopleDir)).filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(peopleDir, file);
    const person = JSON.parse(await fs.readFile(filePath, "utf8")) as {
      id: string;
      image: { folder: string; filename: string } | null;
    };

    if (!person.image) {
      continue;
    }

    const resolved = resolveImageRecord(person.image, index);
    person.image = resolved;
    await fs.writeFile(filePath, `${JSON.stringify(person, null, 2)}\n`, "utf8");
  }
};

const main = async () => {
  const index = await buildImageIndex();
  await fixLabHistory();
  await fixPeople(index);
  console.log("Updated content image paths.");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
