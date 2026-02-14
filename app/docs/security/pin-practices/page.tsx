import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Shield,
  ArrowRight,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  Lock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PIN Best Practices',
  description: 'Guidelines for choosing a secure PIN for your PayDeck device.',
};

export default function PinPracticesPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Shield className="w-4 h-4" />
          Security
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          PIN Best Practices
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Guidelines for choosing a secure PIN that's easy for you to remember 
          but difficult for others to guess.
        </p>
      </div>

      {/* Good vs Bad PINs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Choosing a Strong PIN
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <PinCard 
            title="Avoid These"
            pins={[
              { pin: "123456", reason: "Sequential numbers" },
              { pin: "000000", reason: "Repeated digits" },
              { pin: "111111", reason: "Repeated digits" },
              { pin: "199019", reason: "Birth year pattern" },
              { pin: "258025", reason: "Vertical keypad line" },
              { pin: "121212", reason: "Simple pattern" }
            ]}
            good={false}
          />
          <PinCard 
            title="Better Choices"
            pins={[
              { pin: "739248", reason: "Random, no pattern" },
              { pin: "482619", reason: "No obvious meaning" },
              { pin: "384759", reason: "Mixed, unpredictable" },
              { pin: "926158", reason: "Unique combination" }
            ]}
            good={true}
          />
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Common Mistakes
        </h2>
        
        <div className="space-y-3">
          <MistakeItem 
            mistake="Using your birth date"
            why="Easily discovered from social media or documents"
          />
          <MistakeItem 
            mistake="Using your phone number (or part of it)"
            why="Often publicly available or known to others"
          />
          <MistakeItem 
            mistake="Using keyboard patterns"
            why="1234, 7890, 2580 are among the most common PINs"
          />
          <MistakeItem 
            mistake="Using the same PIN everywhere"
            why="One breach exposes all your devices"
          />
          <MistakeItem 
            mistake="Writing it on the device"
            why="Defeats the purpose entirely"
          />
        </div>
      </section>

      {/* Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Tips for a Memorable PIN
        </h2>
        
        <div className="space-y-4">
          <TipCard 
            title="Use a meaningful number"
            description="A number significant to you but not publicly known. Not your birthday or anniversary, but perhaps your childhood house number combined with your first locker number."
          />
          <TipCard 
            title="Make it truly random"
            description="A 6-digit PIN has 1,000,000 possible combinations, but only if you avoid common patterns. Random-looking numbers are much harder to guess than dates or sequences."
          />
          <TipCard 
            title="Create a mental story"
            description="Associate each digit with something. '384759' could be '3 pets, 8 legs spider, 4 seasons, 7 days, 5 fingers, 9 lives cat'. Silly associations are memorable."
          />
          <TipCard 
            title="Avoid starting with 0 or 1"
            description="Most people start with low numbers. Starting with 5-9 makes your PIN less common."
          />
        </div>
      </section>

      {/* Physical Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Physical Security
        </h2>
        
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Shield the screen when entering your PIN
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Be aware of people standing nearby
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Don't share your PIN with staff unless necessary
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Change your PIN if you suspect it's compromised
            </li>
          </ul>
        </div>
      </section>

      {/* Context Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Context Matters
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Consider your threat model when choosing PIN complexity:
        </p>

        <div className="space-y-4">
          <ContextCard 
            scenario="Personal device at home"
            recommendation="6-digit PIN, keep it simple but not obvious"
          />
          <ContextCard 
            scenario="Retail environment with staff"
            recommendation="6-digit PIN, change periodically"
          />
          <ContextCard 
            scenario="High-traffic public location"
            recommendation="6-digit PIN, limit who knows it"
          />
        </div>
      </section>

      {/* Remember */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Remember</div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                The PIN protects device settings, not your funds. PayDeck is watch-only and cannot 
                spend cryptocurrency regardless of PIN status. However, someone with settings access 
                could change the receiving address to their own, so the PIN still matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Learn about security model
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Understand PayDeck's overall security architecture.
        </p>
        <Link 
          href="/docs/security/model"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Security Model
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: PIN Card
function PinCard({ title, pins, good }: { title: string; pins: { pin: string; reason: string }[]; good: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${good ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'}`}>
      <div className="flex items-center gap-2 mb-4">
        {good ? (
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        )}
        <h4 className={`font-medium ${good ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-2">
        {pins.map((item, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <code className={`font-mono px-2 py-0.5 rounded ${good ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
              {item.pin}
            </code>
            <span className="text-zinc-500 text-xs">{item.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Mistake Item
function MistakeItem({ mistake, why }: { mistake: string; why: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-zinc-900 dark:text-white">{mistake}</span>
        <span className="text-zinc-500"> - {why}</span>
      </div>
    </div>
  );
}

// Component: Tip Card
function TipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Context Card
function ContextCard({ scenario, recommendation }: { scenario: string; recommendation: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div>
        <h4 className="font-medium text-zinc-900 dark:text-white">{scenario}</h4>
      </div>
      <div className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs whitespace-nowrap">
        {recommendation}
      </div>
    </div>
  );
}
