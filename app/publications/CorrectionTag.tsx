import { CircleQuestionIcon } from "@/app/components/icons/CircleQuestionIcon";
import { CORRECTION_TOOLTIP } from "@/lib/publications/resolvePublication";

export function CorrectionTag() {
  return (
    <span className="group relative inline-flex align-middle text-gray-500">
      <span
        tabIndex={0}
        aria-label={CORRECTION_TOOLTIP}
        className="inline-flex cursor-help focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-link"
      >
        <CircleQuestionIcon />
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+0.375rem)] left-1/2 z-20 hidden w-max max-w-[16rem] -translate-x-1/2 rounded bg-gray-900 px-2.5 py-1.5 text-xs font-normal leading-snug text-white shadow-md group-hover:block group-focus-within:block"
      >
        {CORRECTION_TOOLTIP}
      </span>
    </span>
  );
}
