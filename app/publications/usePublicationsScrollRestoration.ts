"use client";

import { useEffect, useLayoutEffect } from "react";
import {
  clearPublicationsScrollPosition,
  readPublicationsScrollPosition,
  restorePublicationsScrollPosition,
} from "@/lib/publications/publicationsScrollRestoration";

const scrollToHashTarget = (hash: string) => {
  if (!hash) {
    return;
  }

  document.getElementById(hash)?.scrollIntoView();
};

export const usePublicationsScrollRestoration = () => {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash.slice(1);
    if (hash) {
      scrollToHashTarget(hash);
      return;
    }

    const saved = readPublicationsScrollPosition();
    if (saved) {
      restorePublicationsScrollPosition(saved.scrollY);
      clearPublicationsScrollPosition();
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      scrollToHashTarget(window.location.hash.slice(1));
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        return;
      }

      clearPublicationsScrollPosition();
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);
};
