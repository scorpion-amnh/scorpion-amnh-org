import type { Person } from "@/lib/content/schema";

export const sortPeopleBySectionOrder = (
  people: Person[],
  order: readonly string[]
): Person[] => {
  const byId = new Map(people.map((person) => [person.id, person]));
  const ordered: Person[] = [];

  for (const id of order) {
    const person = byId.get(id);
    if (person) {
      ordered.push(person);
    }
  }

  for (const person of people) {
    if (!order.includes(person.id)) {
      ordered.push(person);
    }
  }

  return ordered;
};
