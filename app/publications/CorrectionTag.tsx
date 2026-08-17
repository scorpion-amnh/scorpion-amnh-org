import { CORRECTION_TOOLTIP } from "@/lib/publications/resolvePublication";

const QuestionMarkCircleIcon = () => (
  <svg
    aria-hidden="true"
    className="h-3.5 w-3.5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export function CorrectionTag() {
  return (
    <span className="group relative inline-flex align-middle text-gray-500">
      <span
        tabIndex={0}
        aria-label={CORRECTION_TOOLTIP}
        className="inline-flex cursor-help focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-link"
      >
        <QuestionMarkCircleIcon />
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
