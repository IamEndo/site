import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileText,
  Shield,
  Clock,
  Key,
  Trash2
} from 'lucide-react';
import { StatCard, Step, TroubleshootItem, UseCase } from "../../_components/DocsBlocks";

export const metadata: Metadata = docsMetadata("/docs/wallet/import-seed", {
  title: 'Importing a Seed',
  description: 'Import an existing BIP39 seed phrase into PayDeck for watch-only address generation.',
});

export default function ImportSeedPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
            <Wallet className="w-4 h-4" />
            Wallet
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Importing a Seed
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Use an existing seed phrase of 12 to 24 words with PayDeck. Ideal for consolidating 
            payments to an existing wallet.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <StatCard icon={<Clock className="w-5 h-5" />} label="Setup Time" value="2-3 min" />
          <StatCard icon={<FileText className="w-5 h-5" />} label="Input" value="12-24 words" />
          <StatCard icon={<Shield className="w-5 h-5" />} label="Privacy" value="Full" />
        </div>

        {/* How It Works */}
        <section className="mb-12">
          <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">How It Works</div>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  You enter your seed phrase (12, 15, 18, 21 or 24 words) and, if it has one, the passphrase. PayDeck derives the public keys (xPub) needed 
                  for address generation, then <strong>immediately erases the seed from memory</strong>. 
                  Your private keys are never stored on the device. PayDeck operates as a watch-only wallet.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-accent-800 dark:text-accent-dark-300">
                <strong>WiFi disabled</strong> during seed import
              </p>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-accent-800 dark:text-accent-dark-300">
                <strong>Seed erased</strong> before network reconnects
              </p>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            When to Use Import Seed
          </h2>
        
          <div className="grid sm:grid-cols-2 gap-4">
            <UseCase 
              title="Existing Wallet"
              description="Receive payments to addresses from a wallet you already use"
            />
            <UseCase 
              title="Multiple Devices"
              description="Use the same addresses across PayDeck and your main wallet"
            />
            <UseCase 
              title="Restore After Reset"
              description="Reconfigure PayDeck after a factory reset"
            />
            <UseCase 
              title="Replace Hardware"
              description="Set up a new PayDeck with your existing seed"
            />
          </div>
        </section>

        {/* Security Notice */}
        <section className="mb-12">
          <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Security Consideration</div>
                <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
                  When you enter your seed phrase, it exists briefly in the device's memory during 
                  xPub derivation. While PayDeck erases it immediately after, consider:
                </p>
                <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    Use production firmware for encrypted memory
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    Ensure no one can see your screen while typing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    For maximum security, use <Link href="/docs/wallet/import-xpub" className="underline">Import xPub</Link> instead
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Import Steps
          </h2>
        
          <div className="space-y-4">
            <Step 
              number={1} 
              title="Select Import Seed"
              description="From the wallet setup menu, choose 'Import seed phrase'."
            />
          
            <Step 
              number={2} 
              title="Enter Your Seed Words"
              description="Use the on-screen keyboard to type each word of your seed phrase in order. The length is detected automatically."
            >
              <div className="mt-3 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">Tips for entering words:</p>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Type the first few letters and select from suggestions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Words are from the BIP39 wordlist (2048 possible words)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Double-check spelling before confirming each word
                  </li>
                </ul>
              </div>
            </Step>
          
            <Step 
              number={3} 
              title="Confirm Import"
              description="Review that every word is correct, then confirm. The device then asks whether the seed has a passphrase."
            />
          
            <Step 
              number={4} 
              title="Derivation Complete"
              description="PayDeck derives your xPub and immediately erases the seed from memory."
            >
              <div className="mt-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
                <div className="flex items-start gap-2">
                  <Trash2 className="w-4 h-4 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-accent-800 dark:text-accent-dark-300">
                    <strong>Seed erased:</strong> Only your xPub (public keys) is stored. 
                    Your seed phrase and private keys are never saved to the device.
                  </p>
                </div>
              </div>
            </Step>
          </div>
        </section>

        {/* What Gets Derived */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What PayDeck Stores
          </h2>
        
          <div className="grid sm:grid-cols-2 gap-4">
            <StoredCard 
              title="Stored (xPub)"
              items={[
                "Extended public key for address derivation",
                "Ability to generate unlimited receiving addresses",
                "Address index counter for privacy mode"
              ]}
              stored={true}
            />
            <StoredCard 
              title="Never Stored"
              items={[
                "Your seed phrase and passphrase",
                "Private keys",
                "Ability to spend funds"
              ]}
              stored={false}
            />
          </div>
        </section>

        {/* Compatibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Seed Compatibility
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            PayDeck accepts standard BIP39 seed phrases. Compatible seeds can be created by:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <CompatCard title="Wally Wallet (Recommended)" />
            <CompatCard title="Otoplo" />
            <CompatCard title="Any BIP39/BIP44 wallet" />
          </div>

          <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Derivation path:</strong> PayDeck uses the standard Nexa derivation path 
                (m/44'/29223'/0'). Addresses will match other wallets using the same path.
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Troubleshooting
          </h2>
        
          <div className="space-y-4">
            <TroubleshootItem 
              problem="Word not recognized"
              solutions={[
                "Check spelling carefully",
                "Ensure you're using BIP39 English wordlist",
                "Some words look similar (e.g., 'car' vs 'card')"
              ]}
            />
            <TroubleshootItem 
              problem="Addresses don't match my wallet"
              solutions={[
                "Verify the seed phrase is entered correctly",
                "Check that your wallet uses the same derivation path",
                "Some wallets use different address formats"
              ]}
            />
            <TroubleshootItem 
              problem="Import fails"
              solutions={[
                "Enter 12, 15, 18, 21 or 24 words",
                "Check for extra spaces before/after words",
                "Verify the checksum (the last word depends on all the others)"
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Want maximum security?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Import an xPub directly so your seed never touches the device.
          </p>
          <Link 
            href="/docs/wallet/import-xpub"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Import xPub
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Stored Card
function StoredCard({ title, items, stored }: { title: string; items: string[]; stored: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${stored ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900'}`}>
      <h4 className={`font-medium mb-3 flex items-center gap-2 ${stored ? 'text-blue-700 dark:text-blue-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
        {stored ? <Key className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span className={stored ? 'text-blue-500' : 'text-neutral-400'}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Compat Card
function CompatCard({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0" />
      <span className="text-sm text-neutral-600 dark:text-neutral-400">{title}</span>
    </div>
  );
}
