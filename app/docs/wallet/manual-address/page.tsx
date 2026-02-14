import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Hash,
  Eye,
  Clock,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manual Address',
  description: 'Configure PayDeck with a single receiving address for simple payment acceptance.',
};

export default function ManualAddressPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Manual Address
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The simplest way to configure PayDeck. Enter a single Nexa address and start 
          accepting payments immediately.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <StatCard icon={<Clock className="w-5 h-5" />} label="Setup Time" value="< 1 min" />
        <StatCard icon={<Zap className="w-5 h-5" />} label="Complexity" value="Easiest" />
        <StatCard icon={<Eye className="w-5 h-5" />} label="Privacy" value="None" warning />
      </div>

      {/* When to Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          When to Use Manual Mode
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <UseCase 
            title="Testing & Evaluation"
            description="Quick setup to test PayDeck functionality"
            good
          />
          <UseCase 
            title="Temporary Deployments"
            description="Short-term events or pop-up shops"
            good
          />
          <UseCase 
            title="Address Consolidation"
            description="When you want all payments to one address"
            good
          />
          <UseCase 
            title="Privacy Not Required"
            description="Personal use where linkability doesn't matter"
            good
          />
        </div>
      </section>

      {/* Privacy Warning */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Privacy Warning</div>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
                With manual address mode, <strong>all payments are publicly linkable</strong>. Anyone who 
                pays you can:
              </p>
              <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  See all other payments to the same address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Calculate your total received amount
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Track when you receive new payments
                </li>
              </ul>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-3">
                For business use or when privacy matters, use{' '}
                <Link href="/docs/wallet/seed-generation" className="underline font-medium">seed generation</Link> instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Setup Steps
        </h2>
        
        <div className="space-y-4">
          <Step 
            number={1} 
            title="Select Manual Address"
            description="From the wallet setup screen, choose 'Manual address' as your wallet mode"
          />
          <Step 
            number={2} 
            title="Enter Your Address"
            description="Use the on-screen keyboard to enter your Nexa receiving address"
          >
            <div className="mt-3 p-3 rounded bg-zinc-100 dark:bg-zinc-800">
              <p className="text-xs text-zinc-500 mb-1">Example Nexa address:</p>
              <code className="text-xs text-zinc-900 dark:text-white break-all">nexa:nqtsq5g5sjkqk7wzd9wwh9423rr0tda7m027ryljkfy84cjz</code>
            </div>
          </Step>
          <Step 
            number={3} 
            title="Verify the Address"
            description="Double-check that the address is correct. Payments to wrong addresses cannot be recovered."
          />
          <Step 
            number={4} 
            title="Save and Complete"
            description="Tap 'Save' to store the address. PayDeck is now ready to accept payments."
          />
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Tips
        </h2>
        
        <div className="space-y-3">
          <Tip text="Have your address visible on another device to type accurately" />
          <Tip text="Test with a small payment first to verify the address is correct" />
          <Tip text="Consider QR code scanning if available in your wallet" />
          <Tip text="Keep a backup of the address in case you need to reconfigure" />
        </div>
      </section>

      {/* Getting Your Address */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Getting a Nexa Address
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          If you don't have a Nexa address yet, you can get one from:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <AddressSource 
            title="Wally Wallet"
            description="Mobile wallet for iOS and Android (recommended)"
            url="https://nexa.org/wallets"
          />
          <AddressSource 
            title="Otoplo"
            description="Multi-platform wallet with social features"
            url="https://otoplo.com"
          />
          <AddressSource 
            title="Web Wallet"
            description="Browser-based wallet at wallet.nexa.org"
            url="https://wallet.nexa.org"
          />
        </div>
      </section>

      {/* Changing Address */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Changing Your Address
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          To use a different address later:
        </p>

        <div className="space-y-3">
          <Step 
            number={1} 
            title="Access Wallet Settings"
            description="From the menu, navigate to Wallet settings"
          />
          <Step 
            number={2} 
            title="Update Address"
            description="Enter the new address and save"
          />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Changing the address does not affect previously created invoices. 
              Any pending payments will still go to the old address.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Want better privacy?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Generate a seed phrase to enable unique addresses for every payment.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/docs/wallet/seed-generation"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Generate Seed (Recommended)
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/docs/wallet/import-seed"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium transition-colors"
          >
            Import Existing Seed
          </Link>
        </div>
      </section>
    </div>
  );
}

// Component: Stat Card
function StatCard({ icon, label, value, warning }: { icon: React.ReactNode; label: string; value: string; warning?: boolean }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
      <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${warning ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
        {icon}
      </div>
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className={`font-semibold ${warning ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-900 dark:text-white'}`}>{value}</p>
    </div>
  );
}

// Component: Use Case
function UseCase({ title, description, good }: { title: string; description: string; good: boolean }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${good ? 'text-green-500' : 'text-red-500'}`} />
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

// Component: Tip
function Tip({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
    </div>
  );
}

// Component: Address Source
function AddressSource({ title, description, url }: { title: string; description: string; url: string }) {
  const content = (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 transition-colors">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
