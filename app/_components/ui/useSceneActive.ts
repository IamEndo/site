"use client";

import * as React from "react";

/**
 * True while the referenced element is on screen and the tab is visible.
 * The 3D canvases use it to stop their render loop when nobody can see them,
 * so a scene scrolled out of view costs no GPU time or battery.
 */
export function useSceneActive(ref: React.RefObject<HTMLElement | null>): boolean {
  const [onScreen, setOnScreen] = React.useState(true);
  const [tabVisible, setTabVisible] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  React.useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return onScreen && tabVisible;
}

/** True when the visitor asked the system for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
