import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payment Confirmation',
  description: 'Understanding Nexa instant transactions and when to wait for additional confirmations.',
};

export default function ConfirmationPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Usage
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Payment Confirmation
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Nexa features instant transactions with double-spend protection, 
          making payments secure within seconds.
        </p>
      </div>

      {/* Instant Transactions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Nexa Instant Transactions
        </h2>
        
        <div className="p-5 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800 mb-6">
          <div className="flex gap-3">
            <Zap className="w-6 h-6 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-accent-900 dark:text-accent-dark-200 mb-2">0-conf with Double-Spend Proofs</h4>
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                Nexa uses double-spend proofs to secure transactions before they're included 
                in a block. When PayDeck shows "Payment Received", the transaction is protected 
                against double-spending and safe to accept for most retail transactions.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <FeatureItem 
            icon={<Zap className="w-4 h-4" />}
            text="Transactions confirm instantly (within seconds)"
          />
          <FeatureItem 
            icon={<Shield className="w-4 h-4" />}
            text="Double-spend proofs provide security before block confirmation"
          />
          <FeatureItem 
            icon={<CheckCircle2 className="w-4 h-4" />}
            text="Safe for retail and everyday transactions"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How Double-Spend Proofs Work
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          When a customer sends a payment:
        </p>

        <div className="space-y-3 mb-6">
          <ProcessStep 
            number={1}
            text="Transaction is broadcast to the Nexa network"
          />
          <ProcessStep 
            number={2}
            text="Nodes validate and propagate the transaction"
          />
          <ProcessStep 
            number={3}
            text="PayDeck detects the transaction (seconds)"
          />
          <ProcessStep 
            number={4}
            text="Network watches for any double-spend attempts"
          />
          <ProcessStep 
            number={5}
            text="If a double-spend is attempted, proof is generated and broadcast"
          />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Double-spend proofs make it cryptographically provable if someone tries to spend 
              the same coins twice. This provides security equivalent to waiting for a block 
              confirmation in most practical scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* When to Wait for Blocks */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          When to Wait for Block Confirmations
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          For most transactions, instant confirmation is sufficient. However, for high-value 
          payments, you may want additional security:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card 
            title="Instant Confirmation OK"
            items={[
              "Retail purchases",
              "Everyday transactions",
              "In-person payments",
              "Amounts under $500"
            ]}
            color="green"
          />
          <Card 
            title="Consider Waiting for Blocks"
            items={[
              "Large purchases ($500+)",
              "High-value goods/services",
              "Remote transactions",
              "Unknown customers"
            ]}
            color="amber"
          />
        </div>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Block Confirmation Times</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            Nexa blocks are mined approximately every 2 minutes:
          </p>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>• 1 confirmation: ~2 minutes</li>
            <li>• 3 confirmations: ~6 minutes</li>
            <li>• 6 confirmations: ~12 minutes</li>
          </ul>
        </div>
      </section>

      {/* What PayDeck Shows */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What PayDeck Shows
        </h2>
        
        <div className="space-y-4">
          <StateCard 
            state="Waiting for Payment"
            description="QR code displayed, waiting for customer to send"
            color="blue"
          />
          <StateCard 
            state="Payment Received"
            description="Transaction detected and protected by double-spend proofs"
            color="green"
          />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>For large payments:</strong> After seeing "Payment Received", you can 
              manually verify additional block confirmations using a block explorer or your 
              wallet app before providing high-value goods or services.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Having issues?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Check common troubleshooting steps for payment detection problems.
        </p>
        <Link 
          href="/docs/maintenance/troubleshooting"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Troubleshooting
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Feature Item
function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="text-accent-500 dark:text-accent-dark-500 flex-shrink-0">
        {icon}
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}

// Component: Process Step
function ProcessStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center font-medium text-xs flex-shrink-0">
        {number}
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}

// Component: Card
function Card({ title, items, color }: { title: string; items: string[]; color: 'green' | 'amber' }) {
  const colors = {
    green: 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20',
    amber: 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[color]}`}>
      <h4 className="font-medium text-zinc-900 dark:text-white mb-3">{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: State Card
function StateCard({ state, description, color }: { state: string; description: string; color: 'blue' | 'green' }) {
  const colors = {
    blue: 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20',
    green: 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20'
  };

  const iconColors = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-accent-600 dark:text-accent-dark-400'
  };

  const dotColors = {
    blue: 'bg-blue-500',
    green: 'bg-accent-500 dark:bg-accent-dark-500'
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${colors[color]}`}>
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColors[color]}`} />
      <div>
        <span className={`font-medium ${iconColors[color]}`}>{state}</span>
        <span className="text-zinc-500"> - {description}</span>
      </div>
    </div>
  );
}
