import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet,
  ArrowRight,
  AlertTriangle,
  Info,
  Shield,
  Fingerprint,
  Dice5,
  Clock,
  Cpu,
  WifiOff,
  Zap,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Understanding Entropy',
  description: 'Deep dive into how PayDeck generates cryptographically secure random numbers for seed phrase generation using human-provided entropy.',
};

export default function EntropyPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Wallet className="w-4 h-4" />
          Wallet
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Understanding Entropy
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          How PayDeck generates cryptographically secure seed phrases using human-provided 
          randomness. This is how you truly "create your own" seed phrase.
        </p>
      </div>

      {/* Why This Matters */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Why This Matters</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                If an attacker can predict or recreate the random numbers used to generate your 
                seed phrase, they can derive your private keys and steal your funds. Poor randomness 
                has led to real-world cryptocurrency thefts. Understanding entropy helps you 
                generate a truly secure seed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Computer Randomness Problem */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Why Computers Are Bad at Randomness
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Computers are deterministic machines. Given the same inputs, they produce the same outputs. 
          This is great for reliability, but terrible for generating random numbers.
        </p>

        <div className="space-y-4 mb-6">
          <ProblemCard 
            title="Pseudo-Random Number Generators"
            description="Most computer 'random' numbers are calculated from a seed value using mathematical formulas. If someone knows the seed, they can predict all future numbers."
          />
          <ProblemCard 
            title="Hardware RNG Limitations"
            description="The ESP32's hardware random number generator only produces quality entropy when WiFi or Bluetooth radios are active. With radios off, output becomes predictable."
          />
          <ProblemCard 
            title="Predictable System State"
            description="Boot time, memory addresses, and internal counters can often be guessed or narrowed down by an attacker, reducing effective randomness."
          />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>The solution:</strong> Add entropy that computers cannot predict or simulate: 
              human behavior. Your taps provide randomness that no algorithm can reproduce.
            </p>
          </div>
        </div>
      </section>

      {/* Isolated Environment */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Isolated Seed Generation
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          During seed generation, PayDeck creates an isolated environment to protect your entropy:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <IsolationCard 
            icon={<WifiOff className="w-5 h-5" />}
            title="WiFi Disabled"
            description="Network connections are disabled during seed generation. The MCU is completely isolated from the outside world."
          />
          <IsolationCard 
            icon={<Zap className="w-5 h-5" />}
            title="No Computer Required"
            description="PayDeck runs from any USB power source (phone charger, power bank). No computer connection needed during seed creation."
          />
          <IsolationCard 
            icon={<Trash2 className="w-5 h-5" />}
            title="Immediate Wipe"
            description="The seed phrase is erased from memory immediately after you verify it, before any network activity resumes."
          />
          <IsolationCard 
            icon={<Shield className="w-5 h-5" />}
            title="Watch-Only Design"
            description="PayDeck has no security chip because it doesn't store secrets. Only public keys (xPub) are kept after setup."
          />
        </div>
      </section>

      {/* The 128-Tap Requirement */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          The 128-Tap Requirement
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          PayDeck requires 128 taps to generate a seed phrase. A BIP39 12-word seed needs 
          128 bits of entropy, so we collect at least one tap per bit.
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-3">What Each Tap Contributes</h4>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              X position (2 bytes)
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Y position (2 bytes)
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Time delta in microseconds (4 bytes)
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Hardware RNG sample (4 bytes)
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Tap index (2 bytes)
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Total: 14 bytes per tap × 128 taps = 1,792 bytes (14,336 bits) of raw entropy material
          </p>
        </div>
      </section>

      {/* Critical: Avoiding Patterns */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Critical: Avoid Patterns
        </h2>
        
        <div className="p-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-900 dark:text-red-200 mb-2">Your Attention is Required</div>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                The security of your seed depends on <strong>unpredictable</strong> taps. 
                If you tap in a predictable pattern, you reduce the effective entropy.
              </p>
              <div className="space-y-2">
                <BadPattern text="Tapping fast in one spot" />
                <BadPattern text="Tapping in a regular rhythm" />
                <BadPattern text="Following a predictable path (circles, zigzags)" />
                <BadPattern text="Rushing through all 128 taps in seconds" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-green-900 dark:text-green-200 mb-2">Good Entropy Practices</div>
              <div className="space-y-2">
                <GoodPattern text="Use the entire screen area" />
                <GoodPattern text="Vary your timing: some fast, some slow" />
                <GoodPattern text="Be creative and unpredictable" />
                <GoodPattern text="Take 30-60 seconds for all 128 taps" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Using Dice for Extra Randomness */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Dice5 className="w-6 h-6" />
          Using Dice for Extra Randomness
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          For maximum security, you can incorporate physical dice to add non-electronic 
          randomness that is completely independent of any computer system.
        </p>

        <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-4">Divide the Screen into 6 Zones</h4>
          <div className="font-mono text-xs bg-zinc-900 dark:bg-zinc-950 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
            <pre>{`┌───────────┬───────────┬───────────┐
│           │           │           │
│     1     │     2     │     3     │
│           │           │           │
├───────────┼───────────┼───────────┤
│           │           │           │
│     4     │     5     │     6     │
│           │           │           │
└───────────┴───────────┴───────────┘`}</pre>
          </div>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p><strong>Method:</strong> Roll a die before each tap. Tap in the zone matching the number.</p>
            <p><strong>Variation:</strong> Use two dice for a 12-zone grid (2×6 or 3×4 layout).</p>
            <p><strong>Timing:</strong> Vary your timing based on the roll (odd = quick tap, even = slow tap).</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Dice add physical randomness that is completely independent of any electronic source. 
              Even a sophisticated hardware attack cannot predict dice rolls.
            </p>
          </div>
        </div>
      </section>

      {/* Cryptographic Mixing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Cryptographic Mixing
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          All collected entropy is combined using SHA-512, a cryptographic hash function. 
          Even if some inputs have patterns, SHA-512 produces uniformly distributed output.
        </p>

        <div className="space-y-3">
          <ProcessStep 
            number={1}
            title="Initialization"
            description="Pool seeded with device MAC address, hardware RNG samples, and system time"
          />
          <ProcessStep 
            number={2}
            title="Collection"
            description="Each tap's position, timing, and RNG data is fed into SHA-512 state"
          />
          <ProcessStep 
            number={3}
            title="Finalization"
            description="After 128 taps, SHA-512 produces 64 bytes. First 16 bytes become seed entropy."
          />
          <ProcessStep 
            number={4}
            title="Immediate Wipe"
            description="Entropy pool memory is zeroed using mbedtls_platform_zeroize()"
          />
        </div>
      </section>

      {/* Security Model */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          PayDeck Security Model
        </h2>
        
        <div className="space-y-4">
          <SecurityPoint 
            title="No Secure Element"
            description="PayDeck does not have a dedicated security chip (secure element). This is intentional: the device doesn't need one because it never stores private keys, seed phrases, or other critical secrets."
          />
          <SecurityPoint 
            title="Watch-Only by Design"
            description="After seed generation/import, only the xPub (public keys) is stored. The seed is erased immediately, before WiFi reconnects or any further operation."
          />
          <SecurityPoint 
            title="Human Entropy Requirement"
            description="By requiring 128 human taps, PayDeck ensures seed generation cannot be automated or predicted by malware, even if the device firmware were compromised."
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Comparison to Other Methods
        </h2>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Method</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Entropy Sources</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Risks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Hardware wallet</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Dedicated TRNG chip</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Supply chain attacks</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Software wallet</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">OS random (/dev/urandom)</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Compromised OS, malware</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Dice rolls only</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Physical randomness</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">User error, calculation mistakes</td>
              </tr>
              <tr className="bg-green-50/50 dark:bg-green-950/20">
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">PayDeck</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Multi-source + human taps</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">User patterns (avoidable)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to generate your seed?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Follow the seed generation guide with these entropy principles in mind.
        </p>
        <Link 
          href="/docs/wallet/seed-generation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Seed Generation Guide
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Problem Card
function ProblemCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}

// Component: Isolation Card
function IsolationCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
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

// Component: Bad Pattern
function BadPattern({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-red-800 dark:text-red-300">
      <span className="w-4 h-4 rounded-full bg-red-200 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 text-xs">✕</span>
      {text}
    </div>
  );
}

// Component: Good Pattern
function GoodPattern({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
      <span className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 text-xs">✓</span>
      {text}
    </div>
  );
}

// Component: Process Step
function ProcessStep({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center font-semibold text-xs flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white text-sm">{title}</h4>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

// Component: Security Point
function SecurityPoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-1 flex items-center gap-2">
        <Shield className="w-4 h-4 text-green-500" />
        {title}
      </h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
