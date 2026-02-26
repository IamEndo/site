import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wifi,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  Signal,
  Lock,
  Globe,
  Router
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'WiFi Configuration',
  description: 'Connect PayDeck to your wireless network for blockchain communication.',
};

export default function WiFiPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Settings className="w-4 h-4" />
          Setup
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          WiFi Configuration
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          PayDeck requires a WiFi connection to communicate with Rostrum servers 
          and monitor the blockchain for incoming payments.
        </p>
      </div>

      {/* Network Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Network Requirements
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <RequirementCard 
            icon={<Signal className="w-5 h-5" />}
            title="2.4 GHz WiFi"
            description="5 GHz networks are not supported by the ESP32 chip"
            required={true}
          />
          <RequirementCard 
            icon={<Lock className="w-5 h-5" />}
            title="WPA2 Security"
            description="WPA2-Personal recommended for best compatibility"
            required={false}
          />
          <RequirementCard 
            icon={<Globe className="w-5 h-5" />}
            title="Internet Access"
            description="Required to reach Rostrum blockchain servers"
            required={true}
          />
          <RequirementCard 
            icon={<Router className="w-5 h-5" />}
            title="Port 20004 Open"
            description="Outbound WSS connections must not be blocked"
            required={true}
          />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> Most home and business networks meet these requirements. 
              Enterprise networks with captive portals or certificate-based authentication are not supported.
            </p>
          </div>
        </div>
      </section>

      {/* Connecting to WiFi */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Connecting to WiFi
        </h2>
        
        <div className="space-y-4 mb-6">
          <Step 
            number={1} 
            title="Open WiFi Settings"
            description="From the main menu, select 'WiFi' or 'Network'"
          />
          <Step 
            number={2} 
            title="Enter Network Name (SSID)"
            description="Use the on-screen keyboard to type your WiFi network name exactly as it appears"
          />
          <Step 
            number={3} 
            title="Enter Password"
            description="Type your WiFi password. Characters are hidden for security."
          />
          <Step 
            number={4} 
            title="Save and Connect"
            description="Tap 'Save' to store credentials and connect to the network"
          />
        </div>

        <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Connection Successful</div>
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                When connected, the WiFi icon appears in the status bar and the device 
                automatically connects to the configured Rostrum server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* On-Screen Keyboard Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          On-Screen Keyboard Tips
        </h2>
        
        <div className="space-y-3">
          <TipItem 
            tip="Tap the shift key to toggle uppercase/lowercase"
          />
          <TipItem 
            tip="Use the symbol key (123 or #+=) for numbers and special characters"
          />
          <TipItem 
            tip="Long-press backspace to clear the entire field"
          />
          <TipItem 
            tip="Double-check your password before saving"
          />
        </div>
      </section>

      {/* Security Considerations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Security Considerations
        </h2>
        
        <div className="space-y-4">
          <SecurityCard 
            icon={<Shield className="w-5 h-5" />}
            title="Credential Storage"
            description="WiFi credentials are stored in the device's NVS (Non-Volatile Storage). In production mode, NVS is encrypted with a device-specific key."
          />
          <SecurityCard 
            icon={<Wifi className="w-5 h-5" />}
            title="Dedicated Network"
            description="For high-security deployments, consider using a dedicated VLAN or network segment for payment devices, isolated from general business traffic."
          />
          <SecurityCard 
            icon={<Lock className="w-5 h-5" />}
            title="Network Monitoring"
            description="PayDeck only makes outbound connections to Rostrum servers. No inbound connections are accepted, reducing attack surface."
          />
        </div>
      </section>

      {/* Changing WiFi Settings */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Changing WiFi Settings
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          To connect to a different network or update credentials:
        </p>

        <div className="space-y-3 mb-6">
          <Step 
            number={1} 
            title="Access Menu"
            description="Enter your PIN if configured, then navigate to WiFi settings"
          />
          <Step 
            number={2} 
            title="Update Credentials"
            description="Enter the new SSID and password"
          />
          <Step 
            number={3} 
            title="Save Changes"
            description="The device will disconnect from the old network and connect to the new one"
          />
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Note:</strong> Only one WiFi network can be stored at a time. 
              Adding a new network replaces the previous configuration.
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
            problem="Connection fails immediately"
            solutions={[
              "Verify SSID is spelled correctly (case-sensitive)",
              "Double-check the password",
              "Ensure the network is 2.4 GHz, not 5 GHz",
              "Move closer to the router"
            ]}
          />
          <TroubleshootItem 
            problem="Connects but disconnects frequently"
            solutions={[
              "Check signal strength (move closer to router)",
              "Reduce interference from other devices",
              "Verify router firmware is up to date",
              "Try changing the WiFi channel on your router"
            ]}
          />
          <TroubleshootItem 
            problem="Connected to WiFi but can't reach server"
            solutions={[
              "Verify internet connectivity on the network",
              "Check if firewall blocks outbound port 20004",
              "Try a different Rostrum server",
              "Ensure the network doesn't have a captive portal"
            ]}
          />
          <TroubleshootItem 
            problem="Network not appearing"
            solutions={[
              "Confirm the network is broadcasting (not hidden)",
              "Ensure it's a 2.4 GHz network",
              "Check if MAC filtering is enabled on router",
              "Restart the PayDeck device"
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          WiFi connected?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Next, configure your Rostrum server connection for blockchain monitoring.
        </p>
        <Link 
          href="/docs/setup/rostrum"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Rostrum Servers
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Requirement Card
function RequirementCard({ 
  icon, 
  title, 
  description, 
  required 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  required: boolean;
}) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-zinc-900 dark:text-white">{title}</h3>
            {required && (
              <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs">Required</span>
            )}
          </div>
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

// Component: Tip Item
function TipItem({ tip }: { tip: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0" />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{tip}</p>
    </div>
  );
}

// Component: Security Card
function SecurityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
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
