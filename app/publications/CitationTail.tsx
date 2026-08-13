import type { Publication } from "@/lib/content/schema";
import { getVolumePages } from "@/lib/publications/citation";

type CitationTailProps = {
  publication: Publication;
};

export const CitationTail = ({ publication }: CitationTailProps) => {
  const volumePages = getVolumePages(publication);

  return (
    <>
      .
      {publication.journal ? (
        <>
          {" "}
          <b>{publication.journal}</b>
        </>
      ) : null}
      {volumePages ? (
        <> {volumePages}.</>
      ) : publication.journal ? (
        <>.</>
      ) : null}
    </>
  );
};
