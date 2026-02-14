import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Smartphone,
  Eye,
  Send,
  History,
  RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Seed Verification',
  description: 'Verify your seed phrase was recorded correctly using Wally Wallet.',
};

export default function VerificationPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Seed Verification
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Verify your seed phrase is correctly recorded by recovering it in a companion wallet. 
          This also gives you full wallet functionality when needed.
        </p>
      </div>

      {/* Why Verify */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Why Verify Your Seed?
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck erases your seed phrase immediately after setup. If you wrote it down incorrectly, 
          you won't discover the mistake until you try to recover your funds, potentially years later. 
          By then, it's too late.
        </p>

        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Common Mistakes</div>
              <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Misspelled words (e.g., "acount" vs "account")
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Wrong word order
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Similar-looking words (e.g., "car" vs "card")
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Illegible handwriting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended: Wally Wallet */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Recommended: Wally Wallet
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          We recommend using <strong>Wally Wallet</strong> to verify your seed phrase. By recovering 
          your seed in Wally, you verify it works correctly AND gain access to full wallet functionality.
        </p>

        <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Wally Wallet</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                A full-featured Nexa wallet for iOS and Android. Same wallet as PayDeck, 
                with complete functionality for managing your funds.
              </p>
              <a 
                href="https://nexa.org/wallets" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Download Wally Wallet
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
          PayDeck + Wally: The Complete Setup
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <ComparisonCard 
            title="PayDeck"
            subtitle="Point of Sale"
            icon={<Eye className="w-5 h-5" />}
            features={[
              "Watch-only (cannot spend)",
              "Generate receiving addresses",
              "Monitor payments",
              "Display QR codes",
              "Optimized for retail"
            ]}
          />
          <ComparisonCard 
            title="Wally Wallet"
            subtitle="Fund Management"
            icon={<Send className="w-5 h-5" />}
            features={[
              "Full wallet (can spend)",
              "Complete transaction history",
              "Send payments",
              "Manage multiple addresses",
              "Mobile convenience"
            ]}
            highlighted
          />
        </div>
      </section>

      {/* Verification Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Verification Steps
        </h2>
        
        <div className="space-y-4">
          <Step 
            number={1} 
            title="Install Wally Wallet"
            description="Download Wally Wallet from your device's app store or nexa.org/wallets"
          />
          
          <Step 
            number={2} 
            title="Choose 'Recover Wallet'"
            description="When setting up Wally, select the option to recover an existing wallet using a seed phrase"
          />
          
          <Step 
            number={3} 
            title="Enter Your 12 Words"
            description="Carefully enter the seed phrase you wrote down during PayDeck setup"
          >
            <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <strong>If any word is rejected:</strong> Check your written notes carefully. 
                You may have a spelling error or wrong word.
              </p>
            </div>
          </Step>
          
          <Step 
            number={4} 
            title="Compare Addresses"
            description="Generate a receiving address in Wally and compare it to an address shown on PayDeck"
          >
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-800 dark:text-green-300">
                  <strong>Addresses match?</strong> Your seed is correctly recorded. 
                  Both wallets are viewing the same funds.
                </p>
              </div>
            </div>
          </Step>
        </div>
      </section>

      {/* What You Gain */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What You Gain with Wally
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Once recovered in Wally, you have the same wallet on two devices with complementary features:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <FeatureCard 
            icon={<History className="w-5 h-5" />}
            title="Transaction History"
            description="View complete history of all payments received through PayDeck"
          />
          <FeatureCard 
            icon={<Send className="w-5 h-5" />}
            title="Send Payments"
            description="Spend your received funds whenever you need to"
          />
          <FeatureCard 
            icon={<RefreshCw className="w-5 h-5" />}
            title="Balance Management"
            description="Move funds between addresses or consolidate UTXOs"
          />
          <FeatureCard 
            icon={<Shield className="w-5 h-5" />}
            title="Backup Verified"
            description="Confirmed your seed works before you need it for recovery"
          />
        </div>
      </section>

      {/* Security Note */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">Security Note</div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your seed phrase gives full access to your funds. Only enter it on trusted devices 
                and apps. Wally Wallet is open source and widely used in the Nexa community. 
                Never enter your seed on websites or unverified applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Verification */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Other Compatible Wallets
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Your seed also works with other BIP39-compatible wallets:
        </p>

        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Wallet className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
              <h4 className="font-medium text-zinc-900 dark:text-white mb-1">Otoplo</h4>
              <p className="text-sm text-zinc-500 mb-2">Multi-platform wallet with social features</p>
              <a 
                href="https://otoplo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                Visit →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Seed verified?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          If you imported an xPub instead of generating a seed, learn about that option.
        </p>
        <Link 
          href="/docs/wallet/import-xpub"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Import xPub
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

// Component: Comparison Card
function ComparisonCard({ 
  title, 
  subtitle, 
  icon, 
  features, 
  highlighted 
}: { 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  features: string[]; 
  highlighted?: boolean;
}) {
  return (
    <div className={`p-5 rounded-lg border ${highlighted ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlighted ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white">{title}</h4>
          <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlighted ? 'text-green-500' : 'text-zinc-400'}`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
