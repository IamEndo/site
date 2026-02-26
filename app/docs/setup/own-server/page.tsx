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
  Lock,
  Terminal,
  HardDrive,
  Cpu,
  ExternalLink,
  Download,
  Box
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Running Your Own Server',
  description: 'Set up and run your own Rostrum server for maximum privacy and control.',
};

export default function OwnServerPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Settings className="w-4 h-4" />
          Setup
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Running Your Own Server
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Run your own Rostrum server for maximum privacy. Your address queries never 
          leave your network, and you have full control over your blockchain connection.
        </p>
      </div>

      {/* Why Run Your Own */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Why Run Your Own Server?
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <BenefitCard 
            icon={<Shield className="w-5 h-5" />}
            title="Complete Privacy"
            description="Address queries stay on your network. No third party sees which addresses you're monitoring."
          />
          <BenefitCard 
            icon={<Lock className="w-5 h-5" />}
            title="Trustless Verification"
            description="Verify transactions against your own full node. No trust in external servers."
          />
          <BenefitCard 
            icon={<Server className="w-5 h-5" />}
            title="Full Control"
            description="Configure ports, SSL certificates, and access controls exactly as needed."
          />
          <BenefitCard 
            icon={<Cpu className="w-5 h-5" />}
            title="No Rate Limits"
            description="Handle as many queries as your hardware supports without external restrictions."
          />
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Requirements
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Component</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Minimum</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Operating System</td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Linux, macOS, Windows</td>
                <td className="px-4 py-3 text-zinc-500">Linux (Ubuntu/Debian)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">RAM</td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">4 GB</td>
                <td className="px-4 py-3 text-zinc-500">8+ GB</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Storage</td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">50 GB SSD</td>
                <td className="px-4 py-3 text-zinc-500">100+ GB SSD</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Network</td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Stable connection</td>
                <td className="px-4 py-3 text-zinc-500">10+ Mbps</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Rostrum requires a Nexa full node to index. The full node must be fully synced 
              before Rostrum can complete its initial indexing.
            </p>
          </div>
        </div>
      </section>

      {/* Option 1: Built-in with Nexa Node */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Option 1: Built-in Rostrum (Easiest)
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          <strong>Nexa on Linux includes Rostrum by default</strong> and runs it automatically 
          alongside the node. This is the easiest way to get started.
        </p>

        <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800 mb-6">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Linux: Enabled by Default</div>
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                Just run <code className="px-1 py-0.5 rounded bg-accent-100 dark:bg-accent-dark-900 text-xs">nexad</code> and 
                Rostrum starts automatically on ports 20001-20004.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">macOS/Windows: Must Enable Manually</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                On other platforms, add the <code className="px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-xs">-electrum</code> flag 
                to enable the built-in server.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Start Nexa with Rostrum (macOS/Windows):</p>
          <CodeBlock code="nexad -electrum" />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Configure as private (local only):</p>
          <CodeBlock code="nexad -electrum.host=127.0.0.1 -electrum.ws.host=127.0.0.1" />
        </div>
      </section>

      {/* Option 2: Standalone Rostrum */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Option 2: Standalone Rostrum (More Control)
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          For more control over configuration, run Rostrum as a separate process. 
          This allows custom database locations, ports, and advanced options.
        </p>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Installation Methods</h3>

        <div className="space-y-4 mb-6">
          <InstallMethod 
            icon={<Download className="w-5 h-5" />}
            title="Pre-built Binaries"
            description="Download ready-to-run binaries for Linux (x86-64, ARM64) and Windows."
            code="wget https://nexa.gitlab.io/rostrum/nightly/rostrum-nexa-linux-x86-64-latest.gz
gzip -d rostrum-nexa-linux-x86-64-latest.gz
chmod +x rostrum-nexa-linux-x86-64-latest
mv rostrum-nexa-linux-x86-64-latest rostrum"
          />
          
          <InstallMethod 
            icon={<Terminal className="w-5 h-5" />}
            title="Install via Cargo"
            description="Build from source using Rust's package manager."
            code="cargo install rostrum --features=nexa --locked"
          />
          
          <InstallMethod 
            icon={<Box className="w-5 h-5" />}
            title="Docker"
            description="Run in a container for easy deployment."
            code="docker pull bchunlimited/nexad-rostrum
docker run -d -p 20001-20004:20001-20004 bchunlimited/nexad-rostrum"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Disable built-in and run standalone:</p>
          <CodeBlock code={`# Start Nexa without built-in Rostrum
nexad -electrum=0

# Run Rostrum separately
rostrum --db-dir ./rostrum-db --electrum-rpc-addr 127.0.0.1:20001`} />
        </div>
      </section>

      {/* Port Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Nexa Port Reference
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Port</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Protocol</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20001</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">TCP</td>
                <td className="px-4 py-3 text-zinc-500">Electrum RPC (unencrypted)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20002</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">SSL/TLS</td>
                <td className="px-4 py-3 text-zinc-500">Electrum RPC (encrypted)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20003</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">WebSocket</td>
                <td className="px-4 py-3 text-zinc-500">WS (unencrypted)</td>
              </tr>
              <tr className="bg-accent-50/50 dark:bg-accent-dark-950/20">
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20004</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">WebSocket Secure</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400">WSS (PayDeck uses this)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">21000</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">HTTP</td>
                <td className="px-4 py-3 text-zinc-500">REST API (unencrypted)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">21001</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">HTTPS</td>
                <td className="px-4 py-3 text-zinc-500">REST API (encrypted)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Connecting PayDeck */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Connecting PayDeck to Your Server
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Once Rostrum is running, configure PayDeck to connect to it:
        </p>

        <div className="space-y-4 mb-6">
          <Step 
            number={1} 
            title="Access Node Settings"
            description="From the PayDeck menu, select 'Node' or 'Server'"
          />
          <Step 
            number={2} 
            title="Enter Your Server Address"
            description="For local server: 127.0.0.1 or your machine's LAN IP (e.g., 192.168.1.100)"
          />
          <Step 
            number={3} 
            title="Enter Port 20004"
            description="Use 20004 for WSS (encrypted) or 20003 for WS (unencrypted on local network)"
          />
          <Step 
            number={4} 
            title="Save and Connect"
            description="PayDeck will connect to your private Rostrum instance"
          />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Local network:</strong> If PayDeck and Rostrum are on the same network, 
              you can use port 20003 (WS) without SSL since traffic doesn't leave your network.
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Link */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Further Reading
        </h2>
        
        <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Server className="w-6 h-6 text-zinc-500" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Official Rostrum Documentation</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Comprehensive guides for configuration, SSL/TLS setup, monitoring, Docker deployment, 
                systemd services, and more.
              </p>
              <a 
                href="https://nexa.gitlab.io/rostrum/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent-600 dark:text-accent-dark-400 hover:underline"
              >
                nexa.gitlab.io/rostrum
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Server running?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn about network security best practices for your setup.
        </p>
        <Link 
          href="/docs/setup/network-security"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Network Security
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Benefit Card
function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center flex-shrink-0">
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

// Component: Install Method
function InstallMethod({ icon, title, description, code }: { icon: React.ReactNode; title: string; description: string; code: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <CodeBlock code={code} />
    </div>
  );
}

// Component: Step
function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-accent-600 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Code Block
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}
