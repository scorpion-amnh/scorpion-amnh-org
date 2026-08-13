import {
  getGallery,
  getLabHistory,
  getPeople,
  getPersonImagePath,
  getPublications,
  getSiteSettings,
  imagePathExists,
} from "@/lib/content";
import { getPublicationDetails, getPublicationForDetail } from "@/lib/publications/details";
import {
  getPublicationsMissingDetails,
  syncPublicationDetails,
} from "../scripts/generate-publication-details";

const failures: string[] = [];

const requireImage = async (src: string, label: string) => {
  if (!(await imagePathExists(src))) {
    failures.push(`Missing image for ${label}: ${src}`);
  }
};

const main = async () => {
  const syncResult = await syncPublicationDetails();
  if (syncResult.generated > 0) {
    console.log(`Synced ${syncResult.generated} new publication detail entries.`);
  }

  try {
    getSiteSettings();
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Failed to load site settings");
  }

  try {
    const settings = getSiteSettings();
    await requireImage(settings.footerLogo, "site.footerLogo");
  } catch {
    // Site settings failure already recorded.
  }

  try {
    const people = getPeople();
    for (const person of people) {
      const imagePath = getPersonImagePath(person.image);
      if (imagePath) {
        await requireImage(imagePath, `person:${person.id}`);
      }
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Failed to load people");
  }

  try {
    getPublications();
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Failed to load publications");
  }

  try {
    const publications = getPublications();
    const details = getPublicationDetails();
    const missingDetails = getPublicationsMissingDetails(publications, details);

    for (const publication of missingDetails) {
      failures.push(
        `Publication missing detail page: [${publication.year}] ${publication.title.replace(/\*([^*]+)\*/g, "$1")}`
      );
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Failed to check publication detail coverage");
  }

  try {
    for (const detail of getPublicationDetails()) {
      const publication = getPublicationForDetail(detail);
      if (!publication) {
        failures.push(`Publication detail "${detail.slug}" has no matching publication for DOI ${detail.doi}`);
      }
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Failed to load publication details");
  }

  for (const category of ["home", "arachnids", "fieldwork"] as const) {
    try {
      const gallery = getGallery(category);
      for (const [index, image] of gallery.entries()) {
        await requireImage(image.src, `gallery:${category}[${index}]`);
      }
    } catch (error) {
      failures.push(
        error instanceof Error ? error.message : `Failed to load gallery:${category}`
      );
    }
  }

  try {
    const labHistory = getLabHistory();
    for (const [sectionIndex, section] of labHistory.entries()) {
      for (const [cardIndex, card] of section.cards.entries()) {
        await requireImage(
          card.src,
          `lab-history[${sectionIndex}].cards[${cardIndex}]`
        );
      }
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : "Failed to load lab history");
  }

  if (failures.length > 0) {
    console.error("Content validation failed:\n");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Content validation passed.");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
