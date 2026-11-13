import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import {
  Shield,
  ArrowRight,
  AlertTriangle,
  Info,
  Lock,
  Key,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Step } from "../../_components/DocsBlocks";

export const metadata: Metadata = docsMetadata("/docs/security/access-password", {
  title: 'Access Password',
  description: 'How the PayDeck access password protects the device, how it is set during first-run setup, and how to change it.',
});

export default function PasswordSetupPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <Shield className="w-4 h-4" />
            Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Access Password
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every PayDeck is protected by an access password of 8 to 128 characters.
            It is set during first-run setup and unlocks the menu, the settings and the wallet.
          </p>
        </div>

        {/* What the password protects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What the Password Protects
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Taking payments never needs the password. Everything behind the Menu button does:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <ProtectionCard
              title="Locked behind the password"
              items={[
                "The Menu and every settings screen",
                "Network, Wi-Fi and node configuration",
                "Wallet settings (seed, xPub, address, privacy)",
                "Transaction history",
                "Changing the password and factory reset"
              ]}
              protected={true}
            />
            <ProtectionCard
              title="Always accessible"
              items={[
                "The home screen",
                "Entering an amount and showing the QR code",
                "Receiving payments and the payment status"
              ]}
              protected={false}
            />
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Watch-only reminder:</strong> PayDeck cannot spend funds, with or without the password.
                The password protects the device configuration. Someone with menu access could point
                the device at their own address, which is why it matters.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            How It Works
          </h2>

          <div className="space-y-3">
            <FactItem
              title="The password wraps the master key"
              text="The device's master key is encrypted (AES-256-GCM) under a key derived from your password with PBKDF2. The password itself is never stored, not even as a hash: it is verified by successfully unwrapping the master key."
            />
            <FactItem
              title="The device locks when you return home"
              text="Going back to the home screen locks the vault. Opening the Menu asks for the password again. Taking payments keeps working while locked."
            />
            <FactItem
              title="Fifteen wrong attempts in a row wipe the device"
              text="From the tenth wrong attempt the device shows how many attempts remain. On the fifteenth it erases itself to factory state. The attempt counter is saved before each check, so cutting power mid-guess does not reset it."
            />
            <FactItem
              title="Entry is masked"
              text="Each character is shown as an asterisk. The last character you typed stays visible for about a second so you can catch typos, and a confirmation step guards the initial entry."
            />
          </div>
        </section>

        {/* Setting the password */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Setting the Password
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The password is step 2 of the{" "}
            <Link href="/docs/installation/first-boot" className="text-accent-700 dark:text-accent-dark-400 hover:underline">first-run setup wizard</Link>.
            A fresh device cannot reach the wallet, the settings or the payment screen until a password exists,
            so there is no usable default code and no unprotected window: the internal provisioning default is replaced before any wallet or setting exists.
          </p>

          <div className="space-y-4">
            <Step
              number={1}
              title="New password"
              description="Type 8 to 128 characters on the T9 keyboard. Tap a key repeatedly to cycle its letters; a tap on the text field, or a short pause, commits the pending letter. The symbol and caps keys give the full printable range, including space."
            />

            <Step
              number={2}
              title="Next"
              description="The device checks the password against the rules below. A rejected password shows a short message and lets you try again."
            />

            <Step
              number={3}
              title="Confirm password"
              description="Type the same password once more and tap Save. A mismatch clears the confirmation field and asks again."
            />

            <Step
              number={4}
              title="Unlock"
              description="The device shows 'Password saved' and immediately locks. Enter the new password once to continue with the wallet step."
            >
              <div className="mt-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Choose something you can type on a phone-style keypad without looking it up.
                  See <Link href="/docs/security/password-practices" className="text-accent-700 dark:text-accent-dark-400 hover:underline">password best practices</Link>.
                </p>
              </div>
            </Step>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Password Rules
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-3">Accepted</h4>
              <ul className="space-y-2">
                <RuleItem ok text="8 to 128 characters" />
                <RuleItem ok text="Letters, digits, symbols and spaces (printable ASCII)" />
                <RuleItem ok text="Passphrase style, for example several words with spaces" />
                <RuleItem ok text="Changed at any time from More settings" />
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-3">Rejected when set</h4>
              <ul className="space-y-2">
                <RuleItem text="Shorter than 8 characters ('At least 8 characters')" />
                <RuleItem text="A repeated block such as abababab or 12341234" />
                <RuleItem text="A straight run such as 12345678 or abcdefgh" />
                <RuleItem text="Common passwords such as password1, qwertyuiop or paydeck123" />
              </ul>
            </div>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            The rules apply when a password is set or changed. On the unlock screen the device simply tries what you typed.
          </p>
        </section>

        {/* Changing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Changing the Password
          </h2>

          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <ol className="space-y-2">
              <OrderedItem n={1} text="Open the Menu from the home screen and enter the current password" />
              <OrderedItem n={2} text="Choose More settings, then Change password" />
              <OrderedItem n={3} text="Confirm the prompt, then enter and confirm the new password" />
              <OrderedItem n={4} text="The device shows 'Password saved' and returns home, locked" />
            </ol>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            There is no option to remove the password. A financial device without a lock is not a configuration PayDeck offers.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            Changing the access password clears a{" "}
            <Link href="/docs/security/duress-password" className="underline">duress password</Link>{" "}
            if you had set one. The prompt says so; set the duress password again afterwards.
          </p>
        </section>

        {/* Forgot */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Forgot the Password?
          </h2>

          <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">The device has to be wiped</div>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  A forgotten password cannot be recovered, and the menu, including factory reset, is
                  locked behind it. There are two ways back, and both wipe every setting, the wallet
                  configuration and the password. Enter a wrong password fifteen times in a row: the
                  device erases itself and starts the setup wizard (the waits between attempts grow,
                  so this takes several minutes). Or, on a Standard build, erase and reflash the
                  firmware over USB.
                  See <Link href="/docs/maintenance/factory-reset" className="underline font-medium">Factory Reset</Link>.
                </p>
              </div>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              Your funds are safe. They live on the blockchain, not on the device.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              After the wipe the setup wizard runs again: mode, new password, wallet.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400">•</span>
              Production (sealed) devices cannot be reflashed, so fifteen wrong attempts are the only way to reset one.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Choose a strong password
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            What makes a password strong on a device that is typed on a keypad.
          </p>
          <Link
            href="/docs/security/password-practices"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-700 hover:bg-accent-800 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Password Best Practices
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Fact Item
function FactItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <h4 className="font-medium text-neutral-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{text}</p>
    </div>
  );
}

// Component: Rule Item
function RuleItem({ text, ok = false }: { text: string; ok?: boolean }) {
  return (
    <li className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
      {ok ? (
        <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      )}
      {text}
    </li>
  );
}

// Component: Ordered Item
function OrderedItem({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
      <span className="text-neutral-400 font-medium">{n}.</span>
      {text}
    </li>
  );
}

// Component: Protection Card
function ProtectionCard({ title, items, protected: isProtected }: { title: string; items: string[]; protected: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${isProtected ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900'}`}>
      <div className="flex items-center gap-2 mb-3">
        {isProtected ? (
          <Lock className="w-4 h-4 text-accent-700 dark:text-accent-dark-400" />
        ) : (
          <Key className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        )}
        <h4 className={`font-medium ${isProtected ? 'text-accent-700 dark:text-accent-dark-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            {isProtected ? (
              <CheckCircle2 className="w-3 h-3 text-accent-500 dark:text-accent-dark-500" />
            ) : (
              <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
