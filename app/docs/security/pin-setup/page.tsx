import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  AlertTriangle,
  Info,
  Lock,
  Key,
  Settings,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PIN Setup',
  description: 'Configure a PIN to protect device access and prevent unauthorized use of your PayDeck.',
};

export default function PinSetupPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          PIN Setup
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Protect your PayDeck with a PIN code to prevent unauthorized access 
          and configuration changes.
        </p>
      </div>

      {/* What PIN Protects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What the PIN Protects
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          The PIN prevents unauthorized users from accessing device settings and configuration:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <ProtectionCard 
            title="Protected by PIN"
            items={[
              "Settings menu access",
              "WiFi configuration",
              "Wallet configuration",
              "Server settings",
              "Factory reset"
            ]}
            protected={true}
          />
          <ProtectionCard 
            title="Always Accessible"
            items={[
              "Viewing payment screen",
              "Displaying QR codes",
              "Receiving payments",
              "Viewing transaction status"
            ]}
            protected={false}
          />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Watch-only reminder:</strong> Even without a PIN, PayDeck cannot spend funds. 
              The PIN protects device configuration, not your cryptocurrency.
            </p>
          </div>
        </div>
      </section>

      {/* Setting Up PIN */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Setting Up Your PIN
        </h2>
        
        <div className="space-y-4">
          <Step 
            number={1} 
            title="Open Settings"
            description="From the main screen, tap the settings icon to access the settings menu"
          />
          
          <Step 
            number={2} 
            title="Select Security"
            description="Navigate to the Security or PIN section in settings"
          />
          
          <Step 
            number={3} 
            title="Set PIN"
            description="Enter a 6-digit PIN using the on-screen keypad"
          >
            <div className="mt-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Choose a PIN you can remember but others cannot guess. 
                See <Link href="/docs/security/pin-practices" className="text-accent-600 dark:text-accent-dark-400 hover:underline">PIN best practices</Link>.
              </p>
            </div>
          </Step>
          
          <Step 
            number={4} 
            title="Confirm PIN"
            description="Re-enter the same PIN to confirm. The PIN is now active."
          />
        </div>
      </section>

      {/* PIN Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          PIN Requirements
        </h2>
        
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500" />
              Enter 6 digits PIN
            </li>
            <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500" />
              Numbers only (0-9)
            </li>
            <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500" />
              Can be changed anytime in settings
            </li>
            <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500" />
              Can be disabled if not needed
            </li>
          </ul>
        </div>
      </section>

      {/* Changing PIN */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Changing Your PIN
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          To change an existing PIN:
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <ol className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">1.</span>
              Enter current PIN to access settings
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">2.</span>
              Go to Security settings
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">3.</span>
              Select "Change PIN"
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">4.</span>
              Enter current PIN to confirm identity
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">5.</span>
              Enter and confirm new PIN
            </li>
          </ol>
        </div>
      </section>

      {/* Forgot PIN */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Forgot Your PIN?
        </h2>
        
        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Factory Reset Required</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                If you forget your PIN, the only recovery option is a factory reset. 
                This erases all device settings including WiFi configuration and wallet setup.
              </p>
            </div>
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          After a factory reset:
        </p>

        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            You'll need to reconfigure WiFi
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            You'll need to set up your wallet again (import seed or xPub)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            Your funds are safe (they're on the blockchain, not the device)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            You can set a new PIN during setup
          </li>
        </ul>
      </section>

      {/* Disabling PIN */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Disabling the PIN
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          If you decide a PIN isn't necessary for your setup:
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <ol className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">1.</span>
              Enter current PIN to access settings
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">2.</span>
              Go to Security settings
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">3.</span>
              Select "Disable PIN" or toggle off
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">4.</span>
              Confirm with current PIN
            </li>
          </ol>
        </div>

        <p className="text-sm text-zinc-500">
          Without a PIN, anyone with physical access can change device settings.
        </p>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Choose a strong PIN
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn best practices for selecting a secure PIN.
        </p>
        <Link 
          href="/docs/security/pin-practices"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          PIN Best Practices
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

// Component: Protection Card
function ProtectionCard({ title, items, protected: isProtected }: { title: string; items: string[]; protected: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${isProtected ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900'}`}>
      <div className="flex items-center gap-2 mb-3">
        {isProtected ? (
          <Lock className="w-4 h-4 text-accent-600 dark:text-accent-dark-400" />
        ) : (
          <Key className="w-4 h-4 text-zinc-500" />
        )}
        <h4 className={`font-medium ${isProtected ? 'text-accent-700 dark:text-accent-dark-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {isProtected ? (
              <CheckCircle2 className="w-3 h-3 text-accent-500 dark:text-accent-dark-500" />
            ) : (
              <span className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
