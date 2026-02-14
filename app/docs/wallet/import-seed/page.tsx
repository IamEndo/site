import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Importing a Seed',
  description: 'Import an existing BIP39 seed phrase into PayDeck for watch-only address generation.',
};

export default function ImportSeedPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Importing a Seed
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Use an existing 12-word seed phrase with PayDeck. Ideal for consolidating 
          payments to an existing wallet.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <StatCard icon={<Clock className="w-5 h-5" />} label="Setup Time" value="2-3 min" />
        <StatCard icon={<FileText className="w-5 h-5" />} label="Input" value="12 words" />
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
                You enter your 12-word seed phrase. PayDeck derives the public keys (xPub) needed 
                for address generation, then <strong>immediately erases the seed from memory</strong>. 
                Your private keys are never stored on the device. PayDeck operates as a watch-only wallet.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 dark:text-green-300">
              <strong>WiFi disabled</strong> during seed import
            </p>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 dark:text-green-300">
              <strong>Seed erased</strong> before network reconnects
            </p>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
            title="Enter Your 12 Words"
            description="Use the on-screen keyboard to type each word of your seed phrase in order."
          >
            <div className="mt-3 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-sm font-medium text-zinc-900 dark:text-white mb-2">Tips for entering words:</p>
              <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  Type the first few letters and select from suggestions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  Words are from the BIP39 wordlist (2048 possible words)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  Double-check spelling before confirming each word
                </li>
              </ul>
            </div>
          </Step>
          
          <Step 
            number={3} 
            title="Confirm Import"
            description="Review that all 12 words are correct, then confirm to proceed."
          />
          
          <Step 
            number={4} 
            title="Derivation Complete"
            description="PayDeck derives your xPub and immediately erases the seed from memory."
          >
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <Trash2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-800 dark:text-green-300">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
              "Your 12-word seed phrase",
              "Private keys",
              "Ability to spend funds"
            ]}
            stored={false}
          />
        </div>
      </section>

      {/* Compatibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Seed Compatibility
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
              "Ensure all 12 words are entered",
              "Check for extra spaces before/after words",
              "Verify checksum (last word depends on previous 11)"
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Want maximum security?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Import an xPub directly so your seed never touches the device.
        </p>
        <Link 
          href="/docs/wallet/import-xpub"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Import xPub
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Stat Card
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
        {icon}
      </div>
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className="font-semibold text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}

// Component: Use Case
function UseCase({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

// Component: Step
function Step({ number, title, description, children }: { number: number; title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        {children}
      </div>
    </div>
  );
}

// Component: Stored Card
function StoredCard({ title, items, stored }: { title: string; items: string[]; stored: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${stored ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'}`}>
      <h4 className={`font-medium mb-3 flex items-center gap-2 ${stored ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
        {stored ? <Key className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className={stored ? 'text-blue-500' : 'text-zinc-400'}>•</span>
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
    <div className="flex items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{title}</span>
    </div>
  );
}

// Component: Troubleshoot Item
function TroubleshootItem({ problem, solutions }: { problem: string; solutions: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-2">{problem}</h4>
      <ul className="space-y-1">
        {solutions.map((solution, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 mt-1">•</span>
            {solution}
          </li>
        ))}
      </ul>
    </div>
  );
}
