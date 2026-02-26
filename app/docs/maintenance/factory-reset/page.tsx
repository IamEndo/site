import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wrench,
  ArrowRight,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trash2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Factory Reset',
  description: 'Reset PayDeck to factory defaults and erase all settings.',
};

export default function FactoryResetPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wrench className="w-4 h-4" />
          Maintenance
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Factory Reset
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Erase all settings and return PayDeck to its initial state.
        </p>
      </div>

      {/* Warning */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">This action cannot be undone</h3>
              <p className="text-sm text-red-800 dark:text-red-300">
                Factory reset permanently erases all device settings. You will need to 
                reconfigure WiFi, Rostrum server, wallet, and PIN after reset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Gets Erased */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What Gets Erased
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <EraseCard 
            title="Erased"
            items={[
              "WiFi credentials",
              "Rostrum server settings",
              "Wallet configuration (xPub/address)",
              "PIN",
              "Privacy mode settings",
              "Display preferences",
              "Address index counter"
            ]}
            erased={true}
          />
          <EraseCard 
            title="Not Erased"
            items={[
              "Firmware (stays installed)",
              "Production mode eFuses (permanent)",
              "Your cryptocurrency (on blockchain)"
            ]}
            erased={false}
          />
        </div>
      </section>

      {/* When to Reset */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          When to Factory Reset
        </h2>
        
        <div className="space-y-3">
          <ReasonItem text="Forgot your PIN and can't access settings" />
          <ReasonItem text="Selling or giving away the device" />
          <ReasonItem text="Switching to a completely different wallet" />
          <ReasonItem text="Troubleshooting persistent issues" />
          <ReasonItem text="Starting fresh after testing" />
        </div>
      </section>

      {/* How to Reset */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How to Factory Reset
        </h2>
        
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
          Method 1: From Settings Menu
        </h3>
        
        <div className="space-y-3 mb-6">
          <Step number={1} text="Open Settings (requires PIN if set)" />
          <Step number={2} text="Navigate to System" />
          <Step number={3} text="Select 'Factory Reset'" />
          <Step number={4} text="Confirm the reset" />
          <Step number={5} text="Device will restart and show initial setup" />
        </div>

        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
          Method 2: Reflash with Erase
        </h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          If you can't access settings (forgot PIN, device issues):
        </p>

        <div className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 mb-4">
          <code className="text-accent-400 dark:text-accent-dark-400 font-mono text-sm">
            pio run -t erase -e esp32dev-hspi-st7789-2v8
          </code>
        </div>

        <p className="text-sm text-zinc-500 mb-4">
          Then reflash the firmware normally. This erases all flash memory including settings.
        </p>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Production mode devices:</strong> Cannot be reflashed. Factory reset 
              from settings menu is the only option. If settings are inaccessible (forgot PIN), 
              the device cannot be recovered.
            </p>
          </div>
        </div>
      </section>

      {/* After Reset */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          After Factory Reset
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          After reset, you'll need to reconfigure:
        </p>

        <div className="space-y-3">
          <SetupItem 
            step="WiFi"
            description="Connect to your network"
            href="/docs/setup/wifi"
          />
          <SetupItem 
            step="Rostrum Server"
            description="Configure blockchain server (or use default)"
            href="/docs/setup/rostrum"
          />
          <SetupItem 
            step="Wallet"
            description="Import your seed phrase or xPub again"
            href="/docs/wallet/options"
          />
          <SetupItem 
            step="PIN"
            description="Set a new PIN if desired"
            href="/docs/security/pin-setup"
          />
        </div>
      </section>

      {/* Your Funds Are Safe */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-accent-900 dark:text-accent-dark-200 mb-2">Your Funds Are Safe</h3>
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                Factory reset only erases device settings. Your cryptocurrency is stored on the 
                blockchain, not on the device. As long as you have your seed phrase backed up, 
                you can always recover access to your funds by importing the seed into PayDeck 
                or any compatible wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to set up again?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Follow the initial setup guide after factory reset.
        </p>
        <Link 
          href="/docs/installation/first-boot"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          First Boot Guide
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Erase Card
function EraseCard({ title, items, erased }: { title: string; items: string[]; erased: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${erased ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20' : 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20'}`}>
      <div className="flex items-center gap-2 mb-3">
        {erased ? (
          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-dark-400" />
        )}
        <h4 className={`font-medium ${erased ? 'text-red-700 dark:text-red-300' : 'text-accent-700 dark:text-accent-dark-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {erased ? (
              <XCircle className="w-3 h-3 text-red-500" />
            ) : (
              <CheckCircle2 className="w-3 h-3 text-accent-500 dark:text-accent-dark-500" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Reason Item
function ReasonItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <RefreshCw className="w-4 h-4 text-zinc-400 flex-shrink-0" />
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}

// Component: Step
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
        {number}
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}

// Component: Setup Item
function SetupItem({ step, description, href }: { step: string; description: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div>
        <span className="font-medium text-zinc-900 dark:text-white">{step}</span>
        <span className="text-zinc-500"> - {description}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-zinc-400" />
    </Link>
  );
}
