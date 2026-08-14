import type { Publication } from "@/lib/content/schema";
import { getVolumePages, formatVolumePagesInline } from "@/lib/publications/citation";

type CitationTailProps = {
  publication: Publication;
  emphasizeJournal?: boolean;
};

export const VolumePagesDisplay = ({ volumePages }: { volumePages: string }) => (
  <span className="inline">{formatVolumePagesInline(volumePages)}</span>
);

export const CitationTail = ({ publication, emphasizeJournal = true }: CitationTailProps) => {
  const volumePages = getVolumePages(publication);
  const journalName = emphasizeJournal ? <b>{publication.journal}</b> : publication.journal;

  return (
    <>
      .
      {publication.journal && volumePages ? (
        <>
          {" "}
          {journalName}
          {"\u00A0"}
          <VolumePagesDisplay volumePages={volumePages} />.
        </>
      ) : publication.journal ? (
        <>
          {" "}
          {journalName}.
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
