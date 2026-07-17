import { MarkdownContent } from "@/app/components/MarkdownContent";
import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";
import { PeopleCard, PeopleCardBody, PeopleCardMedia } from "@/app/people/PeopleCard";
import { PeopleImage } from "@/app/people/PeopleImage";
import { getPersonImagePath } from "@/lib/people/personImage";
import type { Person } from "@/lib/content/schema";

type PersonProfileCardProps = {
  person: Person;
  containerClassName?: string;
};

export function PersonProfileCard({ person, containerClassName = "mb-8 pb-8" }: PersonProfileCardProps) {
  const imageSrc = getPersonImagePath(person.image);

  return (
    <PeopleCard containerClassName={containerClassName}>
      <PeopleCardMedia>
        {imageSrc ? (
          <PeopleImage
            src={imageSrc}
            alt={person.name}
            width={400}
            height={533}
            className="w-full h-auto rounded-sm"
          />
        ) : (
          <PhotoPlaceholder name={person.name} />
        )}
      </PeopleCardMedia>
      <PeopleCardBody>
        <h3 className="text-lg font-bold mb-1 text-gray-900">{person.name}</h3>
        {person.affiliation ? (
          <p className="text-base text-gray-600 mb-1">{person.affiliation}</p>
        ) : null}
        {person.years ? <p className="text-sm text-gray-500 mb-3">{person.years}</p> : null}
        {person.bio ? (
          <MarkdownContent content={person.bio} className="text-gray-700" />
        ) : null}
      </PeopleCardBody>
    </PeopleCard>
  );
}
