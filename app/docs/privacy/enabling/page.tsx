import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Settings,
  ToggleRight,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enabling Privacy Mode',
  description: 'How to enable and configure privacy mode in PayDeck for fresh address generation.',
};

export default function EnablingPrivacyPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Privacy
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Enabling Privacy Mode
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Generate a fresh address for each payment to prevent transaction linking.
        </p>
      </div>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Requirements
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Privacy mode requires an HD wallet setup (seed phrase or xPub). It does not work 
          with manual address mode.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <RequirementCard 
            title="Works With"
            items={[
              "Generate Seed",
              "Import Seed",
              "Import xPub"
            ]}
            works={true}
          />
          <RequirementCard 
            title="Does Not Work With"
            items={[
              "Manual Address mode"
            ]}
            works={false}
          />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Why?</strong> HD wallets can derive unlimited addresses from a single seed. 
              Manual address mode only knows one address and cannot generate new ones.
            </p>
          </div>
        </div>
      </section>

      {/* How to Enable */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How to Enable
        </h2>
        
        <div className="space-y-4">
          <Step 
            number={1} 
            title="Open Settings"
            description="From the main screen, tap the settings icon or navigate to Settings menu"
          />
          
          <Step 
            number={2} 
            title="Find Privacy Mode"
            description="Look for 'Privacy Mode', 'Fresh Addresses', or 'Address Rotation' option"
          />
          
          <Step 
            number={3} 
            title="Toggle On"
            description="Enable the privacy mode toggle. The setting takes effect immediately."
          >
            <div className="mt-3 flex items-center gap-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <ToggleRight className="w-5 h-5 text-accent-600 dark:text-accent-dark-400" />
              <span className="text-sm text-accent-800 dark:text-accent-dark-300">Privacy Mode: Enabled</span>
            </div>
          </Step>
        </div>
      </section>

      {/* What Changes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What Changes
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <ModeCard 
            icon={<Eye className="w-5 h-5" />}
            title="Privacy Off"
            items={[
              "Same address for every payment",
              "All transactions publicly linked",
              "Simpler to track in wallet"
            ]}
            enabled={false}
          />
          <ModeCard 
            icon={<EyeOff className="w-5 h-5" />}
            title="Privacy On"
            items={[
              "New address for each payment",
              "Transactions not linked on chain",
              "More addresses in wallet"
            ]}
            enabled={true}
          />
        </div>
      </section>

      {/* After Enabling */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          After Enabling
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Once privacy mode is active:
        </p>

        <div className="space-y-3">
          <InfoItem 
            title="New invoices use fresh addresses"
            description="Each new payment request generates a unique address"
          />
          <InfoItem 
            title="Old addresses still work"
            description="Previously used addresses can still receive payments"
          />
          <InfoItem 
            title="Wallet sees all addresses"
            description="Your wallet software (Wally, etc.) will show all derived addresses"
          />
          <InfoItem 
            title="Same total balance"
            description="Funds from all addresses are part of the same wallet"
          />
        </div>
      </section>

      {/* Verifying It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Verifying It Works
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          To confirm privacy mode is working:
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <ol className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">1.</span>
              Create a new invoice
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">2.</span>
              Note the address shown
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">3.</span>
              Cancel and create another invoice
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">4.</span>
              The address should be different
            </li>
          </ol>
        </div>
      </section>

      {/* Toggling Off */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Turning Privacy Off
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          You can disable privacy mode at any time:
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              Toggle off in Settings
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              PayDeck will use a consistent address for new invoices
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              Previously used addresses remain valid
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Note:</strong> Turning off privacy mode doesn't consolidate your funds. 
              Payments received to different addresses remain in those addresses until you 
              move them using your wallet software.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Want to understand how it works?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn about HD key derivation and how PayDeck generates addresses.
        </p>
        <Link 
          href="/docs/privacy/derivation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Address Derivation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Step
function Step({ number, title, description, children }: { number: number; title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
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

// Component: Requirement Card
function RequirementCard({ title, items, works }: { title: string; items: string[]; works: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${works ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'}`}>
      <h4 className={`font-medium mb-3 ${works ? 'text-accent-700 dark:text-accent-dark-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 className={`w-4 h-4 ${works ? 'text-accent-500 dark:text-accent-dark-500' : 'text-zinc-400'}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Mode Card
function ModeCard({ icon, title, items, enabled }: { icon: React.ReactNode; title: string; items: string[]; enabled: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${enabled ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${enabled ? 'bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
          {icon}
        </div>
        <h4 className={`font-medium ${enabled ? 'text-accent-700 dark:text-accent-dark-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Info Item
function InfoItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-zinc-900 dark:text-white">{title}</span>
        <span className="text-zinc-500"> - {description}</span>
      </div>
    </div>
  );
}
