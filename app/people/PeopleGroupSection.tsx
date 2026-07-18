import { PeopleGroupCard, type PeopleGroupCardProps } from "./PeopleGroupCard";

type PeopleGroupSectionProps = {
  year?: string;
  subtitle?: string;
  cards: [PeopleGroupCardProps, ...PeopleGroupCardProps[]];
};

export const PeopleGroupSection = ({
  year,
  subtitle,
  cards,
}: PeopleGroupSectionProps) => {
  return (
    <div className="mb-12">
      {year && <h2 className="font-bold mt-8 lg:mt-0 mb-1">{year}</h2>}
      {subtitle && <h6 className="mb-6">{subtitle}</h6>}
      {cards.map((card) => (
        <PeopleGroupCard
          key={`${card.src}-${card.alt}`}
          src={card.src}
          alt={card.alt}
          caption={card.caption}
          width={card.width}
          height={card.height}
        />
      ))}
    </div>
  );
};
