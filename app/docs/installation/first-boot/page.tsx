import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Power,
  Wifi,
  Server,
  Wallet,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Smartphone,
  QrCode,
  Settings,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'First Boot',
  description: 'Initial setup after flashing PayDeck firmware to your ESP32.',
};

export default function FirstBootPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Power className="w-4 h-4" />
          Installation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          First Boot
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          After flashing the firmware, your PayDeck will boot into the initial setup wizard. 
          This guide walks you through each step.
        </p>
      </div>

      {/* What to Expect */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What to Expect
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          When your device powers on for the first time, you'll see:
        </p>

        <div className="space-y-3 mb-6">
          <BootStep number={1} text="PayDeck logo with version number" />
          <BootStep number={2} text="Brief loading animation" />
          <BootStep number={3} text="Setup wizard begins automatically" />
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">Production Mode Warning</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                If using production firmware, the first boot takes 1-2 minutes for encryption setup. 
                <strong> Do not disconnect power during this time</strong> or you may brick the device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Wizard */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Setup Wizard
        </h2>

        <div className="space-y-6">
          {/* Step 1: WiFi */}
          <SetupStepCard 
            icon={<Wifi className="w-5 h-5" />}
            number={1}
            title="WiFi Configuration"
            description="Connect to your wireless network"
          >
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                Use the on-screen keyboard to enter your network name (SSID)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                Enter your WiFi password
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400">•</span>
                PayDeck will connect and verify the connection
              </li>
            </ul>
            <p className="text-xs text-zinc-500 mt-3">
              Only 2.4GHz networks are supported. 5GHz networks will not appear.
            </p>
          </SetupStepCard>

          {/* Step 2: Rostrum */}
          <SetupStepCard 
            icon={<Server className="w-5 h-5" />}
            number={2}
            title="Rostrum Server"
            description="Configure blockchain connection"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              PayDeck connects to Rostrum servers (Nexa's Electrum implementation) to monitor the blockchain.
            </p>
            <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-800 mb-3">
              <p className="text-xs text-zinc-500 mb-1">Default server:</p>
              <code className="text-sm text-zinc-900 dark:text-white">electrum.nexa.org:20004</code>
            </div>
            <p className="text-xs text-zinc-500">
              The default server works for most users. You can change this later in Settings, 
              or <Link href="/docs/setup/own-server" className="text-green-600 dark:text-green-400 hover:underline">run your own server</Link>.
            </p>
          </SetupStepCard>

          {/* Step 3: Wallet */}
          <SetupStepCard 
            icon={<Wallet className="w-5 h-5" />}
            number={3}
            title="Wallet Setup"
            description="Choose how to receive payments"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Select one of four wallet modes:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <WalletOption 
                title="Manual Address"
                description="Enter a single receiving address"
                best="Quick setup, no privacy"
              />
              <WalletOption 
                title="Generate Seed"
                description="Create a new 12-word seed phrase"
                best="Full privacy, new wallet"
              />
              <WalletOption 
                title="Import Seed"
                description="Use an existing seed phrase"
                best="Full privacy, existing wallet"
              />
              <WalletOption 
                title="Import xPub"
                description="Use an extended public key"
                best="Privacy without seed on device"
              />
            </div>
            <p className="text-xs text-zinc-500 mt-3">
              See <Link href="/docs/wallet/options" className="text-green-600 dark:text-green-400 hover:underline">Wallet Options</Link> for 
              detailed comparison of each mode.
            </p>
          </SetupStepCard>

          {/* Step 4: PIN */}
          <SetupStepCard 
            icon={<Lock className="w-5 h-5" />}
            number={4}
            title="PIN Setup (Optional)"
            description="Protect menu access"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Set a 6-digit PIN to protect access to settings and sensitive operations. 
              This is optional but recommended for:
            </p>
            <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Shared or public deployments
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Preventing accidental settings changes
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Devices accessible to employees
              </li>
            </ul>
            <p className="text-xs text-zinc-500">
              You can set or change the PIN later in Settings.
            </p>
          </SetupStepCard>
        </div>
      </section>

      {/* Verify Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Verify Your Setup
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          After completing the wizard, verify everything is working:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <VerifyCard 
            icon={<Smartphone className="w-5 h-5" />}
            title="Main Screen"
            check="Device shows main interface"
          />
          <VerifyCard 
            icon={<QrCode className="w-5 h-5" />}
            title="Create Invoice"
            check="QR code displays when you create an invoice"
          />
          <VerifyCard 
            icon={<Zap className="w-5 h-5" />}
            title="Connection"
            check="Status indicator shows connected"
          />
          <VerifyCard 
            icon={<Settings className="w-5 h-5" />}
            title="Menu Access"
            check="Can access settings (PIN prompt if set)"
          />
        </div>

        <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-green-900 dark:text-green-200 mb-1">Setup Complete!</div>
              <p className="text-sm text-green-800 dark:text-green-300">
                Your PayDeck is ready to accept Nexa payments.
              </p>
            </div>
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
            problem="WiFi won't connect"
            solutions={[
              "Verify SSID and password are correct",
              "Ensure your network is 2.4GHz (5GHz not supported)",
              "Move closer to your router",
              "Check if your router has MAC filtering enabled"
            ]}
          />
          <TroubleshootItem 
            problem="Can't reach Rostrum server"
            solutions={[
              "Verify WiFi is connected (check status indicator)",
              "Try a different Rostrum server",
              "Check if your network blocks port 20004",
              "Wait a moment and retry (server may be temporarily busy)"
            ]}
          />
          <TroubleshootItem 
            problem="Touch screen unresponsive"
            solutions={[
              "Try calibrating touch in Settings > Display",
              "Clean the screen surface",
              "Restart the device",
              "Check if screen protector is interfering"
            ]}
          />
          <TroubleshootItem 
            problem="Device stuck on boot logo"
            solutions={[
              "Wait up to 2 minutes (production mode encryption)",
              "If using dev firmware, check serial output for errors",
              "Try reflashing the firmware"
            ]}
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Next Steps
        </h2>
        
        <div className="grid sm:grid-cols-3 gap-4">
          <NextStepCard 
            href="/docs/setup/wifi"
            title="WiFi Configuration"
            description="Advanced network settings"
          />
          <NextStepCard 
            href="/docs/wallet/options"
            title="Wallet Options"
            description="Understand wallet modes"
          />
          <NextStepCard 
            href="/docs/usage/receiving"
            title="Receiving Payments"
            description="Create your first invoice"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to configure WiFi?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn about advanced WiFi settings and network configuration.
        </p>
        <Link 
          href="/docs/setup/wifi"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          WiFi Configuration
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Boot Step
function BootStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-semibold text-sm">
        {number}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">{text}</p>
    </div>
  );
}

// Component: Setup Step Card
function SetupStepCard({ 
  icon, 
  number, 
  title, 
  description, 
  children 
}: { 
  icon: React.ReactNode; 
  number: number; 
  title: string; 
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-zinc-400 font-medium">Step {number}</span>
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <div className="pl-14">
        {children}
      </div>
    </div>
  );
}

// Component: Wallet Option
function WalletOption({ title, description, best }: { title: string; description: string; best: string }) {
  return (
    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-zinc-500 mb-2">{description}</p>
      <p className="text-xs text-green-600 dark:text-green-400">{best}</p>
    </div>
  );
}

// Component: Verify Card
function VerifyCard({ icon, title, check }: { icon: React.ReactNode; title: string; check: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white text-sm mb-1">{title}</h4>
        <p className="text-xs text-zinc-500">{check}</p>
      </div>
    </div>
  );
}

// Component: Next Step Card
function NextStepCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link 
      href={href}
      className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50/50 dark:hover:bg-green-950/20 transition-colors"
    >
      <h4 className="font-medium text-zinc-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
        {title}
      </h4>
      <p className="text-xs text-zinc-500">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-2">
        Learn more <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
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
