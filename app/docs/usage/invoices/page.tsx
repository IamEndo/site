import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  Info,
  AlertTriangle,
  Receipt,
  Wifi,
  WifiOff,
  Calculator,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creating Payment Requests',
  description: 'Create payment requests and understand online vs offline mode in PayDeck.',
};

export default function InvoicesPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Usage
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Creating Payment Requests
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Create payment requests with specific NEX amounts and understand how 
          PayDeck verifies payments.
        </p>
      </div>

      {/* Online vs Offline Mode */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Online vs Offline Mode
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <ModeCard 
            icon={<Wifi className="w-5 h-5" />}
            title="Online Mode"
            description="Connected to Rostrum server"
            features={[
              "Automatic payment verification",
              "Instant confirmation via 0-conf",
              "Double-spend proof protection",
              "No manual verification needed"
            ]}
            recommended
          />
          <ModeCard 
            icon={<WifiOff className="w-5 h-5" />}
            title="Offline Mode"
            description="No Rostrum connection"
            features={[
              "QR code still displays",
              "Manual payment verification required",
              "Check payment in wallet app",
              "Use when network unavailable"
            ]}
          />
        </div>
      </section>

      {/* Creating a Payment Request */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Creating a Payment Request
        </h2>
        
        <div className="space-y-4">
          <Step 
            number={1}
            title="Enter the amount"
            description="Use the on-screen keypad to enter the NEX amount"
          />
          <Step 
            number={2}
            title="Confirm"
            description="Tap confirm to generate the payment QR code"
          />
          <Step 
            number={3}
            title="Show to customer"
            description="The QR code includes both address and the exact amount"
          />
          <Step 
            number={4}
            title="Customer scans and confirms"
            description="Amount is pre-filled in their wallet, they just confirm"
          />
          <Step 
            number={5}
            title="Payment confirmed"
            description="In online mode, PayDeck confirms automatically when amount is received"
          />
        </div>
      </section>

      {/* QR Code Format */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How It Works
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck generates a payment URI that includes both the address and amount:
        </p>

        <div className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 mb-4">
          <code className="text-accent-400 dark:text-accent-dark-400 font-mono text-sm break-all">
            nexa:nexa1qr...address...?amount=25.50
          </code>
        </div>

        <p className="text-sm text-zinc-500">
          Compatible wallets automatically populate the amount field when scanning. 
          The customer simply confirms the pre-filled amount.
        </p>
      </section>

      {/* Amount Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Amount Requirements
        </h2>
        
        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Exact Amount Required</h4>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                PayDeck confirms payment only when the exact amount (or more) is received. 
                If the customer sends less than requested, the payment will not confirm.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <AmountItem 
            scenario="Exact amount sent"
            result="Payment confirmed"
            success
          />
          <AmountItem 
            scenario="More than requested"
            result="Payment confirmed (overpayment accepted)"
            success
          />
          <AmountItem 
            scenario="Less than requested"
            result="Payment NOT confirmed"
            success={false}
          />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Multiple transactions:</strong> Customers can pay in multiple transactions 
              (e.g., two payments that add up to the total). PayDeck will confirm once the 
              combined amount reaches the requested total.
            </p>
          </div>
        </div>
      </section>

      {/* Amount Entry */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Entering Amounts
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-1">On-Screen Keypad</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Tap digits to enter the amount. Use the decimal point for fractional NEX.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-1">NEX Amounts</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  All amounts are in NEX (Nexa's native token). The amount is displayed 
                  clearly before generating the QR code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Understanding confirmations
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn about Nexa's instant transactions and when to wait for block confirmations.
        </p>
        <Link 
          href="/docs/usage/confirmation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Payment Confirmation
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Mode Card
function ModeCard({ icon, title, description, features, recommended }: { icon: React.ReactNode; title: string; description: string; features: string[]; recommended?: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${recommended ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${recommended ? 'bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-medium ${recommended ? 'text-accent-700 dark:text-accent-dark-300' : 'text-zinc-900 dark:text-white'}`}>
            {title}
          </h4>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 mt-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${recommended ? 'text-accent-500 dark:text-accent-dark-500' : 'text-zinc-400'}`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Step
function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

// Component: Amount Item
function AmountItem({ scenario, result, success }: { scenario: string; result: string; success: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 p-3 rounded-lg border ${success ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'}`}>
      <span className="text-sm text-zinc-700 dark:text-zinc-300">{scenario}</span>
      <span className={`text-sm font-medium ${success ? 'text-accent-700 dark:text-accent-dark-300' : 'text-red-700 dark:text-red-300'}`}>{result}</span>
    </div>
  );
}
