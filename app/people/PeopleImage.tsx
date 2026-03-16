import NextImage, { type ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getImageCandidates, resolvePeopleImageSrc } from "./imageUtils";

export const PeopleImage = (props: ImageProps) => {
  const candidates = useMemo(
    () => getImageCandidates(props.src, typeof props.alt === "string" ? props.alt : undefined),
    [props.src, props.alt]
  );
  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    setCandidateIndex(0);
  }, [candidates]);

  const candidateCount = candidates.length;
  const normalizedCandidateIndex = candidateCount > 0
    ? Math.min(candidateIndex, candidateCount - 1)
    : 0;
  const activeSrc = candidates[normalizedCandidateIndex] ?? resolvePeopleImageSrc(props.src);

  return (
    <NextImage
      {...props}
      src={activeSrc}
      onError={(event) => {
        props.onError?.(event);
        setCandidateIndex((current) => {
          if (candidateCount === 0) {
            return 0;
          }

          const normalized = Math.min(current, candidateCount - 1);
          return Math.min(normalized + 1, candidateCount - 1);
        });
      }}
    />
  );
};
