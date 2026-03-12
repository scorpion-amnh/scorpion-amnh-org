'use client';

import NextImage from "next/image";
import { useMemo, useState, useEffect } from "react";

type PhotoPlaceholderProps = {
  name: string;
  className?: string;
};

const normalizeImageLookupText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ß/g, "ss")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const toTitleCaseHyphen = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("-");

const getNameBasedPeopleCandidates = (name: string) => {
  const normalized = normalizeImageLookupText(name);
  if (!normalized) {
    return [];
  }

  const tokens = normalized.split(" ").filter(Boolean);
  const baseNames = new Set<string>();

  if (tokens.length > 0) {
    baseNames.add(toTitleCaseHyphen(tokens.join(" ")));
    baseNames.add(tokens.join("-"));
  }

  if (tokens.length >= 3) {
    const withoutSingleLetterTokens = tokens.filter((token) => token.length > 1);
    if (withoutSingleLetterTokens.length >= 2) {
      baseNames.add(toTitleCaseHyphen(withoutSingleLetterTokens.join(" ")));
      baseNames.add(withoutSingleLetterTokens.join("-"));
    }
  }

  const extensions = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];
  const candidates: string[] = [];

  baseNames.forEach((baseName) => {
    if (baseName.includes(".")) {
      candidates.push(`/images/people/${baseName}`);
      return;
    }

    extensions.forEach((extension) => {
      candidates.push(`/images/people/${baseName}.${extension}`);
    });
  });

  return candidates.filter((candidate, index) => candidates.indexOf(candidate) === index);
};

const getInitials = (name: string) => {
  const cleaned = name.replace(/["“”]/g, '').replace(/[’']/g, '');
  const parts = cleaned.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const PhotoPlaceholder = ({ name, className }: PhotoPlaceholderProps) => {
  const containerClasses = [
    'w-full',
    'aspect-[3/4]',
    'bg-gray-100',
    'rounded-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const candidates = useMemo(() => getNameBasedPeopleCandidates(name), [name]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [showInitialsFallback, setShowInitialsFallback] = useState(candidates.length === 0);

  useEffect(() => {
    setCandidateIndex(0);
    setShowInitialsFallback(candidates.length === 0);
  }, [candidates]);

  if (!showInitialsFallback && candidates[candidateIndex]) {
    return (
      <div className={`${containerClasses} relative overflow-hidden`}>
        <NextImage
          src={candidates[candidateIndex]}
          alt={name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          onError={() => {
            if (candidateIndex < candidates.length - 1) {
              setCandidateIndex((current) => current + 1);
            } else {
              setShowInitialsFallback(true);
            }
          }}
        />
      </div>
    );
  }

  const fallbackClasses = [
    containerClasses,
    'flex',
    'items-center',
    'justify-center',
    'text-gray-400',
    'text-4xl',
    'font-semibold',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={fallbackClasses}>{getInitials(name)}</div>;
};
