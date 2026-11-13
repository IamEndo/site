import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import { Power, Wifi, Wallet, Lock, ArrowRight, CheckCircle2, AlertTriangle, Smartphone, QrCode, Settings, SlidersHorizontal, Zap } from "lucide-react";
import { TroubleshootItem } from "../../_components/DocsBlocks";

export const metadata: Metadata = docsMetadata("/docs/installation/first-boot", {
  title: 'First Boot',
  description: 'The PayDeck first-run setup wizard: choose the wallet mode, set the access password and set up the wallet, then connect to the network.',
});

export default function FirstBootPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <Power className="w-4 h-4" />
            Installation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            First Boot
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A freshly flashed PayDeck boots straight into a three-step setup wizard: mode, password, wallet.
            Nothing else is reachable until it completes. This guide walks through each step.
          </p>
        </div>

        {/* What to Expect */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What to Expect
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            When the device powers on for the first time you see:
          </p>

          <div className="space-y-3 mb-6">
            <BootStep number={1} text="A short boot, then the 'Set up PayDeck' screen with two mode rows" />
            <BootStep number={2} text="The Menu corner does nothing yet: no payments, no menu, no settings until setup is done" />
            <BootStep number={3} text="Three steps in order; a power cut mid-way resumes at the first missing step" />
          </div>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">Secure and production builds</div>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  On a secure or production build the very first boot takes 1-2 minutes to encrypt the flash
                  before the wizard appears. <strong>Do not disconnect power during this time</strong> or you may brick the device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Wizard */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Setup Wizard
          </h2>

          <div className="space-y-6">
            {/* Step 1: Mode */}
            <SetupStepCard
              icon={<SlidersHorizontal className="w-5 h-5" />}
              number={1}
              title="Choose the Mode"
              description="How will this device be used?"
            >
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <ModeOption
                  title="Receive only"
                  description="Point-of-sale terminal"
                />
                <ModeOption
                  title="Watch only"
                  description="Personal wallet monitor"
                />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                Tap a row and confirm with Continue. The prompt says it plainly: chosen once, cannot be changed,
                factory reset to start over. The mode is shown read-only under Device info afterwards.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                In this release both modes work the same; the only visible difference is the line on
                the home screen (&ldquo;Receive-only&rdquo; or &ldquo;Watch-only&rdquo;) and the Mode row
                under Device info. The choice is recorded so that future,
                mode-specific features (such as a balance view for personal monitors) apply to the right devices.
              </p>
            </SetupStepCard>

            {/* Step 2: Password */}
            <SetupStepCard
              icon={<Lock className="w-5 h-5" />}
              number={2}
              title="Set the Access Password"
              description="8 to 128 characters, mandatory"
            >
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  Type the password on the phone-style keypad (tap a key to cycle its letters; a tap on the text field commits the pending letter), then Next
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  Runs, repeated blocks and common passwords are refused with a short message; see <Link href="/docs/security/password-practices" className="text-accent-700 dark:text-accent-dark-400 hover:underline">password best practices</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  Type it again and Save. The device shows "Password saved" and locks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  Enter the new password once on the unlock screen to reach the wallet step
                </li>
              </ul>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                There is no default code and no way to skip this step. Back returns to the mode picker.
                Details in <Link href="/docs/security/access-password" className="text-accent-700 dark:text-accent-dark-400 hover:underline">Access Password</Link>.
              </p>
            </SetupStepCard>

            {/* Step 3: Wallet */}
            <SetupStepCard
              icon={<Wallet className="w-5 h-5" />}
              number={3}
              title="Set Up the Wallet"
              description="Choose how the device gets its receiving addresses"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                The "Set up wallet" screen offers the same four wallet sources as Wallet settings later on (Wallet settings adds the Privacy switch):
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <WalletOption
                  title="Create wallet"
                  description="Pick 12 or 24 words, tap the screen until the entropy ring is full, write the words down, verify every word, optionally add a passphrase. The device restarts when done."
                  best="Full privacy, new wallet"
                />
                <WalletOption
                  title="Restore wallet"
                  description="Enter an existing seed phrase of 12, 15, 18, 21 or 24 words, then answer the passphrase prompt. The seed is used once and erased."
                  best="Full privacy, existing wallet"
                />
                <WalletOption
                  title="Import xPub key"
                  description="Type an extended public key. The seed never touches the device."
                  best="Privacy without a seed on the device"
                />
                <WalletOption
                  title="Enter address"
                  description="One fixed Nexa address for every payment."
                  best="Quickest setup, no privacy"
                />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                Create wallet appears only on boards with a certified tap-entropy source (the CYD has one).
                Compare the options in <Link href="/docs/wallet/options" className="text-accent-700 dark:text-accent-dark-400 hover:underline">Wallet Options</Link>.
              </p>
            </SetupStepCard>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Setup complete</div>
                <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                  An xPub import or a fixed address finishes the wizard on the spot with a "Setup complete" toast.
                  A created or restored seed finishes on the boot after the restart. Either way the device lands on
                  the home screen with the lock icon, ready to show payment QR codes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Network */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Then: Connect to the Network
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            PayDeck starts offline: QR codes work immediately, but payments are not verified until the device is online.
            Open the Menu, enter your password and go to Network settings.
          </p>

          <div className="space-y-6">
            <SetupStepCard
              icon={<Wifi className="w-5 h-5" />}
              number={4}
              title="Wi-Fi settings"
              description="Connect to your wireless network"
            >
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  Enter the network name (SSID) and the Wi-Fi password on the keypad
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  Flip the Network row to online. The device connects and starts watching the blockchain
                </li>
              </ul>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                Only 2.4 GHz networks are supported. The network name is typed by hand (there is no list to pick from), so enter the name of the 2.4 GHz network.
              </p>
            </SetupStepCard>

            <SetupStepCard
              icon={<Settings className="w-5 h-5" />}
              number={5}
              title="Node settings"
              description="Where the device watches the blockchain"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                PayDeck talks to a Rostrum server (Nexa's Electrum implementation) over TLS.
              </p>
              <div className="p-3 rounded bg-neutral-100 dark:bg-neutral-800 mb-3">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Default server:</p>
                <code className="text-sm text-neutral-900 dark:text-white">electrum.nexa.org:20004</code>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                The default works for most users. Change the host and port here if you{" "}
                <Link href="/docs/setup/own-server" className="text-accent-700 dark:text-accent-dark-400 hover:underline">run your own server</Link>.
              </p>
            </SetupStepCard>
          </div>
        </section>

        {/* Verify Setup */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Verify Your Setup
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <VerifyCard
              icon={<Smartphone className="w-5 h-5" />}
              title="Home screen"
              check="Shows your display name and the lock icon"
            />
            <VerifyCard
              icon={<QrCode className="w-5 h-5" />}
              title="Payment QR"
              check="Entering an amount shows a QR code"
            />
            <VerifyCard
              icon={<Zap className="w-5 h-5" />}
              title="Connection"
              check="The Wi-Fi icon in the top bar is green while connected, and Network settings reads Online, watching"
            />
            <VerifyCard
              icon={<Settings className="w-5 h-5" />}
              title="Menu"
              check="Opens after the password; Device info shows the mode"
            />
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Troubleshooting
          </h2>

          <div className="space-y-4">
            <TroubleshootItem
              problem="The wizard shows the unlock screen instead of a step"
              solutions={[
                "A password already exists: enter it, the wizard continues at the next missing step",
                "This is also what you see after a power cut between the password and wallet steps"
              ]}
            />
            <TroubleshootItem
              problem="Picked the wrong mode"
              solutions={[
                "While the wizard is still open: Back from the password or wallet step returns to the mode picker",
                "After setup: More settings, Factory reset, then run the wizard again"
              ]}
            />
            <TroubleshootItem
              problem="Password refused"
              solutions={[
                "At least 8 characters",
                "No straight runs (12345678), repeated blocks (abababab) or common passwords",
                "Both entries must match; the confirmation field clears on a mismatch"
              ]}
            />
            <TroubleshootItem
              problem="Wi-Fi will not connect"
              solutions={[
                "Verify the SSID and password",
                "Use a 2.4 GHz network (5 GHz is not supported)",
                "Move closer to the router",
                "Check whether the router filters MAC addresses"
              ]}
            />
            <TroubleshootItem
              problem="Cannot reach the Rostrum server"
              solutions={[
                "Verify Wi-Fi is connected and the Network row says online",
                "Check that your network allows port 20004",
                "Try a different Rostrum server in Node settings"
              ]}
            />
            <TroubleshootItem
              problem="Device stuck on the boot logo"
              solutions={[
                "Wait up to 2 minutes (secure builds encrypt the flash on first boot)",
                "Released builds print no logs over serial; to see them, build from source with CFG_DEBUG set to 1 and monitor at 115200 baud",
                "Reflash the firmware"
              ]}
            />
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Next Steps
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <NextStepCard
              href="/docs/setup/wifi"
              title="WiFi Configuration"
              description="Advanced network settings"
            />
            <NextStepCard
              href="/docs/wallet/options"
              title="Wallet Options"
              description="Compare the wallet choices"
            />
            <NextStepCard
              href="/docs/usage/receiving"
              title="Receiving Payments"
              description="Create your first invoice"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Ready to configure WiFi?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Learn about advanced WiFi settings and network configuration.
          </p>
          <Link
            href="/docs/setup/wifi"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-700 hover:bg-accent-800 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            WiFi Configuration
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Boot Step
function BootStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-400 flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <p className="text-neutral-600 dark:text-neutral-400">{text}</p>
    </div>
  );
}

// Component: Setup Step Card
function SetupStepCard({
  icon,
  number,
  title,
  description,
  children
}: {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Step {number}</span>
          </div>
          <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </div>
      <div className="pl-14">
        {children}
      </div>
    </div>
  );
}

// Component: Mode Option
function ModeOption({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <h4 className="font-medium text-neutral-900 dark:text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  );
}

// Component: Wallet Option
function WalletOption({ title, description, best }: { title: string; description: string; best: string }) {
  return (
    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <h4 className="font-medium text-neutral-900 dark:text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{description}</p>
      <p className="text-xs text-accent-700 dark:text-accent-dark-400">{best}</p>
    </div>
  );
}

// Component: Verify Card
function VerifyCard({ icon, title, check }: { icon: React.ReactNode; title: string; check: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-neutral-900 dark:text-white text-sm mb-1">{title}</h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{check}</p>
      </div>
    </div>
  );
}

// Component: Next Step Card
function NextStepCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="group p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-accent-300 dark:hover:border-accent-dark-700 hover:bg-accent-50/50 dark:hover:bg-accent-dark-950/20 transition-colors"
    >
      <h4 className="font-medium text-neutral-900 dark:text-white group-hover:text-accent-700 dark:group-hover:text-accent-dark-400 transition-colors mb-1">
        {title}
      </h4>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs text-accent-700 dark:text-accent-dark-400 mt-2">
        Learn more <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
