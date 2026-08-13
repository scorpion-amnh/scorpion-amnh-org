import type { Publication } from "@/lib/content/schema";
import { getVolumePages, formatVolumePagesInline } from "@/lib/publications/citation";

type CitationTailProps = {
  publication: Publication;
};

export const VolumePagesDisplay = ({ volumePages }: { volumePages: string }) => (
  <span className="inline">{formatVolumePagesInline(volumePages)}</span>
);

export const CitationTail = ({ publication }: CitationTailProps) => {
  const volumePages = getVolumePages(publication);

  return (
    <>
      .
      {publication.journal && volumePages ? (
        <>
          {" "}
          <b>{publication.journal}</b>
          {"\u00A0"}
          <VolumePagesDisplay volumePages={volumePages} />.
        </>
      ) : publication.journal ? (
        <>
          {" "}
          <b>{publication.journal}</b>.
        </>
      ) : volumePages ? (
        <>
          {" "}
          <VolumePagesDisplay volumePages={volumePages} />.
        </>
      ) : null}
    </>
  );
};
