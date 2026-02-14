"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { ArrowDown, Check, Copy, CheckCheck } from "lucide-react";
import { cn } from "@/lib/cn";

type OS = "linux" | "macos" | "windows";

const commandsOnly = `git clone https://gitlab.com/IamEndo/paydeck.git
cd paydeck
pio run -t upload -e esp32dev-hspi-st7789-2v8
pio device monitor -b 115200`;

const osConfig: Record<OS, { label: string; prompt: string }> = {
  linux: { label: "Linux", prompt: "~$" },
  macos: { label: "macOS", prompt: "~%" },
  windows: { label: "Windows", prompt: "PS>" },
};

const ACCENT_GREEN = "#22c55e";

function Terminal() {
  const [activeOS, setActiveOS] = useState<OS>("linux");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commandsOnly);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-t-sm flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
            Quick Start
          </span>
        </div>
        <div className="flex gap-0.5">
          {(["linux", "macos", "windows"] as OS[]).map((os) => (
            <button
              key={os}
              onClick={() => setActiveOS(os)}
              className={cn(
                "px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-sm transition-colors",
                activeOS === os
                  ? "bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              {osConfig[os].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative bg-neutral-900 rounded-b-sm flex-1 min-h-0">
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-2 sm:top-3 right-2 sm:right-3 p-1 sm:p-1.5 rounded-sm transition-all z-10",
            "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800"
          )}
          style={copied ? { color: ACCENT_GREEN } : undefined}
          aria-label="Copy commands to clipboard"
        >
          {copied ? <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </button>

        <div className="overflow-auto h-full">
          <pre className="p-3 sm:p-4 pr-8 sm:pr-10 text-[10px] sm:text-xs font-mono leading-relaxed whitespace-pre">
            <code>
              <span className="text-neutral-500">{osConfig[activeOS].prompt} ## Requirements</span>
              {"\n"}
              <span className="text-neutral-500">{"   "}## VSC and PlatformIO or Arduino IDE</span>
              {"\n"}
              <span className="text-neutral-500">{"   "}## USB cable and drivers (CP210x/CH340)</span>
              {"\n\n"}
              <span className="text-neutral-500">{"   "}## Clone repository</span>
              {"\n\n"}
              <span>{"   "}</span>
              <span style={{ color: ACCENT_GREEN }}>git</span>
              <span className="text-neutral-300"> clone https://gitlab.com/IamEndo/paydeck.git</span>
              {"\n"}
              <span>{"   "}</span>
              <span style={{ color: ACCENT_GREEN }}>cd</span>
              <span className="text-neutral-300"> paydeck</span>
              {"\n\n"}
              <span className="text-neutral-500">{"   "}## Build and upload</span>
              {"\n\n"}
              <span>{"   "}</span>
              <span style={{ color: ACCENT_GREEN }}>pio</span>
              <span className="text-neutral-300"> run -t upload -e esp32dev-hspi-st7789-2v8</span>
              {"\n\n"}
              <span className="text-neutral-500">{"   "}## Monitor serial output</span>
              {"\n\n"}
              <span>{"   "}</span>
              <span style={{ color: ACCENT_GREEN }}>pio</span>
              <span className="text-neutral-300"> device monitor -b 115200</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 -z-10" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                Accept Nexa
                <br />
                <span className="text-neutral-400 dark:text-neutral-500">at checkout</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                A simple device that turns any counter into a cryptocurrency point-of-sale. No
                contracts, no fees, no middlemen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1 sm:pt-2">
              <Button asChild size="lg">
                <a href="#device">View hardware</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how">How it works</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 pt-2 sm:pt-4">
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

          <div className="h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] w-full min-w-0">
            <Terminal />
          </div>
        </div>

        <div className="hidden md:flex justify-center mt-16 lg:mt-20">
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
