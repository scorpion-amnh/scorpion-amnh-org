'use client';

import NextImage from "next/image";
import { useMemo, useState } from "react";
import { getNameBasedPeopleCandidates } from "../people/imageUtils";

type PhotoPlaceholderProps = {
  name: string;
  className?: string;
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

  const candidates = useMemo(
    () => getNameBasedPeopleCandidates(name, { includeUnderscore: true }),
    [name]
  );
  const candidateKey = useMemo(() => candidates.join('|'), [candidates]);
  const [candidateState, setCandidateState] = useState<{ key: string; index: number }>({
    key: '',
    index: 0,
  });

  const candidateIndex = candidateState.key === candidateKey ? candidateState.index : 0;

  const safeCandidateIndex = candidateIndex < candidates.length ? candidateIndex : 0;
  const showInitialsFallback = candidates.length === 0 || candidateIndex >= candidates.length;

  if (!showInitialsFallback && candidates[safeCandidateIndex]) {
    return (
      <div className={`${containerClasses} relative overflow-hidden`}>
        <NextImage
          src={candidates[safeCandidateIndex]}
          alt={name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          onError={() => {
            setCandidateState((current) => {
              const currentIndex = current.key === candidateKey ? current.index : 0;
              const normalized = currentIndex < candidates.length ? currentIndex : 0;
              return { key: candidateKey, index: normalized + 1 };
            });
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
