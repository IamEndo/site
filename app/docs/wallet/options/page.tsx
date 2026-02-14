import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Eye,
  EyeOff,
  Key,
  FileText,
  Hash,
  Info,
  Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wallet Options',
  description: 'Understanding PayDeck wallet configuration modes: manual address, seed phrase, and xPub import.',
};

export default function WalletOptionsPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Wallet Options
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          PayDeck supports four wallet configuration modes, each with different tradeoffs 
          between simplicity, privacy, and security.
        </p>
      </div>

      {/* Watch-Only Notice */}
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-12">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">Watch-Only Wallet</div>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              PayDeck is a <strong>watch-only</strong> wallet. It generates receiving addresses and 
              monitors for payments, but <strong>cannot spend funds</strong>. When you enter a seed 
              phrase, PayDeck derives only the public keys (xPub) for address generation, then 
              <strong> immediately discards the seed</strong>. Private keys never exist on the device.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Quick Comparison
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Mode</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Privacy</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Complexity</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">Manual Address</td>
                <td className="px-4 py-3"><PrivacyBadge level="low" /></td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Simplest</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Quick setup, testing</td>
              </tr>
              <tr className="bg-green-50/50 dark:bg-green-950/20">
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium flex items-center gap-2">
                  Generate Seed
                  <Star className="w-3 h-3 text-green-500" />
                </td>
                <td className="px-4 py-3"><PrivacyBadge level="high" /></td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Medium</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400 text-xs">Recommended</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">Import Seed</td>
                <td className="px-4 py-3"><PrivacyBadge level="high" /></td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Medium</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Existing wallet</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">Import xPub</td>
                <td className="px-4 py-3"><PrivacyBadge level="high" /></td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Advanced</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Developers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Manual Address */}
      <section className="mb-12">
        <WalletOptionCard 
          icon={<Hash className="w-6 h-6" />}
          title="Manual Address"
          description="Enter a single Nexa address directly. All payments go to this address."
          privacy="low"
          recommended={false}
          href="/docs/wallet/manual-address"
          pros={[
            "Simplest setup: just enter an address",
            "No seed phrase to back up",
            "Works immediately"
          ]}
          cons={[
            "No privacy: all payments publicly linked",
            "Anyone can see your total received",
            "No address derivation capability"
          ]}
        />
      </section>

      {/* Generate Seed */}
      <section className="mb-12">
        <WalletOptionCard 
          icon={<Key className="w-6 h-6" />}
          title="Generate Seed"
          description="Create a new 12-word BIP39 seed phrase on the device. This enables HD (hierarchical deterministic) address derivation for privacy mode."
          privacy="high"
          recommended={true}
          href="/docs/wallet/seed-generation"
          pros={[
            "New address for every payment (privacy)",
            "Full control of key generation",
            "Can recover wallet with seed phrase"
          ]}
          cons={[
            "Must securely back up seed phrase",
            "Seed shown only once: if lost, cannot recover",
            "Requires 128 taps for entropy collection"
          ]}
        />
      </section>

      {/* Import Seed */}
      <section className="mb-12">
        <WalletOptionCard 
          icon={<FileText className="w-6 h-6" />}
          title="Import Seed"
          description="Enter an existing 12-word seed phrase. PayDeck derives the xPub and discards the seed immediately after. The device never stores private keys."
          privacy="high"
          recommended={false}
          href="/docs/wallet/import-seed"
          pros={[
            "Use addresses from existing wallet",
            "Consolidates payments to known wallet",
            "Privacy mode enabled"
          ]}
          cons={[
            "Must enter seed on device (briefly exposed)",
            "Requires trust in device firmware"
          ]}
        />
      </section>

      {/* Import xPub */}
      <section className="mb-12">
        <WalletOptionCard 
          icon={<Eye className="w-6 h-6" />}
          title="Import xPub"
          description="Enter an extended public key (xPub) directly. Maximum security as the seed never touches the device. Advanced option with limited wallet support."
          privacy="high"
          recommended={false}
          href="/docs/wallet/import-xpub"
          pros={[
            "Seed phrase never touches PayDeck",
            "Maximum possible security",
            "Full privacy mode support"
          ]}
          cons={[
            "Most wallets don't support xPub export",
            "Advanced/developer feature",
            "111+ character string to enter manually"
          ]}
        />
      </section>

      {/* Decision Helper */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Which Should I Choose?
        </h2>
        
        <div className="space-y-4">
          <DecisionCard 
            scenario="I want the easiest setup possible"
            recommendation="Manual Address"
            href="/docs/wallet/manual-address"
            note="No privacy, but works in seconds"
          />
          <DecisionCard 
            scenario="I'm new and want security + privacy"
            recommendation="Generate Seed"
            href="/docs/wallet/seed-generation"
            note="Recommended for most users"
            highlighted={true}
          />
          <DecisionCard 
            scenario="I already have a Nexa wallet"
            recommendation="Import Seed"
            href="/docs/wallet/import-seed"
            note="Consolidate payments to existing wallet"
          />
          <DecisionCard 
            scenario="I'm a developer or advanced user"
            recommendation="Import xPub"
            href="/docs/wallet/import-xpub"
            note="Maximum security, requires technical setup"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to configure your wallet?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          We recommend starting with seed generation for the best balance of security and privacy.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/docs/wallet/seed-generation"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Generate Seed
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/docs/wallet/manual-address"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium transition-colors"
          >
            Quick Setup (Manual)
          </Link>
        </div>
      </section>
    </div>
  );
}

// Component: Privacy Badge
function PrivacyBadge({ level }: { level: 'low' | 'high' }) {
  if (level === 'low') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs">
        <EyeOff className="w-3 h-3" />
        Low
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
      <Shield className="w-3 h-3" />
      High
    </span>
  );
}

// Component: Wallet Option Card
function WalletOptionCard({ 
  icon, 
  title, 
  description, 
  privacy,
  recommended,
  href,
  pros, 
  cons 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  privacy: 'low' | 'high';
  recommended: boolean;
  href: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <div className={`p-6 rounded-lg border ${recommended ? 'border-green-300 dark:border-green-700 bg-green-50/30 dark:bg-green-950/10' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${recommended ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h3>
            {recommended && (
              <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                Recommended
              </span>
            )}
            <PrivacyBadge level={privacy} />
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Pros
          </h4>
          <ul className="space-y-1">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-green-500 mt-1">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-1">
            <XCircle className="w-4 h-4" />
            Cons
          </h4>
          <ul className="space-y-1">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-red-500 mt-1">-</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link 
        href={href}
        className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
      >
        Setup guide
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// Component: Decision Card
function DecisionCard({ 
  scenario, 
  recommendation, 
  href, 
  note,
  highlighted 
}: { 
  scenario: string; 
  recommendation: string; 
  href: string;
  note: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg border ${highlighted ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-1">{scenario}</p>
          <div className="flex items-center gap-2">
            <span className="font-medium text-zinc-900 dark:text-white">{recommendation}</span>
            {highlighted && <Star className="w-4 h-4 text-green-500" />}
          </div>
          <p className="text-xs text-zinc-500 mt-1">{note}</p>
        </div>
        <Link 
          href={href}
          className="flex-shrink-0 p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </Link>
      </div>
    </div>
  );
}
