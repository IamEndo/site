import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  AlertTriangle,
  Info,
  Eye,
  Lock,
  Wifi,
  Database,
  Cpu,
  Key,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security Model',
  description: 'Understanding PayDeck security architecture including watch-only operation, TLS verification, and threat mitigation.',
};

export default function SecurityModelPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Security Model
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          PayDeck is designed with security as a primary concern. This page explains 
          the security architecture and how various threats are mitigated.
        </p>
      </div>

      {/* Watch-Only Architecture */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Watch-Only Architecture
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          The fundamental security property of PayDeck is that it operates as a 
          <strong> watch-only wallet</strong>. This is the core principle behind all security decisions.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <SecurityFeature 
            icon={<Eye className="w-5 h-5" />}
            title="No Private Keys"
            description="Private keys are never stored on the device"
          />
          <SecurityFeature 
            icon={<Lock className="w-5 h-5" />}
            title="Cannot Spend"
            description="The device cannot sign transactions or move funds"
          />
          <SecurityFeature 
            icon={<Shield className="w-5 h-5" />}
            title="Compromise Safe"
            description="Even if device is compromised, funds cannot be stolen"
          />
          <SecurityFeature 
            icon={<Key className="w-5 h-5" />}
            title="Seed Erased"
            description="Seed phrases are used only during setup and immediately erased"
          />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              The only data PayDeck retains is the extended public key (xPub), which can 
              generate receiving addresses but cannot authorize spending.
            </p>
          </div>
        </div>
      </section>

      {/* Network Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Network Security
        </h2>
        
        <div className="space-y-4">
          <SecurityCard 
            icon={<Wifi className="w-5 h-5" />}
            title="TLS/WSS Encryption"
            description="All communication with Rostrum servers uses WSS (WebSocket Secure)"
            features={[
              "Encryption of all data in transit",
              "Protection against eavesdropping",
              "Prevention of man-in-the-middle attacks"
            ]}
          />
          <SecurityCard 
            icon={<Shield className="w-5 h-5" />}
            title="Certificate Verification"
            description="PayDeck verifies server certificates against the ISRG Root X1 CA (Let's Encrypt root, valid until 2035)"
            features={[
              "Ensures connection to legitimate servers",
              "Certificate pinning prevents fraudulent certificates",
              "Protection even if a CA is compromised"
            ]}
          />
        </div>
      </section>

      {/* Local Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Local Security
        </h2>
        
        <div className="space-y-4">
          <SecurityCard 
            icon={<Lock className="w-5 h-5" />}
            title="PIN Protection"
            description="An optional 6-digit PIN protects access to the settings menu"
            features={[
              "PIN is hashed before storage (not stored in plaintext)",
              "Protects against unauthorized configuration changes",
              "Does not protect displayed payment addresses (public data)"
            ]}
          />
          <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Weak PIN Detection</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              PayDeck rejects obviously weak PINs like 123456, 000000, or repeating digits. 
              Choose a PIN that isn't easily guessable.
            </p>
          </div>
        </div>
      </section>

      {/* Data Storage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Data Storage
        </h2>
        
        <div className="space-y-4">
          <SecurityCard 
            icon={<Database className="w-5 h-5" />}
            title="NVS (Non-Volatile Storage)"
            description="Settings stored persistently on the device"
            features={[
              "WiFi credentials (SSID and password)",
              "Rostrum server configuration",
              "Wallet xPub or manual address",
              "PIN hash",
              "Display preferences"
            ]}
          />
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                In production mode, NVS is encrypted. In development mode, NVS data could 
                theoretically be extracted with physical access.
              </p>
            </div>
          </div>
          <SecurityCard 
            icon={<Cpu className="w-5 h-5" />}
            title="Memory Handling"
            description="Sensitive data is securely wiped after use"
            features={[
              "Seed phrases zeroed immediately after derivation",
              "Entropy pools cleared after seed generation",
              "Uses mbedtls_platform_zeroize() to prevent compiler optimization"
            ]}
          />
        </div>
      </section>

      {/* Threat Mitigation Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Threat Mitigation
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Threat</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Device theft</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Watch-only mode, PIN protection</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Network eavesdropping</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">TLS encryption</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Rogue server</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Certificate verification</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Firmware tampering</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Secure boot (production mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Flash extraction</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Flash encryption (production mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">JTAG debugging</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">JTAG disable (production mode)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Weak randomness</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Multi-source entropy pool</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* What PayDeck Does NOT Protect Against */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Limitations
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          No security system is perfect. PayDeck does not protect against:
        </p>

        <div className="space-y-3">
          <LimitationItem 
            title="Supply chain attacks"
            description="Compromised hardware before you receive it"
          />
          <LimitationItem 
            title="Shoulder surfing"
            description="Someone watching you enter your seed"
          />
          <LimitationItem 
            title="Compromised WiFi"
            description="TLS helps, but consider network security"
          />
          <LimitationItem 
            title="User error"
            description="Lost seed phrases, weak PINs, public seed display"
          />
          <LimitationItem 
            title="Sophisticated hardware attacks"
            description="Power analysis, fault injection"
          />
        </div>
      </section>

      {/* Security Recommendations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Security Recommendations
        </h2>
        
        <div className="space-y-2">
          <RecommendationItem number={1} text="Use privacy mode (seed phrase or xPub, not manual address)" />
          <RecommendationItem number={2} text="Set a strong 6-digit PIN" />
          <RecommendationItem number={3} text="Connect to trusted WiFi networks" />
          <RecommendationItem number={4} text="Keep seed phrase backup secure and private" />
          <RecommendationItem number={5} text="Update firmware when security patches are released" />
          <RecommendationItem number={6} text="Consider production mode for high-value deployments" />
        </div>
      </section>

      {/* Reporting Vulnerabilities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Reporting Vulnerabilities
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400">
          If you discover a security vulnerability in PayDeck, please report it 
          responsibly through the GitLab repository's issue tracker. 
          Do not disclose vulnerabilities publicly before they are fixed.
        </p>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Maximum hardware security
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Learn about production mode for permanent flash encryption and secure boot.
        </p>
        <Link 
          href="/docs/security/production-mode"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Production Mode
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Security Feature
function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Security Card
function SecurityCard({ icon, title, description, features }: { icon: React.ReactNode; title: string; description: string; features: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 ml-13 pl-13">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Limitation Item
function LimitationItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-zinc-900 dark:text-white">{title}</span>
        <span className="text-zinc-500"> - {description}</span>
      </div>
    </div>
  );
}

// Component: Recommendation Item
function RecommendationItem({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
        {number}
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}
