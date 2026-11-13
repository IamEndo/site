import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import {
  Wrench,
  ArrowRight,
  Wifi,
  Wallet,
  Lock,
  Monitor,
  History,
  Info
} from 'lucide-react';

export const metadata: Metadata = docsMetadata("/docs/maintenance/settings", {
  title: 'Device Settings',
  description: 'The PayDeck menu: network, wallet, device and security settings, and the transaction history.',
});

export default function SettingsPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <Wrench className="w-4 h-4" />
            Maintenance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Device Settings
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Everything behind the Menu button: network, wallet, device, password, factory reset and the transaction history.
          </p>
        </div>

        {/* Accessing Settings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Opening the Menu
          </h2>

          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-4">
            <ol className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-400 font-medium">1.</span>
                Tap the Menu button in the corner of the home screen
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-400 font-medium">2.</span>
                Enter your access password on the keypad and tap Unlock
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-400 font-medium">3.</span>
                Pick a category. Back returns to the Menu, and the Menu's Back returns home and locks the device again
              </li>
            </ol>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                The password is mandatory and set during{" "}
                <Link href="/docs/installation/first-boot" className="underline font-medium">first-run setup</Link>.
                If you forget it, the menu, including factory reset, stays locked. The way back is a wipe: enter 15 wrong passwords in a row (the device erases itself and restarts in the setup wizard) or, on a Standard build, erase and reflash over USB.
              </p>
            </div>
          </div>
        </section>

        {/* Settings Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Menu Categories
          </h2>

          <div className="space-y-4">
            <SettingCategory
              icon={<Wifi className="w-5 h-5" />}
              title="Network settings"
              description="Wi-Fi and node"
              items={[
                "Wi-Fi settings: network name (SSID) and password",
                "Node settings: Rostrum server host and port, and the WSS/WS key that turns TLS on or off",
                "Network: switch between online (payments verified automatically) and offline (QR payments only)",
                "On a board without Wi-Fi this screen only states that the device is offline"
              ]}
              href="/docs/setup/wifi"
            />

            <SettingCategory
              icon={<Wallet className="w-5 h-5" />}
              title="Wallet settings"
              description="Seed, keys, privacy"
              items={[
                "Create wallet: new seed phrase from tap entropy (boards with a certified entropy source)",
                "Restore wallet: enter an existing 12 to 24 word seed phrase, with optional passphrase",
                "Import xPub key: watch-only wallet from an extended public key",
                "Privacy: rotate addresses per payment, or reuse one address",
                "Enter address: one fixed receiving address"
              ]}
              href="/docs/wallet/options"
            />

            <SettingCategory
              icon={<Monitor className="w-5 h-5" />}
              title="Device settings"
              description="Time, display, name"
              items={[
                "Time settings: time zone and Sync clock over the network",
                "Display name: the shop name shown on the home screen",
                "Home logo: choose the brand mark on the home screen",
                "Display settings: brightness and auto sleep",
                "Invert display: dark-on-light colours"
              ]}
            />

            <SettingCategory
              icon={<Lock className="w-5 h-5" />}
              title="More settings"
              description="Passwords and factory reset"
              items={[
                "Change password: set a new access password",
                "Duress password: optional second password that erases the device",
                "Factory reset: erase everything and run setup again",
                "Device info: firmware version, hardware, wallet mode"
              ]}
              href="/docs/security/access-password"
            />

            <SettingCategory
              icon={<History className="w-5 h-5" />}
              title="Transactions"
              description="Recent payments"
              items={[
                "The last 15 payments with amount, time and status (older entries are overwritten)",
                "Transaction detail with an explorer QR code"
              ]}
              href="/docs/usage/confirmation"
            />
          </div>
        </section>

        {/* Changing Settings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Things to Know
          </h2>

          <div className="space-y-3">
            <NoteItem
              title="Wallet mode is not a setting"
              description="Receive only or Watch only is chosen once in the setup wizard and shown read-only in Device info. Changing it means a factory reset."
            />
            <NoteItem
              title="Replacing the wallet"
              description="Create, Restore, Import xPub and Enter address each replace the current wallet configuration. Have your backup at hand first."
            />
            <NoteItem
              title="Network changes"
              description="A new Wi-Fi network or node takes effect when the device reconnects; a seed derivation restarts the device."
            />
            <NoteItem
              title="Password changes"
              description="Require the current password, because the menu itself is behind it. The device locks again after the change."
            />
          </div>
        </section>

        {/* Settings Persistence */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Settings Storage
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Settings are stored in the ESP32's non-volatile storage (NVS):
          </p>

          <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              Settings persist across restarts and power cycles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              The account xPub is encrypted under the master key, which is wrapped by your password. The key that derives receiving addresses, a manually entered address, the Wi-Fi password and the node settings are encrypted with a device-bound key instead (derived from the chip ID, not from the password), so the terminal can take payments while locked. On a Standard build that does not stop someone who copies the flash chip
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              Factory reset, and the fifteen-strike wipe, erase all of it
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              Secure builds encrypt the whole NVS partition as well
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              Reflashing the firmware keeps the settings unless you erase the flash first
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Need to reset everything?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Factory reset erases every setting and runs the setup wizard again.
          </p>
          <Link
            href="/docs/maintenance/factory-reset"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-700 hover:bg-accent-800 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Factory Reset
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Setting Category
function SettingCategory({ icon, title, description, items, href }: { icon: React.ReactNode; title: string; description: string; items: string[]; href?: string }) {
  const content = (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-neutral-900 dark:text-white">{title}</h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 ml-13">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="text-neutral-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

// Component: Note Item
function NoteItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-neutral-900 dark:text-white">{title}</span>
        <span className="text-neutral-500 dark:text-neutral-400"> - {description}</span>
      </div>
    </div>
  );
}
