import { Metadata } from 'next';
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import {
  Shield,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Password Best Practices',
  description: 'Guidelines for choosing a strong PayDeck access password that is practical to type on the on-screen keypad.',
};

export default function PasswordPracticesPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
            <Shield className="w-4 h-4" />
            Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
            Password Best Practices
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            How to choose an access password that is hard to guess, hard to brute-force from a flash dump,
            and still practical to type on a phone-style keypad.
          </p>
        </div>

        {/* Why it matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Why Length Matters
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            On the device, fifteen wrong guesses wipe everything, so guessing at the screen is hopeless.
            The password also has to hold up if someone copies the flash memory of a Standard build and
            attacks the wrapped master key offline, where nothing limits the number of guesses.
            That is why PayDeck replaced its earlier six-digit PIN with a password: a PIN has a million
            combinations and falls in minutes offline. The figures below are from the project's own
            estimate tool, measured against the device's key-derivation cost.
          </p>

          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Password</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Offline search, one CPU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-4 py-3 text-zinc-900 dark:text-white">Six digits (the old PIN)</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">About fifteen minutes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-zinc-900 dark:text-white">Eight random printable characters</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Roughly 180,000 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-zinc-900 dark:text-white">Twelve or more random characters, or four random words</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Out of reach of any rig</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-zinc-500">
            A large GPU rig shortens the eight-character case to days for the weakest choices, which is why
            the minimum is a floor, not a target. Secure builds encrypt the flash and stop the dump itself;
            see <Link href="/docs/security/production-mode" className="text-accent-600 dark:text-accent-dark-400 hover:underline">Secure &amp; Production Builds</Link>.
          </p>
        </section>

        {/* Good vs bad */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Choosing a Strong Password
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <ExampleCard
              title="Rejected or weak"
              examples={[
                { value: "12345678", reason: "A straight run, rejected by the device" },
                { value: "abababab", reason: "A repeated block, rejected" },
                { value: "password1", reason: "On the common-password list, rejected" },
                { value: "paydeck123", reason: "Product name, rejected" },
                { value: "Shop2026", reason: "Accepted, but guessable from context" },
                { value: "19851204", reason: "Accepted, but it is a birth date" }
              ]}
              good={false}
            />
            <ExampleCard
              title="Strong choices"
              examples={[
                { value: "four random words", reason: "Spaces are allowed, easy to type" },
                { value: "12+ random characters", reason: "From a password manager or dice" },
                { value: "mixed case and symbols", reason: "Caps and symbol keys are on the keypad" },
                { value: "unique to this device", reason: "Never reused from another account" }
              ]}
              good={true}
            />
          </div>

          <p className="text-sm text-zinc-500 mt-4">
            The device rejects the obvious patterns (runs, repeats, a short list of common passwords) when a
            password is set. Everything else is accepted, so a password that passes the check is not
            automatically a good one.
          </p>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Common Mistakes
          </h2>

          <div className="space-y-3">
            <MistakeItem
              mistake="Using a date, a phone number or the shop's name"
              why="Easily discovered from social media, documents or the sign above the door"
            />
            <MistakeItem
              mistake="Padding a short word to reach eight characters"
              why="word1234 passes the check but is among the first guesses an attacker tries"
            />
            <MistakeItem
              mistake="Reusing a password from another account"
              why="One breach elsewhere exposes the device"
            />
            <MistakeItem
              mistake="Writing it on or near the device"
              why="Defeats the purpose entirely"
            />
            <MistakeItem
              mistake="Sharing it with everyone on shift"
              why="Menu access lets anyone change the receiving address"
            />
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Tips for the Keypad
          </h2>

          <div className="space-y-4">
            <TipCard
              title="Prefer words over symbols"
              description="The keypad is a phone-style T9 layout: tapping a key cycles through its letters. A passphrase of several random words is quick to type and far stronger than a short jumble of symbols."
            />
            <TipCard
              title="Use the space"
              description="Spaces are accepted. Separating words with spaces keeps the passphrase readable in your head without weakening it."
            />
            <TipCard
              title="Watch the last character"
              description="The character you just typed stays visible for about a second before it turns into an asterisk. Use that moment to catch a wrong letter instead of retyping everything."
            />
            <TipCard
              title="Make it truly random"
              description="Pick the words from a long list with dice, or let a password manager generate the string. Anything you choose by feel tends to follow patterns an attacker will try first."
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
                <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
                Shield the screen while typing: the keypad shows which key you press
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
                Return to the home screen when you leave the device; that locks it
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
                Give the password only to people who are allowed to change settings
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
                Change it from More settings if you suspect it is known
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
            Match the password to where the device lives:
          </p>

          <div className="space-y-4">
            <ContextCard
              scenario="Personal device at home"
              recommendation="Four random words"
            />
            <ContextCard
              scenario="Retail counter with staff"
              recommendation="Long passphrase, known to the owner only"
            />
            <ContextCard
              scenario="Unattended public location"
              recommendation="Long passphrase plus a secure build"
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
                  The password protects the device configuration, not your funds. PayDeck is watch-only and
                  cannot spend anything. A forgotten password cannot be recovered on the device: the only way
                  back is a USB erase and reflash, and a sealed production device cannot be reflashed at all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
            Learn about the security model
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Understand PayDeck's overall security architecture.
          </p>
          <Link
            href="/docs/security/model"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Security Model
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Example Card
function ExampleCard({ title, examples, good }: { title: string; examples: { value: string; reason: string }[]; good: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${good ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'}`}>
      <div className="flex items-center gap-2 mb-4">
        {good ? (
          <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        )}
        <h4 className={`font-medium ${good ? 'text-accent-700 dark:text-accent-dark-300' : 'text-red-700 dark:text-red-300'}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-2">
        {examples.map((item, i) => (
          <li key={i} className="flex items-start justify-between gap-3 text-sm">
            <code className={`font-mono px-2 py-0.5 rounded whitespace-nowrap ${good ? 'bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
              {item.value}
            </code>
            <span className="text-zinc-500 text-xs text-right">{item.reason}</span>
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
      <CheckCircle2 className="w-5 h-5 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
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
      <div className="px-2 py-1 rounded bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-300 text-xs text-right">
        {recommendation}
      </div>
    </div>
  );
}
