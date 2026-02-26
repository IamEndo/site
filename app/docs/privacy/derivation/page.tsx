import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  Info,
  Key,
  GitBranch,
  Hash,
  Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Address Derivation',
  description: 'How PayDeck derives addresses from your seed phrase using HD wallet standards.',
};

export default function DerivationPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Privacy
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Address Derivation
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          How PayDeck generates unlimited addresses from a single seed phrase 
          using hierarchical deterministic (HD) wallet standards.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Overview
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          HD wallets use a tree-like structure to derive keys. From a single seed phrase, 
          you can generate billions of addresses, all recoverable from that same seed.
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
          <div className="font-mono text-sm text-center text-zinc-600 dark:text-zinc-400">
            <p className="mb-2">Seed Phrase (12 words)</p>
            <p className="text-zinc-400 mb-2">↓</p>
            <p className="mb-2">Master Key</p>
            <p className="text-zinc-400 mb-2">↓</p>
            <p className="mb-2">Extended Public Key (xPub)</p>
            <p className="text-zinc-400 mb-2">↓</p>
            <p>Address 0, Address 1, Address 2, ...</p>
          </div>
        </div>
      </section>

      {/* BIP Standards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          BIP Standards
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck follows Bitcoin Improvement Proposals (BIPs) that define how HD wallets work:
        </p>

        <div className="space-y-4">
          <BIPCard 
            number="BIP39"
            title="Mnemonic Seed"
            description="Converts your 12-word phrase into a 512-bit seed. This is the standard used by most cryptocurrency wallets."
          />
          <BIPCard 
            number="BIP32"
            title="HD Key Derivation"
            description="Defines how to derive child keys from parent keys in a hierarchical tree structure."
          />
          <BIPCard 
            number="BIP44"
            title="Multi-Account Hierarchy"
            description="Specifies the derivation path structure for different coins and accounts."
          />
        </div>
      </section>

      {/* Derivation Path */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Nexa Derivation Path
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck uses the standard Nexa derivation path:
        </p>

        <div className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 mb-4">
          <code className="text-accent-400 dark:text-accent-dark-400 font-mono text-lg">m/44'/29223'/0'/0/n</code>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Component</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Value</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">m</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">-</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Master key (root)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">44'</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">BIP44</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Purpose (multi-account)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">29223'</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Nexa</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Coin type (Nexa's registered number)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">0'</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Account</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Account index (first account)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">0</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">External</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Chain (0 = receiving, 1 = change)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">n</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">0, 1, 2...</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Address index (increments)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>The apostrophe (') means hardened derivation.</strong> Hardened keys cannot 
              be derived from the xPub alone, providing additional security.
            </p>
          </div>
        </div>
      </section>

      {/* How PayDeck Uses This */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How PayDeck Uses This
        </h2>
        
        <div className="space-y-4">
          <ProcessCard 
            icon={<Key className="w-5 h-5" />}
            title="Setup"
            description="When you generate or import a seed, PayDeck derives the xPub at m/44'/29223'/0'. The seed is then erased."
          />
          <ProcessCard 
            icon={<Hash className="w-5 h-5" />}
            title="Address Generation"
            description="PayDeck stores an address index counter. Each new address increments this counter (0, 1, 2, 3...)."
          />
          <ProcessCard 
            icon={<GitBranch className="w-5 h-5" />}
            title="Privacy Mode"
            description="With privacy enabled, each new invoice uses the next index. Without privacy, it always uses index 0."
          />
          <ProcessCard 
            icon={<Layers className="w-5 h-5" />}
            title="Wallet Compatibility"
            description="Your wallet software (Wally, Otoplo, etc.) derives addresses using the same path, so they match."
          />
        </div>
      </section>

      {/* Address Index */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Address Index Counter
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck tracks which address index to use next:
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <div className="space-y-2 font-mono text-sm">
            <p className="text-zinc-600 dark:text-zinc-400">Invoice 1 → m/44'/29223'/0'/0/<span className="text-accent-500 dark:text-accent-dark-500">0</span></p>
            <p className="text-zinc-600 dark:text-zinc-400">Invoice 2 → m/44'/29223'/0'/0/<span className="text-accent-500 dark:text-accent-dark-500">1</span></p>
            <p className="text-zinc-600 dark:text-zinc-400">Invoice 3 → m/44'/29223'/0'/0/<span className="text-accent-500 dark:text-accent-dark-500">2</span></p>
            <p className="text-zinc-500">... and so on</p>
          </div>
        </div>

        <p className="text-sm text-zinc-500">
          The counter is stored persistently on the device. After a factory reset, 
          it starts from 0 again (which is fine, old addresses still work).
        </p>
      </section>

      {/* Why This Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Why This Matters
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <BenefitCard 
            title="Recoverable"
            description="All addresses can be regenerated from your seed phrase"
          />
          <BenefitCard 
            title="Compatible"
            description="Works with any wallet using the same derivation path"
          />
          <BenefitCard 
            title="Private"
            description="Different addresses prevent transaction linking"
          />
          <BenefitCard 
            title="Unlimited"
            description="Generate billions of addresses from one seed"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Consider the tradeoffs
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Privacy mode has some practical considerations. Learn about the tradeoffs.
        </p>
        <Link 
          href="/docs/privacy/tradeoffs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Privacy Tradeoffs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: BIP Card
function BIPCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-xs text-zinc-600 dark:text-zinc-400">
          {number}
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Component: Process Card
function ProcessCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Benefit Card
function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
      <h4 className="font-medium text-accent-700 dark:text-accent-dark-300 mb-1">{title}</h4>
      <p className="text-sm text-accent-800 dark:text-accent-dark-300">{description}</p>
    </div>
  );
}
