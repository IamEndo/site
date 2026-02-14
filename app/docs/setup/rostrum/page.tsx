import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Server,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Zap,
  Globe,
  Lock,
  Eye,
  Radio
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rostrum Servers',
  description: 'Understanding and configuring Rostrum servers for PayDeck blockchain communication.',
};

export default function RostrumPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Settings className="w-4 h-4" />
          Setup
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Rostrum Servers
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Rostrum is Nexa's implementation of the Electrum protocol. PayDeck uses Rostrum 
          servers to monitor the blockchain for incoming payments without running a full node.
        </p>
      </div>

      {/* What is Rostrum */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          What is Rostrum?
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Rostrum servers act as intermediaries between lightweight clients (like PayDeck) 
          and the Nexa blockchain. They index the blockchain and respond to queries about 
          addresses, transactions, and balances.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <FeatureCard 
            icon={<Zap className="w-5 h-5" />}
            title="Fast Lookups"
            description="Instant address balance and transaction history queries"
          />
          <FeatureCard 
            icon={<Radio className="w-5 h-5" />}
            title="Real-time Notifications"
            description="Subscribe to addresses and receive instant payment alerts"
          />
          <FeatureCard 
            icon={<Globe className="w-5 h-5" />}
            title="Lightweight"
            description="No need to download the full blockchain (200+ GB)"
          />
          <FeatureCard 
            icon={<Shield className="w-5 h-5" />}
            title="Secure"
            description="TLS-encrypted connections protect your data in transit"
          />
        </div>
      </section>

      {/* Default Server */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Default Server
        </h2>
        
        <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Public Rostrum Server</p>
              <code className="text-lg font-mono text-zinc-900 dark:text-white">electrum.nexa.org:20004</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">WSS/TLS</span>
              <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">Community Operated</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-300">
              The default server is suitable for most users. It's operated by the Nexa community 
              and provides reliable, low-latency connections.
            </p>
          </div>
        </div>
      </section>

      {/* Port Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Port Reference
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Port</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Protocol</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Security</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr className="bg-green-50/50 dark:bg-green-950/20">
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20004</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">WSS (WebSocket Secure)</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">TLS encrypted</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400 text-xs font-medium">Recommended</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20003</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">WS (WebSocket)</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Unencrypted</td>
                <td className="px-4 py-3 text-amber-600 dark:text-amber-400 text-xs font-medium">Not recommended</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Always use port 20004 (WSS)</strong> when possible. Unencrypted connections 
              on port 20003 expose your address queries to network observers.
            </p>
          </div>
        </div>
      </section>

      {/* Server Configuration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Changing the Server
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          To connect to a different Rostrum server:
        </p>

        <div className="space-y-4 mb-6">
          <Step 
            number={1} 
            title="Access Node Settings"
            description="From the main menu, select 'Node' or 'Server'"
          />
          <Step 
            number={2} 
            title="Enter Server Hostname"
            description="Type the server address (e.g., electrum.nexa.org)"
          />
          <Step 
            number={3} 
            title="Enter Port Number"
            description="Enter 20004 for WSS or 20003 for WS"
          />
          <Step 
            number={4} 
            title="Configure TLS"
            description="Enable TLS for port 20004, disable for port 20003"
          />
          <Step 
            number={5} 
            title="Save and Connect"
            description="Tap 'Save' to disconnect from the current server and connect to the new one"
          />
        </div>
      </section>

      {/* Privacy Considerations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Privacy Considerations
        </h2>
        
        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex gap-3">
            <Eye className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-2">What Rostrum Servers Can See</div>
              <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Your IP address and connection times
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Which addresses you're monitoring for payments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  Transaction queries you make
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 mb-6">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-green-900 dark:text-green-200 mb-2">What Rostrum Servers Cannot See</div>
              <ul className="space-y-1 text-sm text-green-800 dark:text-green-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Private keys (PayDeck never stores them)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Your seed phrase (discarded after xPub derivation)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  Your device PIN or settings
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>For maximum privacy:</strong> Run your own Rostrum server. This ensures 
              your address queries never leave your network. See{' '}
              <Link href="/docs/setup/own-server" className="underline">Running Your Own Server</Link>.
            </p>
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
            problem="Cannot connect to server"
            solutions={[
              "Verify server hostname is spelled correctly",
              "Ensure port number matches (20004 for WSS)",
              "Check that TLS setting matches the port",
              "Verify WiFi is connected and has internet access",
              "Try the default server to isolate the issue"
            ]}
          />
          <TroubleshootItem 
            problem="Connection drops frequently"
            solutions={[
              "Check WiFi signal strength",
              "Server may be under heavy load, try later",
              "Try a different Rostrum server",
              "Verify your network allows WebSocket connections"
            ]}
          />
          <TroubleshootItem 
            problem="Payments not detected"
            solutions={[
              "Verify the receiving address is correct",
              "Check that the server is synced (not behind)",
              "Ensure the transaction has been broadcast",
              "Try reconnecting to the server"
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Want maximum privacy?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn how to run your own Rostrum server for complete privacy.
        </p>
        <Link 
          href="/docs/setup/own-server"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Running Your Own Server
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
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
          <h3 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Component: Step
function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
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
