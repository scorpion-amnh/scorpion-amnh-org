export type PersonImage = {
  folder: string;
  filename: string;
};

export const getPersonImageSrc = (image: PersonImage | null | undefined) => {
  if (!image) {
    return null;
  }

  return `/images/${image.folder}/${image.filename}`;
};
