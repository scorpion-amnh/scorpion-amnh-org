"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@/app/components/icons/ChevronUpIcon";

const DEFAULT_THRESHOLD = 800;

type BackToTopProps = {
  className?: string;
  threshold?: number;
};

export function BackToTop({ className, threshold = DEFAULT_THRESHOLD }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={[
        "fixed bottom-6 right-4 z-30 flex size-11 items-center justify-center rounded-full bg-gray-800 text-xl leading-none text-white shadow-lg",
        "transition-opacity duration-200 hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ChevronUpIcon />
    </button>
  );
}
