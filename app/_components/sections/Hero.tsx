"use client";

import dynamic from "next/dynamic";
import { Button } from "../ui/Button";
import { RotatingText } from "../ui/RotatingText";
import { PaymentToasts } from "../ui/PaymentToasts";
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 -z-20" />

      {/* Subtle accent radial glow - light mode (green) */}
      <div
        className="absolute inset-0 -z-[15] pointer-events-none dark:hidden"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(115,160,82,0.06), transparent)",
            "radial-gradient(ellipse 40% 60% at 80% 30%, rgba(115,160,82,0.04), transparent)",
          ].join(", "),
        }}
      />
      {/* Subtle accent radial glow - dark mode (purple) */}
      <div
        className="absolute inset-0 -z-[15] pointer-events-none hidden dark:block"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(140,95,173,0.06), transparent)",
            "radial-gradient(ellipse 40% 60% at 80% 30%, rgba(140,95,173,0.04), transparent)",
          ].join(", "),
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating payment toasts */}
      <PaymentToasts />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="space-y-5 sm:space-y-6">
            {/* Version badge */}
            <div className="animate-hero-in opacity-0" style={{ animationDelay: "100ms" }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-accent-500/10 dark:bg-accent-dark-500/15 text-accent-600 dark:text-accent-dark-400 border border-accent-500/20 dark:border-accent-dark-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 dark:bg-accent-dark-500 animate-pulse-dot" />
                Available &middot; v0.4.0
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
              <Button asChild size="lg">
                <a
                  href="/docs/install/web-flasher"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install firmware
                </a>
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
