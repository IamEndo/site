"use client";

import * as React from "react";
import Link from "next/link";
import {
  Usb,
  CircleAlert,
  ShieldCheck,
  ShieldAlert,
  CircleCheck,
  Cpu,
  Info,
} from "lucide-react";

const ESP_WEB_TOOLS_SRC =
  "https://unpkg.com/esp-web-tools@10.2.1/dist/web/install-button.js";

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

type Variant = "dev" | "secure-dev" | "secure-prod";

const VARIANTS: {
  id: Variant;
  label: string;
  blurb: string;
  manifest: string;
}[] = [
  {
    id: "dev",
    label: "Standard",
    blurb:
      "Regular firmware. Reflashable over USB. Recommended for most users.",
    manifest: "/firmware/manifest-dev.json",
  },
  {
    id: "secure-dev",
    label: "Secure — Development",
    blurb:
      "Tests flash encryption and NVS encryption. Still reflashable via USB. Use for security testing only.",
    manifest: "/firmware/manifest-secure-dev.json",
  },
  {
    id: "secure-prod",
    label: "Secure — Production (PERMANENT)",
    blurb:
      "Enables Secure Boot v2 and release-mode flash encryption. On first boot, the device burns eFuses and disables USB download mode forever. The device can never be reflashed after this.",
    manifest: "/firmware/manifest-secure-prod.json",
  },
];

const PERMANENT_PHRASE =
  "I understand that the device is permanently flashed";

export function Flasher() {
  const [variant, setVariant] = React.useState<Variant>("dev");
  const [confirmText, setConfirmText] = React.useState("");
  const [serialSupported, setSerialSupported] = React.useState<boolean | null>(
    null
  );
  const scriptStatus = useEspWebTools();

  React.useEffect(() => {
    setSerialSupported(
      typeof navigator !== "undefined" && "serial" in navigator
    );
  }, []);

  const selected = VARIANTS.find((v) => v.id === variant)!;
  const isPermanent = variant === "secure-prod";
  const permanentConfirmed = confirmText.trim() === PERMANENT_PHRASE;
  const installEnabled = !isPermanent || permanentConfirmed;

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

      {/* Variant picker */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-3">
          Choose firmware
        </legend>
        {VARIANTS.map((v) => {
          const checked = v.id === variant;
          return (
            <label
              key={v.id}
              className={
                "block p-4 rounded-lg border cursor-pointer transition-colors " +
                (checked
                  ? "border-accent-500 bg-accent-50 dark:bg-accent-dark-950/30 dark:border-accent-dark-500"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600")
              }
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="variant"
                  value={v.id}
                  checked={checked}
                  onChange={() => {
                    setVariant(v.id);
                    if (v.id !== "secure-prod") setConfirmText("");
                  }}
                  className="mt-1 accent-accent-600 dark:accent-accent-dark-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {v.id === "dev" && (
                      <Cpu className="w-4 h-4 text-accent-600 dark:text-accent-dark-400" />
                    )}
                    {v.id === "secure-dev" && (
                      <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                    {v.id === "secure-prod" && (
                      <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {v.label}
                    </span>
                    {v.id === "dev" && (
                      <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-sm bg-accent-100 dark:bg-accent-dark-950/50 text-accent-700 dark:text-accent-dark-400">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    {v.blurb}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </fieldset>

      {/* Permanent confirmation */}
      {isPermanent && (
        <div className="p-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 space-y-4">
          <div className="flex gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <div className="font-medium text-red-900 dark:text-red-200">
                One-way operation
              </div>
              <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">
                Flashing this firmware and powering the device on will burn
                eFuses, generate Secure Boot v2 keys, and permanently disable
                the USB download mode. The device cannot be reflashed,
                debugged via JTAG, or recovered after that point.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-permanent"
              className="block text-sm font-medium text-red-900 dark:text-red-200 mb-2"
            >
              Type to confirm: <span className="font-mono">{PERMANENT_PHRASE}</span>
            </label>
            <input
              id="confirm-permanent"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="w-full px-3 py-2 rounded-sm border border-red-300 dark:border-red-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Type the phrase exactly"
            />
            {permanentConfirmed && (
              <div className="flex items-center gap-2 mt-2 text-sm text-green-700 dark:text-green-400">
                <CircleCheck className="w-4 h-4" />
                Confirmation accepted.
              </div>
            )}
          </div>
        </div>
      )}

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
        {serialSupported !== false &&
        installEnabled &&
        scriptStatus === "ready" ? (
          <esp-web-install-button
            key={variant}
            manifest={selected.manifest}
          >
            <button
              type="button"
              slot="activate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-medium transition-colors"
            >
              <Usb className="w-4 h-4" />
              Connect device & flash {selected.label}
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
              : "Type the confirmation to continue"}
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
