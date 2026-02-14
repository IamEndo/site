import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Key,
  Fingerprint,
  PenLine,
  ShieldCheck,
  Clock,
  Eye,
  EyeOff,
  XCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Generating a Seed',
  description: 'Create a new 12-word BIP39 seed phrase on PayDeck using the tap-based entropy collection system.',
};

export default function SeedGenerationPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Generating a Seed
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Generate a new 12-word BIP39 seed phrase for privacy-preserving payments. 
          This is the recommended setup for most users.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <StatCard icon={<Clock className="w-5 h-5" />} label="Setup Time" value="3-5 min" />
        <StatCard icon={<Fingerprint className="w-5 h-5" />} label="Entropy" value="128 taps" />
        <StatCard icon={<ShieldCheck className="w-5 h-5" />} label="Privacy" value="Full" />
      </div>

      {/* How It Works */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">How It Works</div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                PayDeck generates your seed phrase, displays it <strong>once</strong> for you to write down, 
                then derives the public keys (xPub) needed for address generation. The seed is then 
                <strong> immediately erased from memory</strong>. PayDeck never stores your seed or private keys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Isolated Environment */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Isolated Environment
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          During seed generation, PayDeck creates a secure, isolated environment:
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>WiFi disabled</strong> during seed creation
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>No computer required</strong> - any USB power works
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Seed erased</strong> before network reconnects
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Watch-only</strong> - no private keys stored
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-500">
          PayDeck has no security chip because it doesn't need one - it never stores secrets. 
          Only your xPub (public keys) remains after setup.
        </p>
      </section>

      {/* Before You Begin */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Before You Begin
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Prepare the following before starting:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <PrepareCard 
            icon={<PenLine className="w-5 h-5" />}
            title="Paper & Pen"
            description="To write down your 12-word seed phrase"
          />
          <PrepareCard 
            icon={<EyeOff className="w-5 h-5" />}
            title="Privacy"
            description="Ensure no cameras or people can see your screen"
          />
          <PrepareCard 
            icon={<Clock className="w-5 h-5" />}
            title="Time"
            description="3-5 minutes of uninterrupted focus"
          />
        </div>

        <div className="p-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-900 dark:text-red-200 mb-2">Critical Warning</div>
              <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                Your seed phrase will be shown <strong>only once</strong>. PayDeck immediately 
                erases it after you verify. If you don't write it down correctly:
              </p>
              <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  You cannot recover it from the device
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  No support can help retrieve a lost seed
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  You will lose access to all received payments
                </li>
              </ul>
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
            title="Select Generate Seed"
            description="From the wallet setup menu, choose 'Generate new seed'. Read the instructions carefully."
          />
          
          <Step 
            number={2} 
            title="Collect Entropy (128 Taps)"
            description="Tap the screen 128 times to provide randomness for secure seed generation."
          >
            <div className="mt-3 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <p className="text-sm font-medium text-zinc-900 dark:text-white mb-2">For best randomness:</p>
              <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  Tap across the entire screen, not just one area
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  Vary your timing: some fast, some slow
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  Take 30-60 seconds (don't rush)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-400">•</span>
                  <strong>Avoid patterns</strong>: don't tap fast in one spot
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                <p className="text-xs text-zinc-500 mb-1">
                  <strong>Pro tip:</strong> Use dice! Divide screen into 6 zones, roll before each tap, tap in that zone.
                </p>
                <Link href="/docs/wallet/entropy" className="text-xs text-green-600 dark:text-green-400 hover:underline">Learn more about entropy and dice method →</Link>
              </div>
            </div>
          </Step>
          
          <Step 
            number={3} 
            title="Write Down Your Seed"
            description="Your 12-word seed phrase appears on screen. Write each word carefully, numbered 1-12."
          >
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Do
                </p>
                <ul className="space-y-1 text-xs text-green-800 dark:text-green-300">
                  <li>• Use pen (not pencil)</li>
                  <li>• Write clearly and legibly</li>
                  <li>• Double-check each word</li>
                  <li>• Number words 1-12</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-2 flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Don't
                </p>
                <ul className="space-y-1 text-xs text-red-800 dark:text-red-300">
                  <li>• Take a photo</li>
                  <li>• Save digitally</li>
                  <li>• Email to yourself</li>
                  <li>• Store in the cloud</li>
                </ul>
              </div>
            </div>
          </Step>
          
          <Step 
            number={4} 
            title="Verify Your Seed"
            description="PayDeck asks you to confirm 3 words (e.g., words 3, 6, and 9). Select the correct word from the options shown."
          >
            <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>If you get one wrong:</strong> You'll need to start over. Take your time and verify against your written notes.
              </p>
            </div>
          </Step>
          
          <Step 
            number={5} 
            title="Setup Complete"
            description="PayDeck derives your public keys (xPub), then immediately erases the seed from memory. Your device is now ready."
          >
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-800 dark:text-green-300">
                <strong>What's stored:</strong> Only your xPub (public keys for address generation). 
                Private keys and seed phrase are <strong>never</strong> stored on the device.
              </p>
            </div>
          </Step>
        </div>
      </section>

      {/* Seed Storage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Storing Your Seed Safely
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <StorageCard 
            title="Physical Backup"
            items={[
              "Store in a fireproof safe",
              "Consider metal backup (stamped steel)",
              "Make 2-3 copies in different locations",
              "Tell a trusted person where to find it"
            ]}
            good
          />
          <StorageCard 
            title="Never Do This"
            items={[
              "Store on computer, phone, or cloud",
              "Take photos or screenshots",
              "Email or message to yourself",
              "Store with the PayDeck device"
            ]}
            good={false}
          />
        </div>
      </section>

      {/* Recovery */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Recovery
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Your seed phrase is the master key to your funds. If your PayDeck is lost, stolen, or damaged:
        </p>

        <div className="space-y-3">
          <RecoveryOption 
            title="New PayDeck Device"
            description="Use 'Import Seed' to restore on a replacement device"
            href="/docs/wallet/import-seed"
          />
          <RecoveryOption 
            title="Wally Wallet (Recommended)"
            description="Full-featured mobile wallet for iOS and Android. Manage funds, view history, send payments."
            href="/docs/wallet/verification"
          />
          <RecoveryOption 
            title="Other Wallets"
            description="Also works with Otoplo and any BIP39-compatible wallet"
            href=""
          />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Your seed phrase works with any BIP39/BIP44 compatible wallet. You're not locked into PayDeck.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Already have a seed phrase?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Import an existing seed or use an xPub from your hardware wallet.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link 
            href="/docs/wallet/import-seed"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            Import Seed
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/docs/wallet/import-xpub"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium transition-colors"
          >
            Import xPub
          </Link>
        </div>
      </section>
    </div>
  );
}

// Component: Stat Card
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
        {icon}
      </div>
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className="font-semibold text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}

// Component: Prepare Card
function PrepareCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
        {icon}
      </div>
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
      <p className="text-xs text-zinc-500">{description}</p>
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

// Component: Storage Card
function StorageCard({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${good ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'}`}>
      <h4 className={`font-medium mb-3 flex items-center gap-2 ${good ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
        {good ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${good ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
            <span className={good ? 'text-green-500' : 'text-red-500'}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Recovery Option
function RecoveryOption({ title, description, href }: { title: string; description: string; href: string }) {
  const content = (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 transition-colors">
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
        <p className="text-sm text-zinc-500">{description}</p>
      </div>
      {href && <ArrowRight className="w-4 h-4 text-zinc-400" />}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
