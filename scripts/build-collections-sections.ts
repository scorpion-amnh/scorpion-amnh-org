import { execSync } from "child_process";
import { writeFileSync } from "fs";

let content = execSync("git show HEAD:app/collections/page.tsx", {
  cwd: process.cwd(),
  encoding: "utf8",
});

content = content.replace(
  `'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SideNav } from "../components/SideNav";

export default function Collections() {`,
  `'use client';

import { ExternalLink } from "@/app/components/ExternalLink";
import { Figure } from "@/app/components/Figure";
import { SideNav } from "@/app/components/SideNav";
import { getHeaderHeight, getScrollGap } from "@/lib/scrollMetrics";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function CollectionsSections() {`
);

content = content.replace(
  /  const getHeaderHeight = [\s\S]*?  const sections = \[/,
  "  const sections = ["
);

content = content.replace(
  /<a href="(https?:\/\/[^"]+)" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">([\s\S]*?)<\/a>/g,
  '<ExternalLink href="$1">$2</ExternalLink>'
);

content = content.replace(
  `<figure className="text-center">
                <Image
                  src="/images/museum/lourandy.jpg"
                  alt="Collections personnel"
                  width={300}
                  height={300}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Louis Sorkin and Randy Mercurio in the collections</figcaption>
              </figure>`,
  `<Figure
                figureClassName="mb-0"
                src="/images/museum/lourandy.jpg"
                alt="Collections personnel"
                width={300}
                height={300}
                caption="Louis Sorkin and Randy Mercurio in the collections"
              />`
);

content = content.replace(
  `<figure className="text-center">
                <Image
                  src="/images/museum/collections_old.jpg"
                  alt="Refrigerator with trays of collection bottles in former storage facility"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">Former storage facility</figcaption>
              </figure>
              <figure className="text-center">
                <Image
                  src="/images/museum/collections_new.jpg"
                  alt="Refrigerator with trays of collection bottles in new storage facility"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-sm"
                />
                <figcaption className="text-sm text-gray-600 mt-2">New storage facility</figcaption>
              </figure>`,
  `<Figure
                figureClassName="mb-0"
                src="/images/museum/collections_old.jpg"
                alt="Refrigerator with trays of collection bottles in former storage facility"
                width={400}
                height={400}
                caption="Former storage facility"
              />
              <Figure
                figureClassName="mb-0"
                src="/images/museum/collections_new.jpg"
                alt="Refrigerator with trays of collection bottles in new storage facility"
                width={400}
                height={400}
                caption="New storage facility"
              />`
);

writeFileSync("app/collections/CollectionsSections.tsx", content);
console.log("Wrote app/collections/CollectionsSections.tsx");
