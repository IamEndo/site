import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import { Wallet, ArrowRight, CheckCircle2, AlertTriangle, Info, Key, Shield, Clock, Lock } from "lucide-react";
import { StatCard, Step, TroubleshootItem, UseCase } from "../../_components/DocsBlocks";
import { XpubConverter } from "./_components/XpubConverter";

export const metadata: Metadata = docsMetadata("/docs/wallet/import-xpub", {
  title: 'Importing an xPub',
  description: 'Import an extended public key for maximum security watch-only operation.',
});

export default function ImportXpubPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <Wallet className="w-4 h-4" />
            Wallet
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Importing an xPub
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The most secure option. Import an extended public key directly so your 
            seed phrase never touches the PayDeck device.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <StatCard icon={<Clock className="w-5 h-5" />} label="Setup Time" value="5-10 min" />
          <StatCard icon={<Lock className="w-5 h-5" />} label="Security" value="Maximum" />
          <StatCard icon={<Shield className="w-5 h-5" />} label="Privacy" value="Full" />
        </div>

        {/* How It Works */}
        <section className="mb-12">
          <div className="p-5 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Maximum Security</div>
                <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                  With xPub import, your seed phrase <strong>never exists on PayDeck</strong>, not even 
                  temporarily. You extract the xPub from your wallet software and enter only the public 
                  key. This is ideal for hardware wallet users or anyone who wants complete key isolation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is an xPub */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What is an xPub?
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            An extended public key (xPub) is derived from your seed phrase and allows generating 
            unlimited receiving addresses without the ability to spend. It's the public half of 
            your HD wallet.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard 
              title="What xPub Can Do"
              items={[
                "Generate unlimited receiving addresses",
                "Monitor incoming payments",
                "Enable privacy mode (new address per payment)",
                "Verify addresses match your main wallet"
              ]}
              positive
            />
            <InfoCard 
              title="What xPub Cannot Do"
              items={[
                "Spend or move funds",
                "Sign transactions",
                "Reveal your seed phrase",
                "Compromise your private keys"
              ]}
              positive={false}
            />
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            When to Use xPub Import
          </h2>
        
          <div className="grid sm:grid-cols-2 gap-4">
            <UseCase 
              title="Maximum Security"
              description="Seed phrase never touches PayDeck, not even temporarily"
            />
            <UseCase 
              title="Advanced Users"
              description="For those comfortable with wallet internals and key management"
            />
            <UseCase 
              title="Business Deployments"
              description="Staff can receive payments without access to spending keys"
            />
            <UseCase 
              title="Developer Setups"
              description="When you have programmatic access to derive xPub from seed"
            />
          </div>
        </section>

        {/* Getting Your xPub */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Getting Your xPub
          </h2>
        
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Limited wallet support:</strong> Not all wallets allow exporting the xPub. 
                This is an advanced feature primarily available in developer tools and some 
                specialized wallet software. Check your wallet's documentation for xPub export capabilities.
              </p>
            </div>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            PayDeck needs the account-level public key of your wallet, at the Nexa path
            <code className="font-mono text-sm"> m/44&apos;/29223&apos;/0&apos;</code>, in its own text format (shown
            below). Wallet apps that export an extended public key usually give a base58 string
            starting with &ldquo;xpub&rdquo;; PayDeck does not accept that form, so the two values
            have to be taken from it; the converter below does that. Wally does not export the
            account key yet; that export is planned. In a wallet that does, look for options like:
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
              <span className="text-neutral-400">•</span>
              "Extended Public Key" or "xPub" in wallet settings
            </li>
            <li className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
              <span className="text-neutral-400">•</span>
              "Account Public Key" in advanced options
            </li>
            <li className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
              <span className="text-neutral-400">•</span>
              "Watch-only export" functionality
            </li>
          </ul>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                  <strong>Derivation path:</strong> PayDeck uses m/44'/29223'/0'. The xPub must be 
                  exported for this specific path for addresses to match.
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Alternative:</strong> If your wallet doesn't support xPub export, 
                  use <Link href="/docs/wallet/import-seed" className="underline">Import Seed</Link> instead. 
                  PayDeck erases the seed immediately after deriving the xPub.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example xPub */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            xPub Format
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The format PayDeck accepts is the prefix <code className="font-mono text-sm">xpub_nexa:</code>,
            the 33-byte compressed public key as 66 hex characters, a colon, and the 32-byte chain
            code as 64 hex characters. That is exactly 141 characters, all lowercase:
          </p>

          <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 mb-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">Format (placeholders, not a real key):</p>
            <code className="text-xs text-neutral-900 dark:text-white break-all leading-relaxed">
              xpub_nexa:&lt;66 hex characters: public key&gt;:&lt;64 hex characters: chain code&gt;
            </code>
          </div>

          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>No checksum:</strong> the key is 141 characters typed by hand, and the format
                has no checksum. PayDeck can tell that the length and characters are right, but a
                single wrong digit in the chain code is accepted and produces addresses that nobody
                holds keys for. Comparing addresses afterwards (step 4) is not optional.
              </p>
            </div>
          </div>
        </section>

        {/* Converter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Convert a Standard xPub
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            If your wallet or tooling gives you a standard base58 extended public key for the
            Nexa account, this converts it to PayDeck&apos;s format. It checks the key&apos;s own
            checksum, refuses private keys, and warns when the key is not at an account level.
          </p>
          <XpubConverter />
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
            The converted key still has to be typed on the device by hand, and the device cannot
            detect a mistyped digit. Compare addresses afterwards as described below.
          </p>
        </section>

        {/* Import Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Import Steps
          </h2>
        
          <div className="space-y-4">
            <Step 
              number={1} 
              title="Select Import xPub"
              description="From the Set up wallet screen (or Wallet settings later), choose 'Import xPub key'"
            />
          
            <Step 
              number={2} 
              title="Enter the xPub"
              description="Carefully type or enter the xPub string using the on-screen keyboard"
            >
              <div className="mt-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Tip:</strong> Have your xPub visible on another screen. 
                  Work through it in chunks, verifying each section before continuing.
                </p>
              </div>
            </Step>
          
            <Step 
              number={3} 
              title="Tap OK"
              description="PayDeck checks the length, the prefix and the characters, and that the public key is a valid point. If they pass, the key is saved at once and 'Wallet configured' appears; there is no separate confirmation and no restart. Otherwise it shows 'Key is N chars, needs 141' or 'Invalid key format'."
            />
          
            <Step 
              number={4} 
              title="Compare Addresses"
              description="Before taking any payment, show an address on PayDeck and verify that it matches the first receiving address in your wallet software"
            >
              <div className="mt-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-accent-800 dark:text-accent-dark-300">
                    <strong>Addresses match?</strong> Setup complete. PayDeck will generate the 
                    same addresses as your main wallet.
                  </p>
                </div>
              </div>
            </Step>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Troubleshooting
          </h2>
        
          <div className="space-y-4">
            <TroubleshootItem 
              problem="Invalid xPub error"
              solutions={[
                "'Key is N chars, needs 141': characters were dropped or added; count again",
                "The key must start with 'xpub_nexa:' and contain only the hex characters 0-9 and a-f",
                "A base58 key starting with 'xpub6...' is not accepted",
                "Confirm your wallet uses the correct derivation path"
              ]}
            />
            <TroubleshootItem 
              problem="Addresses don't match"
              solutions={[
                "Verify derivation path is m/44'/29223'/0'",
                "Some wallets use different index numbers",
                "Try regenerating the xPub from your wallet"
              ]}
            />
            <TroubleshootItem 
              problem="Can't find xPub in wallet"
              solutions={[
                "Most consumer wallets don't support xPub export",
                "This feature is mainly available in developer tools",
                "Consider using Import Seed instead (seed is erased immediately)",
                "You can derive xPub programmatically from your seed using BIP32 libraries"
              ]}
            />
          </div>
        </section>

        {/* Security Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Security Comparison
          </h2>
        
          <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">Method</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">Seed on Device</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">Security</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Generate Seed</td>
                  <td className="px-4 py-3 text-amber-700 dark:text-amber-400 text-xs">Briefly (then erased)</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Import Seed</td>
                  <td className="px-4 py-3 text-amber-700 dark:text-amber-400 text-xs">Briefly (then erased)</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">High</td>
                </tr>
                <tr className="bg-accent-50/50 dark:bg-accent-dark-950/20">
                  <td className="px-4 py-3 text-neutral-900 dark:text-white font-medium">Import xPub</td>
                  <td className="px-4 py-3 text-accent-700 dark:text-accent-dark-400 text-xs">Never</td>
                  <td className="px-4 py-3 text-accent-700 dark:text-accent-dark-400 text-xs font-medium">Maximum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Prefer a simpler setup?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Generate a seed directly on PayDeck for easier setup with strong security.
          </p>
          <Link 
            href="/docs/wallet/seed-generation"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-700 hover:bg-accent-800 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Generate Seed
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Info Card
function InfoCard({ title, items, positive }: { title: string; items: string[]; positive: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${positive ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900'}`}>
      <h4 className={`font-medium mb-3 ${positive ? 'text-accent-700 dark:text-accent-dark-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${positive ? 'text-accent-500 dark:text-accent-dark-500' : 'text-neutral-400'}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
