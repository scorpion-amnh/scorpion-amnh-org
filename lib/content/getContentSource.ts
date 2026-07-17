import { localAdapter } from "./localAdapter";
import type { ContentSource, ContentSourceName } from "./types";

const CMS_ADAPTER_ERROR =
  "CONTENT_SOURCE=cms requires lib/content/cmsAdapter.ts (Stage 6). Use CONTENT_SOURCE=local for static deploy.";

export const getContentSourceName = (): ContentSourceName => {
  const source = process.env.CONTENT_SOURCE?.trim().toLowerCase();
  return source === "cms" ? "cms" : "local";
};

export const getContentSource = (): ContentSource => {
  if (getContentSourceName() === "cms") {
    throw new Error(CMS_ADAPTER_ERROR);
  }

  return localAdapter;
};
