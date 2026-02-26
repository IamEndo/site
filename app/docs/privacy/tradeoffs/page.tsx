import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  AlertTriangle,
  Info,
  Scale,
  Eye,
  EyeOff,
  Wallet,
  RefreshCw,
  Search
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Tradeoffs',
  description: 'Understanding the practical tradeoffs of using privacy mode in PayDeck.',
};

export default function TradeoffsPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Privacy
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Privacy Tradeoffs
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Privacy mode provides better security but comes with practical considerations. 
          Understand the tradeoffs to make the right choice for your use case.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-900 dark:text-blue-200 mb-2">The Core Tradeoff</div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Privacy mode creates multiple addresses. This provides privacy but means your 
                funds are spread across many addresses instead of consolidated in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Side-by-Side Comparison
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <ComparisonCard 
            icon={<Eye className="w-5 h-5" />}
            title="Single Address (Privacy Off)"
            pros={[
              "Simple to track balance",
              "Easy accounting",
              "Fewer UTXOs to manage",
              "No consolidation needed"
            ]}
            cons={[
              "All transactions publicly linked",
              "Revenue visible to anyone",
              "Customer payments traceable"
            ]}
          />
          <ComparisonCard 
            icon={<EyeOff className="w-5 h-5" />}
            title="Fresh Addresses (Privacy On)"
            pros={[
              "Transactions not linked",
              "Revenue hidden",
              "Better security"
            ]}
            cons={[
              "Multiple addresses in wallet",
              "May need consolidation",
              "More complex accounting"
            ]}
          />
        </div>
      </section>

      {/* Practical Considerations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Practical Considerations
        </h2>
        
        <div className="space-y-4">
          <ConsiderationCard 
            icon={<Wallet className="w-5 h-5" />}
            title="Wallet Complexity"
            description="With privacy mode, your wallet will show many addresses instead of one. Wally Wallet and other HD wallets handle this automatically, but it can be visually cluttered."
            severity="low"
          />
          <ConsiderationCard 
            icon={<RefreshCw className="w-5 h-5" />}
            title="Fund Consolidation"
            description="If you receive many small payments to different addresses, you may want to consolidate them periodically. This requires a transaction (with fees) that moves funds to fewer addresses."
            severity="medium"
          />
          <ConsiderationCard 
            icon={<Search className="w-5 h-5" />}
            title="Accounting"
            description="Tracking income is slightly more complex when payments arrive at different addresses. Most wallet software aggregates this, but manual record-keeping requires more attention."
            severity="low"
          />
        </div>
      </section>

      {/* Consolidation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          About Consolidation
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          When you receive payments to many addresses, you may eventually want to consolidate 
          them into fewer addresses. This is done using your wallet software (not PayDeck).
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-3">When to Consolidate</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              When you want to spend funds from multiple addresses
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              When wallet performance degrades due to many UTXOs
            </li>
            <li className="flex items-start gap-2">
              <span className="text-zinc-400">•</span>
              During low-fee periods to minimize cost
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Privacy note:</strong> Consolidation transactions link addresses together 
              on the blockchain. This partially undoes the privacy benefits. Consider this 
              when deciding how and when to consolidate.
            </p>
          </div>
        </div>
      </section>

      {/* When to Use Which */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Recommendations
        </h2>
        
        <div className="space-y-4">
          <RecommendationCard 
            scenario="Retail business with many customers"
            recommendation="Privacy On"
            reason="Prevents customers and competitors from seeing your transaction volume"
          />
          <RecommendationCard 
            scenario="Recurring payments from same payer"
            recommendation="Privacy Off"
            reason="The payer already knows about your business relationship"
          />
          <RecommendationCard 
            scenario="Testing or development"
            recommendation="Privacy Off"
            reason="Simplicity matters more than privacy during testing"
          />
          <RecommendationCard 
            scenario="High-value transactions"
            recommendation="Privacy On"
            reason="Reduces your profile as a target for theft"
          />
          <RecommendationCard 
            scenario="Simple personal use"
            recommendation="Either"
            reason="Depends on your comfort level with blockchain transparency"
          />
        </div>
      </section>

      {/* Not Perfect Privacy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Limitations
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Fresh addresses improve privacy but don't provide perfect anonymity:
        </p>

        <div className="space-y-3">
          <LimitationItem text="Consolidation transactions can link addresses" />
          <LimitationItem text="Timing analysis can sometimes correlate payments" />
          <LimitationItem text="IP address correlation is possible without additional precautions" />
          <LimitationItem text="Exchange deposits may require KYC, linking addresses to identity" />
        </div>

        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Fresh addresses significantly improve practical privacy for most use cases, 
              even if they don't provide cryptographic anonymity.
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Summary
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Factor</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Privacy Off</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Privacy On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Simplicity</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400 text-xs">Better</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">More complex</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Privacy</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">None</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400 text-xs">Better</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Accounting</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400 text-xs">Easier</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Requires wallet</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Consolidation</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400 text-xs">Not needed</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Sometimes needed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to decide?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Enable or disable privacy mode based on your needs.
        </p>
        <Link 
          href="/docs/privacy/enabling"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Configure Privacy Mode
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Comparison Card
function ComparisonCard({ icon, title, pros, cons }: { icon: React.ReactNode; title: string; pros: string[]; cons: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
          {icon}
        </div>
        <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-accent-600 dark:text-accent-dark-400 font-medium mb-1">Pros</p>
          <ul className="space-y-1">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="text-accent-500 dark:text-accent-dark-500">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">Cons</p>
          <ul className="space-y-1">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="text-red-500">-</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Component: Consideration Card
function ConsiderationCard({ icon, title, description, severity }: { icon: React.ReactNode; title: string; description: string; severity: 'low' | 'medium' | 'high' }) {
  const colors = {
    low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[severity]}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Recommendation Card
function RecommendationCard({ scenario, recommendation, reason }: { scenario: string; recommendation: string; reason: string }) {
  const isOn = recommendation === 'Privacy On';
  
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{scenario}</h4>
          <p className="text-sm text-zinc-500">{reason}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${isOn ? 'bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-300' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
          {recommendation}
        </div>
      </div>
    </div>
  );
}

// Component: Limitation Item
function LimitationItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      {text}
    </div>
  );
}
