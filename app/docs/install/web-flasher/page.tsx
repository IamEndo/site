import { Metadata } from "next";
import { Zap, Chrome, CircleHelp } from "lucide-react";
import { Flasher } from "./_components/Flasher";

export const metadata: Metadata = {
  title: "Web Flasher",
  description:
    "Flash PayDeck firmware onto your ESP32 directly from the browser. No drivers, no IDE. Works in Chrome and Edge.",
};

const RELEASES: {
  file: string;
  size: number;
  hash: string;
}[] = [
  {
    file: "paydeck-v0.4.0-dev-merged.bin",
    size: 1271968,
    hash: "6165dd40d9f7072b832f806125ced0dc9e05d792b4f6da5ca3b89c2067aa6da6",
  },
  {
    file: "paydeck-v0.4.0-secure-dev-merged.bin",
    size: 1337504,
    hash: "4718b0e2aa1244429e606f685788618d41509f3acd080d1f4ca2723042b8622a",
  },
  {
    file: "paydeck-v0.4.0-secure-prod-merged.bin",
    size: 1337504,
    hash: "1262eaed31537d753c368b267a827ca894cc2641920706f3047a2fb706b95f97",
  },
];

function formatBytes(n: number): string {
  return n.toLocaleString("en-US") + " bytes";
}

export default function WebFlasherPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Zap className="w-4 h-4" />
          Install
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Flash from your browser
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Plug in your ESP32 via USB, click a button, and the latest PayDeck
          firmware will install in about a minute.
        </p>
      </div>

      {/* Browser requirement callout */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-12">
        <Chrome className="w-5 h-5 text-zinc-400 flex-shrink-0" />
        <div className="text-sm">
          <span className="font-medium text-zinc-900 dark:text-white">
            Requires Chrome or Edge.{" "}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">
            The Web Serial API is not available in Firefox, Safari, or on iOS.
            On other browsers, use the{" "}
            <a
              href="/docs/installation/building"
              className="text-accent-600 dark:text-accent-dark-400 underline"
            >
              manual installation guide
            </a>
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What happens during install
        </h2>
        <ol className="space-y-4">
          <Step
            n={1}
            title="Plug the ESP32 into a USB port"
            body="Use a data-capable cable. Some cheap cables only carry power and won't show up in the browser's port picker."
          />
          <Step
            n={2}
            title="Press and hold the BOOT button"
            body="Small tact switch on the back of the CYD, next to the USB connector. Holding it pulls GPIO0 low so the chip enters ROM download mode at the next reset. Required on every flash — auto-reset alone is unreliable on most CYD clones."
          />
          <Step
            n={3}
            title="Click Connect & flash, then pick the port"
            body="With BOOT still held, click the install button above. The browser shows a USB device picker and grants the page access only to the port you select."
          />
          <Step
            n={4}
            title="Release BOOT once the chip is detected"
            body="About 2 seconds after the picker closes, the flasher reports the chip and begins writing. From this point you can release BOOT and let it run."
          />
          <Step
            n={5}
            title="Wait roughly 60 seconds"
            body="The flasher writes the bootloader, partition table, and application image, then verifies. Don't unplug the device or close the tab."
          />
          <Step
            n={6}
            title="Continue setup on the device"
            body={
              <>
                When the flasher reports success, the device reboots
                automatically. Continue with the{" "}
                <a
                  href="/docs/installation/first-boot"
                  className="text-accent-600 dark:text-accent-dark-400 underline"
                >
                  first-boot guide
                </a>{" "}
                to configure WiFi, your wallet, and a PIN.
              </>
            }
          />
        </ol>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          If something goes wrong
        </h2>
        <div className="space-y-4">
          <Trouble
            title="The port picker is empty or doesn't show the CYD"
            body={
              <>
                The OS doesn't see the USB-to-serial chip. CYD boards use either
                CH340 or CP210x — install the{" "}
                <a
                  href="/docs/installation/usb-drivers"
                  className="text-accent-600 dark:text-accent-dark-400 underline"
                >
                  matching driver
                </a>
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
            title="I flashed Secure — Production by mistake"
            body="If the device has not yet powered on after flashing, you can reflash the Standard image immediately — eFuses are only burned at first boot. Once the device boots and the bootloader runs once, the lock is permanent and the unit cannot be recovered."
          />
        </div>
      </section>

      {/* Verify */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Verify the firmware
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
          All three images are built from the{" "}
          <a
            href="https://gitlab.com/IamEndo/paydeck/-/tree/v0.4.0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 dark:text-accent-dark-400 underline"
          >
            v0.4.0 source tree
          </a>
          . To confirm that the bytes flashed onto your device match what is
          published here, download the file, hash it locally, and compare
          against the value below.
        </p>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
          {RELEASES.map((r) => (
            <ReleaseRow key={r.file} {...r} />
          ))}
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-2">
            Verify locally
          </div>
          <pre className="p-4 rounded-lg bg-zinc-900 dark:bg-black border border-zinc-800 text-xs text-zinc-100 font-mono overflow-x-auto">
            <code>{`sha256sum paydeck-v0.4.0-dev-merged.bin`}</code>
          </pre>
        </div>
      </section>
    </div>
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
      <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {n}
      </div>
      <div>
        <div className="font-medium text-zinc-900 dark:text-white mb-1">
          {title}
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-3">
        <CircleHelp className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-zinc-900 dark:text-white mb-1">
            {title}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReleaseRow({
  file,
  size,
  hash,
}: {
  file: string;
  size: number;
  hash: string;
}) {
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <a
          href={`/firmware/${file}`}
          download
          className="text-sm font-medium text-zinc-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-dark-400 transition-colors break-all"
        >
          {file}
        </a>
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500 flex-shrink-0">
          {formatBytes(size)}
        </span>
      </div>
      <code className="block text-xs font-mono text-zinc-500 dark:text-zinc-500 break-all">
        {hash}
      </code>
    </div>
  );
}
