import type { Metadata } from "next";
import { docsMetadata } from "@/lib/docs-metadata";
import Link from "next/link";
import { Zap, Chrome, CircleHelp } from "lucide-react";
import { DocsArticle } from "../../_components/DocsArticle";
import { Flasher } from "./_components/Flasher";
import { FIRMWARE_VERSION } from "@/lib/constants";

export const metadata: Metadata = docsMetadata("/docs/install/web-flasher", {
  title: "Web Flasher",
  description:
    "Flash PayDeck firmware onto your ESP32 directly from the browser. No drivers, no IDE. Works in Chrome and Edge.",
});

const RELEASES: {
  file: string;
  variant: string;
  size: number;
  hash: string;
}[] = [
  {
    file: `paydeck-v${FIRMWARE_VERSION}-st7789-merged.bin`,
    variant: "ST7789, dual USB board",
    size: 1294464,
    hash: "de2c868ac2a4a8bb6c60681467abc34c9744ced8c8b160488931de7ca8d6a539",
  },
  {
    file: `paydeck-v${FIRMWARE_VERSION}-ili9341-merged.bin`,
    variant: "ILI9341, single USB board",
    size: 1294560,
    hash: "e3c93efde018b44e96bf72f5b8a35ec7aba6db86e604c67006db6c2e12e8d0a7",
  },
];

function formatBytes(n: number): string {
  return n.toLocaleString("en-US") + " bytes";
}

export default function WebFlasherPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
            <Zap className="w-4 h-4" />
            Install
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Flash from your browser
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Plug in your ESP32 via USB, pick your board&apos;s display driver,
            click a button, and PayDeck v{FIRMWARE_VERSION} installs in about two
            minutes.
          </p>
        </div>

        {/* Browser requirement callout */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-12">
          <Chrome className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-medium text-neutral-900 dark:text-white">
              Requires Chrome or Edge.{" "}
            </span>
            <span className="text-neutral-600 dark:text-neutral-400">
              The Web Serial API is not available in Firefox, Safari, or on iOS.
              On other browsers, use the{" "}
              <Link
                href="/docs/installation/building"
                className="text-accent-600 dark:text-accent-dark-400 underline"
              >
                manual installation guide
              </Link>
              .
            </span>
          </div>
        </div>

        {/* Flasher */}
        <section className="mb-16">
          <Flasher />
        </section>

        {/* What happens */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What happens during install
          </h2>
          <ol className="space-y-4">
            <Step
              n={1}
              title="Pick the display driver"
              body={
                <>
                  Dual USB board (USB-C next to micro-USB) = ST7789. Single
                  micro-USB board = ILI9341. See{" "}
                  <Link
                    href="/docs/getting-started/hardware"
                    className="text-accent-600 dark:text-accent-dark-400 underline"
                  >
                    Hardware Requirements
                  </Link>{" "}
                  for photos and the full table. Both images are the same
                  firmware; only the panel driver differs.
                </>
              }
            />
            <Step
              n={2}
              title="Plug the ESP32 into a USB port"
              body="Use a data-capable cable. Some cheap cables only carry power and won't show up in the browser's port picker."
            />
            <Step
              n={3}
              title="Press and hold the BOOT button"
              body="Small tact switch on the back of the CYD, next to the USB connector. Holding it pulls GPIO0 low so the chip enters ROM download mode at the next reset. Required on every flash — auto-reset alone is unreliable on most CYD clones."
            />
            <Step
              n={4}
              title="Click Connect & flash, then pick the port"
              body="With BOOT still held, click the install button above. The browser shows a USB device picker and grants the page access only to the port you select."
            />
            <Step
              n={5}
              title="Release BOOT once the chip is detected"
              body="About 2 seconds after the picker closes, the flasher reports the chip and begins writing. From this point you can release BOOT and let it run."
            />
            <Step
              n={6}
              title="Wait roughly two minutes"
              body="The flasher erases the chip, writes the bootloader, partition table, and application image, then verifies. Don't unplug the device or close the tab."
            />
            <Step
              n={7}
              title="Continue setup on the device"
              body={
                <>
                  When the flasher reports success, the device reboots into the
                  setup wizard. Continue with the{" "}
                  <Link
                    href="/docs/installation/first-boot"
                    className="text-accent-600 dark:text-accent-dark-400 underline"
                  >
                    first-boot guide
                  </Link>{" "}
                  to choose the mode, set your password, set up the wallet and
                  connect to Wi-Fi.
                </>
              }
            />
          </ol>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            If something goes wrong
          </h2>
          <div className="space-y-4">
            <Trouble
              title="The port picker is empty or doesn't show the CYD"
              body={
                <>
                  The OS doesn&apos;t see the USB-to-serial chip. CYD boards use
                  either CH340 or CP210x &mdash; install the{" "}
                  <Link
                    href="/docs/installation/usb-drivers"
                    className="text-accent-600 dark:text-accent-dark-400 underline"
                  >
                    matching driver
                  </Link>
                  , unplug, and reconnect. Bluetooth devices in the picker are
                  normal noise; Chrome filters most of them out.
                </>
              }
            />
            <Trouble
              title='Read timeout / "Failed to connect with the device"'
              body="The chip didn't enter download mode. Hold the BOOT button before clicking the install button and keep it held until the flasher reports the chip. If that doesn't work, hold BOOT, briefly press RESET (or EN), then release BOOT — that walks the chip into download mode regardless of what the USB-serial chip does."
            />
            <Trouble
              title='"The port is already open"'
              body="A previous attempt left the serial port locked. Close any other tabs or programs that might be using it (Arduino Serial Monitor, PlatformIO, screen, minicom), unplug and replug the device, then retry."
            />
            <Trouble
              title="The screen stays white, or the colours are inverted or garbled"
              body="The firmware is running but the wrong panel driver was chosen. Flash the other variant: ST7789 for the dual-USB board, ILI9341 for the single-USB board. Nothing is damaged by trying the wrong one."
            />
            <Trouble
              title="Can I flash a secure or production build from here?"
              body={
                <>
                  No &mdash; and that&apos;s deliberate. The web flasher only
                  installs the reflashable Standard build. Flash encryption and
                  Secure Boot burn one-time eFuses and require your own signing
                  key, so they can&apos;t be delivered as a shared browser
                  download. Follow the{" "}
                  <Link
                    href="/docs/security/production-mode"
                    className="text-accent-600 dark:text-accent-dark-400 underline"
                  >
                    secure build guide
                  </Link>{" "}
                  to do it yourself from source.
                </>
              }
            />
          </div>
        </section>

        {/* Verify */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Verify the firmware
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
            Both images are built from the{" "}
            <a
              href={`https://gitlab.com/IamEndo/paydeck/-/tree/v${FIRMWARE_VERSION}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 dark:text-accent-dark-400 underline"
            >
              v{FIRMWARE_VERSION} source tree
            </a>
            . Each one is the bootloader, partition table and application
            merged into a single image that the flasher writes from address 0.
            To confirm that the bytes flashed onto your device match what is
            published here, download the file, hash it locally, and compare
            against the value below. The application images alone, with
            SHA-256 sums and GPG signatures, are on the{" "}
            <a
              href="https://gitlab.com/IamEndo/paydeck/-/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 dark:text-accent-dark-400 underline"
            >
              GitLab releases page
            </a>
            .
          </p>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 overflow-hidden">
            {RELEASES.map((r) => (
              <ReleaseRow key={r.file} {...r} />
            ))}
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-2">
              Verify locally
            </div>
            <pre className="p-4 rounded-lg bg-neutral-900 dark:bg-black border border-neutral-800 text-xs text-neutral-100 font-mono overflow-x-auto">
              <code>{`sha256sum paydeck-v${FIRMWARE_VERSION}-*-merged.bin`}</code>
            </pre>
          </div>
        </section>
      </div>
    </DocsArticle>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        {n}
      </div>
      <div>
        <div className="font-medium text-neutral-900 dark:text-white mb-1">
          {title}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {body}
        </div>
      </div>
    </li>
  );
}

function Trouble({
  title,
  body,
}: {
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="flex gap-3">
        <CircleHelp className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-neutral-900 dark:text-white mb-1">
            {title}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReleaseRow({
  file,
  variant,
  size,
  hash,
}: {
  file: string;
  variant: string;
  size: number;
  hash: string;
}) {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <a
            href={`/firmware/${file}`}
            download
            className="text-sm font-medium text-neutral-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-dark-400 transition-colors break-all"
          >
            {file}
          </a>
          <div className="text-xs text-neutral-500 dark:text-neutral-500">
            {variant}
          </div>
        </div>
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-500 flex-shrink-0">
          {formatBytes(size)}
        </span>
      </div>
      <code className="block text-xs font-mono text-neutral-500 dark:text-neutral-500 break-all">
        {hash}
      </code>
    </div>
  );
}
