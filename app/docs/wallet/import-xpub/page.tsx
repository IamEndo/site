import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Key,
  Shield,
  Clock,
  Eye,
  Lock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Importing an xPub',
  description: 'Import an extended public key for maximum security watch-only operation.',
};

export default function ImportXpubPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Importing an xPub
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
        <div className="p-5 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-green-900 dark:text-green-200 mb-1">Maximum Security</div>
              <p className="text-sm text-green-800 dark:text-green-300">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What is an xPub?
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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

        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          If your wallet supports xPub export, look for options like:
        </p>

        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">•</span>
            "Extended Public Key" or "xPub" in wallet settings
          </li>
          <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">•</span>
            "Account Public Key" in advanced options
          </li>
          <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">•</span>
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          xPub Format
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          An xPub is a long string that looks like this:
        </p>

        <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-4">
          <p className="text-xs text-zinc-500 mb-2">Example xPub (do not use):</p>
          <code className="text-xs text-zinc-900 dark:text-white break-all leading-relaxed">
            xpub6CUGRUonZSQ4TWtTMmzXdFJhrYPNZsz9qfh2PcKstBVGSPiPMNe8fG8n3h8a3JSTjPdAa2XFPN3a8M1Y3R5e8bPeT...
          </code>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Long string warning:</strong> An xPub is typically 111 characters. 
              Entering it manually requires patience. Double-check every character.
            </p>
          </div>
        </div>
      </section>

      {/* Import Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Import Steps
        </h2>
        
        <div className="space-y-4">
          <Step 
            number={1} 
            title="Select Import xPub"
            description="From the wallet setup menu, choose 'Import xPub' or 'Extended Public Key'"
          />
          
          <Step 
            number={2} 
            title="Enter the xPub"
            description="Carefully type or enter the xPub string using the on-screen keyboard"
          >
            <div className="mt-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                <strong>Tip:</strong> Have your xPub visible on another screen. 
                Work through it in chunks, verifying each section before continuing.
              </p>
            </div>
          </Step>
          
          <Step 
            number={3} 
            title="Verify and Confirm"
            description="PayDeck validates the xPub format. If valid, confirm to save."
          />
          
          <Step 
            number={4} 
            title="Compare Addresses"
            description="Generate an address on PayDeck and verify it matches your wallet software"
          >
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-800 dark:text-green-300">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Troubleshooting
        </h2>
        
        <div className="space-y-4">
          <TroubleshootItem 
            problem="Invalid xPub error"
            solutions={[
              "Check for typos, especially similar characters (0/O, l/1)",
              "Ensure you copied the complete string",
              "Verify it starts with 'xpub'",
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Security Comparison
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Method</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Seed on Device</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Generate Seed</td>
                <td className="px-4 py-3 text-amber-600 dark:text-amber-400 text-xs">Briefly (then erased)</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">High</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Import Seed</td>
                <td className="px-4 py-3 text-amber-600 dark:text-amber-400 text-xs">Briefly (then erased)</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">High</td>
              </tr>
              <tr className="bg-green-50/50 dark:bg-green-950/20">
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">Import xPub</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400 text-xs">Never</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400 text-xs font-medium">Maximum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Prefer a simpler setup?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Generate a seed directly on PayDeck for easier setup with strong security.
        </p>
        <Link 
          href="/docs/wallet/seed-generation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Generate Seed
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

// Component: Info Card
function InfoCard({ title, items, positive }: { title: string; items: string[]; positive: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${positive ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'}`}>
      <h4 className={`font-medium mb-3 ${positive ? 'text-green-700 dark:text-green-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${positive ? 'text-green-500' : 'text-zinc-400'}`} />
            {item}
          </li>
        ))}
      </ul>
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
