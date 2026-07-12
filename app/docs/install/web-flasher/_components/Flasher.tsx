"use client";

import * as React from "react";
import Link from "next/link";
import {
  Usb,
  CircleAlert,
  Cpu,
  Info,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

const ESP_WEB_TOOLS_SRC =
  "https://unpkg.com/esp-web-tools@10.2.1/dist/web/install-button.js";

const MANIFEST = "/firmware/manifest-dev.json";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

function useEspWebTools(): ScriptStatus {
  const [status, setStatus] = React.useState<ScriptStatus>("idle");

  React.useEffect(() => {
    let cancelled = false;
    const safeSet = (s: ScriptStatus) => {
      if (!cancelled) setStatus(s);
    };

    if (customElements.get("esp-web-install-button")) {
      safeSet("ready");
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[data-esp-web-tools="1"]'
    );
    if (!script) {
      script = document.createElement("script");
      script.type = "module";
      script.src = ESP_WEB_TOOLS_SRC;
      script.dataset.espWebTools = "1";
      document.head.appendChild(script);
    }

    const onLoad = () => {
      customElements
        .whenDefined("esp-web-install-button")
        .then(() => safeSet("ready"))
        .catch(() => safeSet("error"));
    };
    const onErr = () => safeSet("error");

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onErr);
    safeSet("loading");

    return () => {
      cancelled = true;
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onErr);
    };
  }, []);

  return status;
}

export function Flasher() {
  const [serialSupported, setSerialSupported] = React.useState<boolean | null>(
    null
  );
  const scriptStatus = useEspWebTools();

  React.useEffect(() => {
    setSerialSupported(
      typeof navigator !== "undefined" && "serial" in navigator
    );
  }, []);

  return (
    <div className="not-prose space-y-6">
      {/* Browser compat banner */}
      {serialSupported === false && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <CircleAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">
                Browser not supported
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                The web flasher requires the Web Serial API, available in
                Chrome and Microsoft Edge on desktop, or Chrome on Android.
                Firefox, Safari, and iOS browsers cannot flash devices over
                USB. Open this page in a supported browser, or follow the{" "}
                <Link
                  href="/docs/installation/building"
                  className="underline font-medium"
                >
                  manual PlatformIO instructions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* What this installs */}
      <div className="p-4 rounded-lg border border-accent-500 bg-accent-50 dark:bg-accent-dark-950/30 dark:border-accent-dark-500">
        <div className="flex items-start gap-3">
          <Cpu className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-zinc-900 dark:text-white">
                PayDeck Standard
              </span>
              <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-sm bg-accent-100 dark:bg-accent-dark-950/50 text-accent-700 dark:text-accent-dark-400">
                v0.4.1
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              The standard firmware. Fully functional, reflashable over USB, and
              recommended for most users. Your PIN and settings are protected in
              software (the master key is encrypted with a key derived from your
              PIN). This is the only build the web flasher can install — see
              below for why hardware-secured builds can&apos;t be flashed from a
              browser.
            </p>
          </div>
        </div>
      </div>

      {/* Honest limitation: no eFuse / secure builds over the web */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 space-y-2">
            <div className="font-medium text-zinc-900 dark:text-white">
              Want flash encryption or Secure Boot? The web flasher can&apos;t do
              that.
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A hardware-secured device burns one-time <strong>eFuses</strong> on
              first boot, and Secure Boot requires firmware signed with a private
              key that <strong>only you</strong> should ever hold. A shared,
              pre-signed &ldquo;production&rdquo; image would give no real
              security at all — so we don&apos;t offer one. Building a genuinely
              secure device is something you do yourself, from source, with your
              own signing key.
            </p>
            <Link
              href="/docs/security/production-mode"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-dark-400 hover:underline"
            >
              Step-by-step: build a secure / production device
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Essential prep — must hold BOOT on CYD boards */}
      {serialSupported !== false && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5 min-w-0">
              <div className="font-semibold text-amber-900 dark:text-amber-200">
                Hold the BOOT button before flashing
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                Press and hold the small{" "}
                <span className="font-mono text-xs px-1.5 py-0.5 rounded-sm bg-amber-100 dark:bg-amber-900/50">
                  BOOT
                </span>{" "}
                button on the back of your CYD board (near the USB port) before
                clicking the install button. Keep it held through the device
                picker dialog and for about 2 seconds after, until the flasher
                detects the chip. Release once write progress starts. Skipping
                this step on most CYD clones causes the connection to time out.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Install button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {serialSupported !== false && scriptStatus === "ready" ? (
          <esp-web-install-button manifest={MANIFEST}>
            <button
              type="button"
              slot="activate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-medium transition-colors"
            >
              <Usb className="w-4 h-4" />
              Connect device &amp; flash PayDeck Standard
            </button>
            <span slot="unsupported" className="text-sm text-zinc-500">
              Browser not supported.
            </span>
            <span slot="not-allowed" className="text-sm text-zinc-500">
              Open this page over HTTPS to flash.
            </span>
          </esp-web-install-button>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed font-medium"
          >
            <Usb className="w-4 h-4" />
            {serialSupported === false
              ? "Unsupported browser"
              : scriptStatus === "error"
              ? "Failed to load esp-web-tools"
              : scriptStatus !== "ready"
              ? "Loading flasher…"
              : "Connect device & flash PayDeck Standard"}
          </button>
        )}
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          {scriptStatus === "error"
            ? "Could not load the flasher script from unpkg.com. Check the browser console for blocked requests (CSP, ad-blockers, network)."
            : "A browser dialog will ask which USB device to connect."}
        </p>
      </div>
    </div>
  );
}
