import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
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
import { SITE } from "@/lib/constants";

export const metadata: Metadata = docsMetadata("/docs/security/model", {
  title: 'Security Model',
  description: 'Understanding PayDeck security architecture including watch-only operation, TLS verification, and threat mitigation.',
});

export default function SecurityModelPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <Shield className="w-4 h-4" />
            Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Security Model
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            PayDeck is designed with security as a primary concern. This page explains 
            the security architecture and how various threats are mitigated.
          </p>
        </div>

        {/* Watch-Only Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Watch-Only Architecture
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
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
              title="Limited Damage"
              description="A compromised device cannot spend existing funds. It could be made to show an attacker's address for future payments, which is why the menu is locked"
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
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Network Security
          </h2>
        
          <div className="space-y-4">
            <SecurityCard 
              icon={<Wifi className="w-5 h-5" />}
              title="TLS/WSS Encryption"
              description="By default all communication with Rostrum servers uses WSS (WebSocket Secure). Node settings also allow plain WS, which is unencrypted and unauthenticated"
              features={[
                "Encryption of all data in transit",
                "Protection against eavesdropping",
                "Prevention of man-in-the-middle attacks"
              ]}
            />
            <SecurityCard 
              icon={<Shield className="w-5 h-5" />}
              title="TLS Server Authentication"
              description="PayDeck verifies server certificates against the ISRG Root X1 CA (Let's Encrypt root, valid until 2035)"
              features={[
                "Ensures connection to legitimate servers",
                "TLS with a pinned root of trust (ISRG Root X1)",
                "Rejects certificates not issued under that root"
              ]}
            />
          </div>
        </section>

        {/* Local Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Local Security
          </h2>
        
          <div className="space-y-4">
            <SecurityCard
              icon={<Lock className="w-5 h-5" />}
              title="Password-Derived Key Wrapping"
              description="An access password of 8 to 128 characters unlocks the vault that holds the device's master key"
              features={[
                "The master key is AES-256-GCM encrypted under a key derived from your password (PBKDF2)",
                "The password is never stored, not even as a hash. It is verified by successfully decrypting the master key",
                "There is no separate, weaker password check for an attacker to target",
                "The device locks every time it returns to the home screen; taking payments never needs the password"
              ]}
            />
            <SecurityCard
              icon={<Key className="w-5 h-5" />}
              title="First-Run Setup Wizard"
              description="A fresh device cannot be used until it is set up"
              features={[
                "Wallet mode (Receive only or Watch only) is chosen once and becomes immutable; only a factory reset clears it",
                "The password is mandatory and set before any wallet or setting exists, so there is no usable default code",
                "Nothing outside the wizard is reachable until mode, password and wallet all exist"
              ]}
            />
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-medium text-neutral-900 dark:text-white mb-2">Brute-Force Self-Wipe</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                After 15 wrong password attempts the device factory-wipes itself (it warns from the 10th).
                The failed-attempt count is committed to storage <em>before</em> each attempt is
                checked, so power-cycling mid-guess cannot reset it. Straight runs, repeated blocks and
                common passwords are rejected when the password is set.
              </p>
            </div>
          </div>
        </section>

        {/* Data Storage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
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
                "The AES-256-GCM-wrapped master key (no plaintext key, no password hash)",
                "The wallet mode and the setup-complete flag",
                "Display preferences"
              ]}
            />
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  On the Standard build, the master key in NVS is always AES-256-GCM-wrapped under
                  your password, so a physical flash dump never exposes it directly. An attacker holding
                  such a dump can still guess passwords offline without any attempt limit, which is why
                  the password has a minimum of 8 characters and why a long passphrase is recommended.
                  Only the master key and the account xPub are protected by the password. The key that
                  derives your receiving addresses, the payment history, the Wi-Fi password and the
                  server settings are encrypted with a key derived from the chip&apos;s own ID, so that
                  the terminal can take payments while locked; a flash dump contains that ID, and
                  therefore exposes those items without any password. The sealed{" "}
                  <Link href="/docs/security/production-mode" className="underline font-medium">production
                  build</Link> encrypts the entire flash (including NVS) and locks the debug ports,
                  which stops the dump itself — the only complete fix for at-rest attacks. The
                  secure-development build encrypts the flash too but leaves JTAG and UART download
                  usable, so treat it as a test stage, not as protection.
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
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Threat Mitigation
          </h2>
        
          <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 dark:bg-neutral-900">
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">Threat</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">Mitigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Device theft</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">Watch-only design, password lock, 15-strike wipe</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Forced unlock</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">Optional duress password wipes the device instead of unlocking it</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Network eavesdropping</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">TLS encryption</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Rogue server</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">Certificate verification</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Firmware tampering</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">Secure boot (production mode)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Flash extraction</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">Flash encryption (production mode)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">JTAG debugging</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">JTAG disable (production mode)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-neutral-900 dark:text-white">Weak randomness</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 text-xs">Human tap entropy only, NIST SP 800-90B measured, fail-closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What PayDeck Does NOT Protect Against */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Limitations
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
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
              description="Lost seed phrases, weak or shared passwords, public seed display"
            />
            <LimitationItem 
              title="Sophisticated hardware attacks"
              description="Power analysis, fault injection"
            />
          </div>
        </section>

        {/* Security Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Security Recommendations
          </h2>
        
          <div className="space-y-2">
            <RecommendationItem number={1} text="Use privacy mode (seed phrase or xPub, not manual address)" />
            <RecommendationItem number={2} text="Choose a long passphrase as the access password and keep it private" />
            <RecommendationItem number={3} text="Connect to trusted WiFi networks" />
            <RecommendationItem number={4} text="Keep seed phrase backup secure and private" />
            <RecommendationItem number={5} text="Update firmware when security patches are released" />
            <RecommendationItem number={6} text="Consider production mode for high-value deployments" />
          </div>
        </section>

        {/* Reporting Vulnerabilities */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Reporting Vulnerabilities
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            Report a vulnerability <strong className="text-neutral-900 dark:text-white">privately</strong>,
            as a confidential issue on GitLab. A confidential issue is visible only to the
            maintainers, so the details stay out of public view until a fix is released.
            Please do not use a normal public issue or a chat group for this.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={SITE.confidentialIssue}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-sm font-medium transition-colors"
            >
              Open a confidential issue
            </a>
            <a
              href={SITE.securityPolicy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors"
            >
              Read the security policy
            </a>
          </div>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li>Include the firmware version or commit, the steps to reproduce, and what you expected to happen.</li>
            <li>The project aims to acknowledge a report within 5 business days and assess it within 10.</li>
            <li>Please allow 30 days for a fix before publishing details.</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Maximum hardware security
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Learn about production mode for permanent flash encryption and secure boot.
          </p>
          <Link 
            href="/docs/security/production-mode"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-700 hover:bg-accent-800 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Production Mode
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Security Feature
function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
      <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-neutral-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Security Card
function SecurityCard({ icon, title, description, features }: { icon: React.ReactNode; title: string; description: string; features: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-neutral-900 dark:text-white">{title}</h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 ml-13 pl-13">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
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
    <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-neutral-900 dark:text-white">{title}</span>
        <span className="text-neutral-500 dark:text-neutral-400"> - {description}</span>
      </div>
    </div>
  );
}

// Component: Recommendation Item
function RecommendationItem({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="w-6 h-6 rounded-full bg-accent-700 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
        {number}
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{text}</p>
    </div>
  );
}
