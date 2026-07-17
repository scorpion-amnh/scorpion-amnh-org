"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder";

export const PeopleImage = (props: ImageProps) => {
  const [hasError, setHasError] = useState(false);
  const name = typeof props.alt === "string" ? props.alt : "Unknown";

  if (hasError) {
    return <PhotoPlaceholder name={name} className={props.className} />;
  }

  return (
    <NextImage
      {...props}
      onError={(event) => {
        props.onError?.(event);
        setHasError(true);
      }}
    />
  );
};
