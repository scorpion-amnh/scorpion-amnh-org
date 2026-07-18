import type { ReactNode } from "react";

export const DEFAULT_LAB_HISTORY_SUBTITLE = "Arachnology Lab at AMNH";

const ORIENTATION_CLAUSE_PATTERN =
  /(?:Back \(left to right\)|Front \(left to right\)|Left \(front to back\)|Right \(front to back\)|Left to [Rr]ight):/;

export const getLabHistoryDisplaySubtitle = (subtitle?: string) =>
  subtitle && subtitle !== DEFAULT_LAB_HISTORY_SUBTITLE ? subtitle : undefined;

const formatCaptionBodyWithOrientationBreaks = (captionBody: string): ReactNode => {
  if (!ORIENTATION_CLAUSE_PATTERN.test(captionBody)) {
    return captionBody;
  }

  const parts = captionBody
    .split(
      /(?=(?:Back \(left to right\)|Front \(left to right\)|Left \(front to back\)|Right \(front to back\)|Left to [Rr]ight):)/i
    )
    .filter((part) => part.length > 0);

  return parts.map((part, index) => (
    <span key={index}>
      {index > 0 ? <br /> : null}
      {part}
    </span>
  ));
};

type FormatLabHistoryCaptionOptions = {
  breakAtOrientation?: boolean;
};

export const formatLabHistoryCaption = (
  year: string | undefined,
  caption: string,
  subtitle?: string,
  options?: FormatLabHistoryCaptionOptions
): ReactNode => {
  const captionBody = caption.replace(/\.\s*$/, "");
  const displaySubtitle = getLabHistoryDisplaySubtitle(subtitle);
  const usePageLineBreaks = options?.breakAtOrientation ?? false;
  const hasOrientationClause = ORIENTATION_CLAUSE_PATTERN.test(captionBody);
  const hasPrefix = Boolean(year || displaySubtitle);

  if (!hasPrefix && !usePageLineBreaks) {
    return captionBody;
  }

  if (!hasPrefix && usePageLineBreaks) {
    return formatCaptionBodyWithOrientationBreaks(captionBody);
  }

  const captionContent =
    usePageLineBreaks && hasOrientationClause
      ? formatCaptionBodyWithOrientationBreaks(captionBody)
      : captionBody;

  const needsLineBreakAfterYear =
    usePageLineBreaks && Boolean(year) && !displaySubtitle && Boolean(captionBody);

  const needsLineBreakAfterLocation =
    usePageLineBreaks && Boolean(displaySubtitle) && Boolean(captionBody) && hasOrientationClause;

  const needsInlineSpaceBeforeCaption =
    Boolean(captionBody) &&
    !needsLineBreakAfterYear &&
    !needsLineBreakAfterLocation &&
    (Boolean(year || displaySubtitle) &&
      (!year || displaySubtitle || !usePageLineBreaks));

  return (
    <>
      {year ? <span className="font-bold text-color-primary">{year}</span> : null}
      {year && displaySubtitle ? " " : null}
      {displaySubtitle ? <span className="text-color-primary">{displaySubtitle}</span> : null}
      {needsLineBreakAfterYear || needsLineBreakAfterLocation ? <br /> : null}
      {needsInlineSpaceBeforeCaption ? " " : null}
      {captionContent}
    </>
  );
};
