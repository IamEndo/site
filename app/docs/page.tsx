import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield, 
  Wallet, 
  Zap, 
  Lock, 
  Code, 
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Wrench,
  Settings,
  HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'Get started with PayDeck, the open-source ESP32-based point-of-sale device for accepting Nexa cryptocurrency payments.',
};

export default function DocsPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Documentation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Introduction to PayDeck
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          An open-source, self-custodial point-of-sale device for accepting Nexa cryptocurrency payments. 
          No middlemen, no monthly fees, no compromises.
        </p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">&lt;$15</div>
          <div className="text-sm text-zinc-500">Hardware cost</div>
        </div>
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">0%</div>
          <div className="text-sm text-zinc-500">Platform fees</div>
        </div>
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">100%</div>
          <div className="text-sm text-zinc-500">Open source</div>
        </div>
      </div>

      {/* What is PayDeck */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          What is PayDeck?
        </h2>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            PayDeck is a dedicated hardware device built on the ESP32 microcontroller that generates payment 
            invoices and monitors the Nexa blockchain for incoming transactions. When a customer wants to pay, 
            you enter the amount, and PayDeck displays a QR code. The customer scans it with their wallet, 
            sends the payment, and PayDeck confirms receipt. Confirmation typically happens within seconds.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Unlike cloud-based payment processors, PayDeck connects directly to the blockchain through Rostrum 
            servers. Your private keys never leave your control. There are no monthly fees, no transaction fees, 
            and no account requirements.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Key Features
        </h2>
        <div className="grid gap-4">
          <FeatureCard 
            icon={<Wallet className="w-5 h-5" />}
            title="Self-Custodial"
            description="You control your keys. PayDeck operates in watch-only mode and never needs access to your private keys to generate invoices or verify payments."
          />
          <FeatureCard 
            icon={<Shield className="w-5 h-5" />}
            title="Privacy Mode"
            description="Generate a unique receiving address for every transaction using HD key derivation. Payments become unlinkable, protecting both you and your customers."
          />
          <FeatureCard 
            icon={<Zap className="w-5 h-5" />}
            title="Instant Verification"
            description="Transactions appear within seconds. Accept 0-conf for speed, or wait for confirmations when security matters more than immediacy."
          />
          <FeatureCard 
            icon={<Code className="w-5 h-5" />}
            title="Fully Open Source"
            description="Every line of firmware is available for inspection, modification, and improvement. Verify exactly what runs on your device."
          />
          <FeatureCard 
            icon={<Cpu className="w-5 h-5" />}
            title="Low-Cost Hardware"
            description='Built on the ESP32-2432S028R "Cheap Yellow Display" module. Total hardware cost is typically under $15.'
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How It Works
        </h2>
        <div className="space-y-0">
          <Step 
            number={1}
            title="Setup"
            description="Flash the firmware, connect to WiFi, configure your wallet with a seed phrase or receiving address."
            isLast={false}
          />
          <Step 
            number={2}
            title="Create Invoice"
            description="Enter the payment amount in NEX. PayDeck generates a QR code for the customer to scan."
            isLast={false}
          />
          <Step 
            number={3}
            title="Customer Pays"
            description="The customer scans the QR code with any Nexa wallet and sends the payment."
            isLast={false}
          />
          <Step 
            number={4}
            title="Confirmation"
            description="PayDeck monitors the blockchain and confirms when the transaction is received. Typically within seconds."
            isLast={true}
          />
        </div>
      </section>

      {/* Security Model */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Security Model
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          PayDeck takes a paranoid approach to security with three firmware modes:
        </p>
        
        <div className="space-y-3">
          <SecurityMode 
            level="Development"
            color="blue"
            description="For testing and experimentation. No security features enabled. Fully reflashable."
          />
          <SecurityMode 
            level="Secure Development"
            color="yellow"
            description="Flash encryption and secure boot enabled. Can still be reflashed with the correct signing keys."
          />
          <SecurityMode 
            level="Production"
            color="red"
            description="Permanent. Flash encryption and secure boot are locked via eFuses. Device cannot be reflashed. Irreversible."
          />
        </div>

        <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">Recommendation</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                For most users, development mode is perfectly adequate. Since PayDeck operates in watch-only mode 
                and never stores private keys, production mode is only necessary for high-security deployments or 
                regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What You'll Learn
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <DocSection 
            icon={<Wrench className="w-5 h-5" />}
            title="Installation"
            description="Set up your development environment and flash the firmware"
            href="/docs/getting-started/hardware"
          />
          <DocSection 
            icon={<Settings className="w-5 h-5" />}
            title="Setup"
            description="Configure WiFi, Rostrum servers, and network settings"
            href="/docs/setup/wifi"
          />
          <DocSection 
            icon={<Wallet className="w-5 h-5" />}
            title="Wallet"
            description="Understand wallet options, generate seeds, enable privacy mode"
            href="/docs/wallet/options"
          />
          <DocSection 
            icon={<Lock className="w-5 h-5" />}
            title="Security"
            description="PIN protection, security model, and production mode"
            href="/docs/security/model"
          />
        </div>
      </section>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Prerequisites
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Before you begin, you should be comfortable with:
        </p>
        <ul className="space-y-2">
          <Prerequisite text="Basic command-line operations" />
          <Prerequisite text="Connecting hardware to your computer via USB" />
          <Prerequisite text="Basic understanding of cryptocurrency wallets" />
        </ul>
        <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-4">
          No programming experience required. Familiarity with embedded development (PlatformIO, ESP32) 
          is helpful only if you want to modify the firmware.
        </p>
      </section>

      {/* Getting Help */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Getting Help
        </h2>
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-3">
            <HelpCircle className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>If you run into issues or have questions:</p>
              <ul className="list-disc list-inside space-y-1 ml-1">
                <li>Check the <Link href="/docs/maintenance/troubleshooting" className="text-accent-600 dark:text-accent-dark-400 hover:underline">Troubleshooting</Link> guide</li>
                <li>Open an issue on <a href="https://gitlab.com/nicetokno/paydeck" target="_blank" rel="noopener noreferrer" className="text-accent-600 dark:text-accent-dark-400 hover:underline">GitLab</a></li>
                <li>Join the <a href="https://t.me/nicetokno" target="_blank" rel="noopener noreferrer" className="text-accent-600 dark:text-accent-dark-400 hover:underline">Telegram community</a> for real-time help</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to get started?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Begin with the hardware requirements to see what you'll need.
        </p>
        <Link 
          href="/docs/getting-started/hardware"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Hardware Requirements
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Component: Step
function Step({ number, title, description, isLast }: { number: number; title: string; description: string; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm">
          {number}
        </div>
        {!isLast && <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800 my-2" />}
      </div>
      <div className={`pb-6 ${isLast ? '' : ''}`}>
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Security Mode
function SecurityMode({ level, color, description }: { level: string; color: 'blue' | 'yellow' | 'red'; description: string }) {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    yellow: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
  };
  
  return (
    <div className={`p-3 rounded-lg border ${colors[color]}`}>
      <div className="font-medium mb-1">{level}</div>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}

// Component: Doc Section Link
function DocSection({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Link 
      href={href}
      className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-accent-300 dark:hover:border-accent-dark-700 hover:bg-accent-50/50 dark:hover:bg-accent-dark-950/20 transition-colors"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-zinc-400 group-hover:text-accent-600 dark:group-hover:text-accent-dark-400 transition-colors">
          {icon}
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-dark-400 transition-colors">
          {title}
        </h3>
        <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-accent-500 dark:text-accent-dark-500 ml-auto transition-colors" />
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">{description}</p>
    </Link>
  );
}

// Component: Prerequisite
function Prerequisite({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
      <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0" />
      {text}
    </li>
  );
}
