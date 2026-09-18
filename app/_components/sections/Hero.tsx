"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "../ui/Button";
import { RotatingText } from "../ui/RotatingText";
import { ArrowDown, Check } from "lucide-react";

const Device3D = dynamic(
  () => import("../ui/Device3D").then((m) => m.Device3D),
  { ssr: false, loading: () => <DeviceFallback /> }
);

function DeviceFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-600 text-xs">
      Loading device…
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background stack (back to front) ── */}

      {/* 1. Base tone: a soft top-lit gradient so the hero has depth, not a flat fill */}
      <div className="absolute inset-0 -z-20 pointer-events-none bg-gradient-to-b from-neutral-100 via-white to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950" />

      {/* 2. Accent glows - light mode (green): a wide wash behind the copy, a second behind the device */}
      <div
        className="absolute inset-0 -z-[15] pointer-events-none dark:hidden animate-hero-breathe"
        style={{
          background: [
            "radial-gradient(ellipse 55% 60% at 18% 45%, rgba(115,160,82,0.14), transparent 70%)",
            "radial-gradient(ellipse 45% 55% at 78% 40%, rgba(115,160,82,0.10), transparent 70%)",
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(23,23,23,0.05), transparent 70%)",
          ].join(", "),
        }}
      />
      {/* 2. Accent glows - dark mode (purple) plus a faint top light-leak */}
      <div
        className="absolute inset-0 -z-[15] pointer-events-none hidden dark:block animate-hero-breathe"
        style={{
          background: [
            "radial-gradient(ellipse 55% 60% at 18% 45%, rgba(140,95,173,0.16), transparent 70%)",
            "radial-gradient(ellipse 45% 55% at 78% 40%, rgba(140,95,173,0.12), transparent 70%)",
            "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.05), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* 3. Registration-mark grid (theme-aware "+" crosshairs, vignetted; see globals.css) */}
      <div className="hero-plus-grid absolute inset-0 -z-10 pointer-events-none" aria-hidden="true" />

      {/* 4. Blend into the next section so the grid and glows dissolve instead of ending on a hard edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 -z-[5] pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-neutral-950" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="space-y-5 sm:space-y-6">
            {/* Version badge */}
            <div className="animate-hero-in opacity-0" style={{ animationDelay: "100ms" }}>
              <span className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                Latest version available &middot; v0.4.1
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] animate-hero-in opacity-0"
                style={{ animationDelay: "200ms" }}
              >
                Accept Nexa
                <br />
                <RotatingText />
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed animate-hero-in opacity-0"
                style={{ animationDelay: "350ms" }}
              >
                A simple device that turns any counter into a cryptocurrency
                point&#8209;of&#8209;sale. No contracts, no fees, no middlemen.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 pt-1 sm:pt-2 animate-hero-in opacity-0"
              style={{ animationDelay: "500ms" }}
            >
              <Button asChild size="lg">
                <a href="#device">View hardware</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/70 backdrop-blur-sm dark:bg-neutral-950/60"
              >
                <Link href="/docs/install/web-flasher">Install firmware</Link>
              </Button>
            </div>

            <div
              className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 pt-2 sm:pt-4 animate-hero-in opacity-0"
              style={{ animationDelay: "650ms" }}
            >
              {["Watch-only", "Self-custodial", "Fully verifiable"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400"
                >
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — interactive 3D device */}
          <div
            className="h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] w-full min-w-0 animate-hero-in opacity-0 relative"
            style={{ animationDelay: "350ms" }}
          >
            {/* Glow behind device - light mode (green) */}
            <div className="absolute -inset-10 rounded-full pointer-events-none opacity-0 animate-glow-in bg-[radial-gradient(ellipse_at_center,rgba(115,160,82,0.08),transparent_70%)] dark:hidden" />
            {/* Glow behind device - dark mode (purple) */}
            <div className="absolute -inset-10 rounded-full pointer-events-none opacity-0 animate-glow-in hidden dark:block bg-[radial-gradient(ellipse_at_center,rgba(140,95,173,0.08),transparent_70%)]" />
            <Device3D />
            <p className="absolute bottom-1 right-2 text-[10px] sm:text-[11px] font-mono text-neutral-400 dark:text-neutral-600 select-none pointer-events-none">
              drag to rotate
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hidden md:flex justify-center mt-16 lg:mt-20 animate-hero-in opacity-0"
          style={{ animationDelay: "1200ms" }}
        >
          <a
            href="#features"
            className="flex flex-col items-center gap-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Learn more</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
