import NextImage, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";
import { getImageCandidates, resolvePeopleImageSrc } from "./imageUtils";

export const PeopleImage = (props: ImageProps) => {
  const candidates = useMemo(
    () => getImageCandidates(props.src, typeof props.alt === "string" ? props.alt : undefined),
    [props.src, props.alt]
  );
  const candidateKey = useMemo(() => candidates.join("|"), [candidates]);
  const [candidateState, setCandidateState] = useState<{ key: string; index: number }>({
    key: "",
    index: 0,
  });

  const candidateCount = candidates.length;
  const candidateIndex = candidateState.key === candidateKey ? candidateState.index : 0;
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
        setCandidateState((current) => {
          if (candidateCount === 0) {
            return { key: candidateKey, index: 0 };
          }

          const currentIndex = current.key === candidateKey ? current.index : 0;
          const normalized = Math.min(currentIndex, candidateCount - 1);
          return { key: candidateKey, index: Math.min(normalized + 1, candidateCount - 1) };
        });
      }}
    />
  );
};
