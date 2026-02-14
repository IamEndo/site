import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lock,
  Wifi,
  Server,
  Eye,
  EyeOff,
  Network,
  Router,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Network Security',
  description: 'Network security best practices for PayDeck deployments.',
};

export default function NetworkSecurityPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Settings className="w-4 h-4" />
          Setup
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Network Security
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Best practices for securing your PayDeck network connection, from home setups 
          to retail and enterprise deployments.
        </p>
      </div>

      {/* Security Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Security Overview
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          PayDeck is designed with security in mind. Understanding the network architecture 
          helps you make informed decisions about your deployment.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <SecurityFact 
            icon={<Globe className="w-5 h-5" />}
            title="Outbound Only"
            description="PayDeck only makes outbound connections to Rostrum servers. No inbound ports need to be opened."
            positive={true}
          />
          <SecurityFact 
            icon={<Lock className="w-5 h-5" />}
            title="TLS Encrypted"
            description="All connections use WSS (WebSocket Secure) with TLS encryption on port 20004."
            positive={true}
          />
          <SecurityFact 
            icon={<EyeOff className="w-5 h-5" />}
            title="Watch-Only Wallet"
            description="PayDeck never stores private keys or seed phrases. Seeds are used only to derive public keys, then immediately discarded."
            positive={true}
          />
          <SecurityFact 
            icon={<Eye className="w-5 h-5" />}
            title="Address Queries Visible"
            description="Rostrum servers can see which addresses you query. Run your own server for privacy."
            positive={false}
          />
        </div>
      </section>

      {/* Deployment Scenarios */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Deployment Scenarios
        </h2>

        <div className="space-y-6">
          {/* Home / Personal */}
          <DeploymentCard 
            title="Home / Personal Use"
            risk="Low"
            description="Using PayDeck on your home network for personal transactions."
          >
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Standard home WiFi with WPA2/WPA3 is sufficient
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Use the public Rostrum server or run your own
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                PIN protection recommended but optional
              </li>
            </ul>
          </DeploymentCard>

          {/* Retail / Business */}
          <DeploymentCard 
            title="Retail / Small Business"
            risk="Medium"
            description="Point-of-sale in a shop, restaurant, or small business."
          >
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Use a dedicated WiFi network separate from guest WiFi
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Enable PIN protection to prevent unauthorized access
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Consider production firmware for tamper resistance
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Position device where staff can monitor it
              </li>
            </ul>
          </DeploymentCard>

          {/* Enterprise */}
          <DeploymentCard 
            title="Enterprise / High Security"
            risk="High"
            description="Deployments requiring maximum security and privacy."
          >
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Dedicated VLAN for payment devices
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Run your own Rostrum server on-premises
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Use production firmware (encrypted, locked)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Implement network monitoring and logging
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                Physical security controls for devices
              </li>
            </ul>
          </DeploymentCard>
        </div>
      </section>

      {/* Network Isolation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Network Isolation
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Isolating payment devices from other network traffic reduces attack surface 
          and prevents lateral movement if another device is compromised.
        </p>

        <div className="space-y-4">
          <IsolationMethod 
            title="Separate SSID"
            difficulty="Easy"
            description="Create a dedicated WiFi network for payment devices. Most routers support multiple SSIDs."
            steps={[
              "Access your router admin panel",
              "Create a new wireless network (e.g., 'Payments-Secure')",
              "Use a strong, unique password",
              "Connect PayDeck to this network only"
            ]}
          />
          <IsolationMethod 
            title="VLAN Segmentation"
            difficulty="Medium"
            description="Use VLANs to logically separate payment device traffic at the network level."
            steps={[
              "Configure a VLAN for payment devices on your switch",
              "Assign the PayDeck WiFi SSID to this VLAN",
              "Create firewall rules to limit inter-VLAN traffic",
              "Allow only outbound connections to Rostrum ports"
            ]}
          />
          <IsolationMethod 
            title="Dedicated Hardware"
            difficulty="Advanced"
            description="Use a separate router/access point exclusively for payment devices."
            steps={[
              "Install a dedicated access point for payments",
              "Connect it to your network with appropriate firewall rules",
              "Optionally run your own Rostrum server on this segment",
              "Monitor traffic for anomalies"
            ]}
          />
        </div>
      </section>

      {/* Firewall Rules */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Firewall Configuration
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck only needs outbound access to Rostrum servers. A minimal firewall policy 
          would allow:
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Direction</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Protocol</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Port</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr className="bg-green-50/50 dark:bg-green-950/20">
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Outbound</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">TCP/WSS</td>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20004</td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400 text-xs">Rostrum WSS (required)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Outbound</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">TCP/WS</td>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">20003</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Rostrum WS (optional, unencrypted)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Outbound</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">UDP</td>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">53</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">DNS (if using hostname)</td>
              </tr>
              <tr className="bg-red-50/50 dark:bg-red-950/20">
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Inbound</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Any</td>
                <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">All</td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400 text-xs">Block all inbound</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Local Rostrum:</strong> If running your own server, replace the public Rostrum 
              ports with your local server's IP address and port.
            </p>
          </div>
        </div>
      </section>

      {/* Physical Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Physical Security
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Network security is only part of the picture. Physical access to the device 
          can bypass many protections.
        </p>

        <div className="space-y-3">
          <SecurityTip tip="Position device where staff can see it at all times" />
          <SecurityTip tip="Use the enclosure to prevent access to USB ports" />
          <SecurityTip tip="Enable PIN protection to lock menu access" />
          <SecurityTip tip="Use production firmware to prevent reflashing" />
          <SecurityTip tip="Consider tamper-evident stickers on enclosure seams" />
          <SecurityTip tip="Train staff to recognize suspicious behavior around the device" />
        </div>
      </section>

      {/* Monitoring */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Monitoring & Logging
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          For high-security deployments, consider monitoring network traffic from payment devices:
        </p>

        <div className="space-y-3">
          <SecurityTip tip="Log all connections from the payment device VLAN" />
          <SecurityTip tip="Alert on connections to unexpected destinations" />
          <SecurityTip tip="Monitor for unusual traffic volume or patterns" />
          <SecurityTip tip="If running Rostrum, enable Prometheus monitoring (port 3224)" />
          <SecurityTip tip="Review logs regularly for anomalies" />
        </div>
      </section>

      {/* Checklist */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Security Checklist
        </h2>
        
        <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3">
            <ChecklistItem text="Use WPA2/WPA3 WiFi encryption" />
            <ChecklistItem text="Connect to 2.4 GHz network (required)" />
            <ChecklistItem text="Use port 20004 (WSS) for encrypted connections" />
            <ChecklistItem text="Enable PIN protection on the device" />
            <ChecklistItem text="Consider a dedicated network for payment devices" />
            <ChecklistItem text="Run your own Rostrum server for maximum privacy" />
            <ChecklistItem text="Use production firmware for high-security deployments" />
            <ChecklistItem text="Position device in a monitored location" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Network secured?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Next, learn about wallet options and how to configure receiving addresses.
        </p>
        <Link 
          href="/docs/wallet/options"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Wallet Options
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Security Fact
function SecurityFact({ icon, title, description, positive }: { icon: React.ReactNode; title: string; description: string; positive: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${positive ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' : 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${positive ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
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

// Component: Deployment Card
function DeploymentCard({ title, risk, description, children }: { title: string; risk: string; description: string; children: React.ReactNode }) {
  const riskColors = {
    Low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    Medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    High: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
  };

  return (
    <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskColors[risk as keyof typeof riskColors]}`}>
          {risk} Risk
        </span>
      </div>
      <p className="text-sm text-zinc-500 mb-4">{description}</p>
      {children}
    </div>
  );
}

// Component: Isolation Method
function IsolationMethod({ title, difficulty, description, steps }: { title: string; difficulty: string; description: string; steps: string[] }) {
  const difficultyColors = {
    Easy: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    Medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    Advanced: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
  };

  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-2">
        <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-sm text-zinc-500 mb-3">{description}</p>
      <ol className="space-y-1">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 font-medium">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

// Component: Security Tip
function SecurityTip({ tip }: { tip: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{tip}</p>
    </div>
  );
}

// Component: Checklist Item
function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded border-2 border-zinc-300 dark:border-zinc-600 flex items-center justify-center">
        <CheckCircle2 className="w-3 h-3 text-transparent" />
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
    </div>
  );
}
