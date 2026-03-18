import type { ReactNode } from "react";

export type Person = {
  id: string;
  name: string;
  affiliation?: string;
  title?: string;
  years?: string;
  image?: string | null;
  bio: string | ReactNode;
  links?: { label: string; url: string }[];
  contact?: string | ReactNode;
};

export type PeopleCategory = {
  current: Person[];
  alumni: Person[];
};