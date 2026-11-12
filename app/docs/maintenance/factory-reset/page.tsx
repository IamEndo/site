import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import {
  Wrench,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trash2
} from 'lucide-react';

export const metadata: Metadata = docsMetadata("/docs/maintenance/factory-reset", {
  title: 'Factory Reset',
  description: 'Erase every setting, the wallet configuration and the password, and run the PayDeck setup wizard again.',
});

export default function FactoryResetPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
            <Wrench className="w-4 h-4" />
            Maintenance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Factory Reset
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Erase all settings and return PayDeck to its initial state. The device restarts into the setup wizard.
          </p>
        </div>

        {/* Warning */}
        <section className="mb-12">
          <div className="p-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">This action cannot be undone</h3>
                <p className="text-sm text-red-800 dark:text-red-300">
                  Factory reset permanently erases all device settings. Afterwards you choose the wallet mode again,
                  set a new password, set up the wallet and reconnect to the network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Gets Erased */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What Gets Erased
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <EraseCard
              title="Erased"
              items={[
                "Wallet mode (Receive only / Watch only) and the setup state",
                "Access password and the wrapped master key",
                "Wallet configuration (xPub or address)",
                "Privacy mode and the address index",
                "Wi-Fi credentials",
                "Node (Rostrum server) settings",
                "Display name, logo, display and time preferences",
                "Transaction history"
              ]}
              erased={true}
            />
            <EraseCard
              title="Not Erased"
              items={[
                "Firmware (stays installed)",
                "Production mode eFuses (permanent)",
                "Your cryptocurrency (on the blockchain)"
              ]}
              erased={false}
            />
          </div>
        </section>

        {/* When to Reset */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            When to Factory Reset
          </h2>

          <div className="space-y-3">
            <ReasonItem text="Changing the wallet mode: it is chosen once in the wizard and cannot be edited in settings" />
            <ReasonItem text="Selling or giving away the device" />
            <ReasonItem text="Switching to a completely different wallet" />
            <ReasonItem text="Troubleshooting persistent issues" />
            <ReasonItem text="Starting fresh after testing" />
            <ReasonItem text="Forgot the password: the menu is locked, so use the USB method below" />
          </div>
        </section>

        {/* How to Reset */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            How to Factory Reset
          </h2>

          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Method 1: From the Menu
          </h3>

          <div className="space-y-3 mb-6">
            <Step number={1} text="Tap Menu on the home screen and enter your password" />
            <Step number={2} text="Open More settings and tap Factory reset" />
            <Step number={3} text="Confirm the 'Factory reset?' prompt with Continue" />
            <Step number={4} text="On the Erase data screen type erase data on the keypad and tap Erase" />
            <Step number={5} text="The device erases its storage, restarts and shows the setup wizard" />
          </div>

          <p className="text-sm text-neutral-500 mb-8">
            Fifteen consecutive wrong passwords on the unlock screen trigger the same wipe automatically.
          </p>

          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Method 2: Erase and Reflash over USB
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            If you cannot open the menu (forgotten password, device issues), erase the flash from a computer:
          </p>

          <div className="p-4 rounded-lg bg-neutral-900 dark:bg-neutral-950 mb-4">
            <code className="text-accent-400 dark:text-accent-dark-400 font-mono text-sm">
              pio run -t erase -e esp32dev-hspi-st7789-2v8
            </code>
          </div>

          <p className="text-sm text-neutral-500 mb-4">
            Then flash the firmware again, either with PlatformIO or the{" "}
            <Link href="/docs/install/web-flasher" className="text-accent-600 dark:text-accent-dark-400 hover:underline">web flasher</Link>,
            which erases the chip before installing. Use the ILI9341 environment name on a single-USB board.
          </p>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Production mode devices:</strong> cannot be reflashed. Factory reset from the menu
                is the only option, so a forgotten password on a sealed device cannot be recovered.
              </p>
            </div>
          </div>
        </section>

        {/* After Reset */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            After Factory Reset
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The device boots into the setup wizard and nothing else is reachable until it completes:
          </p>

          <div className="space-y-3">
            <SetupItem
              step="Mode"
              description="Receive only or Watch only, chosen once"
              href="/docs/installation/first-boot"
            />
            <SetupItem
              step="Password"
              description="A new access password, 8 to 128 characters"
              href="/docs/security/pin-setup"
            />
            <SetupItem
              step="Wallet"
              description="Create or restore a seed, import an xPub, or enter an address"
              href="/docs/wallet/options"
            />
            <SetupItem
              step="Network"
              description="Then, from the Menu: Wi-Fi and node settings"
              href="/docs/setup/wifi"
            />
          </div>
        </section>

        {/* Your Funds Are Safe */}
        <section className="mb-12">
          <div className="p-5 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <div className="flex gap-3">
              <CheckCircle2 className="w-6 h-6 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-accent-900 dark:text-accent-dark-200 mb-2">Your Funds Are Safe</h3>
                <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                  Factory reset only erases device settings. Your cryptocurrency is on the
                  blockchain, not on the device. As long as you have your seed phrase backed up,
                  you can restore access by entering the seed into PayDeck or any compatible wallet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Ready to set up again?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The first-boot guide walks through the wizard step by step.
          </p>
          <Link
            href="/docs/installation/first-boot"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            First Boot Guide
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Erase Card
function EraseCard({ title, items, erased }: { title: string; items: string[]; erased: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${erased ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20' : 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20'}`}>
      <div className="flex items-center gap-2 mb-3">
        {erased ? (
          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-dark-400" />
        )}
        <h4 className={`font-medium ${erased ? 'text-red-700 dark:text-red-300' : 'text-accent-700 dark:text-accent-dark-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            {erased ? (
              <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-3 h-3 text-accent-500 dark:text-accent-dark-500 flex-shrink-0" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Reason Item
function ReasonItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <RefreshCw className="w-4 h-4 text-neutral-400 flex-shrink-0" />
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{text}</p>
    </div>
  );
}

// Component: Step
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
        {number}
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{text}</p>
    </div>
  );
}

// Component: Setup Item
function SetupItem({ step, description, href }: { step: string; description: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
      <div>
        <span className="font-medium text-neutral-900 dark:text-white">{step}</span>
        <span className="text-neutral-500"> - {description}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-neutral-400" />
    </Link>
  );
}
