"use client";

import { useEffect, useState, useRef } from "react";

const PHRASES = [
  "at checkout",
  "at the market",
  "at conferences",
  "at your shop",
  "at events",
  "at the counter",
  "anywhere",
];

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

export function RotatingText() {
  const [display, setDisplay] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function tick() {
      const current = PHRASES[phraseIdx.current];

      if (!deleting.current) {
        charIdx.current++;
        setDisplay(current.slice(0, charIdx.current));

        if (charIdx.current === current.length) {
          timer.current = setTimeout(() => {
            deleting.current = true;
            tick();
          }, PAUSE_AFTER_TYPE);
          return;
        }
        timer.current = setTimeout(tick, TYPE_SPEED + Math.random() * 40);
      } else {
        charIdx.current--;
        setDisplay(current.slice(0, charIdx.current));

        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % PHRASES.length;
          timer.current = setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        timer.current = setTimeout(tick, DELETE_SPEED + Math.random() * 20);
      }
    }

    // Reduced motion: show a static phrase instead of the typewriter loop
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(PHRASES[PHRASES.length - 1]);
      return;
    }

    // Start after initial entrance animation
    timer.current = setTimeout(tick, 800);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <>
      {/* Static text for screen readers and crawlers; typewriter is decorative */}
      <span className="sr-only">anywhere</span>
      <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-500">
        {display}
        <span className="inline-block w-[3px] h-[0.85em] bg-accent-500 dark:bg-accent-dark-500 ml-[3px] align-baseline relative top-[0.08em] animate-cursor-blink" />
      </span>
    </>
  );
}
