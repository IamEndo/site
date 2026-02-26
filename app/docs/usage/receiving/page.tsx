import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  Info,
  QrCode,
  CheckCircle2,
  Clock,
  Zap,
  Eye
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Receiving Payments',
  description: 'Accept Nexa cryptocurrency payments with PayDeck.',
};

export default function ReceivingPaymentsPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Usage
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Receiving Payments
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Accept Nexa payments with PayDeck. Display a QR code, customer scans and pays, 
          you see confirmation in seconds.
        </p>
      </div>

      {/* Quick Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How It Works
        </h2>
        
        <div className="grid sm:grid-cols-3 gap-4">
          <StepCard 
            number={1}
            icon={<QrCode className="w-5 h-5" />}
            title="Display QR"
            description="PayDeck shows a QR code with your Nexa address"
          />
          <StepCard 
            number={2}
            icon={<Zap className="w-5 h-5" />}
            title="Customer Pays"
            description="Customer scans and sends NEX from their wallet"
          />
          <StepCard 
            number={3}
            icon={<CheckCircle2 className="w-5 h-5" />}
            title="Confirmed"
            description="PayDeck detects payment and shows confirmation"
          />
        </div>
      </section>

      {/* Basic Payment Flow */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Basic Payment Flow
        </h2>
        
        <div className="space-y-4">
          <FlowStep 
            number={1}
            title="Create a payment request"
            note="Enter the amount in NEX using the on-screen keypad"
          />
          <FlowStep 
            number={2}
            title="Show the QR code to your customer"
            note="The QR code contains your address and the payment amount"
          />
          <FlowStep 
            number={3}
            title="Customer scans with their Nexa wallet app"
            note="Works with Wally Wallet, Otoplo, or any Nexa wallet"
          />
          <FlowStep 
            number={4}
            title="Customer confirms the payment"
            note="Amount is pre-filled from the QR code, they just tap confirm"
          />
          <FlowStep 
            number={5}
            title="Payment Received"
            note="PayDeck confirms instantly via Nexa's 0-conf with double-spend proofs"
          />
        </div>
      </section>

      {/* What You See */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Payment States
        </h2>
        
        <div className="space-y-4">
          <StateCard 
            state="Waiting"
            description="QR code displayed, waiting for customer to pay"
            color="blue"
          />
          <StateCard 
            state="Payment Received"
            description="Transaction confirmed via Nexa instant transactions (0-conf)"
            color="green"
          />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Instant confirmation:</strong> Nexa uses double-spend proofs for secure 
              0-conf transactions. Payments confirm instantly for most use cases. For large 
              amounts, you may choose to wait for additional block confirmations.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Detection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How Payment Detection Works
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck monitors the blockchain via Rostrum servers (online mode):
        </p>

        <div className="space-y-3">
          <FeatureItem text="Transaction broadcast is detected instantly" />
          <FeatureItem text="PayDeck verifies the payment matches the requested amount" />
          <FeatureItem text="Nexa double-spend proofs provide instant security" />
          <FeatureItem text="Payment confirmed immediately for most transactions" />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Offline Mode</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            When not connected to a Rostrum server, PayDeck operates in offline mode. 
            In this mode, you'll need to verify payments manually using a block explorer 
            or your wallet app.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Tips for Smooth Payments
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <TipCard 
            title="Good lighting"
            description="Ensure the screen is visible and QR code is easily scannable"
          />
          <TipCard 
            title="Stable connection"
            description="Strong WiFi ensures fast payment detection"
          />
          <TipCard 
            title="Screen orientation"
            description="Angle the device so customer can scan comfortably"
          />
          <TipCard 
            title="Patience"
            description="Detection usually takes seconds, but network delays happen"
          />
        </div>
      </section>

      {/* After Payment */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          After Payment
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Once payment is confirmed:
        </p>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            Funds are in your wallet (accessible via Wally, Otoplo, etc.)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            Tap to clear the screen and prepare for next payment
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            If privacy mode is enabled, next payment uses a fresh address
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Need specific amounts?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn how to create invoices with preset amounts.
        </p>
        <Link 
          href="/docs/usage/invoices"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Creating Invoices
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Step Card
function StepCard({ number, icon, title, description }: { number: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="w-10 h-10 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm mx-auto mb-3">
        {number}
      </div>
      <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center mx-auto mb-2">
        {icon}
      </div>
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}

// Component: Flow Step
function FlowStep({ number, title, note }: { number: number; title: string; note: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <p className="font-medium text-zinc-900 dark:text-white">{title}</p>
        <p className="text-sm text-zinc-500">{note}</p>
      </div>
    </div>
  );
}

// Component: State Card
function StateCard({ state, description, color }: { state: string; description: string; color: 'blue' | 'amber' | 'green' }) {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    green: 'bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-300 border-accent-200 dark:border-accent-dark-800'
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${colors[color]}`}>
      <div className="w-3 h-3 rounded-full bg-current flex-shrink-0" />
      <div>
        <span className="font-medium">{state}</span>
        <span className="opacity-75"> - {description}</span>
      </div>
    </div>
  );
}

// Component: Feature Item
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0" />
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}

// Component: Tip Card
function TipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
