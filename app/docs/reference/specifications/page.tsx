import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen,
  Cpu,
  Monitor,
  Wifi,
  Database,
  Code,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical Specifications',
  description: 'Hardware and software specifications for PayDeck.',
};

export default function SpecificationsPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Reference
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Technical Specifications
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Hardware and software specifications for PayDeck.
        </p>
      </div>

      {/* Hardware */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-zinc-400" />
          Hardware Platform
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SpecRow label="Target Device" value="ESP32-2432S028R (Cheap Yellow Display)" />
              <SpecRow label="Processor" value="ESP32-WROOM-32 (Xtensa dual-core, 240 MHz)" />
              <SpecRow label="RAM" value="520 KB SRAM" />
              <SpecRow label="Flash" value="4 MB" />
              <SpecRow label="WiFi" value="802.11 b/g/n (2.4 GHz only)" />
              <SpecRow label="Power" value="USB-C, 5V" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Display */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Monitor className="w-6 h-6 text-zinc-400" />
          Display
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SpecRow label="Size" value="2.8 inches diagonal" />
              <SpecRow label="Resolution" value="320 x 240 pixels" />
              <SpecRow label="Type" value="IPS LCD" />
              <SpecRow label="Driver" value="ST7789" />
              <SpecRow label="Touch" value="Resistive (XPT2046)" />
              <SpecRow label="Interface" value="SPI (HSPI)" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Connectivity */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Wifi className="w-6 h-6 text-zinc-400" />
          Connectivity
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SpecRow label="Protocol" value="WebSocket Secure (WSS)" />
              <SpecRow label="Server" value="Rostrum (Nexa blockchain indexer)" />
              <SpecRow label="Default Port" value="20004 (WSS)" />
              <SpecRow label="TLS" value="Required (certificate verification)" />
              <SpecRow label="Root CA" value="ISRG Root X1 (Let's Encrypt)" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Wallet */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Database className="w-6 h-6 text-zinc-400" />
          Wallet
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SpecRow label="Type" value="Watch-only (no private keys)" />
              <SpecRow label="Seed Format" value="BIP39 (12-word mnemonic)" />
              <SpecRow label="Key Derivation" value="BIP32 / BIP44" />
              <SpecRow label="Derivation Path" value="m/44'/29223'/0'/0/n" />
              <SpecRow label="Coin Type" value="29223 (Nexa)" />
              <SpecRow label="Address Format" value="CashAddr (nexa: prefix)" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Software */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-zinc-400" />
          Software
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SpecRow label="Language" value="C/C++17" />
              <SpecRow label="Framework" value="ESP-IDF / Arduino" />
              <SpecRow label="Build System" value="PlatformIO" />
              <SpecRow label="Graphics" value="LVGL" />
              <SpecRow label="Crypto" value="mbedTLS" />
              <SpecRow label="Storage" value="NVS (Non-Volatile Storage)" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Build Environments */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Build Environments
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Environment</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Encryption</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Secure Boot</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Reflashable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">esp32dev-hspi-st7789-2v8</td>
                <td className="px-4 py-3 text-zinc-500">No</td>
                <td className="px-4 py-3 text-zinc-500">No</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">esp32dev-secure-dev</td>
                <td className="px-4 py-3 text-zinc-500">Yes</td>
                <td className="px-4 py-3 text-zinc-500">Yes</td>
                <td className="px-4 py-3 text-amber-600 dark:text-amber-400">With keys</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">esp32dev-secure-prod</td>
                <td className="px-4 py-3 text-zinc-500">Yes (permanent)</td>
                <td className="px-4 py-3 text-zinc-500">Yes (permanent)</td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400">Never</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Security Features
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <FeatureCard 
            title="Watch-Only"
            description="Private keys never stored on device"
          />
          <FeatureCard 
            title="TLS/WSS"
            description="Encrypted server communication"
          />
          <FeatureCard 
            title="Certificate Pinning"
            description="ISRG Root X1 CA verification"
          />
          <FeatureCard 
            title="PIN Protection"
            description="6-digit PIN with hash storage"
          />
          <FeatureCard 
            title="Secure Memory"
            description="Seed phrases zeroed after use"
          />
          <FeatureCard 
            title="Flash Encryption"
            description="AES-256 (production mode)"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Need terminology help?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Check the glossary for explanations of technical terms.
        </p>
        <Link 
          href="/docs/reference/glossary"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Glossary
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Spec Row
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white w-1/3">{label}</td>
      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{value}</td>
    </tr>
  );
}

// Component: Feature Card
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
