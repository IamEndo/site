import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  Users,
  TrendingUp,
  Search,
  Link2,
  Store,
  User
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Privacy Matters',
  description: 'Understanding cryptocurrency transaction privacy and why it matters for your business.',
};

export default function WhyPrivacyPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Privacy
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Why Privacy Matters
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Blockchain transactions are public by design. Without privacy measures, 
          every payment you receive reveals information about your business.
        </p>
      </div>

      {/* The Transparency Problem */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          The Transparency Problem
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Nexa, like most cryptocurrencies, uses a public blockchain. Every transaction 
          is recorded permanently and visible to anyone. This transparency is great for 
          verification and auditability, but it creates privacy challenges.
        </p>

        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex gap-3">
            <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">What Anyone Can See</div>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
                If you use the same address for all payments, anyone who pays you can:
              </p>
              <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  See every payment you've ever received to that address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Calculate your total revenue
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Track when you receive new payments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  See when and where you spend funds
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Address Reuse */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          The Problem with Address Reuse
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Using one address for all payments is like publishing your bank statement online. 
          Here's what happens:
        </p>

        <div className="space-y-4 mb-6">
          <ScenarioCard 
            icon={<Store className="w-5 h-5" />}
            title="Business Example"
            description="A coffee shop uses one address. Customer A pays for coffee. Customer A can now see every other payment the shop has received, calculate daily revenue, and identify busy periods."
          />
          <ScenarioCard 
            icon={<User className="w-5 h-5" />}
            title="Personal Example"
            description="You receive your salary to a single address. Your employer can see everywhere you spend, your other income sources, and your total wealth."
          />
          <ScenarioCard 
            icon={<Users className="w-5 h-5" />}
            title="Competitor Intelligence"
            description="A competitor pays you once. They now have a window into your business: transaction volume, growth trends, and customer payment patterns."
          />
        </div>
      </section>

      {/* Real World Implications */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Real World Implications
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <ImplicationCard 
            icon={<TrendingUp className="w-5 h-5" />}
            title="Business Intelligence Leakage"
            description="Competitors can analyze your transaction patterns to understand your business performance"
          />
          <ImplicationCard 
            icon={<Search className="w-5 h-5" />}
            title="Targeted Attacks"
            description="Criminals can identify high-value targets by analyzing blockchain wealth"
          />
          <ImplicationCard 
            icon={<Link2 className="w-5 h-5" />}
            title="Customer Linking"
            description="Transactions can be correlated to identify relationships between customers"
          />
          <ImplicationCard 
            icon={<Eye className="w-5 h-5" />}
            title="Spending Surveillance"
            description="Anyone who knows your address can monitor your financial activity indefinitely"
          />
        </div>
      </section>

      {/* The Solution */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          The Solution: Fresh Addresses
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          The standard solution is to use a new address for every transaction. This breaks 
          the link between payments:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <h4 className="font-medium text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Without Privacy Mode
            </h4>
            <div className="font-mono text-xs bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
              <p className="text-red-800 dark:text-red-300">Payment 1 → Address A</p>
              <p className="text-red-800 dark:text-red-300">Payment 2 → Address A</p>
              <p className="text-red-800 dark:text-red-300">Payment 3 → Address A</p>
            </div>
            <p className="text-xs text-red-700 dark:text-red-300">
              All payments linked. Total visible to everyone.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <h4 className="font-medium text-accent-700 dark:text-accent-dark-300 mb-3 flex items-center gap-2">
              <EyeOff className="w-4 h-4" />
              With Privacy Mode
            </h4>
            <div className="font-mono text-xs bg-accent-100 dark:bg-accent-dark-900/30 p-3 rounded mb-2">
              <p className="text-accent-800 dark:text-accent-dark-300">Payment 1 → Address A</p>
              <p className="text-accent-800 dark:text-accent-dark-300">Payment 2 → Address B</p>
              <p className="text-accent-800 dark:text-accent-dark-300">Payment 3 → Address C</p>
            </div>
            <p className="text-xs text-accent-700 dark:text-accent-dark-300">
              Each payment isolated. No visible connection.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Same wallet, different addresses:</strong> All these addresses belong to the 
              same wallet and are controlled by the same seed phrase. PayDeck derives them 
              automatically using HD (Hierarchical Deterministic) key derivation.
            </p>
          </div>
        </div>
      </section>

      {/* How PayDeck Helps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          How PayDeck Helps
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck's privacy mode automatically generates a new address for each payment:
        </p>

        <div className="space-y-3">
          <FeatureItem text="New address generated for every invoice" />
          <FeatureItem text="Addresses derived from your xPub (no extra setup)" />
          <FeatureItem text="All payments still go to the same wallet" />
          <FeatureItem text="Works with Wally Wallet and other HD wallets" />
          <FeatureItem text="Toggle on/off based on your needs" />
        </div>
      </section>

      {/* When Privacy Matters Most */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          When Privacy Matters Most
        </h2>
        
        <div className="space-y-3">
          <UseCaseItem 
            title="Retail businesses"
            description="Prevent competitors from analyzing your sales volume"
          />
          <UseCaseItem 
            title="Freelancers and contractors"
            description="Keep client payments separate and confidential"
          />
          <UseCaseItem 
            title="High-value transactions"
            description="Avoid making yourself a target for theft"
          />
          <UseCaseItem 
            title="Recurring payments"
            description="Prevent payers from seeing each other's transactions"
          />
          <UseCaseItem 
            title="Any business accepting crypto"
            description="Basic financial hygiene, just like not publishing bank statements"
          />
        </div>
      </section>

      {/* Tradeoffs Note */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
            Privacy vs. Simplicity
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            Privacy mode adds complexity. Each address must be monitored, and consolidating 
            funds requires extra transactions. For some use cases, the simplicity of a single 
            address outweighs privacy concerns.
          </p>
          <Link 
            href="/docs/privacy/tradeoffs" 
            className="text-sm text-accent-600 dark:text-accent-dark-400 hover:underline"
          >
            Learn about privacy tradeoffs →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to enable privacy?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn how to turn on privacy mode in PayDeck.
        </p>
        <Link 
          href="/docs/privacy/enabling"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Enable Privacy Mode
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Scenario Card
function ScenarioCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Component: Implication Card
function ImplicationCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
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

// Component: Feature Item
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
      <EyeOff className="w-4 h-4 text-accent-600 dark:text-accent-dark-400 flex-shrink-0" />
      <p className="text-sm text-accent-800 dark:text-accent-dark-300">{text}</p>
    </div>
  );
}

// Component: Use Case Item
function UseCaseItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <Shield className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-zinc-900 dark:text-white">{title}</span>
        <span className="text-zinc-500"> - {description}</span>
      </div>
    </div>
  );
}
