import type { ImageProps } from "next/image";

const peopleImageFolderOverrides: Record<string, string> = {
  "2024-fieldwork-Pio-and-Jairo.HEIC": "field",
  "2024-preparing-samples-abroad.JPG": "field",
  "Loria.jpg": "field",
  "drawing.jpg": "research",
};

const peopleImageFilenameAliases: Record<string, string> = {
  "2025-Colmenares-and-visiting-researchers-in-the-collection.jpg": "2025-Pio-Colmenares-and-visiting-researchers-in-the-collection.jpg",
  "2025-Molecular-lab-interns-Summer-2025.jpg": "2025-molecular-lab-summer-interns--Adithya-Raghunath--Jakub-Minkiewicz--Jack-Coulson--Maxine-Ting.jpg",
  "2025-Group-photp-back-Nick-William-Jose-Jairo-Drusilla-Lorenzo-Pio-front-Javier-Colby.jpg": "2025-lab-outside-guilder-center--Nick-Cazzaniga--William-Phillips--Jose-Barba-Montoya--Jairo-A-Moreno-Gonzalez--Drusilla-Sheridan--Lorenzo-Prendini--Pio-Colmenares--Javier-Blasco-Arostegui--Colby-Sain.jpg",
  "highschool2006.jpg": "Jianhua-Lin--and--Qiao-Rong-Huang.jpg",
  "SRMPSashaandEleanor.jpg": "Sasha-Reiter--and--Eleanor-Goetz.jpg",
  "jose_barba_arachnology_lab.jpg": "Jose-Barba-Montoya.jpg",
  "Jesus.jpg": "Jesus-Alberto-Cruz-Lopez.jpg",
  "2024-lunch-Pio-Ricardo-Lorenzo-Colby-Jairo.JPG": "2024-lab-lunch--Pio-Colmenares--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Colby-Sain--Jairo-Blasco-Arostegui.JPG",
  "2023-dinner-Left-front-to-back-Pio-Isadora-Stephanie-Lorenzo-Valentin-right-front-to-back-Victoria-Jairo-Javier-Taylor-Colby.JPG": "2023-lab-dinner--Pio-Colmenares--Isadora-Colmenares--Stephanie-Loria--Lorenzo-Prendini--Valentin-Ehrenthal--Victoria-Long--Jairo-A-Moreno-Gonzalez--Javier-Blasco-Arostegui--Taylor-Hicks--Colby-Sain.JPG",
  "2023-Kimberly-Russell-and-students-from-Rutgers-University.HEIC": "2023-Kimberly-Russell-and-students-from-Rutgers-University.jpg",
  "2022-Lab-end-of-day-Javier-Marcel-Colby-Jairo-Sahibzada-Pio.JPG": "2022-lab-in-rose-center--Javier-Blasco-Arostegui--Marcel-Hermes--Colby-Sain--Jairo-A-Moreno-Gonzalez--Sahibzada-M-Jawad--Pio-Colmenares.jpg",
  "2021-lunch-Ricardo-Lorenzo-Lou-Pio.HEIC": "2021-lab-lunch--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Lou-Sorkin--Pio-Colmenares.jpg",
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

type NameCandidateOptions = {
  includeUnderscore?: boolean;
};

const imageExtensions = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

export const normalizeImageLookupText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ß/g, "ss")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const toTitleCaseDelimited = (value: string, delimiter: "-" | "_") =>
  value
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(delimiter);

export const getNameBasedPeopleCandidates = (name?: string, options: NameCandidateOptions = {}) => {
  if (!name) {
    return [];
  }

  const normalized = normalizeImageLookupText(name);
  if (!normalized) {
    return [];
  }

  const tokens = normalized.split(" ").filter(Boolean);
  const baseNames = new Set<string>();
  const delimiters: Array<"-" | "_"> = options.includeUnderscore ? ["-", "_"] : ["-"];

  const addCandidateBases = (valueTokens: string[]) => {
    if (valueTokens.length === 0) {
      return;
    }

    delimiters.forEach((delimiter) => {
      const joined = valueTokens.join(" ");
      baseNames.add(toTitleCaseDelimited(joined, delimiter));
      baseNames.add(valueTokens.join(delimiter));
    });
  };

  addCandidateBases(tokens);

  if (tokens.length >= 3) {
    const withoutSingleLetterTokens = tokens.filter((token) => token.length > 1);
    if (withoutSingleLetterTokens.length >= 2) {
      addCandidateBases(withoutSingleLetterTokens);
    }
  }

  const candidates: string[] = [];
  baseNames.forEach((baseName) => {
    if (baseName.includes(".")) {
      candidates.push(`/images/people/${baseName}`);
      return;
    }

    imageExtensions.forEach((extension) => {
      candidates.push(`/images/people/${baseName}.${extension}`);
    });
  });

  return candidates.filter((candidate, index) => candidates.indexOf(candidate) === index);
};

export const resolvePeopleImageSrc = (src: ImageProps["src"]) => {
  if (typeof src !== "string") {
    return src;
  }

  if (!src.startsWith("/images/")) {
    return src;
  }

  const relative = src.replace("/images/", "");
  if (relative.includes("/")) {
    return src;
  }

  const overrideFolder = peopleImageFolderOverrides[relative];
  if (overrideFolder) {
    return `/images/${overrideFolder}/${relative}`;
  }

  const aliasFilename = peopleImageFilenameAliases[relative] ?? relative;
  return `/images/people/${aliasFilename}`;
};

export const getImageCandidates = (src: ImageProps["src"], alt?: string) => {
  const resolved = resolvePeopleImageSrc(src);
  if (typeof resolved !== "string") {
    return [resolved];
  }

  const candidates = [resolved, ...getNameBasedPeopleCandidates(alt)];
  return candidates.filter((candidate, index) => candidates.indexOf(candidate) === index);
};