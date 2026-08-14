'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LORENZO_PRENDINI_ID } from "@/lib/publications/citation";

const TARGET_PATH = `/people/?section=principal-investigator&tab=current#${LORENZO_PRENDINI_ID}`;

/**
 * `/people/lorenzo-prendini` renders the same markup as this target URL so
 * search engines can index the page under a name-specific path. Real visitors
 * are sent on to the interactive `/people` URL immediately after mount, so the
 * address bar and browser history reflect the canonical, tab-aware page.
 */
export function RedirectToPeopleSection() {
  const router = useRouter();

  useEffect(() => {
    router.replace(TARGET_PATH);
  }, [router]);

  return null;
}
